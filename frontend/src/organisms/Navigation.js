import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { SignInPage } from '../pages/SignInPage';
import { SignUpPage } from '../pages/SignUpPage';
import { ForgottenPasswordPage } from '../pages/ForgottenPasswordPage';

import { Link } from 'react-router-dom';
import { useAuth } from 'src/utils/auth';
import { useHistory } from 'react-router-dom';
import { route } from 'src/Routes';

export function Navigation() {
  const { user, signout } = useAuth();
  const history = useHistory();

  const homeLink = route.home();

  const [showSignUp, setSignUpVisible] = useState(false);
  const [showSignIn, setSignInVisible] = useState(false);
  const [showForgotten, setForgottenVisible] = useState(false);


  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="navbar">
        <Navbar.Brand as={Link} to={homeLink}>
          <img
            width="65%"
            height="auto"
            alt="Fit.Me logo"
            src="/images/fitmeLogo.png"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/about">O aplikaci</Nav.Link>
          </Nav>
          {user ? (
            <Nav>

              <Nav.Link
                as={Link}
                to={user.roles.some(role => role.name === "ROLE_SPORTSMAN") ? route.userProfile() : route.organizationProfile()}
                className="navbar-item-right-offset"
              >
                Profil
              </Nav.Link>
              <Button
                variant="outline-warning"
                onClick={() => {
                  signout();
                  history.push(route.home());
                  window.location.reload();
                }}
              >
                Odhlásit se
              </Button>
            </Nav>
          ) : (
            <Nav>
              <Button
                variant="outline-success"
                onClick={() => setSignInVisible(true)}
                className="navbar-item-right-offset"
              >
                PŘIHLÁŠENÍ
              </Button>
              {showSignIn ? <SignInPage onCloseMethod={setSignInVisible} showSignIn={showSignIn}
                                        setShowSignUp={setSignUpVisible}
                                        setShowForgotten={setForgottenVisible} /> : null}
              <Button variant="success" onClick={() => setSignUpVisible(true)}>REGISTRACE</Button>
              {showSignUp ? <SignUpPage onCloseMethod={setSignUpVisible} showSignUp={showSignUp}
                                        setShowSignIn={setSignInVisible} /> : null}
              {showForgotten ?
                <ForgottenPasswordPage onCloseMethod={setForgottenVisible} showForgotten={showForgotten} /> : null}
            </Nav>
          )
          }
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
