import React, { useState, useRef } from 'react';

import {
  Navigation,
  OrganizationProfileGallery,
  OrganizationProfileTrainers,
} from 'src/organisms/';
import {
  Footer,
  OrganizationMenu,
  GalleryUploadPhotoButton,
  TrainersPopUp,
  ActionCard,
  TestimonialBoxCol,
  RemovePopUp,
} from 'src/molecules/';
import { Col, Row, Container, ListGroup, InputGroup } from 'react-bootstrap';

export function OrganizationProfileTemplate({
  actionsState,
  organizationState,
  user,
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
            <ListGroup horizontal className="horizontalScroll">
              {organizationState.data &&
                actionsState.data &&
                actionsState.data.actionsForPlace.map((action) => (
                  <ListGroup.Item
                    key={action.action_id}
                    className="borderNone"
                    style={{ paddingLeft: '0.1rem' }}
                  >
                    <ActionCard
                      key={action.action_id}
                      img={action.photo.url || '/images/add_img.png'}
                      action={action}
                      trainers={organizationState.data.organization.trainers}
                      user_id={organizationState.data.organization.user_id}
                      editable={true}
                    />
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Row>
        </Col>
      </Container>

      <Container className="organization-profile-section-container">
        <h1 id="treneri">Trenéři</h1>
        <OrganizationProfileTrainers
          organizationState={organizationState}
        ></OrganizationProfileTrainers>
      </Container>

      <Container className="organization-profile-section-container">
        <h1 id="galerie">Galerie</h1>
        <OrganizationProfileGallery
          user={user}
          photoGallery={
            organizationState.data &&
            organizationState.data.organization.photo_gallery
          }
          galleryFetcher={organizationState}
        />
      </Container>

      <Container className="organization-profile-section-container">
        <h1 id="hodnoceni">Hodnocení</h1>
        <TestimonialBoxCol />
      </Container>

      <Footer />
    </>
  );
}
