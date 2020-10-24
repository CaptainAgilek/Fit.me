import { verifyToken } from '../../libs/token';

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

export async function checkAlreadyTakenEmail(email, dbConnection) {
  const emailTaken = (
    await dbConnection.query('SELECT * FROM user WHERE email = ?', [email])
  )[0];

  if (emailTaken) {
    throw new Error('Email is already registered.');
  }
}

export async function verifyRegistrationToken(token, dbConnection) {
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
    if (!userByToken.is_verified[0]) {
      const dbResponse = await dbConnection.query(
        `UPDATE user SET is_verified = true WHERE verification_token = ?;`,
        [token],
      );
    }
    return true;
  }

  return false;
}

export default getUser;
