import React, { useState } from 'react';

import { Modal, Form, Button } from 'react-bootstrap';

import { UserProfileActionButton } from 'src/atoms/';

import classNames from 'classnames';

export function GenericPopUp({
  triggerVariant,
  triggerText,
  modalTitle,
  modalBody,
  footerLeftVariant,
  footerLeftText,
  footerRightVariant,
  footerRightText,
  rightButtonOnClick
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <UserProfileActionButton variant={triggerVariant} onClick={handleShow}>{triggerText}</UserProfileActionButton>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalBody}
        </Modal.Body>
        <Modal.Footer>
          <UserProfileActionButton variant={footerLeftVariant} onClick={handleClose}>{footerLeftText}</UserProfileActionButton>
          <UserProfileActionButton variant={footerRightVariant} onClick={handleClose, rightButtonOnClick}>{footerRightText}</UserProfileActionButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}
