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

  type UploadedFileResponse {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }

  input SportsmanInput {
    user_id: Int!
    firstname: String!
    lastname: String!
    username: String!
    email: String
    phone: String
  }

  input PhotoInput {
    user_id: Int!
    description: String
    url: String!
    gallery_name: String
    is_profile_picture: Boolean!
  }

  type Photo {
    photo_id: Int!
    user_id: Int!
    description: String
    url: String!
    gallery_name: String
    is_profile_picture: Boolean!
  }

  type Benefit {
    benefit_id: Int!
    name: String!
  }

  type Place {
    place_id: Int!
    user_id: Int!
    city: String
    street: String
    zip: String
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
    username: String
    email: String
    phone: String
    user: User!
    places: [Place]!
    benefits: [Benefit]!
    profile_photo: Photo
  }

  type Query {
    users: [User]!
    user(email: String!): User
    todo: String!
    roles: [Role]!
    role(name: String!): Role!
    sportsmen: [Sportsman]!
    sportsman(filter: SportsmanFilter!): Sportsman
  }

  type AuthUser {
    user_id: Int!
    email: String!
    is_verified: Boolean!
  }

  type AuthInfo {
    user: AuthUser!
    token: String!
  }

  input SportsmanFilter {
    id: Int
    username: String
  }

  type Mutation {
    insertPhoto(input: PhotoInput!): Boolean!
    singleUpload(file: Upload!, user_id: Int!): UploadedFileResponse!
    updateSportsman(input: SportsmanInput!): Boolean!
    deleteUser(user_id: Int!): Boolean!
    assignRoleToUser(name: String!, user_id: Int!): Boolean!
    verifyRegistration(token: String!): Boolean!
    signin(email: String!, password: String!): AuthInfo!
    signup(
      email: String!
      password: String!
      firstname: String
      lastname: String
      type: UserType!
    ): AuthInfo!
  }
`;

const main = async () => {
  const app = express();

  app.disable('x-powered-by');
  app.use(cors());
  app.use(express.static('public'));
  app.use('/photos', express.static(__dirname + '/photos'));

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
