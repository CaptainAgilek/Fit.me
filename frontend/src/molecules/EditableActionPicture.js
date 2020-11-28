import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import { Form } from 'react-bootstrap';

import { AvatarPicture } from 'src/atoms/';
import { PopUpModal } from 'src/molecules/';

const UPLOAD_PHOTO_MUTATION = gql`
  mutation SingleUpload(
    $file: Upload!
    $user_id: Int!
    $photo_id: Int
    $photo_type_id: Boolean!
  ) {
    singleUpload(
      file: $file
      user_id: $user_id
      photo_id: $photo_id
      photo_type_id: $photo_type_id
    ) {
      filename
      mimetype
      encoding
      url
    }
  }
`;

export function EditableActionPicture({ src, user_id, photo_id }) {
  //Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //Modal

  const [actionImageUrl, setActionImageUrl] = useState(src);

  const [uploadFileHandler] = useMutation(UPLOAD_PHOTO_MUTATION, {
    onCompleted({ singleUpload }) {
      setActionImageUrl(singleUpload.url);
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
        photo_type_id: 0,
      },
    });
  };

  return (
    <>
      <img className="card-img-top" src={actionImageUrl} onClick={handleShow} />

      <PopUpModal
        show={show}
        handleClose={handleClose}
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
      </PopUpModal>
    </>
  );
}
