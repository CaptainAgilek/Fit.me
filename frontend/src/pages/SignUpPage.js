import React, { useCallback, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import { SignUpTemplate } from 'src/templates/SignUpTemplate';
import { Container, Modal, Row } from 'react-bootstrap';

const SIGNUP_MUTATION = gql`
  mutation signUp(
    $username: String!
    $email: String!
    $password: String!
    $firstname: String!
    $lastname: String!
    $type: UserType!
  ) {
    signup(
      username: $username
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

export function SignUpPage({ onCloseMethod }) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    onCloseMethod(false);
  };

  const [signupRequest, signupRequestState] = useMutation(SIGNUP_MUTATION, {
    onCompleted: ({ signup: { user, token } }) => {
      setShow(true);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSignUpFormSubmit = useCallback(
    (variables) => {
      signupRequest({
        variables: {
          username: variables.username,
          email: variables.email,
          password: variables.password,
          firstname: variables.firstname,
          lastname: variables.lastname,
          type: variables.type,
        },
      });
    },
    [signupRequest],
  );


  if (show) {
    return (
      <Container>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <Row className="justify-content-md-center">
              <p>Na Váš email jsme poslali potvrzení registrace. Pro přihlášení do aplikace je potřeba již poslední
                krok, kterým je potvrzení správnosti vašeho emailového účtu tím, že kliknete na odkaz ve Vašem
                emailu.</p>
            </Row>
          </Modal.Body>
        </Modal>
      </Container>
    );
  } else {
    return (
      <SignUpTemplate
        isLoading={signupRequestState.loading}
        error={signupRequestState.error}
        onSubmit={handleSignUpFormSubmit}
        onClose={onCloseMethod}
      />);
  }
}
