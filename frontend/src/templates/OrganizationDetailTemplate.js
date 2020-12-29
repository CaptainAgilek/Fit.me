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
    ProfileServicesReadonly
} from "src/organisms/";

export function OrganizationDetailTemplate({
    state, error, actionSuccess, setActionSuccess, organizationFetcher, userFetcher
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
                userFetcher && console.log(userFetcher)
            }
            {
                organizationFetcher && console.log(organizationFetcher)
            }
            { console.log(state)}
            {state.showData &&
                <>
                    <div className="headerImg organization-detail-header organization-profile-section-container">
                        {organizationFetcher.data.organization && organizationFetcher.data.organization.organization_name}
                    </div>

                    <Container className="organization-profile-top-margin organization-profile-section-container">

                        <Row className="d-flex justify-content-center organization-detail-slogan-first">Můžeme ti nabídnout</Row>
                        <Row className="d-flex justify-content-center organization-detail-slogan-second">mnohem více než ostatní</Row>

                        <Row className="justify-content-center organization-profile-section-container">
                            <Col sm="12" md="11">
                                {/*<ProfileServicesReadonly servicesState={ } user_id={ }  />*/}
                            </Col>
                        </Row>


                    </Container>
                </>
            }
            <Footer />
        </>
    );
}
