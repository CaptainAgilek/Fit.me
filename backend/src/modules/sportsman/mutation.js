export const updateSportsman = async (_, { input }, { dbConnection }) => {
  console.log("called " + JSON.stringify(input));
  const dbResponse = await dbConnection.query(
    `UPDATE sportsman SET firstname = ?, lastname = ?, username = ?, email = ?, phone = ?
     WHERE user_id = ?;`,
    [
      input.firstname,
      input.lastname,
      input.username,
      input.email ? input.email : null,
      input.phone ? input.phone : null,
      input.user_id,
    ],
  );

  return dbResponse.affectedRows === 1;
};
