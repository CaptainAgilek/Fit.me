import { createOrUpdatePlace } from '../place/mutation';
import { userById } from '../user/query';
import { updateUserEmail } from '../user/mutation';
import { insertOrRemoveBenefit } from '../benefit/mutation';

export const updateOrganization = async (_, { input }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `UPDATE organization SET organization_name = ?, username = ?, phone = ?
     WHERE user_id = ?;`,
    [
      input.organization_name,
      input.username,
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

  const benefitResult = await insertOrRemoveBenefitByBoolean(
    input.user_id,
    input.acceptingMultisport,
    input.acceptingActivePass,
    { dbConnection },
  );

  return (
    dbResponse.affectedRows === 1 &&
    placeResult &&
    userEmailResult &&
    benefitResult
  );
};

const insertOrRemoveBenefitByBoolean = async (
  user_id,
  acceptMultisport,
  acceptActivePass,
  { dbConnection },
) => {
  let result = true;
  result = await insertOrRemoveBenefit(
    null,
    {
      user_id: user_id,
      benefit_id: 1,
      hasBenefit: acceptMultisport,
    },
    { dbConnection },
  );

  result =
    result &&
    (await insertOrRemoveBenefit(
      null,
      {
        user_id: user_id,
        benefit_id: 2,
        hasBenefit: acceptActivePass,
      },
      { dbConnection },
    ));
  return result;
};
