import React from 'react';
import { Col } from 'react-bootstrap';
import { RemovePopUp } from 'src/molecules/';

export function ActionDeleteButton({handleRemove, name}) {

  return (
    <Col xs={3}>
      <RemovePopUp
        onConfirm={handleRemove}
        openObjectClassName={
          'organization-icon-color organization-icon-clickable'
        }
        target={name}
      ></RemovePopUp>
    </Col>
  );
}
