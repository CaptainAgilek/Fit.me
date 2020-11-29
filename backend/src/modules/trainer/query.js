export const trainers = async (_, __, { dbConnection }) => {
    return await dbConnection.query('SELECT * FROM trainer');
  };