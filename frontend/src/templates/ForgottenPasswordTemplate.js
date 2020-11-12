import React, { useState } from 'react';

import { Navigation } from 'src/organisms/';
import { Row, Col, Container, Modal } from 'react-bootstrap';
import { ForgottenPasswordForm } from '../organisms/ForgottenPasswordForm';

export function ForgottenPasswordTemplate({ isLoading, error, onSubmit, onClose }) {

  const [showForgotten, setShowForgotten] = useState(true);
  const handleCloseForgotten = () => {
    setShowForgotten(false);
    onClose(false);
  };

  return (
    <>
      <Modal show={showForgotten} onHide={handleCloseForgotten}>
        <Modal.Body>
          <Container>
            <Row className="justify-content-md-center">
              <h1>Zapomenuté heslo</h1>
            </Row>
            <Row>
              <Col>
                <ForgottenPasswordForm
                  isLoading={isLoading}
                  onSubmit={onSubmit}
                  className="form-group"
                  handleClose={handleCloseForgotten}
                >
                </ForgottenPasswordForm>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}
