export const actionsForPlace = async (_, { place_id }, { dbConnection }) => {
  if (!place_id) {
    return [];
  }
  const result = await dbConnection.query(
    `SELECT * FROM action
      WHERE place_id = ?`,
    [place_id],
  );
  return result;
};
