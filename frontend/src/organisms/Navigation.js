import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

export function Navigation() {

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand href="/">Fit.me</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
       <Nav.Link href="/">Domov</Nav.Link>
       <Nav.Link href="/about">O aplikaci</Nav.Link>
     </Nav>
     <Nav>
        <Button variant="light" href="/auth/signin">Přihlášení</Button>
        <Button variant="light" href="/auth/signup">Registrace</Button>
    </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
