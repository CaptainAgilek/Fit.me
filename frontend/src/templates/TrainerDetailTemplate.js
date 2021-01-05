import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";

import { Footer, ErrorBanner } from "src/molecules/";
import { Loading, CustomAlert, HeaderImg } from "src/atoms/";
import {
  Navigation,
  ProfileServicesReadonly,
  OrganizationDetailRatings,
} from "src/organisms/";

export function TrainerDetailTemplate({
  state,
  error,
  actionSuccess,
  setActionSuccess,
  trainerFetcher,
  userFetcher,
  servicesState,
  mapProvider,
  actionsState,
  trainer,
}) {
  return (
    <>
      <Navigation />
      {state.showLoading && <Loading />}
      {error && !state.showLoading && <ErrorBanner message={error.message} />}
      <div id="alerts" className="fixed-top mt-1">
        {
          <CustomAlert
            headingText={actionSuccess.message}
            setActionSuccess={setActionSuccess}
            variant={actionSuccess.variant}
          />
        }
      </div>
      <>
        <HeaderImg
          img="/images/organization_header.jpg"
          className="organization-detail-header organization-profile-section-container"
        ></HeaderImg>

        <Container
          className="organization-profile-top-margin organization-profile-section-container"
          fluid
        >
          <Row className="d-flex justify-content-center organization-detail-slogan-first">
            Můžeme ti nabídnout
          </Row>
          <Row className="d-flex justify-content-center organization-detail-slogan-second">
            mnohem více než ostatní
          </Row>
        </Container>
      </>
      )}
      <Footer />
    </>
  );
}
