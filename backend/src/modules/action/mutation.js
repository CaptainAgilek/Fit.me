export const insertAction = async (_, { input }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `INSERT INTO action (action_id, place_id, date, time, price, trainer_id, max_capacity, photo_id, name)
  VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      input.action_id,
      input.place_id,
      new Date(parseInt(input.date)),
      input.time,
      input.price,
      input.trainer_id,
      input.max_capacity,
      input.photo_id,
      input.name
    ],
  );

  return dbResponse.affectedRows === 1;
};

export const updateAction = async (_, { input }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `UPDATE action SET place_id = ?, date = ?, time = ?, price = ?, trainer_id = ?, max_capacity = ?, photo_id = ?, name = ?
     WHERE action_id = ?;`,
    [
      input.place_id,
      new Date(parseInt(input.date)),
      input.time,
      input.price,
      input.trainer_id,
      input.max_capacity,
      input.photo_id,
      input.name,
      input.action_id,
    ],
  );

  return dbResponse.affectedRows === 1;
};

export const createOrUpdateAction = async (_, { input }, { dbConnection }) => {

  if (input.action_id) {
    return await updateAction(_, { input }, { dbConnection });
  } else {
    return await insertAction(_, { input }, { dbConnection });
  }
  return false;
};
