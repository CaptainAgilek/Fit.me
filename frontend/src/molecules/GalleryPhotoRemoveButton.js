import React from "react";
import { Col } from "react-bootstrap";
import { RemovePopUp } from "src/molecules/";

export function GalleryPhotoRemoveButton({
  user,
  photo,
  removeGalleryPhotoHandler,
  photoName,
}) {
  const handleRemove = () => {
    removeGalleryPhotoHandler({
      variables: {
        input: {
          photo_id: photo.photo_id,
          user_id: user.user_id,
          gallery_name: null,
        },
      },
    });
  };
  return (
    <Col xs={3}>
      <RemovePopUp
        onConfirm={handleRemove}
        openObjectClassName={
          "organization-icon-color organization-icon-clickable"
        }
        target={photoName}
      ></RemovePopUp>
    </Col>
  );
}
