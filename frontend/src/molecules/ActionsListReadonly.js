import React from "react";
import { Loading } from "src/atoms/";
import { ActionCardOrganizationDetail } from "src/molecules/";
import ListGroup from "react-bootstrap/ListGroup";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";

const toCustomDate = (timestamp) => {
    const tmp = new Date(parseInt(timestamp)).toLocaleDateString().split("/");
    return tmp[1] + "/" + tmp[0] + "/" + tmp[2];
}

const toCustomTime = (timeString) => {
    const tmp = timeString.split(":");
    return tmp[0] + ":" + tmp[1] + ":" + tmp[2];
}

const resolveTrainerName = (trainerId, org) => {
    const trainer = org.trainers.find(trainer => trainer.user_id === trainerId);
    return trainer.firstname + " " + trainer.lastname;
}

export function ActionsListReadonly({
    organizationData,
    organizationLoading,
    actions,
    actionsState,
    setActionSuccess,
}) {
    if (
        (organizationLoading && !organizationData) ||
        (actionsState.loading && !actionsState.data)
    ) {
        return <Loading />;
    }
    if (!actionsState.data || !organizationData) return <div />;

    console.log(actions, "actions");
    console.log(organizationData, "orgdata");

    return (
        <ListGroup horizontal>
            {organizationData.organization &&
                actionsState.data &&
                actions.map((action) => (
                    <ListGroup.Item
                        key={action.action_id}
                        className="borderNone organization-detail-actions"
                    >
                        <Card className="borderNone organization-detail-action-card">
                            <Card.Img variant="top" src={action.photo ? action.photo.url : "/images/add_img.png"} className="organization-detail-action-card-image" />
                            <Card.Body className="organization-detail-action-card-body">
                                <Card.Title>{action.name}</Card.Title>
                            </Card.Body>
                            <Col className="justify-content-center">
                                <Row>
                                    <Col xl={2}>
                                        <Image src="/images/icons/calendar.png" fluid></Image>
                                    </Col>
                                    <Col>
                                        {toCustomDate(action.date)}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={2}>
                                        <Image src="/images/icons/clock-regular.svg" fluid></Image>
                                    </Col>
                                    <Col>
                                        {toCustomTime(action.time)}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={2}>
                                        <Image src="/images/icons/personal.svg" fluid></Image>
                                    </Col>
                                    <Col>
                                        {resolveTrainerName(action.trainer_id, organizationData.organization)}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={2}>
                                        <Image src="/images/icons/money.svg" fluid></Image>
                                    </Col>
                                    <Col>
                                        {action.price}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={2}>
                                        <Image src="/images/icons/users-solid.svg" fluid></Image>
                                    </Col>
                                    <Col>
                                        {action.max_capacity}
                                    </Col>
                                </Row>
                                <Row className="d-flex justify-content-center">
                                    <Button variant="outline-success" className="sportsman-secondary-button">Rezervovat</Button>
                                </Row>
                            </Col>

                        </Card>

                    </ListGroup.Item>
                ))}
        </ListGroup>
    );
}
