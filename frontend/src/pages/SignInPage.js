import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useAuth } from 'src/utils/auth';
import { useHistory } from 'react-router-dom';

import { SignInTemplate } from 'src/templates/SignInTemplate';
import { route } from 'src/Routes';
import { Container, Modal } from 'react-bootstrap';

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

export function SignInPage({ onCloseMethod, showSignIn, setShowSignUp, setShowForgotten }) {

  const showSignUp = () => {
    onCloseMethod(false);
    setShowSignUp(true);
  };

  const showForgotten = () => {
    onCloseMethod(false);
    setShowForgotten(true);
  };

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
    <Container>
      <Modal show={showSignIn} onHide={onCloseMethod}>
        <Modal.Body>
          <SignInTemplate
            isLoading={signInRequestState.loading}
            error={signInRequestState.error}
            onSubmit={handleSignInFormSubmit}
            showSignUp={showSignUp}
            showForgotten={showForgotten}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}
