import React from 'react';

import { SignUpForm, TopNavigation } from 'src/organisms/';
import { route } from 'src/Routes';
import { Button, Row, Col, Container } from 'react-bootstrap';

export function SignUpTemplate({ isLoading, error, onSubmit }) {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <h1>Registrace</h1>
      </Row>
      <Row>
        {/*todo dodelat navigaci*/}
        {/*<TopNavigation />*/}

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
  );
}
