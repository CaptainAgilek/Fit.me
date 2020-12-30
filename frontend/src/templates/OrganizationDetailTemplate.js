import React, { useEffect, useState } from "react";

import { Container, Row, Col, Carousel, Image } from "react-bootstrap";

import {
    Footer,
    OrganizationMenu,
    ActionsListReadonly,
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

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


export function OrganizationDetailTemplate({
    state, error, actionSuccess, setActionSuccess, organizationFetcher, userFetcher, servicesState, mapProvider, actionsState
}) {
    const [locationState, setLocationState] = useState(null);
    useEffect(() => {
        const getLocation = async () => {
            if (!error) {
                const res = await mapProvider.search({
                    query: organizationFetcher.data.organization.places[0].street + ", " +
                        organizationFetcher.data.organization.places[0].zip + " " +
                        organizationFetcher.data.organization.places[0].city
                });
                //console.log(res, "res");
                setLocationState(res[0]);
            }
        };

        getLocation();
    }, [mapProvider, organizationFetcher.data, error]);
    //console.log(error, "err");

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
            {/*state.showData && mapProvider.search({ query: organizationFetcher.data.organization.places[0].city }).then((res) => console.log(res))*/}
            {state.showData && console.log(mapProvider.search({ query: organizationFetcher.data.organization.places[0].city }))}
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
                            <Col xl={4} className="organization-detail-info">
                                <Row>
                                    <Carousel indicators={true} controls={false} className="organization-detail-carousel-container">
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
                                    <Col className="organization-detail-carousel-container">
                                        <Row className="organization-detail-info-line">
                                            <Col xl={1}>
                                                <Image src="/images/icons/map-marker-alt-solid.svg" fluid></Image>
                                            </Col>

                                            {organizationFetcher.data.organization.places[0].street + ", " +
                                                organizationFetcher.data.organization.places[0].zip + " " +
                                                organizationFetcher.data.organization.places[0].city + ", " +
                                                organizationFetcher.data.organization.places[0].country}
                                        </Row>
                                        <Row className="organization-detail-info-line">
                                            <Col xl={1}>
                                                <Image src="/images/icons/phone-alt-solid.svg" fluid></Image>
                                            </Col>

                                            {organizationFetcher.data.organization.phone}
                                        </Row>
                                        <Row className="organization-detail-info-line">
                                            <Col xl={1}><Image src="/images/icons/mail.svg" fluid></Image></Col>

                                            {organizationFetcher.data.organization.user.email}
                                        </Row>
                                        <Row className="organization-detail-info-line">
                                            <Col xl={1}><Image src="/images/icons/external-link-alt-solid.svg" fluid></Image></Col>

                                            <a href={window.location.href}>{window.location.href}</a>
                                        </Row>
                                        <Row className="organization-detail-info-line">
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
                            <Col xl={4} className="organization-detail-info">
                                {locationState && console.log(locationState)}
                                {locationState &&
                                    <MapContainer center={[locationState.y, locationState.x]} zoom={13} scrollWheelZoom={false} className="map-container organization-detail-carousel-container" >
                                        <TileLayer
                                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={[locationState.y, locationState.x]}></Marker>
                                    </MapContainer>
                                }
                            </Col>
                        </Row>

                        <Row className="organization-profile-section-container justify-content-center ">
                            <Col lg={10} className="organization-detail-actions">

                                <Row className="justify-content-center "><h2>Připravované akce</h2></Row>

                                <Row className="justify-content-center "><Col lg={5}><hr class="organization-detail-hr"></hr></Col></Row>
                                <Row className="justify-content-center ">
                                    {console.log(actionsState, "aState")}
                                    {actionsState && actionsState.data &&
                                        <ActionsListReadonly organizationData={organizationFetcher.data}
                                            organizationLoading={organizationFetcher.showLoading}
                                            actions={actionsState.data.actionsForPlace}
                                            actionsState={actionsState}
                                            editable={false}
                                            setActionSuccess={setActionSuccess} />}
                                </Row>
                            </Col>
                        </Row>

                    </Container>
                </>
            }
            <Footer />
        </>
    );
}
