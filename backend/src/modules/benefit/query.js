export const benefitsForUser = async(_, { user_id }, { dbConnection }) => {
  return await dbConnection.query(
    `SELECT benefit_id, name FROM benefit
      JOIN benefit_user USING (benefit_id)
      JOIN sportsman USING (user_id)
      WHERE user_id = ?`,
    [user_id]);
}
