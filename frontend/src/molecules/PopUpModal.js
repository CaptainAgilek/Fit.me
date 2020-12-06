import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";

import { UserProfileActionButton } from "src/atoms/";

export function PopUpModal({
  show,
  handleClose,
  modalTitle,
  footerLeftVariant,
  footerLeftText,
  footerRightVariant,
  footerRightText,
  rightButtonOnClick,
  children,
}) {
  return (
    <Modal show={show} onHide={handleClose} keyboard={false}>
      <Modal.Header>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <UserProfileActionButton
          variant={footerLeftVariant}
          onClick={handleClose}
        >
          {footerLeftText}
        </UserProfileActionButton>
        <UserProfileActionButton
          variant={footerRightVariant}
          onClick={() => {
            handleClose();
            rightButtonOnClick();
          }}
        >
          {footerRightText}
        </UserProfileActionButton>
      </Modal.Footer>
    </Modal>
  );
}
