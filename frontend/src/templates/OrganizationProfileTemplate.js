import React from 'react';

import { Col, Row, Container } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

import { CustomDatePicker, Loading } from 'src/atoms/';
import { Footer, OrganizationMenu, ActionCard, ErrorBanner } from 'src/molecules/';
import { Navigation, OrganizationProfileManagementCol, OrganizationProfileForm } from 'src/organisms/';

export function OrganizationProfileTemplate({
  actionsState,
  organizationData,
  loading,
  error,
  onReload,
  updateOrganizationRequest,
  changePasswordRequest,
}) {
  return (
    <>
      <Navigation />

      {loading && <Loading />}

      {error && (
        <ErrorBanner
          title="Something went wrong!"
          message={error.message}
          onClick={() => {
            onReload();
          }}
        />
      )}

      {organizationData && actionsState.data &&
        <>
          <div className="headerImg">
            <OrganizationMenu />
          </div>

          <Container className="organization-profile-top-margin">
            <Col>
              <h1>Kalendář akcí</h1>
              <Row>

              </Row>

              <Row>
                <ListGroup horizontal className="horizontalScroll">
                  {actionsState.data.actionsForPlace.map((action) => (
                    <ListGroup.Item key={action.action_id} className="borderNone" style={{paddingLeft:"0.1rem"}}>
                      <ActionCard
                        key={action.action_id}
                        img={action.photo.url || "/images/add_img.png"}
                        action={action}
                        trainers={organizationData.organization.trainers}
                        user_id={organizationData.organization.user_id}
                        editable={true}
                      />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Row>

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
      }
      <Footer />
    </>
  );
}
