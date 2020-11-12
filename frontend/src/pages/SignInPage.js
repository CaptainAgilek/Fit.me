import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useAuth } from 'src/utils/auth';
import { useHistory } from 'react-router-dom';

import { SignInTemplate } from 'src/templates/SignInTemplate';
import { route } from 'src/Routes';

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

export function SignInPage({onCloseMethod}) {
  const auth = useAuth();
  const history = useHistory();
  const userProfileLink = route.userProfile();

  const [signInRequest, signInRequestState] = useMutation(SIGNIN_MUTATION, {
    onCompleted: ({ signin: { user, token } }) => {
      auth.signin({ token, user });
      history.replace(userProfileLink);
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
      onClose={onCloseMethod}
    />
  );
}
