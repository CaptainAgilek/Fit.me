import React, { useState } from 'react';

import { ChangePasswordForm } from 'src/atoms/';
import Modal from 'react-bootstrap/Modal'

import { UserProfileActionButton } from 'src/atoms/';

export function ChangePasswordPopUp({
  userEmail,
  onSubmit
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <UserProfileActionButton
        variant="outline-dark"
        onClick={handleShow}
      >
        Změnit heslo
      </UserProfileActionButton>

      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Změna hesla</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChangePasswordForm userEmail={userEmail} onSubmit={onSubmit} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}
