import { gql } from 'apollo-server-express';
export const typeDefs = gql`
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

  input CreateOrUpdatePlaceInput {
    place_id: Int,
    user_id: Int!
    city: String!
    street: String
    zip: Int
    country: String!
  }

  input SportsmanInput {
    user_id: Int!
    firstname: String!
    lastname: String!
    username: String!
    email: String!
    phone: String
    place: CreateOrUpdatePlaceInput
    hasMultisport: Boolean!
    hasActivePass: Boolean!
  }

  input UpdatePhotoUrlInput {
      photo_id: Int
      user_id: Int!
      url: String!
      is_profile_picture: Boolean!
  }

  input PhotoInput {
    user_id: Int!
    description: String
    url: String!
    gallery_name: String
    is_profile_picture: Boolean!
  }

  type Action {
    action_id: Int!
    place_id: Int!
    date: String!
    time: String!
    price: Float!
    trainer_id: Int
    max_capacity: Int!
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
    country: String!
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
    actionsForPlace(place_id: Int!): [Action]!
    benefitsForUser(user_id: Int!): [Benefit]!
    users: [User]!
    user(email: String!): User
    userById(user_id: String!): User
    todo: String!
    rolesForUser(user_id: Int!): [Role]!
    roles: [Role]!
    role(name: String!): Role!
    sportsmen: [Sportsman]!
    sportsman(filter: SportsmanFilter!): Sportsman
  }

  type AuthInfo {
    user: User!
    token: String!
  }

  input SportsmanFilter {
    id: Int
    username: String
  }

  type Mutation {
    insertOrRemoveBenefit(user_id: Int!, benefit_id: Int!, hasBenefit: Boolean!): Boolean!
    createOrUpdatePlace(input: CreateOrUpdatePlaceInput!): Boolean!
    insertPlace(input: CreateOrUpdatePlaceInput!): Boolean!
    updatePlace(input: CreateOrUpdatePlaceInput!): Boolean!
    updateProfilePhotoUrl(input: UpdatePhotoUrlInput!): Boolean!
    updatePhotoUrl(input: UpdatePhotoUrlInput!): Boolean!
    insertPhoto(input: PhotoInput!): Boolean!
    singleUploadOrganizationPhoto(file: Upload!, user_id: Int!, photo_id: Int, is_profile_picture: Boolean!): UploadedFileResponse!
    singleUpload(file: Upload!, user_id: Int!, photo_id: Int, is_profile_picture: Boolean!): UploadedFileResponse!
    updateSportsman(input: SportsmanInput!): Boolean!
    updateUserEmail(email: String!, user_id: Int!): Boolean!
    deleteUser(user_id: Int!): Boolean!
    assignRoleToUser(name: String!, user_id: Int!): Boolean!
    verifyRegistration(token: String!): Boolean!
    changePassword(email: String!, oldPassword: String!, newPassword: String! newPasswordAgain: String!): Boolean!
    signin(email: String!, password: String!): AuthInfo!
    signup(
      username: String
      name: String
      street: String
      city: String
      zipCode: String
      country: String
      email: String!
      password: String!
      firstname: String
      lastname: String
      type: UserType!
    ): AuthInfo!
  }
`;
