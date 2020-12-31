import React, { useState } from "react";
import classNames from 'classnames';
import { gql, useMutation } from "@apollo/client";

import { Card, Row, Col, Image, Form } from "react-bootstrap";

const ADD_RATING_MUTATION = gql`
  mutation addRating($organization_id: Int!, $user_id: Int!, $text: String!, $stars: Int!) {
    addRating(organization_id: $organization_id, user_id: $user_id, text: $text, stars: $stars)
  }
`;

export function OrganizationDetailRatings({ ratings, userData, organizationFetcher }) {

    const displayedRatings = ratings.slice(-5);

    const [ratingText, setRatingText] = useState(undefined);

    const handleChange = (e) => {
        setRatingText(e.target.value);
    }

    const handleSubmit = (e) => {
        //console.log(e.key);

        if (!ratingText) {
            return;
        }
        if (e.key === "Enter" && !e.shiftKey) {

            //TODO: send ratingText & starState to db, refetch after
            addRatingHandler({
                variables:
                {
                    organization_id: organizationFetcher.data.organization.user_id,
                    user_id: userData.sportsman.user_id,
                    text: ratingText,
                    stars: starState.filter(s => s).length
                }
            });
        }

    }

    const [addRatingHandler] = useMutation(
        ADD_RATING_MUTATION,
        {
            onCompleted: () => {
                organizationFetcher.refetch();
            },
        }
    );

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
    }

    const handleSetStarClick = (index, value) => {
        handleSetStar(index, value)
        setStarsClicked(true);
    }

    return (
        <>
            {ratings && displayedRatings.map((rating) => (
                <Col xl={3} lg={4} md={6} sm={12} key={rating.id}>
                    <Card className="borderNone">
                        <Card.Body>
                            <Row style={{ paddingBottom: "1.5rem" }}>
                                <Col lg={4} xs={5}>
                                    <Image src={rating.sportsman.profile_photo && rating.sportsman.profile_photo.url} style={{ maxWidth: "100%", height: "5rem" }} roundedCircle fluid></Image>
                                </Col>
                                <Col>
                                    <Row style={{ fontSize: "3vh" }}>{rating.sportsman.firstname + " " + rating.sportsman.lastname}</Row>
                                    <Row>
                                        {[...Array(rating.stars)].map((_, index) =>
                                            <Col lg={1} sm={1} xs={2} className="organization-detail-rating-star star-full" key={index}><Image src="/images/icons/star-solid.svg"></Image></Col>
                                        )}
                                        {[...Array(5 - rating.stars)].map((_, index) =>
                                            <Col lg={1} sm={1} xs={2} className="organization-detail-rating-star" key={index}><Image src="/images/icons/star-regular.svg"></Image></Col>
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
            <Col xl={3} lg={4} md={6} xs={12}>
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
                                        <Col lg={1} sm={1} xs={2} className={classNames("organization-detail-rating-star", { "star-full": starState[index] })} id={index} key={index}>
                                            <Image src={(starState[index] ? "/images/icons/star-solid.svg" : "/images/icons/star-regular.svg")}
                                                onClick={(e) => handleSetStarClick(index, true)}
                                                onMouseEnter={(e) => handleSetStar(index, true)}
                                                onMouseLeave={(e) => handleSetStar(index, false)} />
                                        </Col>
                                    )}
                                </Row>
                            </Col>
                        </Row>
                        <Form>
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
                                        value={ratingText}
                                        onChange={(e) => handleChange(e)}
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