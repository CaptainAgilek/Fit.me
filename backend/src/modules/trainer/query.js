/*export const trainers = async (_, __, { dbConnection }) => {
    return await dbConnection.query('SELECT * FROM trainer');
  };*/

export const trainer = async (_, { user_id }, { dbConnection }) => {
  const trainer = (
    await dbConnection.query(`SELECT * FROM trainer WHERE user_id = ?`, [
      user_id,
    ])
  )[0];

  if (!trainer) {
    return null;
  }
  return trainer;
};
