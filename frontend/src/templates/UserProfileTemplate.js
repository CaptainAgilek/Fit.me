import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import {
  ReservationList,
  UserProfileActionButton,
  GenericPopUp,
  Loading,
  ChangePasswordForm,
  RegistrationLink,
} from 'src/atoms/';
import { EditableAvatarPicture, ErrorBanner } from 'src/molecules/';
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
        <Row>
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

          <Col sm="12" md="6">
            <Container>
              <UserProfileForm
                user={data.sportsman}
                updateUserRequest={updateUserRequest}
              />
            </Container>
          </Col>

          <Col sm="12" md="3">
            <Container>
              <ReservationList reservations={userReservations} />
            </Container>
          </Col>
        </Row>
      )}
    </Container>
    </>
  );
}
