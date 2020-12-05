export const deleteService = async (_, { service_id }, { dbConnection }) => {
  const deleteResponse = await dbConnection.query(
    `DELETE FROM service WHERE service_id = ?`,
    [service_id],
  );
  return deleteResponse.affectedRows === 1;
};

export const insertService = async (_, { input }, { dbConnection }) => {
  console.log(input);
  const dbResponse = await dbConnection.query(
    `INSERT INTO service (service_id, place_id, name, description, photo_id)
  VALUES (null, ?, ?, ?, ?);`,
    [
      input.place_id,
      input.name,
      input.description,
      input.photo_id ? input.photo_id : null,
    ],
  );

  return dbResponse.affectedRows === 1;
};

export const updateService = async (_, { input }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `UPDATE service SET place_id = ?, name = ?, description = ?, photo_id = ?
     WHERE service_id = ?;`,
    [
      input.place_id,
      input.name,
      input.description,
      input.photo_id,
      input.service_id,
    ],
  );

  return dbResponse.affectedRows === 1;
};

export const createOrUpdateService = async (_, { input }, { dbConnection }) => {

  if (input.service_id) {
    return await updateService(_, { input }, { dbConnection });
  } else {
    return await insertService(_, { input }, { dbConnection });
  }
  return false;
};
