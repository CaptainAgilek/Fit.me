import { queries as RoleQueries } from './role';
import { queries as UserQueries } from './user';
import { queries as SportsmanQueries } from './sportsman';
import { queries as BenefitQueries } from './benefit';
import { queries as ActionQueries } from './action';
import { queries as OrganizationQueries } from './organization';
import { mutations as UserMutations } from './user';
import { mutations as RoleMutations } from './role';
import { mutations as SportsmanMutations } from './sportsman';
import { mutations as BenefitMutations } from './benefit';
import { mutations as PhotoMutations } from './photo';
import { mutations as PlaceMutations } from './place';
import { mutations as OrganizationMutations } from './organization';
import { sportsman } from './sportsman/query';


export default {
  Query: {
    ...RoleQueries,
    ...UserQueries,
    ...SportsmanQueries,
    ...BenefitQueries,
    ...ActionQueries,
    ...OrganizationQueries,
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
    ...OrganizationMutations,
  },
  User: {
    async roles(parent, _, { dbConnection }) {
      return await RoleQueries.rolesForUser(_, { user_id: parent.user_id}, { dbConnection });
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
    }
  },
  Organization: {
    async user(parent, _, { dbConnection }) {
      return (await dbConnection.query( 
        `SELECT user_id, user.email, verification_token, is_verified FROM user
        JOIN organization USING (user_id)
        WHERE user_id = ?`, 
        [parent.user_id]))[0];
    },
    async profile_photo(parent, _, { dbConnection }) {
      return (await dbConnection.query(
          `SELECT photo_id, user_id, description, url, gallery_name, is_profile_picture FROM photo
          JOIN user USING (user_id)
          WHERE user_id = ? AND is_profile_picture=true`,
          [parent.user_id],
        )
      )[0];
    },
    async photo_gallery(parent, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT photo_id, user_id, description, url, gallery_name, is_profile_picture FROM photo
        JOIN user USING (user_id)
        WHERE user_id = ? AND is_profile_picture=false AND gallery_name="DEFAULT"`,
        [parent.user_id],
      );
    },
    async ratings(parent, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT id, sportsman.user_id, text, stars FROM rating 
         join sportsman on sportsman.user_id = rating.user_id 
        where rating.organization_id = ?`,
        [parent.user_id],
      );
    }
  },
  Rating: {
    async sportsman(parent, _, { dbConnection }) {
      return (await dbConnection.query(
        `SELECT rating.user_id, firstname, lastname, username, phone FROM rating
        JOIN sportsman on sportsman.user_id = rating.user_id
        WHERE sportsman.user_id = ?`, 
        [parent.user_id],
      ))[0];
    },
    async organization(parent, _, { dbConnection }) {
      return (await dbConnection.query(
        `SELECT rating.user_id, name, username FROM rating
        JOIN organization on organization.user_id = rating.organization_id
        WHERE organization.user_id = ?`,
        [parent.organization_id],
      ))[0];
    }
  }
};
