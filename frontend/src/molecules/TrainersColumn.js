import React from "react";
import { RemovePopUp } from "src/molecules/";

import { Col, Row, ListGroup } from "react-bootstrap";

export function TrainersColumn({
  organizationState,
  handleTrainerSelection,
  handleRemoveTrainer,
}) {
  return (
    <ListGroup className="organization-profile-section-contents">
      {organizationState.data &&
        organizationState.data.organization.trainers.map((trainer) => (
          <ListGroup.Item
            action
            href={"#" + trainer.user_id}
            onClick={() => handleTrainerSelection(trainer)}
            className="organization-profile-trainer-tab"
            key={trainer.user_id}
          >
            <Row className="d-flex align-items-center">
              <Col xs={9} sm={8} md={9} lg={9} xl={10}>
                {trainer.firstname + " " + trainer.lastname}
              </Col>
              <Col xl={2} md={3} sm={4} xs={3} lg={3}>
                <RemovePopUp
                  onConfirm={() => handleRemoveTrainer(trainer)}
                  target={trainer.firstname + " " + trainer.lastname}
                ></RemovePopUp>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
}
