import React from "react";

import { Row, Col, Image, Card, Carousel } from "react-bootstrap";

import { TrainerCard } from "src/molecules/TrainerCard";

export function TrainersList({ trainers }) {
    const makePairs = () => {
        let retVal = [];
        for (let i = 0; i < trainers.length; i++) {
            let tmp = [];
            tmp[0] = trainers[i];
            if (i + 1 < trainers.length) {
                tmp[1] = trainers[i + 1];
                retVal.push(tmp);
            }
            else {
                retVal.push(tmp);
                break;
            }
            i++;
        }

        return retVal;
    };

    const pairs = makePairs(trainers);

    console.log(pairs, "pairs");

    return (
        <Col lg={6}>
            <Carousel indicators={true} controls={false} className="organization-detail-carousel-container">

                {pairs.map(pair =>
                    (
                        <Carousel.Item className="organization-detail-trainers-carousel-item" key={pair[0].user_id}>
                            {pair[0] && <TrainerCard trainer={pair[0]} order={1} />}
                            {pair[1] && <TrainerCard trainer={pair[1]} order={2} />}
                        </Carousel.Item>
                    ))}
                {/*<Row style={{ paddingBottom: "35rem" }}></Row>*/}
                {/*<Row style={{ paddingBottom: "1rem" }}>
                        <Col lg={5} style={{ paddingRight: "0" }}>
                            <Image src={"http://dev.backend.team02.vse.handson.pro/photos/alonso-reyes-0HlI76m4jxU-unsplash-copy.jpg"} fluid></Image>
                        </Col>
                        <Col lg={7} style={{ paddingLeft: "0" }}>
                            <Card style={{ height: "100%", width: "100%", color: "#ffffff", backgroundColor: "rgba(44, 44, 44, 0.77)" }}>
                                <Card.Body>
                                    <Card.Title>Tobias Reuter</Card.Title>
                                    <Row style={{ fontSize: "13px", marginBottom: "1rem" }}>Celoživotní sportovec! Ke každému klientovi přistupuji individuálně. V první řadě projde klient diagnostikou pohybového aparátu a potom nastavíme přesný tréninkový proces, vzhledem k jeho cíle. Spolu si nadefinujeme pravidla které nás dovedou k vytouženému cíli.</Row>
                                    <Row>
                                        <Col lg={2}><Image src="/images/icons/facebook-f-brands.svg" fluid style={{ maxWidth: "3vh", maxHeight: "3vh", filter: "invert(99%) sepia(0%) saturate(1489%) hue-rotate(184deg) brightness(81%) contrast(87%)" }}></Image></Col>
                                        <Col lg={10}>tobias.reuter@formfactory.cz</Col>
                                    </Row>
                                    <Row>
                                        <Col lg={2}><Image src="/images/icons/instagram-square-brands.svg" fluid style={{ maxWidth: "3vh", maxHeight: "3vh", filter: "invert(99%) sepia(0%) saturate(1489%) hue-rotate(184deg) brightness(81%) contrast(87%)" }}></Image></Col>
                                        <Col lg={10}>tobias.reuter</Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>*/}
                {/*<Row>
                        <Col lg={5} style={{ paddingRight: "0" }}>
                            <Image src={"http://dev.backend.team02.vse.handson.pro/photos/alonso-reyes-0HlI76m4jxU-unsplash-copy.jpg"} fluid></Image>
                        </Col>
                        <Col lg={7} style={{ paddingLeft: "0" }}>
                            <Card style={{ color: "#2c2c2c", height: "100%", width: "100%" }}>
                                <Card.Body>
                                    <Card.Title>Tobias Reuter</Card.Title>
                                    <Row style={{ fontSize: "13px", marginBottom: "1rem" }}>Celoživotní sportovec! Ke každému klientovi přistupuji individuálně. V první řadě projde klient diagnostikou pohybového aparátu a potom nastavíme přesný tréninkový proces, vzhledem k jeho cíle. Spolu si nadefinujeme pravidla které nás dovedou k vytouženému cíli.</Row>
                                    <Row>
                                        <Col lg={2}><Image src="/images/icons/facebook-f-brands.svg" fluid style={{ maxWidth: "3vh", maxHeight: "3vh", filter: "invert(99%) sepia(0%) saturate(1489%) hue-rotate(184deg) brightness(81%) contrast(87%)" }}></Image></Col>
                                        <Col lg={10}>tobias.reuter@formfactory.cz</Col>
                                    </Row>
                                    <Row>
                                        <Col lg={2}><Image src="/images/icons/instagram-square-brands.svg" fluid style={{ maxWidth: "3vh", maxHeight: "3vh", filter: "invert(99%) sepia(0%) saturate(1489%) hue-rotate(184deg) brightness(81%) contrast(87%)" }}></Image></Col>
                                        <Col lg={10}>tobias.reuter</Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>*/}

            </Carousel>
        </Col>
    );
}