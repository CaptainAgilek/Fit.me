import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

export function HomePage() {
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
         <Button variant="dark" href="/auth/signup">Registrace</Button>
     </Nav>
     </Navbar>

    <div className="appWrapper">
      <h1>Home Page</h1>
      <p>TBD</p>
    </div>
    </>
  );
}
