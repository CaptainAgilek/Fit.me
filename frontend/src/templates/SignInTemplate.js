import React from 'react';

import { SignInForm, Navigation } from 'src/organisms/';
import { Row, Col, Container } from 'react-bootstrap';

export function SignInTemplate({ isLoading, error, onSubmit }) {
  return (
    <>
    <Navigation />
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
