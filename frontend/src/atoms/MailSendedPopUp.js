import React, { useState } from 'react';

import { Button, Container, Modal } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';

export function MailSendedPopUp({init}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Container>
        <Modal show={false} onHide={handleClose}>
          <Modal.Body>
            <Row className="justify-content-md-center">
              <p>Ověřovací mail byl zaslán na Váš email.</p>
            </Row>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}
