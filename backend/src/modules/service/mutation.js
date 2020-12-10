export const deleteUserService = async (_, { user_id, service_id }, { dbConnection }) => {
  const deleteResponse = await dbConnection.query(
    `DELETE FROM user_service WHERE user_id = ? AND service_id = ?`,
    [
      user_id,
      service_id
    ],
  );
  return deleteResponse.affectedRows === 1;
};
export const insertUserService = async (_, { input }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `INSERT INTO user_service (service_id, user_id)
  VALUES (?, ?);`,
    [
      input.service_id,
      input.user_id,
    ],
  );

  return dbResponse.affectedRows === 1;
};

