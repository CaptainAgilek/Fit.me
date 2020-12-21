import React, { useState } from "react";

import {
  Container,
  Button,
  Modal,
  ListGroup,
  Col,
  Row,
  Image,
  Form,
} from "react-bootstrap";
import { gql, useQuery, useMutation } from "@apollo/client";

export function TrainersPopUp({
  btnSize,
  className,
  children,
  btnStyle,
  organizationId,
  organizationState,
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

  const ADD_TRAINER_MUTATION = gql`
    mutation addOrganizationTrainer($organization_id: Int!, $trainer_id: Int!) {
      addOrganizationTrainer(
        organization_id: $organization_id
        trainer_id: $trainer_id
      )
    }
  `;

  const trainersFetcher = useQuery(TRAINERS_QUERY, {
    variables: { user_id: organizationId },
  });

  const [addTrainer] = useMutation(ADD_TRAINER_MUTATION);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    //console.log(formContent);
    setFormContent(null);
    organizationState.refetch();
    organizationId && trainersFetcher.refetch();
  };
  const handleShow = () => {
    setShow(true);
    organizationId && trainersFetcher.refetch();
  };
  const handleAddTrainers = () => {
    for (const val in formContent) {
      if (formContent[val]) {
        addTrainer({
          variables: {
            organization_id: organizationId,
            trainer_id: parseInt(val),
          },
        });
      }
    }
    handleClose();
  };

  const [formContent, setFormContent] = useState();

  console.log("trainerpopup orgid:" + organizationId);

  const arrayEmpty = (arr) => {
    return !(Array.isArray(arr) && arr.length);
  };

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
            <ListGroup>
              {trainersFetcher.data &&
                arrayEmpty(trainersFetcher.data.trainersNotEmployed) &&
                "Nejsou dostupní žádní další trenéři."}
              {
                /*
                MUTATION FOR ADDING TRAINER
                QUERY FOR LISTING ALL TRAINERS
               */
                trainersFetcher.data &&
                  trainersFetcher.data.trainersNotEmployed.map((x) => (
                    <ListGroup.Item className="ignore-last-child-styling">
                      <Form>
                        <Form.Group>
                          <Row className="d-flex align-items-center">
                            <Col xs={2}>
                              <Image
                                src={x.profile_photo && x.profile_photo.url}
                                fluid
                              ></Image>
                            </Col>
                            <Col xs={8}>{x.firstname + " " + x.lastname}</Col>
                            <Col xs={2}>
                              <Form.Control
                                type="checkbox"
                                name={x.user_id}
                                checked={formContent && formContent[x.user_id]}
                                onChange={(e) =>
                                  setFormContent({
                                    ...formContent,
                                    [e.target.name]: e.target.checked,
                                  })
                                }
                              ></Form.Control>
                            </Col>
                          </Row>
                        </Form.Group>
                      </Form>
                    </ListGroup.Item>
                  ))
              }
            </ListGroup>
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
            onClick={handleAddTrainers}
          >
            PŘIDAT TRENÉRA
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
