import React, { useState } from 'react';

import { SignUpForm, TopNavigation} from 'src/organisms/';
import { Row, Col, Container, Modal, Button } from 'react-bootstrap';


export function SignUpTemplate({ isLoading, error, onSubmit }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    {/*<TopNavigation />*/}
    <Container>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Row className="justify-content-md-center">
            <h1>Registrace</h1>
          </Row>
          <Row>
            <Col>
              <SignUpForm
                isLoading={isLoading}
                errorMessage={error && error.message}
                onSubmit={onSubmit}
                className="form-group"
              >
              </SignUpForm>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </Container>
    </>
  );
}
