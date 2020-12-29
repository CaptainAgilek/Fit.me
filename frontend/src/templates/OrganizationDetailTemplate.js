import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
} from "src/organisms/";

export function OrganizationDetailTemplate({
    /*loading, error, actionSuccess, setActionSuccess*/
}) {
    return (
        <>
            <Navigation />
            {/*{loading && <Loading />}
            {error && <ErrorBanner message={error.message} />}
            <div id="alerts" className="fixed-top mt-1">
                {
                    <CustomAlert
                        headingText={actionSuccess.message}
                        setActionSuccess={setActionSuccess}
                        variant={actionSuccess.variant}
                    />
                }
            </div>*/}

            <div className="headerImg organization-detail-header organization-profile-section-container">Form factory fitness club vinohradská</div>

            <Container className="organization-profile-top-margin organization-profile-section-container">


                <Row className="d-flex justify-content-center organization-detail-slogan-first">Můžeme ti nabídnout</Row>
                <Row className="d-flex justify-content-center organization-detail-slogan-second">mnohem více než ostatní</Row>




            </Container>

            <Footer />
        </>
    );
}
