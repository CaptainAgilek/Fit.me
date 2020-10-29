import { queries as RoleQueries } from './role';
import { queries as UserQueries } from './user';
import { mutations as UserMutations } from './user';
import { mutations as RoleMutations } from './role';
import { queries as SportsmanQueries } from './sportsman';


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
    ...RoleMutations,
    ...UserMutations,
  },
  User: {
    async roles(parent, _, { dbConnection }) {

        return await dbConnection.query(`SELECT role_id, name FROM role
          JOIN role_user USING (role_id)
          JOIN user USING (user_id)
          WHERE user_id = ?`, [
          parent.user_id,
        ]);
    },
  },
};
