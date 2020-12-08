export const deletePlaceService = async (_, { place_id, service_id }, { dbConnection }) => {
  const deleteResponse = await dbConnection.query(
    `DELETE FROM place_service WHERE place_id = ? AND service_id = ?`,
    [
      place_id,
      service_id],
  );
  return deleteResponse.affectedRows === 1;
};
export const insertPlaceService = async (_, { input }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `INSERT INTO place_service (service_id, place_id)
  VALUES (?, ?);`,
    [
      input.service_id,
      input.place_id,
    ],
  );

  return dbResponse.affectedRows === 1;
};

