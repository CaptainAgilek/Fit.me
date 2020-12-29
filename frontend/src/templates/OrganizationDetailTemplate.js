import React from "react";

import { Container, Row, Col, Carousel, Image } from "react-bootstrap";

import {
    Footer,
    OrganizationMenu,
    ActionsList,
    ErrorBanner,
    TestimonialBoxCol,
} from "src/molecules/";
import { Loading, CustomAlert } from "src/atoms/";
import {
    UserProfileForm,
    UserProfileManagementCol,
    Navigation,
    ProfileServicesReadonly
} from "src/organisms/";

export function OrganizationDetailTemplate({
    state, error, actionSuccess, setActionSuccess, organizationFetcher, userFetcher, servicesState
}) {
    return (
        <>
            <Navigation />
            {state.showLoading && <Loading />}
            {error && !state.showLoading && <ErrorBanner message={error.message} />}
            <div id="alerts" className="fixed-top mt-1">
                {
                    <CustomAlert
                        headingText={actionSuccess.message}
                        setActionSuccess={setActionSuccess}
                        variant={actionSuccess.variant}
                    />
                }
            </div>
            {
                //userFetcher && console.log(userFetcher)
            }
            {
                //organizationFetcher && console.log(organizationFetcher)
            }
            { console.log(state)}
            { console.log(servicesState)}
            {state.showData &&
                <>
                    <div className="headerImg organization-detail-header organization-profile-section-container">
                        {organizationFetcher.data.organization && organizationFetcher.data.organization.organization_name}
                    </div>

                    <Container className="organization-profile-top-margin organization-profile-section-container" fluid>

                        <Row className="d-flex justify-content-center organization-detail-slogan-first">Můžeme ti nabídnout</Row>
                        <Row className="d-flex justify-content-center organization-detail-slogan-second">mnohem více než ostatní</Row>

                        <Row className="justify-content-center organization-profile-section-container">
                            <Col sm="12" md="11">
                                {servicesState && <ProfileServicesReadonly servicesState={servicesState} user_id={organizationFetcher.data.organization.user_id} />}
                            </Col>
                        </Row>
                        <Row className="justify-content-center organization-profile-section-container">
                            <Col xl={4}>
                                <Row>
                                    <Carousel indicators={true} controls={false}>
                                        {organizationFetcher.data.organization.photo_gallery.map((photo) =>
                                            (
                                                <Carousel.Item>
                                                    <Image src={photo.url} fluid />
                                                </Carousel.Item>
                                            ))}
                                    </Carousel>
                                </Row>
                                <Row>
                                    { /* zakladni info */}
                                    <Col>
                                        <Row>
                                            <Col xl={1}>
                                                <Image src="/images/icons/map-marker-alt-solid.svg" fluid></Image>
                                            </Col>

                                            {organizationFetcher.data.organization.places[0].street + ", " +
                                                organizationFetcher.data.organization.places[0].zip + " " +
                                                organizationFetcher.data.organization.places[0].city + ", " +
                                                organizationFetcher.data.organization.places[0].country}
                                        </Row>
                                        <Row>
                                            <Col xl={1}>
                                                <Image src="/images/icons/phone-alt-solid.svg" fluid></Image>
                                            </Col>

                                            {organizationFetcher.data.organization.phone}
                                        </Row>
                                        <Row>
                                            <Col xl={1}><Image src="/images/icons/mail.svg" fluid></Image></Col>

                                            {organizationFetcher.data.organization.user.email}
                                        </Row>
                                        <Row>
                                            <Col xl={1}><Image src="/images/icons/external-link-alt-solid.svg" fluid></Image></Col>

                                            <a href={window.location.href}>{window.location.href}</a>
                                        </Row>
                                        <Row>
                                            <Col xl={1}><Image src="/images/icons/check-circle-regular.svg" fluid></Image></Col>

                                            Možnost uplatnění&nbsp;
                                            {organizationFetcher.data.organization.acceptedBenefits.map((benefit) =>
                                                (
                                                    benefit.name + " "
                                                ))}
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xl={4}>
                                test
                            </Col>
                        </Row>

                    </Container>
                </>
            }
            <Footer />
        </>
    );
}
