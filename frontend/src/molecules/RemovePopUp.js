import React, { useState } from "react";

import { Modal, Button, Image } from "react-bootstrap";

export function RemovePopUp({ onConfirm, target, openObjectClassName }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClickAction = () => {
    onConfirm();
    handleClose();
  };

  return (
    <>
      <Image
        src="/images/icons/trash-alt-solid.svg"
        className={openObjectClassName}
        onClick={handleShow}
      ></Image>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Potvrdit smazání</Modal.Title>
        </Modal.Header>
        <Modal.Body>Opravdu chcete smazat {target}?</Modal.Body>
        <Modal.Footer>
          <Button
            className="organization-secondary-button"
            onClick={handleClose}
          >
            Zrušit
          </Button>
          <Button variant="danger" onClick={handleClickAction}>
            Smazat
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
