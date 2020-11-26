import React from 'react';
import { Col, Image } from 'react-bootstrap';

export function GalleryPhotoRemoveButton({
  user,
  photo,
  removeGalleryPhotoHandler,
}) {
  return (
    <Col xs={3}>
      <Image
        className="organization-icon-color organization-icon-clickable"
        src="/images/icons/trash-alt-solid.svg"
        onClick={() => {
          removeGalleryPhotoHandler({
            variables: {
              input: {
                photo_id: photo.photo_id,
                user_id: user.user_id,
                gallery_name: null,
              },
            },
          });
        }}
      ></Image>
    </Col>
  );
}
