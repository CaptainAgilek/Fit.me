export const users = async (_, __, { dbConnection }) => {
  const users = await dbConnection.query('SELECT * FROM user');
  return users;
};

export const user = async (email, dbConnection) => {
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

export const userById = async (_, { user_id }, { dbConnection} ) => {
  const user = (
    await dbConnection.query(`SELECT * FROM user WHERE user_id = ?`, [
      user_id,
    ])
  )[0];

  if (!user) {
    return null;
  }
  return user;
};
