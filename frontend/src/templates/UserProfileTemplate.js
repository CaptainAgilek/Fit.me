import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import { ReservationList, UserProfileActionButton, GenericPopUp, Loading, ChangePasswordForm, RegistrationLink} from 'src/atoms/';
import { EditableAvatarPicture, ErrorBanner } from 'src/molecules/';
import { UserProfileForm } from 'src/organisms/';
import { DEFAULT_IMG_URL } from 'src/utils/const';

export function UserProfileTemplate({
  state,
  userFetcherError,
  deleteUserError,
  data,
  onReload,
  userReservations,
  deleteUserRequest,
  updateUserRequest
}) {
  return (
    <Container>
        {state.showLoading && (<Loading />) }

        {(userFetcherError || deleteUserError) && (
          <ErrorBanner
            title="Something went wrong!"
            message={userFetcherError !== undefined ? userFetcherError.message : deleteUserError.message}
            onClick={() => { onReload(); } }
          />
        )}

        {state.showUknownUser && (
          <RegistrationLink />
        )}

        {state.showData && (
          <Row>
            <Col sm="12" md="3">
              <Container>
                <Row className="justify-content-md-center botOffset" xs={1}>
                    <EditableAvatarPicture
                      src={data.sportsman.profile_photo ? data.sportsman.profile_photo.url : DEFAULT_IMG_URL}
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
                    rightButtonOnClick={ () => {
                      deleteUserRequest({ variables: { userId: data.sportsman.user_id } });
                    }}
                  >
                    Are you sure?
                  </GenericPopUp>
                </Row>
              </Container>
            </Col>

            <Col sm="12" md="6" >
              <Container>
                  <UserProfileForm user={data.sportsman} updateUserRequest={updateUserRequest}/>
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
