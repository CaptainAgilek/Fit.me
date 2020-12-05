import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

import { Form } from "react-bootstrap";

import { AvatarPicture, GenericPopUp } from "src/atoms/";
import { AVATAR_FILE_SIZE_LIMIT } from "src/utils/const";

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

export function EditableAvatarPicture({
  src,
  alt,
  user_id,
  photo_id,
  setActionSuccess,
}) {
  const [profileImageUrl, setProfileImageUrl] = useState(src);

  const [uploadFileHandler] = useMutation(UPLOAD_PHOTO_MUTATION, {
    onCompleted({ singleUpload }) {
      setActionSuccess({
        message: "Avatar úspěšně změněný.",
        variant: "success",
      });
      setProfileImageUrl(singleUpload.url);
    },
    onError() {
      setActionSuccess({
        message: "Chyba při změně avatara.",
        variant: "danger",
      });
    },
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileIsTooBig, setFileIsTooBig] = useState(false);

  const inputLabel = selectedFile
    ? selectedFile.name
    : "Maximální velikost souboru je 5 MB.";

  const handleFileUpload = async (selectedFile) => {
    if (!selectedFile) return;
    await uploadFileHandler({
      variables: {
        file: selectedFile,
        user_id: user_id,
        photo_id: photo_id,
        type: "PROFILE_PICTURE",
      },
    });
  };

  return (
    <>
      <AvatarPicture src={profileImageUrl} alt={alt} className={"botOffset"} />

      <GenericPopUp
        triggerVariant="outline-dark"
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
            data-browse="Vybrat"
            isInvalid={fileIsTooBig}
            feedback="Zvolený soubor je příliš velký!"
            onChange={({
              target: {
                validity,
                files: [file],
              },
            }) => {
              if (file.size > AVATAR_FILE_SIZE_LIMIT) {
                setFileIsTooBig(true);
                return;
              }
              setFileIsTooBig(false);
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
