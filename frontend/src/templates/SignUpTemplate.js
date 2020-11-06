import React from 'react';

import { SignUpForm, TopNavigation} from 'src/organisms/';
import { Row, Col, Container } from 'react-bootstrap';


export function SignUpTemplate({ isLoading, error, onSubmit }) {
  return (
    <>
    <TopNavigation />
    <Container>
      <Row className="justify-content-md-center">
        <h1>Registrace</h1>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <SignUpForm
            isLoading={isLoading}
            errorMessage={error && error.message}
            onSubmit={onSubmit}
            className="form-group"
          >
          </SignUpForm>
        </Col>
      </Row>
    </Container>
    </>
  );
}
