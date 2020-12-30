import React, { useState } from "react";
import classNames from 'classnames';

import { Card, Row, Col, Image, Form } from "react-bootstrap";

export function OrganizationDetailRatings({ ratings, userData }) {

    const displayedRatings = ratings.slice(0, 5);

    const handleSubmit = (e) => {
        //console.log(e.key);
        if (e.key === "Enter") {
            //console.log("enter pressed");
        }
    }

    const [starsClicked, setStarsClicked] = useState(false);
    const stars = [false, false, false, false, false];
    const [starState, setStarState] = useState(stars);
    const handleSetStar = (index, value) => {
        if (starsClicked) {
            setStarsClicked(false);
            return;
        }
        for (let i = 0; i < index; i++) {
            stars[i] = value;
        }
        stars[index] = value;
        setStarState(stars);
        console.log(starState, "stars");
    }

    const handleSetStarClick = (index, value) => {
        handleSetStar(index, value)
        setStarsClicked(true);
    }

    //console.log(displayedRatings, "dRatings");
    return (
        <>
            {ratings && displayedRatings.map((rating) => (
                <Col lg={3} xs={12}>
                    <Card className="borderNone">
                        <Card.Body>
                            <Row style={{ paddingBottom: "1.5rem" }}>
                                <Col lg={4} xs={5}>
                                    <Image src={rating.sportsman.profile_photo.url} style={{ maxWidth: "100%", height: "5rem" }} roundedCircle fluid></Image>
                                </Col>
                                <Col>
                                    <Row style={{ fontSize: "3vh" }}>{rating.sportsman.firstname + " " + rating.sportsman.lastname}</Row>
                                    <Row>
                                        {[...Array(rating.stars)].map(() =>
                                            <Col lg={1} xs={2} className="organization-detail-rating-star star-full"><Image src="/images/icons/star-solid.svg"></Image></Col>
                                        )}
                                        {[...Array(5 - rating.stars)].map(() =>
                                            <Col lg={1} xs={2} className="organization-detail-rating-star"><Image src="/images/icons/star-regular.svg"></Image></Col>
                                        )}
                                    </Row>
                                </Col>
                            </Row>
                            <Row style={{ backgroundColor: "rgba(0, 0, 0, 0.44)", color: "#ffffff", padding: "1rem", fontStyle: "italic" }}>
                                {!rating.text.startsWith("“") && "“"}
                                {rating.text}
                                {!rating.text.endsWith("“") && "“"}
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            <Col lg={3} xs={12}>
                <Card className="borderNone">
                    <Card.Body>
                        <Row style={{ paddingBottom: "1.5rem" }}>
                            <Col lg={4} xs={5}>
                                <Image src={userData.sportsman.profile_photo.url} style={{ maxWidth: "100%", height: "5rem" }} roundedCircle fluid></Image>
                            </Col>
                            <Col>
                                <Row style={{ fontSize: "3vh" }}>{userData.sportsman.firstname + " " + userData.sportsman.lastname}</Row>
                                <Row>
                                    {[...Array(5)].map((_, index) =>
                                        <Col lg={1} xs={2} className={classNames("organization-detail-rating-star", { "star-full": starState[index] })} id={index}>
                                            <Image src={(starState[index] ? "/images/icons/star-solid.svg" : "/images/icons/star-regular.svg")}
                                                onClick={(e) => handleSetStarClick(index, true)}
                                                onMouseEnter={(e) => handleSetStar(index, true)}
                                                onMouseLeave={(e) => handleSetStar(index, false)} />
                                        </Col>
                                    )}
                                </Row>
                            </Col>
                        </Row>
                        <Form onSubmit={() => alert("submit")}>
                            <Form.Row>
                                <Form.Group
                                    name="text"
                                    controlId="text"
                                    as={Col}
                                >
                                    <Form.Control
                                        as="textarea"
                                        style={{
                                            height: "100%",
                                        }}
                                        onKeyPress={(e) => handleSubmit(e)}
                                    >
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
}