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
  TrainerProfileManagementCol,
  TrainerProfileForm,
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

export function TrainerProfileTemplate({
  trainerData,
  updateTrainerRequest,
  changePasswordRequest,
}) {
  return (
    <>
      <Navigation />
      <div className="headerImg">
        <TrainerMenu />
      </div>

      {trainerData && (
        <>
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

              {trainerData && (
                <Container className="organization-profile-section-container">
                  <h1 id="hodnoceni">Hodnocení</h1>
                  <TestimonialBoxCol ratingsData={trainerData} />
                </Container>
              )}

              <Row className="justify-content-md-center">
                <Col sm="12" md="3">
                  <TrainerProfileManagementCol
                    trainer={trainerData.trainer}
                    changePasswordRequest={changePasswordRequest}
                  />
                </Col>
                <Col sm="12" md="7">
                  <Container>
                    <TrainerProfileForm
                      trainer={trainerData.trainer}
                      updateTrainerRequest={updateTrainerRequest}
                    />
                  </Container>
                </Col>
              </Row>
            </Col>
          </Container>
        </>
      )}
      <Footer />
    </>
  );
}
