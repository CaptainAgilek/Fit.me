import React from "react";

import { Row, Col, Carousel, Image } from "react-bootstrap";

import { OrganizationDetailInfoLine } from "src/atoms/OrganizationDetailInfoLine";

export function OrganizationDetailInfo({ organizationFetcher }) {
  const acceptedBenefits =
    "Možnost uplatnění " +
    organizationFetcher.data.organization.acceptedBenefits
      .map((benefit) => " " + benefit.name)
      .toString();

  return (
    <Col xl={4} className="organization-detail-info">
      <Row>
        <Carousel
          indicators={true}
          controls={false}
          className="organization-detail-carousel-container"
        >
          {organizationFetcher.data.organization.photo_gallery.map((photo) => (
            <Carousel.Item key={photo.photo_id}>
              <Image src={photo.url} fluid />
            </Carousel.Item>
          ))}
        </Carousel>
      </Row>
      <Row>
        {/* zakladni info */}
        <Col className="organization-detail-carousel-container">
          <OrganizationDetailInfoLine
            image={"/images/icons/map-marker-alt-solid.svg"}
            text={
              organizationFetcher.data.organization.places[0].street +
              ", " +
              organizationFetcher.data.organization.places[0].zip +
              " " +
              organizationFetcher.data.organization.places[0].city +
              ", " +
              organizationFetcher.data.organization.places[0].country
            }
          />
          <OrganizationDetailInfoLine
            image={"/images/icons/phone-alt-solid.svg"}
            text={organizationFetcher.data.organization.phone}
          />
          <OrganizationDetailInfoLine
            image={"/images/icons/mail.svg"}
            text={organizationFetcher.data.organization.user.email}
          />
          <OrganizationDetailInfoLine
            image={"/images/icons/external-link-alt-solid.svg"}
            text={<a href={window.location.href}>{window.location.href}</a>}
          />
          <OrganizationDetailInfoLine
            image={"/images/icons/check-circle-regular.svg"}
            text={acceptedBenefits}
          />
        </Col>
      </Row>
    </Col>
  );
}
