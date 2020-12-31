import React from "react";

import { Row, Col, Image } from "react-bootstrap";

export function OrganizationDetailInfoLine({ image, text }) {
  return (
    <Row className="organization-detail-info-line">
      <Col xl={2} lg={2} md={2} sm={2} xs={2}>
        <Image src={image} fluid style={{maxHeight:"2rem"}}></Image>
      </Col>
      <Col xs={10}>{text}</Col>
    </Row>
  );
}
