import React, { useState, useEffect, useMemo } from "react";

import { Col, Row, Container } from "react-bootstrap";

import { Loading, DateFilter, CustomAlert } from "src/atoms/";
import {
  Footer,
  OrganizationMenu,
  ActionsList,
  ErrorBanner,
  TestimonialBoxCol,
  useActionsFilter
} from "src/molecules/";
import {
  Navigation,
  OrganizationProfileManagementCol,
  OrganizationProfileForm,
  OrganizationProfileTrainers,
  OrganizationProfileGallery,
  ProfileServices,
} from "src/organisms/";

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
    console.log("effect ", actions);
  }, [actions]);
  console.log("organizationData", organizationData);
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
                <h1 id="sluzby">Služby</h1>
                <ProfileServices
                  user_id={organizationData.organization.user.user_id}
                  servicesState={servicesState}
                />
              </Col>
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
                <h1 id="hodnoceni">Hodnocení</h1>
                <TestimonialBoxCol
                  ratingsData={organizationData.organization.ratings}
                />
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
