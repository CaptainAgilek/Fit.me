export const organization = async (_, { id }, { dbConnection }) => {
    if (id) {
      const organization = (
        await dbConnection.query(`SELECT * FROM organization WHERE user_id = ?`, [
          id,
        ])
      )[0];

      if (!organization) {
        return null;
      }
      return organization;
    }

    return null;
  }

/*export const ratings = async (_, { id }, { dbConnection }) => {
  if (id){
    const ratings = ( await dbConnection.query(`SELECT * from rating WHERE organization_id = :`, [id,] ));

    if (!ratings) {
      return null;
    }

    return ratings;
  }

  return null;
}*/
