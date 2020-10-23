import { verifyRegistration as VerifyRegistrationToken } from '../../libs/registrationVerification';

export const users = async (_, __, { dbConnection }) => {
  const users = await dbConnection.query('SELECT * FROM user');
  return users;
};

export const user = async (_, { email }, { dbConnection }) => {
  const user = (
    await dbConnection.query(`SELECT * FROM user WHERE email = ?`, [
      email,
    ])
  )[0];

  if (!user) {
    return null;
  }

  return user;
};

export const verifyRegistration = async(_, { token }, {dbConnection}) => {
  return await VerifyRegistrationToken(token, dbConnection);
}
