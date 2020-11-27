import React, { useState } from 'react';

import { Container, Row, Form } from 'react-bootstrap';

import { UserProfileActionButton, GenericPopUp } from 'src/atoms/';
import { EditableAvatarPicture, ChangePasswordPopUp } from 'src/molecules/';
import { DEFAULT_IMG_URL } from 'src/utils/const';

export function OrganizationProfileManagementCol({
  organization,
}) {
  const [selectedFile, setSelectedFile] = useState(null);

  const inputLabel = selectedFile ? selectedFile.name : 'Custom file input';

  return (
    <Container>
      <Row className="justify-content-md-center profileComponentsOffset botOffset" xs={1}>
          <EditableAvatarPicture
            src={
              organization.profile_photo
                ? organization.profile_photo.url
                : DEFAULT_IMG_URL
            }
            alt={organization.username}
            user_id={organization.user_id}
            photo_id={
              organization.profile_photo
                ? organization.profile_photo.photo_id
                : undefined
            }
          />
      </Row>

      <Row className="justify-content-md-center botOffset" xs={1}>
        <GenericPopUp
          triggerVariant="outline-primary"
          triggerText="Změnit Banner"
          modalTitle="Nahrát nový banner"
          footerLeftVariant="outline-secondary"
          footerLeftText="Zpět"
          footerRightVariant="outline-primary"
          footerRightText="Nahrát"
          rightButtonOnClick={() => console.log("uploaduju image")}
        >
          <Form>
            <Form.File
              id="custom-file"
              label={inputLabel}
              onChange={({
                target: {
                  validity,
                  files: [file],
                },
              }) => {
                if (validity.valid) {
                  setSelectedFile(file);
                }
              }}
              custom
            />
          </Form>
        </GenericPopUp>
      </Row>

      <Row className="justify-content-md-center botOffset" xs={1}>
        <ChangePasswordPopUp userEmail={organization.user.email} />
      </Row>
    </Container>
  );
}
