import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import { Form } from 'react-bootstrap';

import { GenericPopUp } from 'src/atoms/';

const UPLOAD_PHOTO_MUTATION = gql`
  mutation SingleUploadOrganizationGalleryPhoto(
    $file: Upload!
    $photo_id: Int
    $user_id: Int!
    $description: String
    $type: PhotoType!
  ) {
    singleUploadOrganizationGalleryPhoto(
      file: $file
      photo_id: $photo_id
      user_id: $user_id
      description: $description
      type: $type
    ) {
      filename
      mimetype
      encoding
      url
    }
  }
`;

export function GalleryUploadPhotoButton({
  user_id,
  photo_id,
  refetchGallery,
}) {
  const [uploadFileHandler] = useMutation(UPLOAD_PHOTO_MUTATION, {
    onCompleted({ upload }) {
      refetchGallery();
    },
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const inputLabel = selectedFile ? selectedFile.name : 'Custom file input';

  const handleFileUpload = async (selectedFile) => {
    if (!selectedFile) return;
    await uploadFileHandler({
      variables: {
        file: selectedFile,
        user_id: user_id,
        photo_id: photo_id,
        description: null,
        type: 'OTHER',
      },
    });
  };

  return (
    <>
      <GenericPopUp
        triggerVariant="success"
        triggerText="PŘIDAT"
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
