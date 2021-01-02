export const organization = async (_, { user_id }, { dbConnection }) => {
  const organization = (
    await dbConnection.query(`SELECT * FROM organization WHERE user_id = ?`, [
      user_id,
    ])
  )[0];

  if (!organization) {
    return null;
  }
  return organization;
};

export const getOrganizationsByCityString = async (
  _,
  { cityString },
  { dbConnection },
) => {
  const words = cityString.replace(/,/g, '').split(' ').join('|');

  cityString = '%' + cityString + '%';

  const organizations = (
    await dbConnection.query(
      `SELECT * FROM organization
      JOIN place USING(user_id)
      WHERE (place.city LIKE ?) OR (concat('%', place.city, '%') LIKE ?) OR place.city RLIKE ?`,
      [cityString, cityString, words],
    )
  );

  return organizations;
};

export const trainersNotEmployed = async (_, { user_id }, { dbConnection }) => {
  return await dbConnection.query(
    `SELECT * FROM trainer
        WHERE trainer.user_id NOT IN
        (
        SELECT DISTINCT trainer_id
        FROM organization_trainer
        WHERE organization_id = ?
        )`,
    [user_id],
  );
};
