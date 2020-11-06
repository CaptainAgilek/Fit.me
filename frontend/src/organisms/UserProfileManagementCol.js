import React from 'react';

import { Container, Row } from 'react-bootstrap';

import { UserProfileActionButton, GenericPopUp, ChangePasswordForm } from 'src/atoms/';
import { EditableAvatarPicture } from 'src/molecules/';

export function UserProfileManagementCol({
  avatarSource,
  avatarAlt,
  user_id,
  deleteProfilePopUpParams,
  deleteUserRequest,
}) {
  return (
    <Container>
      <Row className="justify-content-md-center botOffset" xs={1}>
          <EditableAvatarPicture
            src={avatarSource}
            alt={avatarAlt}
            user_id={user_id}
          />
      </Row>

      <Row className="justify-content-md-center botOffset" xs={1}>
        <GenericPopUp
          triggerVariant={deleteProfilePopUpParams.triggerVariant}
          triggerText={deleteProfilePopUpParams.triggerText}
          modalTitle={deleteProfilePopUpParams.modalTitle}
          footerLeftVariant={deleteProfilePopUpParams.footerLeftVariant}
          footerLeftText={deleteProfilePopUpParams.footerLeftText}
          footerRightVariant={deleteProfilePopUpParams.footerRightVariant}
          footerRightText={deleteProfilePopUpParams.footerRightText}
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
            deleteUserRequest({ variables: { userId: user_id } });
          }}
        >
          Are you sure?
        </GenericPopUp>
      </Row>
    </Container>
  );
}
