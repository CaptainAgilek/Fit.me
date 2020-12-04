import React from "react";

import {
  Col,
  Row,
  Container,
  Tab,
  ListGroup,
  Form,
  Button,
} from "react-bootstrap";

export function TrainersContentBody({
  trainer,
  handleTrainerDescriptionSubmit,
  setTrainerDescription,
}) {
  return (
    <Col xl={9} lg={9} md={8} sm={12}>
      <Row className="d-flex justify-content-center">
        <h3>{trainer.firstname + " " + trainer.lastname}</h3>
      </Row>

      <Form onSubmit={() => handleTrainerDescriptionSubmit(trainer)}>
        <Form.Row>
          <Form.Group
            name="description"
            controlId="description"
            as={Col}
            onChange={(e) => setTrainerDescription(e.target.value)}
          >
            <Form.Label>POPIS</Form.Label>
            <Form.Control
              as="textarea"
              style={{
                height: "100%",
              }}
            >
              {trainer.description}
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row className="d-flex flex-row-reverse">
          <Button
            className="organization-primary-button"
            variant="success"
            size="md"
            type="submit"
            style={{ marginTop: "1.5rem" }}
          >
            ULOŽIT
          </Button>
        </Form.Row>
      </Form>
    </Col>
  );
}
