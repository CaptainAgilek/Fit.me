import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useAuth } from 'src/utils/auth';
import { useHistory } from 'react-router-dom';

import { SignUpTemplate } from 'src/templates/SignUpTemplate';

const SIGNUP_MUTATION = gql`
  mutation signUp(
    $email: String!
    $password: String!
    $firstname: String!
    $lastname: String!
    $type: UserType!
  ) {
    signup(
      email: $email
      password: $password
      firstname: $firstname
      lastname: $lastname
      type: $type
    ) {
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
    onError: (error) => {
      console.log(error);
    },
  });


  const handleSignUpFormSubmit = useCallback(
    (variables) => {
      signupRequest({
        variables: {
          email: variables.email,
          password: variables.password,
          firstname: variables.firstName,
          lastname: variables.lastname,
          type: variables.type
        },
      });
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
