import { verifyToken } from '../../libs/token';
import { MINIMAL_VERIFICATION_TOKEN_LENGTH, MAXIMAL_VERIFICATION_TOKEN_RANDOM_LENGTH } from './const';

const getUser = async (auth) => {
  if (auth) {
    const token = auth.split('Bearer ')[1];
    if (token) {
      try {
        const { id } = verifyToken(token);
        return id;
      } catch (error) {
        console.log('err', err);
        throw err;
      }
    }
  }
};

export const checkAlreadyTakenEmail = async (email, dbConnection) => {
  const emailTaken = (
    await dbConnection.query('SELECT * FROM user WHERE email = ?', [email])
  )[0];

  if (emailTaken) {
    throw new Error('Email je již používán.');
  }
}

export const  verifyRegistrationToken = async (token, dbConnection) => {
  const userByTokenFunc = async (token, dbConnection) => {
    const user = (
      await dbConnection.query(
        `SELECT * FROM user WHERE verification_token = ?`,
        [token],
      )
    )[0];

    if (!user) {
      return null;
    }
    return user;
  };

  const userByToken = await userByTokenFunc(token, dbConnection);

  if (userByToken) {
    if (!userByToken.is_verified) {
      const dbResponse = await dbConnection.query(
        `UPDATE user SET is_verified = true WHERE verification_token = ?;`,
        [token],
      );
    }
    return true;
  }

  return false;
}

export const getRegistrationToken = async () => {
  return Date.now().toString() + (MINIMAL_VERIFICATION_TOKEN_LENGTH + Math.floor(Math.random() * MAXIMAL_VERIFICATION_TOKEN_RANDOM_LENGTH));
}

export default getUser;
