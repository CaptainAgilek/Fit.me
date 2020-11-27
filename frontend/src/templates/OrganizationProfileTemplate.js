import React from 'react';
import { Navigation } from 'src/organisms/';
import { CustomDatePicker } from 'src/atoms/';
import { Footer, OrganizationMenu, ActionsList } from 'src/molecules/';
import { Col, Row, Container } from 'react-bootstrap';
export function OrganizationProfileTemplate({
  actionsState,
  organizationState,
}) {
  return (
    <>
      <Navigation />
      <div className="headerImg">
        <OrganizationMenu />
      </div>
      <Container className="organization-profile-top-margin">
        <Col>
          <h1>Kalendář akcí</h1>
          <Row></Row>
          <Row>
            <ActionsList
              organizationState={organizationState}
              actionsState={actionsState}
              editable={true}
            />
          </Row>
        </Col>
      </Container>
      <Footer />
    </>
  );
}
