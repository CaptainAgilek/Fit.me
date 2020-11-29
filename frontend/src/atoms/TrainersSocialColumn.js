import React from 'react';
import { Col, Image } from 'react-bootstrap';

export function TrainersSocialColumn({ socialIconUrl, children }) {
  return (
    <>
      <Col md={2} sm={3} xs={3} lg={1}>
        <Image
          src={socialIconUrl}
          fluid
          className="organization-profile-icon-svg"
        ></Image>
      </Col>
      <Col xs={9} md={10} sm={9} lg={11} className="d-flex align-items-center">
        {children}
      </Col>
    </>
  );
}
