import React, { useCallback, useState } from "react";
import { gql, useMutation } from "@apollo/client";

import { Container, Modal, Row } from "react-bootstrap";
import { SignUpTemplate } from "../organisms";

const SIGNUP_MUTATION = gql`
  mutation signUp(
    $username: String
    $name: String
    $street: String
    $city: String
    $zipCode: String
    $country: String
    $email: String!
    $password: String!
    $firstname: String
    $lastname: String
    $type: UserType!
  ) {
    signup(
      username: $username
      name: $name
      street: $street
      city: $city
      zipCode: $zipCode
      country: $country
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

export function SignUpPage({ onCloseMethod, showSignUp, setShowSignIn }) {
  const [show, setShow] = useState(false);

  const showSignIn = () => {
    onCloseMethod(false);
    setShowSignIn(true);
  };

  const [signupRequest, signupRequestState] = useMutation(SIGNUP_MUTATION, {
    onCompleted: () => {
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
          name: variables.name,
          street: variables.street,
          city: variables.city,
          zipCode: variables.zipCode,
          country: variables.country,
          email: variables.email,
          password: variables.password,
          firstname: variables.firstname,
          lastname: variables.lastname,
          type: variables.type,
        },
      });
    },
    [signupRequest]
  );

  if (show) {
    return (
      <Container>
        <Modal show={show} onHide={onCloseMethod}>
          <Modal.Body>
            <Row className="justify-content-md-center">
              <p>
                Na Váš email jsme poslali potvrzení registrace. Pro přihlášení
                do aplikace je potřeba již poslední krok, kterým je potvrzení
                správnosti vašeho emailového účtu tím, že kliknete na odkaz ve
                Vašem emailu.
              </p>
            </Row>
          </Modal.Body>
        </Modal>
      </Container>
    );
  } else {
    return (
      <Container>
        <Modal show={showSignUp} onHide={onCloseMethod}>
          <Modal.Body>
            <SignUpTemplate
              isLoading={signupRequestState.loading}
              error={signupRequestState.error}
              onSubmit={handleSignUpFormSubmit}
              showSignIn={showSignIn}
            />
          </Modal.Body>
        </Modal>
      </Container>
    );
  }
}
