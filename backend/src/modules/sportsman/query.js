export const sportsmen = async (_, __, { dbConnection }) => {
  const sportsmen = await dbConnection.query('SELECT * FROM sportsman');
  return sportsmen;
};

export const sportsman = async (_, { filter }, { dbConnection }) => {
  if (filter.id) {
    const sportsman = (
      await dbConnection.query(`SELECT * FROM sportsman WHERE user_id = ?`, [
        filter.id,
      ])
    )[0];

    if (!sportsman) {
      return null;
    }
    return sportsman;
  }

  if (filter.username) {
    const sportsman = (
      await dbConnection.query(`SELECT * FROM sportsman WHERE username = ?`, [
        filter.username,
      ])
    )[0];

    if (!sportsman) {
      return null;
    }
    return sportsman;
  }

  return null;
}
