import * as argon2 from 'argon2';
import { createToken } from '../../libs/token';

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

export const signup = async (_, { email, password }, { dbConnection }) => {
  const emailTaken = (
    await dbConnection.query('SELECT * FROM user WHERE email = ?', [email])
  )[0];

  if (emailTaken) {
    throw new Error('Email is already registered.');
  }

  const hashedPassword = await argon2.hash(password);
  const verificationToken = createToken({ email: email });

  const insertResponse = await dbConnection.query(
    `INSERT INTO user (user_id, email, password, verification_token, is_verified)
    VALUES (NULL, ?, ?, ?, ?);`,
    [email, hashedPassword, verificationToken, false],
  );

  //TODO send email with confirmation link with verificationToken as request param

  const token = createToken({ id: insertResponse.insertId });

  return { token: token };
};
