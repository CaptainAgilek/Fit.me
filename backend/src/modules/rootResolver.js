import { queries as RoleQueries } from './role';
import { queries as UserQueries } from './user';
import { mutations as UserMutations } from './user';
import { mutations as RoleMutations } from './role';
import { mutations as PhotoMutations } from './photo';
import { queries as SportsmanQueries } from './sportsman';
import { mutations as SportsmanMutations } from './sportsman';

export default {
  Query: {
    ...RoleQueries,
    ...UserQueries,
    ...SportsmanQueries,
    todo: async () => {
      return new Date().toISOString();
    },
  },
  Mutation: {
    ...PhotoMutations,
    ...RoleMutations,
    ...UserMutations,
    ...SportsmanMutations,
  },
  User: {
    async roles(parent, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT role_id, name FROM role
          JOIN role_user USING (role_id)
          JOIN user USING (user_id)
          WHERE user_id = ?`,
        [parent.user_id],
      );
    },
  },
  Sportsman: {
    async user(parent, _, { dbConnection }) {
      return (
        await dbConnection.query(
          `SELECT user_id, user.email, verification_token, is_verified FROM user
          JOIN sportsman USING (user_id)
          WHERE user_id = ?`,
          [parent.user_id],
        )
      )[0];
    },
    async places(parent, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT place_id, user_id, city, street, zip FROM place
          JOIN user USING (user_id)
          WHERE user_id = ?`,
        [parent.user_id],
      );
    },
    async benefits(parent, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT benefit_id, name FROM benefit
          JOIN benefit_sportsman USING (benefit_id)
          JOIN sportsman USING (user_id)
          WHERE user_id = ?`,
        [parent.user_id],
      );
    },
    async profile_photo(parent, _, { dbConnection }) {
      return (
        await dbConnection.query(
          `SELECT photo_id, user_id, description, url, gallery_name, is_profile_picture FROM photo
          JOIN user USING (user_id)
          WHERE user_id = ? AND is_profile_picture=true`,
          [parent.user_id],
        )
      )[0];
    }
  },
};
