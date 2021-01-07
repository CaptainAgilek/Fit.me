import React, { useState, useEffect } from "react";

import { gql, useLazyQuery } from "@apollo/client";
import { Col, Row, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import moment from "moment";

import { Loading, HeaderImg, SimpleBanner } from "src/atoms/";
import {
  Footer,
  ErrorBanner,
  CategoryBoxCol,
  OrganizationDetailMap,
  OrganizationPaginationList,
} from "src/molecules/";
import { Navigation, SearchCityForm } from "src/organisms/";
import { RequestType } from "leaflet-geosearch/lib/providers/provider";

const ORGANIZATIONS_QUERY = gql`
  query getOrganizationsByCityString($cityString: String!) {
    getOrganizationsByCityString(cityString: $cityString) {
      user_id
      user {
        services {
          service_id
          name
        }
      }
      organization_name
      profile_photo {
        url
      }
      places {
        city
      }
      ratings {
        stars
      }
    }
  }
`;

export function SignedInUserLandingTemplate({ error, mapProvider }) {
  const [location, setLocation] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const searchQuery = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        zoom: 10,
      };
      const reverseUrl = mapProvider.endpoint({
        query: searchQuery,
        type: RequestType.REVERSE,
      });

      async function fetchAddress(url) {
        const result = await fetch(url);
        const json = await result.json();
        const parsed = mapProvider.parse({ data: json });
        {
          /* console.log(parsed[0].label);
        setLocation(parsed[0].label);*/
        }
      }
      fetchAddress(reverseUrl);
    });
  }, []);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [addressCity, setAddressCity] = useState("Praha");
  const [foundOrganizations, setFoundOrganizations] = useState([]);

  const currentDate = new Date();

  const [
    getOrganizationsByCityStringQuery,
    { loadingOrg, dataOrg },
  ] = useLazyQuery(ORGANIZATIONS_QUERY, {
    onCompleted: (data) => {
      const orgsData = data.getOrganizationsByCityString.map((org) => ({
        ...org,
        avgSum:
          org.ratings.map((r) => r.stars).reduce((a, b) => a + b, 0) /
          (org.ratings.length | 1),
      }));

      /*filter organizations by category */
      const filteredByCategory = selectedCategory
        ? orgsData.filter((org) =>
            org.user.services.some(
              (service) => service.service_id === selectedCategory
            )
          )
        : orgsData;

      setFoundOrganizations(filteredByCategory);
    },
  });

  const [searchResults, setSearchResults] = useState([]);

  const updateResults = async (input) => {
    const res = await mapProvider.search({
      query: input,
    });
    setSearchResults(res);
  };
  return (
    <>
      <Navigation />
      <HeaderImg img="/images/landing_page_header.jpg" className="d-flex">
        <SimpleBanner headline="Najdi si cvičení přesně pro tebe">
          Rychle a jednoduše
        </SimpleBanner>
      </HeaderImg>
      {error && <ErrorBanner message={error.message} />}

      <Container className="organization-profile-top-margin organization-profile-section-container">
        <Row>
          <CategoryBoxCol
            selectedCategory={selectedCategory}
            selectCategory={setSelectedCategory}
          />
        </Row>
        <Row>
          <Col className="justify-content-center justify-items-center text-center mt-5">
            <h1>Zadejte město</h1>
            <div>
              <SearchCityForm
                initialValues={{ value: location }}
                getOrganizationsByCityStringQuery={
                  getOrganizationsByCityStringQuery
                }
                updateResults={updateResults}
                searchResults={searchResults}
              />
            </div>
          </Col>
        </Row>
        <Row>
          {loadingOrg && <Loading />}
          {foundOrganizations && foundOrganizations.length > 0 && (
            <>
              <Col>
                <OrganizationPaginationList
                  foundOrganizations={foundOrganizations}
                />
              </Col>
              <OrganizationDetailMap locationState={[{ x: 10, y: 20 }]} />
            </>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
}
