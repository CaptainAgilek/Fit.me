import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Loading, CustomAlert } from "src/atoms/";
import { ErrorBanner, ReservationList } from "src/molecules/";
import {
  UserProfileForm,
  UserProfileManagementCol,
  Navigation,
} from "src/organisms/";

export function UserProfileTemplate({
  state,
  error,
  data,
  userReservations,
  deleteUserRequest,
  updateUserRequest,
  changePasswordRequest,
  actionSuccess,
  setActionSuccess,
}) {
  return (
    <>
      <Navigation />
      <Container>
        {state.showLoading && <Loading />}

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

        {/*todo instead of Registration link redirect to organization page*/}
        {/*{state.showUknownUser && <RegistrationLink />} */}

        {state.showData && (
          <>
            <Row className="justify-content-md-center">
              <Col sm="12" md="3">
                <UserProfileManagementCol
                  user={data.sportsman}
                  deleteProfilePopUpParams={{
                    triggerVariant: "outline-dark",
                    triggerText: "Change Password",
                    modalTitle: "Change Password",
                    footerLeftVariant: "outline-secondary",
                    footerLeftText: "Cancel",
                    footerRightVariant: "outline-success",
                    footerRightText: "Change",
                  }}
                  deleteUserRequest={deleteUserRequest}
                  changePasswordRequest={changePasswordRequest}
                  setActionSuccess={setActionSuccess}
                />
              </Col>

              <Col sm="12" md="8">
                <Container>
                  <h1>{data.sportsman.firstname}</h1>
                  <UserProfileForm
                    user={data.sportsman}
                    updateUserRequest={updateUserRequest}
                  />
                </Container>
              </Col>
            </Row>

            <Row className="justify-content-md-center profileComponentsOffset">
              <Col sm="12" md="11">
                <ReservationList reservations={userReservations} />
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
}
