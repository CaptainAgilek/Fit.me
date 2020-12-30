import React from "react";

import { ListGroup } from "react-bootstrap";

import { OrganizationPricingCard } from "src/molecules/OrganizationPricingCard";

export function OrganizationPricing() {
    return (
        <ListGroup horizontal>
            <ListGroup.Item className="borderNone">
                <OrganizationPricingCard title={"Jednodenní trénink"} price={"9.99"} items={["Placeholder", "Placeholder", "Placeholder"]} highlighted={false} />
            </ListGroup.Item>
            <ListGroup.Item className="borderNone">
                <OrganizationPricingCard title={"Standardní přístup"} price={"29.99"} items={["Placeholder", "Placeholder", "Placeholder"]} highlighted={true} />
            </ListGroup.Item>
            <ListGroup.Item className="borderNone">
                <OrganizationPricingCard title={"Neustálý přístup"} price={"59.99"} items={["Placeholder", "Placeholder", "Placeholder"]} highlighted={false} />
            </ListGroup.Item>
        </ListGroup>
    );
}