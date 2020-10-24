import * as argon2 from 'argon2';
import { createToken } from '../../libs/token';
import { sendEmail } from '../../libs/mailer';
import { checkAlreadyTakenEmail } from './helper';
import { USER_TYPE } from './enum';

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

export const signup = async (_, { email, password, firstname, lastname, type }, { dbConnection }) => {
  await checkAlreadyTakenEmail(email, dbConnection);

  const hashedPassword = await argon2.hash(password);
  const verificationToken = Date.now().toString() + (1000000 + Math.floor(Math.random() * 1000000000000));

  const insertUserResponse = await dbConnection.query(
    `INSERT INTO user (user_id, email, password, verification_token, is_verified)
    VALUES (NULL, ?, ?, ?, ?);`,
    [email, hashedPassword, verificationToken, false],
  );

  switch (type) {
    case USER_TYPE.SPORTSMAN:
    const insertSportsmanResponse = await dbConnection.query(
      `INSERT INTO sportsman (user_id, firstname, lastname)
      VALUES (?, ?, ?);`,
      [insertUserResponse.insertId, firstname, lastname],
    );
      break;
    default:

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

  return { token: token };
};
