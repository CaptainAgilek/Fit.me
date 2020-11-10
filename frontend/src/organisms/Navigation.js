import React from 'react';

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { Link } from 'react-router-dom';
import { useAuth } from 'src/utils/auth';
import { useHistory } from 'react-router-dom';
import { route } from 'src/Routes';

export function Navigation() {
  const {user, signout } = useAuth();
  const history = useHistory();

  const homeLink = route.home();
  const profileLink = route.userProfile();
  const signInLink = route.signIn();
  const signUpLink = route.signUp();

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand as={Link} to={homeLink}>Fit.me</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/about">O aplikaci</Nav.Link>
     </Nav>
     {user ? (
       <Nav>
        <Nav.Link as={Link} to={profileLink}>Profil</Nav.Link>
        <Nav.Link onClick={() => {
            signout();
            history.push(route.home());
            window.location.reload();
          }}>Odhlásit se</Nav.Link>
       </Nav>
      ) : (
        <Nav>
          <Nav.Link as={Link} to={signInLink}>Přihlášení</Nav.Link>
          <Nav.Link as={Link} to={signUpLink}>Registrace</Nav.Link>
        </Nav>
      )
     }
      </Navbar.Collapse>
    </Navbar>
  );
}
