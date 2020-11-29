export const getTypeIdByName = async (typeName, dbConnection) => {
  const type = (
    await dbConnection.query('SELECT * FROM photo_type WHERE type_name = ?', [
      typeName,
    ])
  )[0];

  if (!type) {
    return null;
  }

  return type.photo_type_id;
};
