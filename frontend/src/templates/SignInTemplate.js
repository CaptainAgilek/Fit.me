import React from 'react';

import { SignInForm, TopNavigation } from 'src/organisms/';
import { Row, Col, Container } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

export function SignInTemplate({ isLoading, error, onSubmit }) {
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

    <Container>
      <Row className="justify-content-md-center">
        <h1>Přihlášení</h1>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <SignInForm
            isLoading={isLoading}
            errorMessage={error && error.message}
            onSubmit={onSubmit}
            className="form-group"
          >
          </SignInForm>
        </Col>
      </Row>
    </Container>
    </>

  );
}
