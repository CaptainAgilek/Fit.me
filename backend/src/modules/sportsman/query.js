export const sportsmen = async (_, __, { dbConnection }) => {
  const sportsmen = await dbConnection.query('SELECT * FROM sportsman');
  return sportsmen;
};

export const sportsman = async (_, { user_id }, { dbConnection }) => {
  const sportsman = (
    await dbConnection.query(`SELECT * FROM sportsman WHERE user_id = ?`, [
      user_id,
    ])
  )[0];

  if (!sportsman) {
    return null;
  }
  return sportsman;
}
