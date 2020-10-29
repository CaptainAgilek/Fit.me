export const roles = async (_, __, { dbConnection }) => {
  const roles = await dbConnection.query('SELECT * FROM role');
  return roles;
};

export const role = async (_, { name }, { dbConnection }) => {
  const role = (
    await dbConnection.query(`SELECT * FROM role WHERE name = ?`, [
      name,
    ])
  )[0];

  if (!role) {
    return null;
  }
  return role;
};
