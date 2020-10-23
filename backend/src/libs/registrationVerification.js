export async function verifyRegistration(token, dbConnection) {
  const userByTokenFunc = async (token, dbConnection) => {
    const user = (
      await dbConnection.query(
        `SELECT * FROM user WHERE verification_token = ?`,
        [token],
      )
    )[0];

    if (!user) {
      return null;
    }

    return user;
  };

  const userByToken = await userByTokenFunc(token, dbConnection);

  if (userByToken) {
    if (!userByToken.is_verified) {
      const dbResponse = await dbConnection.query(
        `UPDATE user SET is_verified = true WHERE verification_token = ?;`,
        [token],
      );
    }
    return { is_verified: true };
  }

  return { is_verified: false };
}
