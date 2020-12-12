export const servicesForUser = async (_, { user_id }, { dbConnection }) => {
  if (!user_id) {
    return [];
  }
  const result = await dbConnection.query(
    `SELECT * FROM service
      JOIN user_service USING (service_id)
      JOIN user USING (user_id)
      WHERE user_id = ?`,
    [user_id],
  );
  return result;
};
