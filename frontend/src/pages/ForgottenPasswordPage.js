import React, { useCallback, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import { Container, Modal, Row } from 'react-bootstrap';
import { ForgottenPasswordTemplate } from '../templates/ForgottenPasswordTemplate';

// const SIGNUP_MUTATION = gql`
//   mutation signUp(
//     $username: String!
//     $email: String!
//     $password: String!
//     $firstname: String!
//     $lastname: String!
//     $type: UserType!
//   ) {
//     signup(
//       username: $username
//       email: $email
//       password: $password
//       firstname: $firstname
//       lastname: $lastname
//       type: $type
//     ) {
//       token
//     }
//   }
// `;

export function ForgottenPasswordPage({ onCloseMethod, showForgotten }) {
  const [show, setShow] = useState(false);

  // const [signupRequest, signupRequestState] = useMutation(SIGNUP_MUTATION, {
  //   onCompleted: ({ signup: { user, token } }) => {
  //     setShow(true);
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });
  //
  const handleForgottenFormSubmit = useCallback(
    (variables) => {
      setShow(true);
      // signupRequest({
      //   variables: {
      //     username: variables.username,
      //     email: variables.email,
      //     password: variables.password,
      //     firstname: variables.firstname,
      //     lastname: variables.lastname,
      //     type: variables.type,
      //   },
      // });
    }, [null],
    // [signupRequest],
  );


  if (show) {
    return (
      <Container>
        <Modal show={show} onHide={onCloseMethod}>
          <Modal.Body>
            <Row className="justify-content-md-center">
              <p>Na Váš email jsme poslali odkaz na obnovu hesla.</p>
            </Row>
          </Modal.Body>
        </Modal>
      </Container>
    );
  } else {
    return (
      <Container>
        <Modal show={showForgotten} onHide={onCloseMethod}>
          <Modal.Body>
            <ForgottenPasswordTemplate
              // isLoading={signupRequestState.loading}
              // error={signupRequestState.error}
              onSubmit={handleForgottenFormSubmit}
              onClose={onCloseMethod}
            />
          </Modal.Body>
        </Modal>
      </Container>
    );
  }
}
