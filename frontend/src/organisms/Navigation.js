import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { SignInPage } from '../pages/SignInPage';
import { SignUpPage } from '../pages/SignUpPage';
import { ForgottenPasswordPage } from '../pages/ForgottenPasswordPage';

export function Navigation() {

  const [showSignUp, setSignUpVisible] = useState(false);
  const [showSignIn, setSignInVisible] = useState(false);
  const [showForgotten, setForgottenVisible] = useState(false);


  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand href="/">Fit.me</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Domov</Nav.Link>
            <Nav.Link href="/about">O aplikaci</Nav.Link>
          </Nav>
          <Nav>
            <Button variant="light" onClick={() => setSignInVisible(true)}>PŘIHLÁŠENÍ</Button>
            {showSignIn ? <SignInPage onCloseMethod={setSignInVisible} showSignIn={showSignIn}
                                      setShowSignUp={setSignUpVisible} setShowForgotten={setForgottenVisible} /> : null}
            <Button variant="light" onClick={() => setSignUpVisible(true)}>REGISTRACE</Button>
            {showSignUp ? <SignUpPage onCloseMethod={setSignUpVisible} showSignUp={showSignUp}
                                      setShowSignIn={setSignInVisible} /> : null}
            {showForgotten ?
              <ForgottenPasswordPage onCloseMethod={setForgottenVisible} showForgotten={showForgotten} /> : null}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
