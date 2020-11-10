import { benefitsForUser } from './query';

export const insertOrRemoveBenefit = async (
  _,
  { user_id, benefit_id, hasBenefit },
  { dbConnection },
) => {
  const benefits = await benefitsForUser(_, { user_id }, { dbConnection });
  const isBenefitPresent = benefits.some(
    (benefit) => benefit.benefit_id === benefit_id,
  );

  if (hasBenefit && isBenefitPresent) {
    //benefit is present, no need to update anything
    return true;
  }
  if (!hasBenefit && !isBenefitPresent) {
    //benefit is not present, no need to update anything
    return true;
  }

  if (hasBenefit && !isBenefitPresent) {
    const insertBenefit = await dbConnection.query(
      `INSERT INTO benefit_user (benefit_id, user_id)
        VALUES (?, ?);`,
      [benefit_id, user_id],
    );
    return insertBenefit.affectedRows === 1;
  }

  if (!hasBenefit && isBenefitPresent) {
    const deleteResponse = await dbConnection.query(
      `DELETE FROM benefit_user WHERE benefit_id = ? AND user_id = ?`,
      [benefit_id, user_id],
    );
    return deleteResponse.affectedRows === 1;
  }

  return true;
};
