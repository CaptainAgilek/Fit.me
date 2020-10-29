export const getRoleIdByRoleName = async (name, dbConnection) => {
  const role = (
    await dbConnection.query('SELECT * FROM role WHERE name = ?', [name])
  )[0];

  if (!role) {
    return null;
  }
  return role.role_id;
}
