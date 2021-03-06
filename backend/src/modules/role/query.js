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

export const rolesForUser = async (_, { user_id }, { dbConnection }) => {
  return await dbConnection.query(
    `SELECT role_id, name FROM role
      JOIN role_user USING (role_id)
      JOIN user USING (user_id)
      WHERE user_id = ?`,
    [user_id],
  );
}
