import React from "react";
import { Row, Col } from "react-bootstrap";

export function DelimiterRow() {
  return (
    <Row>
      <Col>
        <div className="line mt-5"></div>
      </Col>
      <Col className="px-0" style={{ maxWidth: "48px" }}>
        <img
          className="line-icon mt-4"
          src="images/icons/dumbbell.png"
          alt="dumbbell"
        />
      </Col>
      <Col>
        <div className="line mt-5"></div>
      </Col>
    </Row>
  );
}
