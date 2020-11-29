import React, { useState, useEffect } from 'react';

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

export function OrganizationProfileTemplate({
  actionsState,
  organizationData,
  loading,
  error,
  updateOrganizationRequest,
  changePasswordRequest,
  profileFetcher,
}) {
  const [actions, setActions] = useState(
    (actionsState.data && actionsState.data.actionsForPlace) || [],
  );
  const [actionSuccess, setActionSuccess] = useState(false);
  useEffect(() => {
    console.log('effect ', actions);
  }, [actions]);
  return (
    <>
      <Navigation />

      {loading && <Loading />}
      {error && <ErrorBanner message={error.message} />}
      <div id="alerts" className="fixed-top mt-1">
        {
          <SuccessAlert
            headingText={actionSuccess}
            setActionSuccess={setActionSuccess}
          />
        }
      </div>

      {organizationData && actionsState.data && (
        <>
          <div className="headerImg">
            <OrganizationMenu />
          </div>

          <Container className="organization-profile-top-margin">
            <Col>
              <h1>Kalendář akcí</h1>
              <Row>
                <DateFilter
                  dataToFilter={actionsState.data.actionsForPlace}
                  setFilteredData={setActions}
                />
              </Row>
              <Row>
                <ActionsList
                  organizationData={organizationData}
                  organizationLoading={loading}
                  actions={actions}
                  actionsState={actionsState}
                  editable={true}
                  setActionSuccess={setActionSuccess}
                />
              </Row>
              {organizationData && (
                <Container className="organization-profile-section-container">
                  <h1 id="treneri">Trenéři</h1>
                  <OrganizationProfileTrainers
                    organizationState={profileFetcher}
                  ></OrganizationProfileTrainers>
                </Container>
              )}
              {organizationData && (
                <Container className="organization-profile-section-container">
                  <h1 id="galerie">Galerie</h1>
                  <OrganizationProfileGallery
                    photoGallery={organizationData.organization.photo_gallery}
                    profileFetcher={profileFetcher}
                  />
                </Container>
              )}
              {organizationData && (
                <Container className="organization-profile-section-container">
                  <h1 id="hodnoceni">Hodnocení</h1>
                  <TestimonialBoxCol />
                </Container>
              )}

              <Row className="justify-content-md-center">
                <Col sm="12" md="3">
                  <OrganizationProfileManagementCol
                    organization={organizationData.organization}
                    changePasswordRequest={changePasswordRequest}
                  />
                </Col>
                <Col sm="12" md="7">
                  <Container>
                    <h1>{organizationData.organization.organization_name}</h1>
                    <OrganizationProfileForm
                      organization={organizationData.organization}
                      updateOrganizationRequest={updateOrganizationRequest}
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
