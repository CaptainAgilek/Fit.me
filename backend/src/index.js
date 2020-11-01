import dotenv from 'dotenv-flow';
import express from 'express';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';

import { getConnection } from './libs/connection';

import rootResolver from './modules/rootResolver';

dotenv.config();

const typeDefs = gql`
  enum UserType {
    SPORTSMAN
    ORGANIZATION
    TRAINER
  }

  type Role {
    role_id: Int!
    name: String!
  }

  type User {
    user_id: Int!
    email: String!
    is_verified: Boolean!
    roles: [Role]!
  }

  type Sportsman {
    user_id: Int!
    firstname: String!
    lastname: String!
    username: String!
  }

  type Query {
    users: [User]!
    user(email: String!): User
    todo: String!
    roles: [Role]!
    role(name: String!): Role!
    sportsmen: [Sportsman]!
    sportsman(user_id: Int!): Sportsman!
  }

  type AuthInfo {
    token: String!
  }

  type Mutation {
    assignRoleToUser(name: String!, user_id: Int!): Boolean!
    verifyRegistration(token: String!): Boolean!
    signin(email: String!, password: String!): AuthInfo!
    signup(email: String!, password: String!, firstname: String, lastname: String, type: UserType!): AuthInfo!
  }
`;

const main = async () => {
  const app = express();

  app.disable('x-powered-by');
  app.use(cors());

  let dbConnection = null;

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: rootResolver,
    context: async ({ req, res }) => {
      if (!dbConnection) {
        dbConnection = await getConnection();
      }
      const auth = req.headers.Authorization || '';

      return {
        req,
        res,
        dbConnection,
        auth,
      };
    },
    playground: true,
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const port = process.env.PORT || 4000;

  app.get('/', (_, res) => res.redirect('/graphql'));

  app.listen(port, () => {
    console.info(`Server started at http://localhost:${port}/graphql`);
  });
};

main();
