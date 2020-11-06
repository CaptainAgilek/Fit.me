import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useAuth } from 'src/utils/auth';
import { useHistory } from 'react-router-dom';

import { SignInTemplate } from 'src/templates/SignInTemplate';

const SIGNIN_MUTATION = gql`
  mutation signIn(
    $email: String!
    $password: String!
  ) {
    signin(
      email: $email
      password: $password
    ) {
      user {
        user_id
        email
        is_verified
        roles {
          name
        }

      }
      token
    }
  }
`;

export function SignInPage() {
  const auth = useAuth();
  const history = useHistory();
  const [signInRequest, signInRequestState] = useMutation(SIGNIN_MUTATION, {
    onCompleted: ({ signin: { token } }) => {
      auth.signin(token);
      history.replace('/');
    },
    onError: (error) => {
      console.log(error);
    },
  });


  const handleSignInFormSubmit = useCallback(
    (variables) => {
      signInRequest({
        variables: {
          email: variables.email,
          password: variables.password,
        },
      });
    },
    [signInRequest],
  );

  return (
    <SignInTemplate
      isLoading={signInRequestState.loading}
      error={signInRequestState.error}
      onSubmit={handleSignInFormSubmit}
    />
  );
}
