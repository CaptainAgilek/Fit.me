import React from "react";

import { Row, Col, Image, Card } from "react-bootstrap";

export function TrainerCard({ trainer, order }) {
    return (
        <>
            <Row style={{ paddingBottom: "1rem" }}>
                <Col lg={5} sm={8} style={{ paddingRight: "0" }}>
                    <Image src={trainer.profile_photo.url} style={{ width: "100%", height: "25vh" }} fluid></Image>
                </Col>
                <Col lg={7} sm={10} style={{ paddingLeft: "0" }}>
                    <Card className={order === 1 ? "organization-detail-trainer-card-first" : "organization-detail-trainer-card-second"}>
                        <Card.Body>
                            <Card.Title style={{ marginLeft: "0.85rem" }}>{trainer.firstname + " " + trainer.lastname}</Card.Title>
                            <Row style={{ fontSize: "13px", marginBottom: "1rem", marginLeft: "1rem", marginRight: "1rem" }}>{trainer.description}</Row>
                            <Row style={{ paddingBottom: "0.5rem" }}>
                                <Col lg={2}><Image src="/images/icons/facebook-f-brands.svg" className="organization-detail-trainer-card-icon" fluid></Image></Col>
                                <Col lg={10}>{trainer.facebook}</Col>
                            </Row>
                            <Row>
                                <Col lg={2}><Image src="/images/icons/instagram-square-brands.svg" className="organization-detail-trainer-card-icon" fluid></Image></Col>
                                <Col lg={10}>{trainer.instagram}</Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            { order === 2 && <Row style={{ paddingBottom: "3rem" }}></Row>}
        </>
    );
}