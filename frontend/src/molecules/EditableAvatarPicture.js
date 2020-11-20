import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import { Form } from 'react-bootstrap';

import { AvatarPicture, GenericPopUp } from 'src/atoms/';

const UPLOAD_PHOTO_MUTATION = gql`
  mutation SingleUpload($file: Upload!, $user_id: Int!, $photo_id: Int, $is_profile_picture: Boolean!) {
    singleUpload(file: $file, user_id: $user_id, photo_id: $photo_id, is_profile_picture: $is_profile_picture) {
      filename
      mimetype
      encoding
      url
    }
  }
`;

export function EditableAvatarPicture({ src, alt, user_id, photo_id }) {
  const [profileImageUrl, setProfileImageUrl] = useState(src);

  const [uploadFileHandler] = useMutation(UPLOAD_PHOTO_MUTATION, {
    onCompleted({ singleUpload }) {
      setProfileImageUrl(singleUpload.url);
    },
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const inputLabel = selectedFile ? selectedFile.name : 'Custom file input';

  const handleFileUpload = async (selectedFile) => {
    if (!selectedFile) return;
    await uploadFileHandler({
      variables: { file: selectedFile, user_id: user_id, photo_id: photo_id, is_profile_picture: true },
    });
  };

  return (
    <>
      <AvatarPicture src={profileImageUrl} alt={alt} className={'botOffset'} />

      <GenericPopUp
        triggerVariant="outline-primary"
        triggerText="Změnit Avatar"
        modalTitle="Nahrát nový obrázek"
        footerLeftVariant="outline-secondary"
        footerLeftText="Zpět"
        footerRightVariant="outline-primary"
        footerRightText="Nahrát"
        rightButtonOnClick={() => handleFileUpload(selectedFile)}
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
    </>
  );
}
