import React, { useState, useEffect, useMemo } from 'react';

import { Col, Row, Container } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

import {
  CustomDatePicker,
  Loading,
  DateFilter,
  SuccessAlert,
  Calendar,
  CustomAlert
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
  { title: 'event 2 cviceni s cinkou', start: new Date(), end: new Date("December 10, 2020 12:30:00") },
  { title: '', start: new Date("December 13, 2020 12:45:00"), end: new Date("December 13, 2020 13:30:00"), backgroundColor: "#63d14ccc" },
  { title: '', start: new Date("December 13, 2020 14:00:00"), end: new Date("December 13, 2020 15:00:00"), backgroundColor: "#63d14ccc" }
];
const freeHours = [{ date: '2020-12-01' }, { date: '2020-12-03' }];

export function TrainerProfileTemplate({
  trainerData,
  updateTrainerRequest,
  changePasswordRequest,
  actionSuccess,
  setActionSuccess,
  error,
}) {
  return (
    <>
      <Navigation />
      <div className="headerImg">
        <TrainerMenu />
      </div>

      <div id="alerts" className="fixed-top mt-1">
        {
          <CustomAlert
            headingText={actionSuccess.message}
            setActionSuccess={setActionSuccess}
            variant={actionSuccess.variant}
          />
        }
      </div>

      {trainerData && (
        <>
          <Container className="organization-profile-top-margin">
            <Col>
              <Container className="organization-profile-section-container">
                <Row>
                  <h1 id="kalendar">Kalendář volných hodin</h1>
                </Row>
                <CalendarLegendRow />
                <Row>
                  <Calendar events={events} freeHours={freeHours} />
                </Row>
              </Container>
              <Container className="organization-profile-section-container">
                <Row>
                  <h1 id="popis">Popis</h1>
                </Row>
              </Container>


              <Container className="organization-profile-section-container">
                <Row>
                  <h1 id="hodnoceni">Hodnocení</h1>
                </Row>
                <TestimonialBoxCol ratingsData={trainerData} />
              </Container>


              <Row className="justify-content-md-center">
                <Col sm="12" md="3">
                  <TrainerProfileManagementCol
                    trainer={trainerData.trainer}
                    changePasswordRequest={changePasswordRequest}
                    setActionSuccess={setActionSuccess}
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
