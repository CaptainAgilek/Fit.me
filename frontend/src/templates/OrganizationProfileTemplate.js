import React from 'react';
import { Navigation } from 'src/organisms/';
import { CustomDatePicker } from 'src/atoms/';
import { Footer, OrganizationMenu } from 'src/molecules/';
import { Col, Row, Container } from 'react-bootstrap';

export function OrganizationProfileTemplate() {
  return (
    <>
      <Navigation />
      <div className="headerImg">
        <OrganizationMenu />
      </div>
      <Container className="organization-profile-top-margin">
        <Col>
          <h1>Kalendář akcí</h1>
          <Row>
            <CustomDatePicker />
            až
            <CustomDatePicker />
          </Row>
        </Col>
      </Container>
      <Footer />
    </>
  );
}
