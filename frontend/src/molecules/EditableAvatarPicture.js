import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import { Container, Form } from 'react-bootstrap';

import { AvatarPicture, GenericPopUp, UserPro } from 'src/atoms/';

const UPLOAD_PHOTO_MUTATION = gql`
  mutation SingleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;

export function EditableAvatarPicture({
  src,
  alt,
  size = '3',
  className,
  onChange,
}) {
  const [uploadFileHandler] = useMutation(UPLOAD_PHOTO_MUTATION);
  
  const [selectedFile, setSelectedFile] = useState(null);

  const inputLabel = selectedFile ? selectedFile.name : "Custom file input";

  const handleFileUpload = (selectedFile) => {
    if (!selectedFile) return;
    uploadFileHandler({ variables: { file: selectedFile } });
  };

  return (
    <>
      <AvatarPicture src={src} alt={alt} size={size} className={className} />

      <GenericPopUp
        triggerVariant="outline-primary"
        triggerText="Change Avatar"
        modalTitle="Upload new avatar"
        modalBody={
          <Form>
            <Form.File
              id="custom-file"
              label={inputLabel}
              onChange={({
                target: {
                  validity,
                  files: [file],
                },
              }) => validity.valid && setSelectedFile(file)}
              custom
            />
          </Form>
        }
        footerLeftVariant="outline-secondary"
        footerLeftText="Cancel"
        footerRightVariant="outline-primary"
        footerRightText="Upload"
        rightButtonOnClick={() => handleFileUpload(selectedFile)}
      />
    </>
  );
}
