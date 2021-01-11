import React from "react";

import { Col, Row, Container } from "react-bootstrap";

import { Calendar, CustomAlert, HeaderImg } from "src/atoms/";
import {
  Footer,
  TrainerMenu,
  TestimonialBoxCol,
  CalendarLegendRow,
} from "src/molecules/";
import {
  Navigation,
  TrainerProfileManagementCol,
  TrainerProfileForm,
  ProfileServices,
} from "src/organisms/";

const events = [
  {
    title: "Cvičení s čínkou",
    start: new Date("January 14, 2021 11:30:00"),
    end: new Date("January 14, 2021 12:30:00"),
  },
  {
    title: "Cvičení na záda",
    start: new Date("January 13, 2021 15:30:00"),
    end: new Date("January 13, 2021 16:30:00"),
  },
  {
    title: "",
    start: new Date("January 15, 2021 12:45:00"),
    end: new Date("January 15, 2021 13:30:00"),
    backgroundColor: "#63d14ccc",
  },
  {
    title: "",
    start: new Date("January 15, 2021 14:00:00"),
    end: new Date("January 15, 2021 15:00:00"),
    backgroundColor: "#63d14ccc",
  },
  {
    title: "",
    start: new Date("January 16, 2021 14:00:00"),
    end: new Date("January 16, 2021 15:00:00"),
    backgroundColor: "#63d14ccc",
  },
];
const freeHours = [{ date: "2021-01-01" }, { date: "2021-01-03" }];

export function TrainerProfileTemplate({
  trainerData,
  servicesState,
  updateTrainerRequest,
  changePasswordRequest,
  actionSuccess,
  setActionSuccess,
  error,
}) {
  return (
    <>
      <Navigation />
      <HeaderImg img="/images/organization_header.jpg">
        <TrainerMenu />
      </HeaderImg>

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
                  <h1 id="hodnoceni">Hodnocení</h1>
                </Row>
                <TestimonialBoxCol ratingsData={trainerData.trainer.ratings} />
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
