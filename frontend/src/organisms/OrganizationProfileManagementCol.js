import React, { useState } from 'react';

import { gql, useMutation } from '@apollo/client';

import { Container, Row, Form } from 'react-bootstrap';

import { UserProfileActionButton, GenericPopUp } from 'src/atoms/';
import { EditableAvatarPicture, ChangePasswordPopUp } from 'src/molecules/';
import { DEFAULT_IMG_URL } from 'src/utils/const';

const UPLOAD_PHOTO_MUTATION = gql`
  mutation SingleUpload(
    $file: Upload!
    $user_id: Int!
    $photo_id: Int
    $type: PhotoType!
  ) {
    singleUpload(
      file: $file
      user_id: $user_id
      photo_id: $photo_id
      type: $type
    ) {
      filename
      mimetype
      encoding
      url
    }
  }
`;

export function OrganizationProfileManagementCol({
  organization,
  changePasswordRequest,
}) {
  const src = organization.profile_photo
    ? organization.profile_photo.url
    : DEFAULT_IMG_URL;
  const [profileImageUrl, setProfileImageUrl] = useState(src);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputLabel = selectedFile ? selectedFile.name : 'Custom file input';

  const [uploadFileHandler] = useMutation(UPLOAD_PHOTO_MUTATION, {
    onCompleted({ singleUpload }) {
      setProfileImageUrl(singleUpload.url);
    },
  });

  const handleBannerUpload = async (selectedFile) => {
    if (!selectedFile) return;
    await uploadFileHandler({
      variables: {
        file: selectedFile,
        user_id: organization.user_id,
        photo_id: organization.profile_photo.photo_id,
        type: 'BANNER',
      },
    });
  };

  return (
    <Container>
      <Row
        className="justify-content-md-center profileComponentsOffset botOffset"
        xs={1}
      >
        <EditableAvatarPicture
          src={src}
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
          triggerVariant="outline-dark"
          triggerText="Změnit Banner"
          modalTitle="Nahrát nový banner"
          footerLeftVariant="outline-secondary"
          footerLeftText="Zpět"
          footerRightVariant="outline-primary"
          footerRightText="Nahrát"
          rightButtonOnClick={() => handleBannerUpload(selectedFile)}
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
        <ChangePasswordPopUp
          userEmail={organization.user.email}
          onSubmit={changePasswordRequest}
        />
      </Row>
    </Container>
  );
}
