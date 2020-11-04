import React from 'react';

import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { UserProfileActionButton } from 'src/atoms/';

export function ErrorBanner( { title, message, onClick } ) {
  return (
    <Row className="justify-content-md-center">
      <Col sm="6" className="justify-content-md-center" >
        <Alert variant="danger">
          <Alert.Heading>{title}</Alert.Heading>
          <p>
            {message}
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <UserProfileActionButton onClick={onClick} variant="outline-danger">
              Try again
            </UserProfileActionButton>
          </div>
        </Alert>
      </Col>
    </Row>
  );
}
