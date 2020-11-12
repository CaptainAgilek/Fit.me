import React, { useState } from 'react';

import { SignUpForm } from 'src/organisms/';
import { Row, Col, Container, Modal } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import { SignInForm } from '../organisms';

export function SignUpTemplate({ isLoading, error, onSubmit, onSubmitSignIn, onClose }) {
  const [showSignUp, setSignUpVisible] = useState(true);
  const handleCloseSignUp = () => {
    setSignUpVisible(false);
    onClose(false);
  };
  const handleShowSignUp = () => setSignUpVisible(true);

  const [showSignIn, setSignInVisible] = useState(false);
  const handleCloseSignIn = () => {
    setSignInVisible(false);
    onClose(false);
  };
  const handleShowSignIn = () => {
    setSignInVisible(true);
    onClose(true);
  };

  return (
    <>
      <Modal show={showSignUp} onHide={handleCloseSignUp}>
        <Modal.Body>
          <Container>
            <Row className="justify-content-md-center">
              <h1>Registrace</h1>
            </Row>
            <Row>
              <Col>
                <SignUpForm
                  isLoading={isLoading}
                  errorMessage={error && error.message}
                  onSubmit={onSubmit}
                  className="form-group"
                  handleClose={handleCloseSignUp}
                  handleShowSignIn={handleShowSignIn}
                >
                </SignUpForm>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>

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
                  onSubmit={onSubmitSignIn}
                  className="form-group"
                  handleClose={handleCloseSignIn}
                >
                </SignInForm>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}
