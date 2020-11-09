import React from 'react';

import { Container, Row } from 'react-bootstrap';

import { UserProfileActionButton, GenericPopUp } from 'src/atoms/';
import { EditableAvatarPicture, ChangePasswordPopUp } from 'src/molecules/';
import { DEFAULT_IMG_URL } from 'src/utils/const';

export function UserProfileManagementCol({
  user,
  deleteProfilePopUpParams,
  deleteUserRequest,
  changePasswordRequest,
}) {
  console.log("user", user);
  return (
    <Container>
      <Row className="justify-content-md-center botOffset" xs={1}>
          <EditableAvatarPicture
            src={
              user.profile_photo
                ? user.profile_photo.url
                : DEFAULT_IMG_URL
            }
            alt={user.username}
            user_id={user.user_id}
            photo_id={
              user.profile_photo
                ? user.profile_photo.photo_id
                : undefined
            }
          />
      </Row>

      <Row className="justify-content-md-center botOffset" xs={1}>
        <ChangePasswordPopUp userEmail={user.email} onSubmit={changePasswordRequest}/>
      </Row>

      <Row className="justify-content-md-center botOffset" xs={1}>
        <UserProfileActionButton variant="outline-primary">Exportovat osobní data</UserProfileActionButton>
        <div>
          Stáhne veškerá data, která o Vás máme
        </div>
      </Row>

      <Row className="justify-content-md-center" xs={1}>
        <GenericPopUp
          triggerVariant="outline-danger"
          triggerText="Smazat účet"
          modalTitle="Smazat účet"
          footerLeftVariant="outline-secondary"
          footerLeftText="Zpět"
          footerRightVariant="danger"
          footerRightText="Smazat"
          rightButtonOnClick={ () => {
            deleteUserRequest({ variables: { userId: user.user_id } });
          }}
        >
          Opravdu si přejete účet smazat?
        </GenericPopUp>
      </Row>
    </Container>
  );
}
