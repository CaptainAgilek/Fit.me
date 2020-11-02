import React from 'react';

import { Container, Row, Col, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import { ReservationList, UserProfileActionButton, GenericPopUp, Loading, ChangePasswordForm } from 'src/atoms/';
import { EditableAvatarPicture, ErrorBanner } from 'src/molecules/';
import { UserProfileForm } from 'src/organisms/';
import { route } from 'src/Routes';

export function UserProfileTemplate({
  loading,
  error,
  data,
  onReload,
  user,
  userReservations
}) {
  const linkToRegistration = route.home();

  return (
    <Container>
        {loading && !data && (<Loading />) }

        {error && (
          <ErrorBanner
            title="Something went wrong!"
            message={error.message}
            onClick={onReload}
          />
        )}

        {data && data.sportsman == null && (
          <Row className="justify-content-md-center" sm="4">
            <p>Unknown User</p>
            <a href={linkToRegistration}>Registration</a>
          </Row>
        )}

        {data && data.sportsman != null && (
          <Row>
            <Col sm="12" md="3">
              <Container>
                <Row className="justify-content-md-center botOffset" xs={1}>
                    <EditableAvatarPicture
                      src={data.sportsman.profile_photo ? data.sportsman.profile_photo.url : null}
                      alt={data.sportsman.username}
                      size="4"
                      className="mb2"
                      onDeleteClick=""
                      user_id={data.sportsman.user_id}
                    />
                </Row>

                <Row className="justify-content-md-center botOffset" xs={1}>
                  <GenericPopUp
                    triggerVariant="outline-dark"
                    triggerText="Change Password"
                    modalTitle="Change Password"
                    footerLeftVariant="outline-secondary"
                    footerLeftText="Cancel"
                    footerRightVariant="outline-success"
                    footerRightText="Change"
                  >
                    <ChangePasswordForm/>
                  </GenericPopUp>
                </Row>

                <Row className="justify-content-md-center botOffset" xs={1}>
                  <UserProfileActionButton variant="outline-primary">Export personal data</UserProfileActionButton>
                  <div>
                    Everything we know about you will be exported in a machine-readable format.
                  </div>
                </Row>

                <Row className="justify-content-md-center" xs={1}>
                  <GenericPopUp
                    triggerVariant="outline-danger"
                    triggerText="Delete Account"
                    modalTitle="Delete Account"
                    footerLeftVariant="outline-secondary"
                    footerLeftText="Cancel"
                    footerRightVariant="danger"
                    footerRightText="Delete"
                  >
                    Are you sure?
                  </GenericPopUp>
                </Row>
              </Container>
            </Col>

            <Col sm="12" md="6" >
              <Container>
                  <UserProfileForm user={data.sportsman}/>
              </Container>
            </Col>

            <Col sm="12" md="3">
              <Container>
                <ReservationList reservations={ userReservations } />
              </Container>
            </Col>
          </Row>
        )}
    </Container>
  );
}
