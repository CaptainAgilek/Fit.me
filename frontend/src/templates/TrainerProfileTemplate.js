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
  ProfileServices
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
  servicesState,
  updateTrainerRequest,
  changePasswordRequest,
  actionSuccess,
  setActionSuccess,
  error,
}) {
  console.log("trainerData: ", trainerData)
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
              <Row className="organization-profile-section-container">
                <Col sm="12" md="11">
                  <h1 id="sluzby">Služby</h1>
                  <ProfileServices
                    user_id={trainerData.trainer.user_id}
                    servicesState={servicesState}
                  />
                </Col>
              </Row>
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
