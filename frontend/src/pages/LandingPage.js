import React from 'react';
import { TopNavigation } from 'src/organisms/';
import {
  LandingSlideshow,
  CategoryBoxCol,
  ReadMoreCol,
  Footer,
  DelimiterRow,
} from 'src/molecules/';
import { Row, Col, Container } from 'react-bootstrap';

export function LandingPage() {
  return (
    <>
      <TopNavigation />
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
