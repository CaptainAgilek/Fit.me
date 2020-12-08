import { createOrUpdatePlace } from '../place/mutation';
import { userById } from '../user/query';
import { updateUserEmail } from '../user/mutation';

export const updateTrainer = async (_, { input }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `UPDATE trainer SET firstname = ?, lastname = ?, username = ?, facebook = ?, instagram = ?, phone = ?
     WHERE user_id = ?;`,
    [
      input.firstname,
      input.lastname,
      input.username,
      input.facebook ? input.facebook : null,
      input.instagram ? input.instagram : null,
      input.phone ? input.phone : null,
      input.user_id,
    ],
  );

  const user = await userById(_, { user_id: input.user_id }, { dbConnection });
  let userEmailResult = true;
  if (user) {
    userEmailResult = await updateUserEmail(
      _,
      { email: input.email, user_id: input.user_id },
      { dbConnection },
    );
  }

  let placeResult = true;
  if (input.place) {
    placeResult = await createOrUpdatePlace(_, { input }, { dbConnection });
  }

  return dbResponse.affectedRows === 1 && placeResult && userEmailResult;
};
