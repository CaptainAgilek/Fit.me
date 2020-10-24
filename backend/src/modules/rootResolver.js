import { mutations as UserMutations } from './user';
import { queries as UserQueries } from './user';

export default {
  Query: {
    ...UserQueries,
    todo: async () => {
      return new Date().toISOString();
    },
  },
  Mutation: {
    ...UserMutations,
  },
};
