import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import { Container, Form } from 'react-bootstrap';

import { AvatarPicture, GenericPopUp, UserPro } from 'src/atoms/';

const UPLOAD_PHOTO_MUTATION = gql`
  mutation SingleUpload($file: Upload!, $user_id: Int!) {
    singleUpload(file: $file, user_id: $user_id) {
      filename
      mimetype
      encoding
      url
    }
  }
`;

export function EditableAvatarPicture({
  src,
  alt,
  size = '3',
  className,
  onChange,
  setProfileImageUrl,
  user_id
}) {
  const [uploadFileHandler] = useMutation(UPLOAD_PHOTO_MUTATION);

  const [selectedFile, setSelectedFile] = useState(null);

  const inputLabel = selectedFile ? selectedFile.name : 'Custom file input';

  const handleFileUpload = async (selectedFile) => {
    if (!selectedFile) return;
    const upload = await uploadFileHandler({
      variables: { file: selectedFile, user_id: user_id },
    });
    if (upload.data) {
      setProfileImageUrl(upload.data.singleUpload.url);
    }
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
