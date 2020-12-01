import React, { useState, useEffect, useMemo } from 'react';

import { Col, Row, Container } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

import {
  CustomDatePicker,
  Loading,
  DateFilter,
  SuccessAlert,
} from 'src/atoms/';
import {
  Footer,
  OrganizationMenu,
  ActionsList,
  ErrorBanner,
  TestimonialBoxCol,
  ActionCard,
} from 'src/molecules/';
import {
  Navigation,
  OrganizationProfileManagementCol,
  OrganizationProfileForm,
  OrganizationProfileTrainers,
  OrganizationProfileGallery,
} from 'src/organisms/';

export function TrainerProfileTemplate() {

  return (
    <>
      <Navigation />
        <div className="headerImg">
          <OrganizationMenu />
        </div>

        <Container className="organization-profile-top-margin">
          <Col>
            <h1>Kalendář volných hodin</h1>
            <Row>

            </Row>

            <Container className="organization-profile-section-container">
              <h1 id="treneri">Trenéři</h1>

            </Container>

            <Container className="organization-profile-section-container">
              <h1 id="hodnoceni">Hodnocení</h1>
            </Container>

            <Row className="justify-content-md-center">
              <Col sm="12" md="3">

              </Col>
              <Col sm="12" md="7">
                <Container>

                </Container>
              </Col>
            </Row>
          </Col>
        </Container>
      <Footer />
    </>
  );
}
