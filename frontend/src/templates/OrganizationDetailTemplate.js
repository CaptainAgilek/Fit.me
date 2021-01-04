import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";

import {
  Footer,
  ActionsListReadonly,
  ErrorBanner,
  OrganizationDetailMap,
} from "src/molecules/";
import { Loading, CustomAlert, HeaderImg } from "src/atoms/";
import {
  Navigation,
  ProfileServicesReadonly,
  TrainersList,
  OrganizationPricing,
  OrganizationDetailRatings,
  OrganizationDetailInfo,
} from "src/organisms/";

export function OrganizationDetailTemplate({
  state,
  error,
  actionSuccess,
  setActionSuccess,
  organizationFetcher,
  userFetcher,
  servicesState,
  mapProvider,
  actionsState,
}) {
  const [locationState, setLocationState] = useState([]);
  useEffect(() => {
    const getLocation = async () => {
      if (!error) {
        const res = await mapProvider.search({
          query:
            organizationFetcher.data.organization.places[0].street +
            ", " +
            organizationFetcher.data.organization.places[0].zip +
            " " +
            organizationFetcher.data.organization.places[0].city,
        });
        //console.log(res, "res");
        if (res && res.length > 0) {
          setLocationState([res[0]]);
        }
      }
    };

    getLocation();
  }, [mapProvider, organizationFetcher.data, error]);
  //console.log(error, "err");

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
      {userFetcher &&
        userFetcher.data &&
        console.log(userFetcher.data, "userdata")}
      {console.log(state)}
      {console.log(servicesState)}
      {state.showData && (
        <>
          <HeaderImg
            img="/images/organization_header.jpg"
            className="organization-detail-header organization-profile-section-container"
          >
            {organizationFetcher.data.organization &&
              organizationFetcher.data.organization.organization_name}
          </HeaderImg>

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

            <Row className="justify-content-center organization-profile-section-container">
              <Col sm="12" md="11">
                {servicesState && (
                  <ProfileServicesReadonly
                    servicesState={servicesState}
                    user_id={organizationFetcher.data.organization.user_id}
                  />
                )}
              </Col>
            </Row>

            <Row className="justify-content-center organization-profile-section-container">
              <Col xs={12}>
                <Row className="justify-content-center">
                  <OrganizationDetailInfo
                    organizationFetcher={organizationFetcher}
                  />
                  <OrganizationDetailMap locationState={locationState} />
                </Row>
              </Col>
            </Row>

            <Row className="justify-content-center ">
              <Col
                xl={10}
                lg={10}
                xs={12}
                className="organization-detail-actions"
              >
                <Row className="justify-content-center ">
                  <h1>Připravované akce</h1>
                </Row>
                <Row className="justify-content-center ">
                  <Col lg={5} md={5} xs={6}>
                    <hr className="organization-detail-actions-hr"></hr>
                  </Col>
                </Row>
                <Row className="justify-content-center ">
                  {console.log(actionsState, "aState")}
                  {actionsState && actionsState.data && (
                    <ActionsListReadonly
                      organizationData={organizationFetcher.data}
                      organizationLoading={organizationFetcher.showLoading}
                      actions={actionsState.data.actionsForPlace}
                      actionsState={actionsState}
                      editable={false}
                      setActionSuccess={setActionSuccess}
                    />
                  )}
                </Row>
              </Col>
            </Row>

            <Row className="organization-profile-section-container justify-content-center">
              <Col lg={10} className="organization-detail-trainers">
                <Row className="justify-content-center ">
                  <h1>Naši trenéři</h1>
                </Row>
                <Row className="justify-content-center ">
                  <Col sm={5} xs={7}>
                    <hr className="organization-detail-trainers-hr"></hr>
                  </Col>
                </Row>
                <Row
                  className="justify-content-center "
                  style={{ height: "100%" }}
                >
                  {organizationFetcher.data.organization.trainers && (
                    <TrainersList
                      trainers={organizationFetcher.data.organization.trainers}
                    />
                  )}
                </Row>
              </Col>
            </Row>

            <Row className="organization-profile-section-container justify-content-center">
              <Col lg={10}>
                <Row className="justify-content-center">
                  <h1>Ceník</h1>
                </Row>
                <Row className="justify-content-center">
                  <OrganizationPricing />
                </Row>
              </Col>
            </Row>

            <Row className="organization-profile-section-container justify-content-center">
              <Col lg={10}>
                <Row className="justify-content-center">
                  <h1>Ohlasy</h1>
                </Row>
                <Row className="justify-content-center">
                  {organizationFetcher.data.organization.ratings &&
                    userFetcher.data && (
                      <OrganizationDetailRatings
                        ratings={organizationFetcher.data.organization.ratings}
                        userData={userFetcher.data}
                        organizationFetcher={organizationFetcher}
                      />
                    )}
                </Row>
              </Col>
            </Row>
          </Container>
        </>
      )}
      <Footer />
    </>
  );
}
