import { queries as RoleQueries } from './role';
import { queries as UserQueries } from './user';
import { queries as SportsmanQueries } from './sportsman';
import { queries as OrganizationQueries } from './organization';
import { queries as BenefitQueries } from './benefit';
import { queries as ActionQueries } from './action';

import { queries as TrainerQueries } from './trainer';

import { mutations as UserMutations } from './user';
import { mutations as RoleMutations } from './role';
import { mutations as SportsmanMutations } from './sportsman';
import { mutations as BenefitMutations } from './benefit';
import { mutations as PhotoMutations } from './photo';
import { mutations as PlaceMutations } from './place';
import { mutations as OrganizationMutations } from './organization';
import { sportsman } from './sportsman/query';
import { mutations as ActionMutations } from './action';
import { getTypeIdByName } from './photo/helper';


export default {
  Query: {
    ...RoleQueries,
    ...UserQueries,
    ...SportsmanQueries,
    ...OrganizationQueries,
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
    ...ActionMutations,
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
      const photo_type_id = await getTypeIdByName(`PROFILE_PICTURE`, dbConnection);
      return (
        await dbConnection.query(
          `SELECT photo_id, user_id, description, url, gallery_name, photo_type_id FROM photo
          JOIN user USING (user_id)
          WHERE user_id = ? AND photo_type_id = ?`,
          [parent.user_id, photo_type_id],
        )
      )[0];
    },
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
      const photo_type_id = await getTypeIdByName(`PROFILE_PICTURE`, dbConnection);

      return (
        await dbConnection.query(
          `SELECT photo_id, user_id, description, url, gallery_name, photo_type_id FROM photo
          JOIN organization USING (user_id)
          WHERE user_id = ? AND photo_type_id = ?`,
          [parent.user_id, photo_type_id],
        )
      )[0];
    },
    async photo_gallery(parent, _, { dbConnection }) {

      return await dbConnection.query(
        `SELECT photo_id, user_id, description, url, gallery_name, photo_type_id FROM photo
        JOIN user USING (user_id)
        WHERE user_id = ? AND gallery_name="DEFAULT"`,
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
    },
    async trainers(parent, _, { dbConnection }) {
      return await dbConnection.query(
        `select user_id, firstname, lastname, facebook, instagram, description
        from trainer
        join organization_trainer on organization_trainer.trainer_id = trainer.user_id
        where organization_trainer.organization_id = ?`,
        [parent.user_id],
      );
    },
    async places(parent, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT place_id, user_id, city, street, zip, country FROM place
          JOIN user USING (user_id)
          WHERE user_id = ?`,
        [parent.user_id],
      );
    },
    async acceptedBenefits(parent, _, { dbConnection }) {
      return await dbConnection.query(
        `SELECT benefit_id, name FROM benefit
          JOIN benefit_user USING (benefit_id)
          JOIN organization USING (user_id)
          WHERE user_id = ?`,
        [parent.user_id],
      );
    },
  },
  Action: {
    async photo(parent, _, { dbConnection }) {
      const photo_type_id = await getTypeIdByName(`ACTION`, dbConnection);
      return (
        await dbConnection.query(
          `SELECT photo_id, user_id, description, url, gallery_name, photo_type_id FROM photo
          JOIN action USING (photo_id)
          WHERE photo_id = ? AND photo_type_id= ?`,
          [parent.photo_id, photo_type_id],
        )
      )[0];
    },
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
  },
  Trainer: {
    async profile_photo(parent, _, { dbConnection }) {
      return (await dbConnection.query(
          `SELECT photo_id, user_id, description, url, gallery_name, photo_type_id FROM photo
          JOIN user USING (user_id)
          WHERE user_id = ? AND photo_type_id=0`,
          [parent.user_id],
        )
      )[0];
    }
  }
};
