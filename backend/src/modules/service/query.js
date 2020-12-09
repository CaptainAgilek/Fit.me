export const servicesForPlace = async (_, { place_id }, { dbConnection }) => {
  if (!place_id) {
    return [];
  }
  const result = await dbConnection.query(
    `SELECT * FROM service
      JOIN place_service USING (service_id)
      JOIN place USING (place_id)
      WHERE place_id = ?`,
    [place_id],
  );
  return result;
};
