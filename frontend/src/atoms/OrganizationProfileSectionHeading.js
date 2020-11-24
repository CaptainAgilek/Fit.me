import React from 'react';
import { Col, Row } from 'react-bootstrap';

export function OrganizationProfileSectionHeading({ children }) {
  return (
    <Row className="organization-profile-heading">
      <Col>
        <h1>{children}</h1>
      </Col>
    </Row>
  );
}
