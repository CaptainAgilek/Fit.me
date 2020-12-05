import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function SuccessAlert({ headingText, setActionSuccess, setServiceSuccess, message }) {
  useEffect(() => {
    headingText && setTimeout(() => {
      setActionSuccess(false);
    }, 2000);
  });

  return (
    <>
      {headingText && (
        <Row className="justify-content-md-center">
          <Col sm="6" className="justify-content-md-center">
            <Alert
              variant="success"
              dismissible
              onClose={() => {
                setActionSuccess(false);
                setServiceSuccess(false);
              }}
            >
              <Alert.Heading>{headingText}</Alert.Heading>
              <p>{message}</p>
            </Alert>
          </Col>
        </Row>
      )}
    </>
  );
}
