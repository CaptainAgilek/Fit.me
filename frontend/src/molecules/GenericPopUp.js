import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";

import { UserProfileActionButton } from "src/atoms/";
import { PopUpModal } from "src/molecules/";

export function GenericPopUp({
  triggerVariant,
  triggerText,
  modalTitle,
  footerLeftVariant,
  footerLeftText,
  footerRightVariant,
  footerRightText,
  actionButtonClass,
  rightButtonOnClick,
  children,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <UserProfileActionButton
        variant={triggerVariant}
        onClick={handleShow}
        actionButtonClass={actionButtonClass}
      >
        {triggerText}
      </UserProfileActionButton>

      <PopUpModal
        show={show}
        handleClose={handleClose}
        modalTitle={modalTitle}
        footerLeftVariant={footerLeftVariant}
        footerLeftText={footerLeftText}
        footerRightVariant={footerRightVariant}
        footerRightText={footerRightText}
        rightButtonOnClick={rightButtonOnClick}
      >
        {children}
      </PopUpModal>
    </>
  );
}
