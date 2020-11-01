import React from 'react';

import { Container, Row, Col, Form } from 'react-bootstrap';

import { ReservationList, UserProfileActionButton, GenericPopUp } from 'src/atoms/';
import { EditableAvatarPicture } from 'src/molecules/';
import { UserProfileForm } from 'src/organisms/';

export function UserProfileTemplate( { user, userReservations, setProfileImageUrl } ) {
  return (
    <Container>
      <Row>
        <Col sm="12" md="3">
          <Container>
          <Row className="justify-content-md-center" xs={1}>
              <EditableAvatarPicture
                          src={user.profileImageUrl}
                          alt={user.name}
                          size="4"
                          className="mb2"
                          onDeleteClick=""
                          setProfileImageUrl={setProfileImageUrl}
                          user_id= {user.user_id}
              />
            </Row>

            <Row className="justify-content-md-center" xs={1}>
              {/* TODO: add validation schema
              const schema = yup.object({
              password: yup.string().required().label('Password'),
              passwordConfirmation: yup
                .string()
                .required()
                .oneOf([yup.ref('password'), null], 'Passwords must match')
                .label('Password Confirmation')
              });
              */}
              <GenericPopUp
                triggerVariant="outline-dark"
                triggerText="Change Password"
                modalTitle="Change Password"
                modalBody={
                  <Form>
                    <Form.Group controlId="formGroupPassword1">
                      <Form.Label>New password</Form.Label>
                      <Form.Control type="password" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword2">
                      <Form.Label>New password again</Form.Label>
                      <Form.Control type="password" />
                    </Form.Group>
                  </Form>
                }
                footerLeftVariant="outline-secondary"
                footerLeftText="Cancel"
                footerRightVariant="outline-success"
                footerRightText="Change" />
            </Row>

            <Row className="justify-content-md-center" xs={1}>
              <UserProfileActionButton variant="outline-primary">Export personal data</UserProfileActionButton>
            </Row>

            <Row className="justify-content-md-center" xs={1}>
              <GenericPopUp
                triggerVariant="outline-danger"
                triggerText="Delete Account"
                modalTitle="Delete Account"
                modalBody="Are you sure?"
                footerLeftVariant="outline-secondary"
                footerLeftText="Cancel"
                footerRightVariant="danger"
                footerRightText="Delete" />
            </Row>
          </Container>
        </Col>

        <Col sm="12" md="6" >
          <Container>
              <UserProfileForm user={user}/>
          </Container>
        </Col>

        <Col sm="12" md="3">
          <Container>
            <ReservationList reservations={ userReservations } />
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
