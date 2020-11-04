import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal'

import { UserProfileActionButton } from 'src/atoms/';

export function GenericPopUp({
  triggerVariant,
  triggerText,
  modalTitle,
  footerLeftVariant,
  footerLeftText,
  footerRightVariant,
  footerRightText,
  rightButtonOnClick,
  children
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <UserProfileActionButton
        variant={triggerVariant}
        onClick={handleShow}
      >
        {triggerText}
      </UserProfileActionButton>

      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <UserProfileActionButton variant={footerLeftVariant} onClick={handleClose}>{footerLeftText}</UserProfileActionButton>
          <UserProfileActionButton variant={footerRightVariant} onClick={() => {handleClose(); rightButtonOnClick()}}>{footerRightText}</UserProfileActionButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}
