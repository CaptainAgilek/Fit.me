export const insertPlace = async (_, { input }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `INSERT INTO place (place_id, user_id, city, street, zip, country)
  VALUES (null, ?, ?, ?, ?, ?);`,
    [
      input.user_id,
      input.city,
      input.street ? input.street : null,
      input.zip ? input.zip : null,
      input.country,
    ],
  );

  return dbResponse.affectedRows === 1;
};

export const updatePlace = async (_, { input }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `UPDATE place SET city = ?, street = ?, zip = ?, country = ?
     WHERE user_id = ? AND place_id = ?;`,
    [
      input.city,
      input.street ? input.street : null,
      input.zip ? input.zip : null,
      input.country,
      input.user_id,
      input.place_id,
    ],
  );

  return dbResponse.affectedRows === 1;
};

export const createOrUpdatePlace = async (_, { input }, { dbConnection }) => {
  if (!input.place) {
    return false;
  }

  if (input.place.place_id) {
    return await updatePlace(_, { input: input.place }, { dbConnection });
  } else {
    return await insertPlace(_, { input: input.place }, { dbConnection });
  }
  return false;
};
