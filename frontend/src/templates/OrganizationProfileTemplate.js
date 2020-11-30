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

function useActionsFilter(data) {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);

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
  organizationData,
  loading,
  error,
  updateOrganizationRequest,
  changePasswordRequest,
  profileFetcher,
}) {
  const { actions, dateFilterProps } = useActionsFilter(actionsState.data);

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
                <DateFilter {...dateFilterProps} />
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
