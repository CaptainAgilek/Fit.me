import * as argon2 from 'argon2';
import { createPasswordResetToken, createToken, decodeToken, verifyPasswordResetToken } from '../../libs/token';
import { sendEmail } from '../../libs/mailer';
import {
  checkAlreadyTakenEmail,
  verifyRegistrationToken,
  getRegistrationToken,
} from './helper';
import { assignRoleToUser } from '../role/mutation';
import { rolesForUser } from '../role/query';
import { user } from './query';
import { ROLE_NAME } from '../role/enum';
import { USER_TYPE } from './enum';
import { insertPlace } from '../place/mutation';

export const verifyRegistration = async (_, { token }, { dbConnection }) => {
  return await verifyRegistrationToken(token, dbConnection);
};

export const signin = async (
  _,
  { email, password },
  { dbConnection },
) => {
  const storedUser = await user(email, dbConnection);
  if (!storedUser) {
    throw Error('Neexistující jméno.');
  }

  if (!storedUser.is_verified) {
    throw Error('Uživatel není ověřený.');
  }

  const roles = await rolesForUser(_, { user_id: storedUser.user_id }, { dbConnection });
  storedUser.roles = roles;

  if (await argon2.verify(storedUser.password, password)) {
    const token = createToken(storedUser);
    return { user: storedUser, token: token };
  }

  throw Error('Nesprávné jméno nebo heslo.');
};

export const signup = async (
  _,
  { email, password, name, street, city, zipCode, country, firstname, lastname, username, type },
  { dbConnection },
) => {
  await checkAlreadyTakenEmail(email, dbConnection);

  const hashedPassword = await argon2.hash(password);
  const verificationToken = await getRegistrationToken();

  const insertUserResponse = await dbConnection.query(
    `INSERT INTO user (user_id, email, password, verification_token, is_verified)
    VALUES (NULL, ?, ?, ?, ?);`,
    [email, hashedPassword, verificationToken, false],
  );
  await assignRoleToUser(
    _,
    { name: ROLE_NAME.ROLE_USER, user_id: insertUserResponse.insertId },
    { dbConnection },
  );

  switch (type) {
    case USER_TYPE.SPORTSMAN:
      const insertSportsmanResponse = await dbConnection.query(
        `INSERT INTO sportsman (user_id, firstname, lastname, username)
        VALUES (?, ?, ?, ?);`,
        [insertUserResponse.insertId, firstname, lastname, username],
      );
      await assignRoleToUser(
        _,
        {
          name: ROLE_NAME.ROLE_SPORTSMAN,
          user_id: insertUserResponse.insertId,
        },
        { dbConnection },
      );

      break;
    case USER_TYPE.ORGANIZATION:
      const insertOrganizationResponse = await dbConnection.query(
        `INSERT INTO organization (user_id, organization_name, username, phone)
        VALUES (?, ?, ?, ?);`,
        [insertUserResponse.insertId, name, name, ''],
      );
      await assignRoleToUser(
        _,
        {
          name: ROLE_NAME.ROLE_ORGANIZATION,
          user_id: insertUserResponse.insertId,
        },
        { dbConnection },
      );
      let input = {
        user_id: insertUserResponse.insertId,
        street: street,
        city: city,
        zip: zipCode,
        country: country,
      };
      await insertPlace(
        _,
        {
          input: input,
        },
        { dbConnection },
      );
      break;
    case USER_TYPE.TRAINER:
      const insertTrainerResponse = await dbConnection.query(
        `INSERT INTO trainer (user_id, firstname, lastname, username)
        VALUES (?, ?, ?, ?);`,
        [insertUserResponse.insertId, firstname, lastname, username],
      );
      await assignRoleToUser(
        _,
        {
          name: ROLE_NAME.ROLE_TRAINER,
          user_id: insertUserResponse.insertId,
        },
        { dbConnection },
      );
      break;
    default:
      throw Error('Invalid user type');
  }

  const mailResult = await sendEmail(
    '"Fit.me" <sedm22@vse.cz>',
    email,
    'Registrace na Fit.me ✔',
    'Dobrý den, prosím potvrďte registraci klinutím na odkaz ' +
    process.env.FRONTEND_URL +
    'verification?token=' +
    verificationToken,
  );

  const token = createToken({ id: insertUserResponse.insertId });
  const userObj = {
    user_id: insertUserResponse.insertId,
    email: email,
    is_verified: false,
  };

  return { user: userObj, token: token };
};

