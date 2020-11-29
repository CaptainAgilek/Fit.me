import React from 'react';
import { TestimonialBoxGrid } from 'src/molecules/';
import { Col, Row } from 'react-bootstrap';

export function TestimonialBoxCol() {
  return (
    <Col className="justify-content-center mt-5">
        <TestimonialBoxGrid />
    </Col>
  );
}
