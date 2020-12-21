import React from "react";
import { Container, Col, Row } from "react-bootstrap";

export function Footer() {
  return (
    <div className="footer">
      <Container>
        <Row className="pt-5">
          <Col>
            <img
              className="img-fluid"
              src="/images/fitmeLogo.png"
              alt="Fit.Me logo"
            />
          </Col>
          <Col>
            <Row>
              <div className="ml-auto text-right">
                <img
                  className="social-icon"
                  src="/images/facebookLogo.svg"
                  alt="facebook logo"
                />
                <img
                  className="social-icon"
                  src="/images/twitterLogo.svg"
                  alt="twitter logo"
                />
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
