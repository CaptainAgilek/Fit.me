import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useAuth } from 'src/utils/auth';
import { useHistory } from 'react-router-dom';

import { SignUpTemplate } from 'src/templates/SignUpTemplate';

export const RolesEnum = {
    SPORTSMAN: "Sportsman",
    TRAINER: "Trainer",
    ORGANIZATION: "Organization"
}

const SIGNUP_MUTATION = gql`
  mutation signUp(
    $email: String!
    $password: String!
    $firstname: String!
    $lastname: String!
    $type: SPORTSMAN
  ) {
    signup(
      email: $email
      password: $password
      firstname: $firstname
      lastname: $lastname
      type: $role
    ) {
      user {
        id
        firstname
        lastname
        type
      }
      token
    } 
  }
`;

export function SignUpPage() {
  const auth = useAuth();
  const history = useHistory();
  const [signupRequest, signupRequestState] = useMutation(SIGNUP_MUTATION, {
    onCompleted: ({ signup: { user, token } }) => {
      auth.signin({ token, user });
      history.replace('/');
    },
    onError: () => {},
  });

  const handleSignUpFormSubmit = useCallback(
    (variables) => {
      signupRequest({ variables });
    },
    [signupRequest],
  );

  return (
    <SignUpTemplate
      isLoading={signupRequestState.loading}
      error={signupRequestState.error}
      onSubmit={handleSignUpFormSubmit}
    />
  );
}
