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
      insertId
    }
  }
`;

export function EditableActionPicture({ src, user_id, action, setPhotoId }) {
  //Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //Modal

  const [actionImageUrl, setActionImageUrl] = useState(src);

  const [uploadFileHandler] = useMutation(UPLOAD_PHOTO_MUTATION, {
    onCompleted({ singleUpload }) {
      setActionImageUrl(singleUpload.url);
      console.log(singleUpload);
      setPhotoId(singleUpload.insertId);
      console.log(action);
    },
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const inputLabel = selectedFile ? selectedFile.name : 'Vyberte soubor';

  const handleFileUpload = async (selectedFile) => {
    if (!selectedFile) return;
    await uploadFileHandler({
      variables: {
        file: selectedFile,
        user_id: user_id,
        photo_id: action.photo_id,
        type: 'ACTION',
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
