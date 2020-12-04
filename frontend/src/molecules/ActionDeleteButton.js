import React from "react";
import { Col } from "react-bootstrap";
import { RemovePopUp } from "src/molecules/";

export function ActionDeleteButton({ handleRemove, name, colClassName }) {
  return (
    <Col xs={3} className={colClassName}>
      <RemovePopUp
        onConfirm={handleRemove}
        openObjectClassName={
          "organization-icon-color organization-icon-clickable"
        }
        target={name}
      ></RemovePopUp>
    </Col>
  );
}
