export const placesByCityIds = async (_, { city }, { dbConnection }) => {
  if (!city) {
    return [];
  }
  const result = await dbConnection.query(
    `SELECT place_id FROM place
      WHERE city LIKE ?`,
    [city],
  );
  return result;
};

export const allPlaceIds = async (_, __, { dbConnection }) => {
  const result = await dbConnection.query(`SELECT place_id FROM place`);
  return result;
};
