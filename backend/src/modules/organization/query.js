
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
  }
