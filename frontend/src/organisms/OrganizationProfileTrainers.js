import React, { useState } from "react";
import {
  TrainersTopRow,
  TrainersColumn,
  TrainersContentBody,
} from "src/molecules/";
import { TrainersSocialColumn } from "src/atoms/";
import { Col, Row, Container, Tab } from "react-bootstrap";

import { Image } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

const UPDATE_OPRGANIZATION_TRAINER_DESCRIPTION = gql`
  mutation updateOrganizationTrainerDescription(
    $description: String
    $organization_id: Int!
    $trainer_id: Int!
  ) {
    updateOrganizationTrainerDescription(
      description: $description
      organization_id: $organization_id
      trainer_id: $trainer_id
    )
  }
`;

const REMOVE_ORGANIZATION_TRAINER = gql`
  mutation removeOrganizationTrainer(
    $organization_id: Int!
    $trainer_id: Int!
  ) {
    removeOrganizationTrainer(
      organization_id: $organization_id
      trainer_id: $trainer_id
    )
  }
`;

export function OrganizationProfileTrainers({ organizationState }) {
  const [modifyTrainerDescription] = useMutation(
    UPDATE_OPRGANIZATION_TRAINER_DESCRIPTION,
    {
      onCompleted: () => {
        organizationState.refetch();
      },
    }
  );

  const [removeTrainer] = useMutation(REMOVE_ORGANIZATION_TRAINER, {
    onCompleted: () => {
      organizationState.refetch();
    },
  });

  const handleTrainerDescriptionSubmit = (trainer) => {
    modifyTrainerDescription({
      variables: {
        description: trainerDescription,
        organization_id: organizationState.data.organization.user_id,
        trainer_id: trainer.user_id,
      },
    });
  };

  const handleRemoveTrainer = (trainer) => {
    removeTrainer({
      variables: {
        organization_id: organizationState.data.organization.user_id,
        trainer_id: trainer.user_id,
      },
    });
  };

  const handleTrainerSelection = (trainer) => {
    //setSelectedTrainerId(trainer.user_id);
    setTrainerDescription(trainer.description);
  };

  const [trainerDescription, setTrainerDescription] = useState(null);

  return (
    <Container>
      <TrainersTopRow organizationState={organizationState} />

      <Tab.Container defaultActiveKey="#">
        <Row>
          <Col sm={6} md={5} lg={4}>
            <TrainersColumn
              organizationState={organizationState}
              handleTrainerSelection={handleTrainerSelection}
              handleRemoveTrainer={handleRemoveTrainer}
            />
          </Col>
          <Col sm={6} md={7} lg={8}>
            {organizationState.data &&
              organizationState.data.organization.trainers.map((trainer) => (
                <Tab.Content key={trainer.user_id}>
                  <Tab.Pane eventKey={"#" + trainer.user_id}>
                    <Container>
                      <Row>
                        <Col xs={12} sm={12} md={4} lg={3} xl={3}>
                          <Row>
                            <Image
                              src={
                                trainer.profile_photo &&
                                trainer.profile_photo.url
                              }
                              fluid
                              rounded
                            ></Image>
                          </Row>
                        </Col>

                        <TrainersContentBody
                          trainer={trainer}
                          handleTrainerDescriptionSubmit={
                            handleTrainerDescriptionSubmit
                          }
                          setTrainerDescription={setTrainerDescription}
                        ></TrainersContentBody>
                        <TrainersSocialColumn
                          socialIconUrl={"/images/icons/facebook-f-brands.svg"}
                        >
                          {trainer.facebook}
                        </TrainersSocialColumn>
                        <TrainersSocialColumn
                          socialIconUrl={
                            "/images/icons/instagram-square-brands.svg"
                          }
                        >
                          {trainer.instagram}
                        </TrainersSocialColumn>
                      </Row>
                    </Container>
                  </Tab.Pane>
                </Tab.Content>
              ))}
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}
