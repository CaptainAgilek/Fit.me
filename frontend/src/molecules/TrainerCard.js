import React from "react";

import { Row, Col, Image, Card } from "react-bootstrap";

export function TrainerCard({ trainer, order }) {
  return (
    <>
      <Row style={{ paddingBottom: "1rem" }}>
        <Col xl={5} lg={3} md={8} sm={9} style={{ paddingRight: "0" }}>
          <Image
            src={trainer.profile_photo ? trainer.profile_photo.url : "https://icon-library.com/images/trainer-icon/trainer-icon-22.jpg"}
            style={{ width: "100%", height: "25vh" }}
            fluid
          ></Image>
        </Col>
        <Col xl={7} lg={9} md={8} sm={9} style={{ paddingLeft: "0" }}>
          <Card
            className={
              order === 1
                ? "organization-detail-trainer-card-first"
                : "organization-detail-trainer-card-second"
            }
          >
            <Card.Body>
              <Card.Title style={{ marginLeft: "0.85rem" }}>
                {trainer.firstname + " " + trainer.lastname}
              </Card.Title>
              <Row
                style={{
                  fontSize: "13px",
                  marginBottom: "1rem",
                  marginLeft: "1rem",
                  marginRight: "1rem",
                }}
              >
                {trainer.description}
              </Row>
              <Row style={{ paddingBottom: "0.5rem" }}>
                <Col lg={2} md={2} sm={2} xs={2}>
                  <Image
                    src="/images/icons/facebook-f-brands.svg"
                    className="organization-detail-trainer-card-icon"
                    fluid
                  ></Image>
                </Col>
                <Col lg={10} md={5} sm={5} xs={6}>
                  {trainer.facebook}
                </Col>
              </Row>
              <Row>
                <Col lg={2} md={2} sm={2} xs={2}>
                  <Image
                    src="/images/icons/instagram-square-brands.svg"
                    className="organization-detail-trainer-card-icon"
                    fluid
                  ></Image>
                </Col>
                <Col lg={10} md={5} sm={5} xs={6}>
                  {trainer.instagram}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {order === 2 && <Row style={{ paddingBottom: "3rem" }}></Row>}
    </>
  );
}
