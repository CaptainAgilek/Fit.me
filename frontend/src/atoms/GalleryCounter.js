import React from "react";
import { Col } from "react-bootstrap";

export function GalleryCounter({ children }) {
  return <Col lg={10}>Počet položek: {children}</Col>;
}
