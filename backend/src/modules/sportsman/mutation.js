import { insertPlace, updatePlace } from '../place/mutation';

export const updateSportsman = async (_, { input }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `UPDATE sportsman SET firstname = ?, lastname = ?, username = ?, email = ?, phone = ?
     WHERE user_id = ?;`,
    [
      input.firstname,
      input.lastname,
      input.username,
      input.email ? input.email : null,
      input.phone ? input.phone : null,
      input.user_id,
    ],
  );
  let placeResult = true;

  if (input.place) {
    placeResult = false;

    if (input.place.place_id) {
      placeResult = await updatePlace(
        _,
        { input: input.place },
        { dbConnection },
      );
    } else {
      placeResult = await insertPlace(
        _,
        { input: input.place },
        { dbConnection },
      );
    }
  }
  return dbResponse.affectedRows === 1 && placeResult;
};
