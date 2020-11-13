import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Loading, RegistrationLink } from 'src/atoms/';
import { ErrorBanner, ReservationList } from 'src/molecules/';
import { UserProfileForm, UserProfileManagementCol, Navigation } from 'src/organisms/';

export function UserProfileTemplate({
  state,
  error,
  data,
  onReload,
  userReservations,
  deleteUserRequest,
  updateUserRequest,
  changePasswordRequest,
}) {
  return (
    <>
    <Navigation/>
    <Container>
      {state.showLoading && <Loading />}

      {error && (
        <ErrorBanner
          title="Something went wrong!"
          message={error.message}
          onClick={() => {
            onReload();
          }}
        />
      )}

      {state.showUknownUser && <RegistrationLink />}

      {state.showData && (
        <>
          <Row className="justify-content-md-center">
            <Col sm="12" md="3">
              <UserProfileManagementCol
                user={data.sportsman}
                deleteProfilePopUpParams={{
                  triggerVariant: 'outline-dark',
                  triggerText: 'Change Password',
                  modalTitle: 'Change Password',
                  footerLeftVariant: 'outline-secondary',
                  footerLeftText: 'Cancel',
                  footerRightVariant: 'outline-success',
                  footerRightText: 'Change',
                }}
                deleteUserRequest={deleteUserRequest}
                changePasswordRequest={changePasswordRequest}
              />
            </Col>

            <Col sm="12" md="7">
              <Container>
                <h1>{data.sportsman.firstname}</h1>
                <UserProfileForm
                  user={data.sportsman}
                  updateUserRequest={updateUserRequest}
                />
              </Container>
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            <Col sm="12" md="10">
              <ReservationList reservations={userReservations} />
            </Col>
          </Row>
        </>
      )}
    </Container>
    </>
  );
}
