import React, { useState } from 'react';

import { SignUpForm, Navigation } from 'src/organisms/';
import { Row, Col, Container, Modal } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { SignInForm } from '../organisms';

export function SignUpTemplate({ isLoading, error, onSubmit }) {
  const [showSignUp, setSignUpVisible] = useState(false);

  const handleCloseSignUp = () => setSignUpVisible(false);
  const handleShowSignUp = () => setSignUpVisible(true);

  const [showSignIn, setSignInVisible] = useState(false);

  const handleCloseSignIn = () => setSignInVisible(false);
  const handleShowSignIn = () => setSignInVisible(true);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Fit.me</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Domov</Nav.Link>
          <Nav.Link href="#features">O aplikaci</Nav.Link>
        </Nav>
        <Nav>
          <Button variant="dark" href="/auth/signin">Přihlášení</Button>
          <Button variant="dark" onClick={handleShowSignUp}>
            Registrace
          </Button>
        </Nav>
      </Navbar>

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
                  onSubmit={onSubmit}
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
