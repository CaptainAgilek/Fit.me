import React from 'react';

import Spinner from 'react-bootstrap/Spinner'
import { Row, Col } from 'react-bootstrap';

export function Loading() {
  return (
    <Row className="justify-content-md-center">
      <Col sm="1" className="justify-content-md-center" >
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Col>
    </Row>
  );
}
