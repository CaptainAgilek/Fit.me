import React, { useState, useEffect, useMemo } from 'react';

import { Col, Row, Container } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

import { CustomDatePicker, Loading, DateFilter, CustomAlert } from 'src/atoms/';
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
  OrganizationProfileServices,
} from "src/organisms/";

function useActionsFilter(data) {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setDate(date.getDate() + 1);

  const weekAgoDate = new Date();
  weekAgoDate.setHours(0);
  weekAgoDate.setMinutes(0);
  weekAgoDate.setSeconds(0);
  weekAgoDate.setDate(weekAgoDate.getDate() - 7);

  const [dateFrom, setDateFrom] = useState(weekAgoDate);
  const [dateTo, setDateTo] = useState(date);
  const dataToFilter = (data && data.actionsForPlace) || [];

  const actions = useMemo(() => {
    return dataToFilter.filter(
      (item) =>
        new Date(parseInt(item.date, 10)) >= dateFrom &&
        new Date(parseInt(item.date, 10)) <= dateTo,
    );
  }, [dataToFilter, dateFrom, dateTo]);

  return {
    actions,
    dateFilterProps: { dateFrom, setDateFrom, dateTo, setDateTo },
  };
}

export function OrganizationProfileTemplate({
  actionsState,
  servicesState,
  organizationData,
  loading,
  error,
  updateOrganizationRequest,
  changePasswordRequest,
  profileFetcher,
  actionSuccess,
  setActionSuccess,
}) {
  const { actions, dateFilterProps } = useActionsFilter(actionsState.data);

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
          <CustomAlert
            headingText={actionSuccess.message}
            setActionSuccess={setActionSuccess}
            variant={actionSuccess.variant}
          />
        }
      </div>

      {organizationData && actionsState.data && servicesState.data && (
        <>
          <div className="headerImg organization-profile-section-container">
            <OrganizationMenu />
          </div>

          <Container className="organization-profile-top-margin organization-profile-section-container">
            <Row className="justify-content-md-center organization-profile-section-container">
              <Col sm="12" md="11">
                <h1>Kalendář akcí</h1>

                <DateFilter {...dateFilterProps} />
              </Col>
            </Row>
            <Row className="justify-content-md-center organization-profile-section-container">
              <ActionsList
                organizationData={organizationData}
                organizationLoading={loading}
                actions={actions}
                actionsState={actionsState}
                editable={true}
                setActionSuccess={setActionSuccess}
              />
            </Row>

            <Row className="justify-content-md-center organization-profile-section-container">
              <Col sm="12" md="11">
                <h1 id="treneri">Trenéři</h1>
                <OrganizationProfileTrainers
                  organizationState={profileFetcher}
                ></OrganizationProfileTrainers>
              </Col>
            </Row>

            <Row className="justify-content-md-center organization-profile-section-container">
              <Col sm="12" md="11">
                <h1 id="galerie">Galerie</h1>
                <OrganizationProfileGallery
                  photoGallery={organizationData.organization.photo_gallery}
                  profileFetcher={profileFetcher}
                />
              </Col>
            </Row>

            <Row className="justify-content-md-center organization-profile-section-container">
              <Col sm="12" md="11">
                <h1 id="sluzby">Služby</h1>
                <OrganizationProfileServices
                  organizationData={organizationData}
                  servicesState={servicesState}
                />
              </Col>
            </Row>


             <Row className="justify-content-md-center organization-profile-section-container">
                <Col sm="12" md="11">
                  <h1 id="hodnoceni">Hodnocení</h1>
                  <TestimonialBoxCol />
                </Col>
             </Row>

            <Row className="justify-content-md-center organization-profile-section-container">
              <Col sm="12" md="3">
                <OrganizationProfileManagementCol
                  organization={organizationData.organization}
                  changePasswordRequest={changePasswordRequest}
                  setActionSuccess={setActionSuccess}
                />
              </Col>
              <Col sm="12" md="8">
                <Container>
                  <h1>{organizationData.organization.organization_name}</h1>
                  <OrganizationProfileForm
                    organization={organizationData.organization}
                    updateOrganizationRequest={updateOrganizationRequest}
                  />
                </Container>
              </Col>
            </Row>
          </Container>
        </>
      )}
      <Footer />
    </>
  );
}
