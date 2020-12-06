import React, { useState, useEffect, useMemo } from 'react';

import { Col, Row, Container } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

import {
  CustomDatePicker,
  Loading,
  DateFilter,
  SuccessAlert,
  Calendar,
} from 'src/atoms/';
import {
  Footer,
  TrainerMenu,
  ActionsList,
  ErrorBanner,
  TestimonialBoxCol,
  ActionCard,
  CalendarLegendRow,
} from 'src/molecules/';
import {
  Navigation,
  OrganizationProfileManagementCol,
  OrganizationProfileForm,
  OrganizationProfileTrainers,
  OrganizationProfileGallery,
} from 'src/organisms/';

const events = [
  {
    title: 'Cvičení s činkama',
    date: '2020-12-05',
  },
  { title: 'event 2', date: '2020-12-06' },
];
const freeHours = [{ date: '2020-12-01' }, { date: '2020-12-03' }];
export function TrainerProfileTemplate() {
  return (
    <>
      <Navigation />
      <div className="headerImg">
        <TrainerMenu />
      </div>

      <Container className="organization-profile-top-margin">
        <Col>
          <h1 id="kalendar">Kalendář volných hodin</h1>
          <CalendarLegendRow />
          <Row>
            <Calendar events={events} freeHours={freeHours} />
          </Row>

          <Container className="organization-profile-section-container">
            <h1 id="popis">Popis</h1>
          </Container>

          <Container className="organization-profile-section-container">
            <h1 id="hodnoceni">Hodnocení</h1>
          </Container>

          <Row className="justify-content-md-center">
            <Col sm="12" md="3"></Col>
            <Col sm="12" md="7">
              <Container></Container>
            </Col>
          </Row>
        </Col>
      </Container>
      <Footer />
    </>
  );
}
