import React from "react";
import { Col } from "react-bootstrap";

export function GalleryPhotoTitle({ photo }) {
  return (
    <Col xs={9}>
      <h6>
        {photo.url.split("#").shift().split("?").shift().split("/").pop()}
      </h6>
    </Col>
  );
}
