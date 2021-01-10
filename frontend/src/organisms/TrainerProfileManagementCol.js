import React, { useState } from "react";

import { gql, useMutation } from "@apollo/client";

import { Container, Row, Form } from "react-bootstrap";

import { GenericPopUp } from "src/atoms/";
import { EditableAvatarPicture, ChangePasswordPopUp } from "src/molecules/";
import { DEFAULT_IMG_URL } from "src/utils/const";

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

export function TrainerProfileManagementCol({
  trainer,
  changePasswordRequest,
  setActionSuccess,
}) {
  const src = trainer.profile_photo
    ? trainer.profile_photo.url
    : DEFAULT_IMG_URL;

  const [selectedFile, setSelectedFile] = useState(null);
  const inputLabel = selectedFile ? selectedFile.name : "Custom file input";

  const [uploadFileHandler] = useMutation(UPLOAD_PHOTO_MUTATION);

  const handleBannerUpload = async (selectedFile) => {
    if (!selectedFile) return;
    await uploadFileHandler({
      variables: {
        file: selectedFile,
        user_id: trainer.user_id,
        photo_id: trainer.profile_photo.photo_id,
        type: "BANNER",
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
          alt={trainer.username}
          user_id={trainer.user_id}
          photo_id={
            trainer.profile_photo ? trainer.profile_photo.photo_id : undefined
          }
          setActionSuccess={setActionSuccess}
        />
      </Row>

      <Row className="justify-content-md-center botOffset" xs={1}>
        <ChangePasswordPopUp
          userEmail={trainer.user.email}
          onSubmit={changePasswordRequest}
        />
      </Row>
    </Container>
  );
}
