import React from "react";

import { Row, Col, Image } from "react-bootstrap";

export function OrganizationDetailInfoLine({ image, text }) {
  return (
    <Row className="organization-detail-info-line">
      <Col xl={1} lg={2} md={2} sm={1} xs={2}>
        <Image src={image} fluid></Image>
      </Col>

      {text}
    </Row>
  );
}
