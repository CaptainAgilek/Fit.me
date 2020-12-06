import React, { useCallback } from "react";
import { gql, useMutation } from "@apollo/client";
import { useAuth } from "src/utils/auth";
import { useHistory } from "react-router-dom";

import { SignInTemplate } from "src/templates/SignInTemplate";
import { route } from "src/Routes";
import { Container, Modal } from "react-bootstrap";

const SIGNIN_MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
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

export function SignInPage({
  onCloseMethod,
  showSignIn,
  setShowSignUp,
  setShowForgotten,
}) {
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
  const homePageLink = route.home();
  const trainerProfile = route.trainerProfiler();
  const orgProfile = route.organizationProfile();

  const [signInRequest, signInRequestState] = useMutation(SIGNIN_MUTATION, {
    onCompleted: ({ signin: { user, token } }) => {
      console.log(user.roles);

      //auth.signin({ token, user });
      //history.replace(trainerProfile);

      if (user.roles.some(x => x.name === "ROLE_ORGANIZATION")) {
        console.log('som org');
        auth.signin({ token, user });
        history.replace(orgProfile);
      } else if (user.roles.some(x => x.name === "ROLE_TRAINER")) {
        console.log('som trener');
        auth.signin({ token, user });
        history.replace(trainerProfile);
      } else {
        console.log('som sportsman');
        auth.signin({ token, user });
        history.replace(homePageLink);
      }
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
    [signInRequest]
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
