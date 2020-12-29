import React, { useCallback, useState } from "react";
import { gql, useMutation } from "@apollo/client";

import { Container, Modal, Row } from "react-bootstrap";
import { ForgottenPasswordTemplate } from "../templates/ForgottenPasswordTemplate";


const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword($email: String!) {
    resetPassword(email: $email)
  }
`;

export function ForgottenPasswordPage({ onCloseMethod, showForgotten }) {
  const [show, setShow] = useState(false);

  const [resetPasswordRequest] = useMutation(RESET_PASSWORD_MUTATION);

  const handleForgottenFormSubmit = useCallback(
    (variables) => {
      setShow(true);
      resetPasswordRequest({ variables: { email: variables.email } });
    },
    [resetPasswordRequest]
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
