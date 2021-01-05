import React, { useState, useEffect, useMemo } from "react";

import { Col, Row, Container } from "react-bootstrap";

import { Loading, DateFilter, CustomAlert } from "src/atoms/";
import {
  Footer,
  OrganizationMenu,
  ActionsList,
  ErrorBanner,
  TestimonialBoxCol,
  BasicSlideWithBanner,
} from "src/molecules/";
import {
  Navigation,
  OrganizationProfileManagementCol,
  OrganizationProfileForm,
  OrganizationProfileTrainers,
  OrganizationProfileGallery,
  ProfileServices,
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
        new Date(parseInt(item.date, 10)) <= dateTo
    );
  }, [dataToFilter, dateFrom, dateTo]);

  return {
    actions,
    dateFilterProps: { dateFrom, setDateFrom, dateTo, setDateTo },
  };
}

export function PublicOrganizationProfileTemplate({
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
  return (
    <>
      <Navigation />
      <BasicSlideWithBanner
        imageUrl={"images/organization_header.jpg"}
        headline={"FORM FACTORY FITNESS CLUB"}
      />

      {organizationData && actionsState.data && servicesState.data && (
        <>
          <Row className="justify-content-md-center organization-profile-section-container">
            <Col sm="12" md="11">
              <h1 id="sluzby">Služby</h1>
              <ProfileServices
                user_id={organizationData.organization.user.user_id}
                servicesState={servicesState}
              />
            </Col>
          </Row>
        </>
      )}
      <Footer />
    </>
  );
}
