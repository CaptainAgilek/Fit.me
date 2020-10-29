import { getRoleIdByRoleName } from './helper';

export const assignRoleToUser = async (_, { name, user_id }, {dbConnection}) => {
  const role_id = await getRoleIdByRoleName(name, dbConnection);

  const insertRoleUser = await dbConnection.query(
    `INSERT INTO role_user (role_id, user_id)
    VALUES (?, ?);`,
    [role_id, user_id],
  );

  return insertRoleUser.warningStatus == 0;
}
