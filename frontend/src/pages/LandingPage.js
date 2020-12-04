import React from "react";
import { Navigation } from "src/organisms/";
import {
  LandingSlideshow,
  CategoryBoxCol,
  ReadMoreCol,
  Footer,
  DelimiterRow,
} from "src/molecules/";
import { Row, Col, Container } from "react-bootstrap";

export function LandingPage() {
  return (
    <>
      <Navigation />
      <LandingSlideshow />
      <Container>
        <Row className="mt-5">
          <ReadMoreCol />
        </Row>
        <DelimiterRow />
        <Row>
          <CategoryBoxCol />
        </Row>
      </Container>
      <Footer />
    </>
  );
}
