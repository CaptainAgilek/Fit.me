import React, { useState } from 'react';

import { Container, Button, Modal } from 'react-bootstrap';
import { gql, useQuery } from '@apollo/client';

export function TrainersPopUp({
  btnSize,
  className,
  children,
  btnStyle,
  organizationId,
}) {
  const TRAINERS_QUERY = gql`
    query trainersNotEmployed($user_id: Int!) {
      trainersNotEmployed(user_id: $user_id) {
        user_id
        firstname
        lastname
        username
        profile_photo {
          url
        }
      }
    }
  `;

  const trainersFetcher = useQuery(TRAINERS_QUERY, {
    variables: { user_id: organizationId },
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        size={btnSize}
        className={className}
        style={btnStyle}
        onClick={handleShow}
      >
        {children}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Trenéři</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {
              /* 
                MUTATION FOR ADDING TRAINER
                QUERY FOR LISTING ALL TRAINERS
               */
              trainersFetcher.data &&
                trainersFetcher.data.trainersNotEmployed.map((x) => x.firstname)
            }
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="organization-secondary-button"
            onClick={handleClose}
          >
            Zavřít
          </Button>
          <Button
            variant="primary"
            className="organization-primary-button"
            onClick={handleClose}
          >
            PŘIDAT TRENÉRA
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
