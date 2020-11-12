import React, { useState } from 'react';

import { SignInForm, Navigation } from 'src/organisms/';
import { Row, Col, Container, Modal } from 'react-bootstrap';
import { ForgottenPasswordForm } from '../organisms/ForgottenPasswordForm';
import { SignUpForm } from './SignUpTemplate';

export function SignInTemplate({ isLoading, error, onSubmit, onSubmitForgotten, onClose }) {

  const [showSignIn, setSignInVisible] = useState(true);
  const handleCloseSignIn = () => {
    setSignInVisible(false);
    onClose(false);
  };
  const handleShowSignIn = () => setSignInVisible(true);

  const [showForgotten, setShowForgotten] = useState(false);
  const handleCloseForgotten = () => {
    setSignInVisible(false);
    onClose(false);
  };
  const handleShowForgotten = () => {
    setShowForgotten(true);
    onClose(true);
  };

  return (
    <>
      <Modal show={showSignIn} onHide={handleCloseSignIn}>
        <Modal.Body>
          <Container>
            <Row className="justify-content-md-center">
              <h1>Přihlášení</h1>
            </Row>
            <Row>
              <Col>
                <SignInForm
                  isLoading={isLoading}
                  onSubmit={onSubmit}
                  className="form-group"
                  handleClose={handleCloseSignIn}
                  handleShowForgotten={handleShowForgotten}
                >
                </SignInForm>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>

      <Modal show={showForgotten} onHide={handleCloseForgotten}>
        <Modal.Body>
          <Container>
            <Row className="justify-content-md-center">
              <h1>Zapomenuté heslo</h1>
            </Row>
            <Row>
              <Col>
                <ForgottenPasswordForm
                  isLoading={isLoading}
                  onSubmit={onSubmitForgotten}
                  className="form-group"
                  handleClose={handleCloseForgotten}
                >
                </ForgottenPasswordForm>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}
