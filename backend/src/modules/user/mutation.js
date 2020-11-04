import * as argon2 from 'argon2';
import { createToken } from '../../libs/token';
import { sendEmail } from '../../libs/mailer';
import {
  checkAlreadyTakenEmail,
  verifyRegistrationToken,
  getRegistrationToken,
} from './helper';
import { assignRoleToUser } from '../role/mutation';
import { ROLE_NAME } from '../role/enum';
import { USER_TYPE } from './enum';

export const verifyRegistration = async (_, { token }, { dbConnection }) => {
  return await verifyRegistrationToken(token, dbConnection);
};

export const signin = async (_, { email, password }) => {
  if (!(email === 'a@a.com' && password === 'pass')) {
    throw Error('Invalid username or password');
  }

  const mockUser = { id: 1, email };
  const token = createToken(mockUser);

  return {
    token,
  };
};

export const signup = async (
  _,
  { email, password, firstname, lastname, type },
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
        `INSERT INTO sportsman (user_id, firstname, lastname)
        VALUES (?, ?, ?);`,
        [insertUserResponse.insertId, firstname, lastname],
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
      //TODO
      break;
    case USER_TYPE.TRAINER:
      //TODO
      break;
    default:
      throw Error('Invalid user type');
  }

  const mailResult = await sendEmail(
    '"Fit.me" <sedm22@vse.cz>',
    email,
    'Hello ✔',
    'Hello, prosim potvrdte registraci kliknutim na link ' +
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

//casdades delete, so rows in other tables where user_id is referenced are removed too
export const deleteUser = async (_, { user_id }, { dbConnection }) => {
  const deleteResponse = await dbConnection.query(
    `DELETE FROM user WHERE user_id = ?`,
    [user_id],
  );

  return deleteResponse.warningStatus === 0;
};
