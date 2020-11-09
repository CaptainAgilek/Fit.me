import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import { NavLink } from 'src/atoms/';

import { useAuth } from 'src/utils/auth';
import { useHistory } from 'react-router-dom';
import { route } from 'src/Routes';

export function Navigation() {
  const {user, signout } = useAuth();
  const history = useHistory();

  const profileLink = route.userProfile();

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand href="/">Fit.me</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
       <Nav.Link href="/">Domov</Nav.Link>
       <Nav.Link href="/about">O aplikaci</Nav.Link>
     </Nav>
     {user ? (
       <Nav>
         <Button variant="light">
           <NavLink exact to={profileLink}>
            Profil
          </NavLink>
        </Button>

        {/*<Button variant="light">
          <NavLink onClick={() => {
              signout();
              history.push(route.home());
              window.location.reload();
            }}
          >
            Odhlásit se
          </NavLink>
        </Button>*/}
       </Nav>
      ) : (
        <Nav>
          <Button variant="light" href="/auth/signin">Přihlášení</Button>
          <Button variant="light" href="/auth/signup">Registrace</Button>
        </Nav>
      )
     }
      </Navbar.Collapse>
    </Navbar>
  );
}
