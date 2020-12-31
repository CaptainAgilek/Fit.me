import React from "react";

import { Card, Row, Button } from "react-bootstrap";

export function OrganizationPricingCard({ title, price, items, highlighted }) {
    return (
        <Card style={{ backgroundColor: highlighted ? "rgba(44, 44, 44, 0.07)" : "rgba(150, 198, 72, 0.25)" }}>
            <Card.Body>
                <Card.Title style={{ fontSize: "2.5vh" }}>{title}</Card.Title>
                <ul>
                    <li style={{ display: "inline", fontSize: "8vh" }}>{price}</li>
                    {items.map((item, index) => (<li key={index}>{item}</li>))}
                </ul>
                <Row className="justify-content-center"><Button variant="outline-success" className="sportsman-secondary-button">Rezervovat</Button></Row>
            </Card.Body>
        </Card>
    );
}