// cascades delete, so rows in other tables where user_id is referenced are removed too
export const deleteUser = async (_, { user_id }, { dbConnection }) => {
  const deleteResponse = await dbConnection.query(
    `DELETE FROM user WHERE user_id = ?`,
    [user_id],
  );

  return deleteResponse.warningStatus === 0;
};

export const updateUserEmail = async (_, { email, user_id }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `UPDATE user SET email = ? WHERE user_id = ?;`,
    [email, user_id],
  );

  return dbResponse.affectedRows === 1;
};

export const changePassword = async (
  _,
  { email, oldPassword, newPassword, newPasswordAgain },
  { dbConnection },
) => {
  if (newPassword !== newPasswordAgain) {
    throw Error('Hesla se neshodují.');
  }

  const storedUser = await user(email, dbConnection);
  if (!storedUser) {
    throw Error('Neexistující jméno.');
  }

  if (!storedUser.is_verified) {
    throw Error('Uživatel není ověřený.');
  }

  if (await !argon2.verify(storedUser.password, oldPassword)) {
    throw Error('Nesprávné heslo.');
  }

  const newPasswordHash = await argon2.hash(newPassword);

  const updatePasswordResponse = await dbConnection.query(
    `UPDATE user SET password = ? WHERE user_id = ?;`,
    [newPasswordHash, storedUser.user_id],
  );

  return updatePasswordResponse.affectedRows === 1;
};

export const resetPassword = async (_, { email }, { dbConnection }) => {
  const storedUser = await user(email, dbConnection);
  if (!storedUser) {
    throw Error('Neexistující email.');
  }

  const tmpUser = { user_id: storedUser.user_id, email: storedUser.email };
  const token = createPasswordResetToken(tmpUser, storedUser.password);

  /*console.log(process.env.FRONTEND_URL +
    'passwordReset?token=' +
    token);*/

  const mailResult = await sendEmail(
    '"Fit.me" <sedm22@vse.cz>',
    email,
    'Reset hesla',
    'Kliknutím na následující odkaz si resetujte heslo: ' +
    process.env.FRONTEND_URL +
    'passwordReset?token=' +
    token,
  );

  return true;
};

export const verifyPasswordReset = async (_, { token }, { dbConnection }) => {
  const email = decodeToken(token).email;

  const storedUser = await user(email, dbConnection);
  if (!storedUser) {
    throw Error('Neexistující email.');
  }

  try {
    verifyPasswordResetToken(token, storedUser.password);
    return true;  //at this point prepare new mutation that is changePassword without the oldPassword arg
  } catch (error) {
    return false;
  }
};

export const newPassword = async (_ , { email, newPassword, newPasswordAgain }, { dbConnection }) => {
  if (newPassword !== newPasswordAgain) {
    throw Error('Hesla se neshodují.');
  }

  const storedUser = await user(email, dbConnection);
  if (!storedUser) {
    throw Error('Neexistující email.');
  }

  if (!storedUser.is_verified) {
    throw Error('Uživatel není ověřený.');
  }

  const newPasswordHash = await argon2.hash(newPassword);

  const updatePasswordResponse = await dbConnection.query(
    `UPDATE user SET password = ? WHERE user_id = ?;`,
    [newPasswordHash, storedUser.user_id],
  );

  return updatePasswordResponse.affectedRows === 1;
};
