export const actionsForPlace = async(_, { place_id }, { dbConnection }) => {
  return await dbConnection.query(
    `SELECT * FROM action
      WHERE place_id = ?`,
    [place_id]);
}
