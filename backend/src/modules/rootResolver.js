import { queries as RoleQueries } from './role';
import { queries as UserQueries } from './user';
import { queries as SportsmanQueries } from './sportsman';
import { queries as OrganizationQueries } from './organization';
import { queries as BenefitQueries } from './benefit';
import { queries as ActionQueries } from './action';
import { mutations as UserMutations } from './user';
import { mutations as RoleMutations } from './role';
import { mutations as SportsmanMutations } from './sportsman';
import { mutations as BenefitMutations } from './benefit';
import { mutations as PhotoMutations } from './photo';
import { mutations as PlaceMutations } from './place';

export default {
  Query: {
    ...RoleQueries,
    ...UserQueries,
    ...SportsmanQueries,
    ...OrganizationQueries,
    ...BenefitQueries,
    ...ActionQueries,
    todo: async () => {
      return new Date().toISOString();
    },
  },
  Mutation: {
    ...PhotoMutations,
    ...RoleMutations,
    ...UserMutations,
    ...SportsmanMutations,
    ...BenefitMutations,
    ...PlaceMutations,
  },
  User: {
    async roles(parent, _, { dbConnection }) {
      return await RoleQueries.rolesForUser(
        _,
        { user_id: parent.user_id },
        { dbConnection },
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
        `SELECT place_id, user_id, city, street, zip, country FROM place
          JOIN user USING (user_id)
          WHERE user_id = ?`,
        [parent.user_id],
      );
    },
    async benefits(parent, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT benefit_id, name FROM benefit
          JOIN benefit_user USING (benefit_id)
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
    },
  },
  Organization: {
    async trainers(parent, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT user_id, firstname, lastname
         FROM trainer
        JOIN organization_trainer ON (organization_trainer.organization_id = ?)
        GROUP BY(user_id)`,
        [parent.user_id],
      );
    },
  },
};
