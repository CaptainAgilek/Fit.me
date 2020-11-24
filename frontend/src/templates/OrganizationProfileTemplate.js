import React from 'react';
import { Navigation } from 'src/organisms/';
import { CustomDatePicker } from 'src/atoms/';
import { Footer, OrganizationMenu, ActionCard } from 'src/molecules/';
import { Col, Row, Container } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
export function OrganizationProfileTemplate({ actionsState, organizationState }) {
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

          </Row>
          <Row>
            <ListGroup horizontal className="horizontalScroll">
              {actionsState.data &&
                actionsState.data.actionsForPlace.map((action) => (
                  <ListGroup.Item key={action.action_id} className="borderNone" style={{paddingLeft:"0.1rem"}}>
                    <ActionCard
                      key={action.action_id}
                      img="/images/slide_1.jpg"
                      action={action}
                      editable={true}
                    />
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Row>
        </Col>
      </Container>
      <Footer />
    </>
  );
}
