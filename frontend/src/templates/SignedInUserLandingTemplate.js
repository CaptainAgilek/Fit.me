import React, { useState, useEffect } from "react";

import { gql, useLazyQuery } from "@apollo/client";
import DatePicker from "react-datepicker";
import TimeRangeSlider from "react-time-range-slider";
import { Col, Row, Container, Card, Button, Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import moment from "moment";
import Autocomplete from "react-autocomplete";
import PaginationList from "react-pagination-list";
import { Formik, Field } from "formik";
import { route } from "src/Routes";

import { Loading, HeaderImg, SimpleBanner } from "src/atoms/";
import { Footer, ErrorBanner, CategoryBoxCol } from "src/molecules/";
import { Navigation } from "src/organisms/";
import { JsonProvider } from "leaflet-geosearch";

const FILTERED_ACTIONS_QUERY = gql`
  query filteredActions($filter: ActionsFilter!) {
    filteredActions(filter: $filter) {
      action_id
      place_id
      date
      time
      price
      trainer_id
      max_capacity
      name
      photo_id
      photo {
        photo_id
        url
      }
    }
  }
`;

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
  const [location, setLocation] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);

      console.log(mapProvider.endpoint({query: "lat=" + position.coords.latitude + "&lon=" + position.coords.longtitude, type: JsonProvider.REVERSE}));
      setLocation(position);
    });
  }, []);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [addressCity, setAddressCity] = useState("Praha");
  const [foundOrganizations, setFoundOrganizations] = useState([]);

  const currentDate = new Date();

  const [timeFilter, setTimeFilter] = useState({
    start: moment(currentDate.toISOString()).format("HH:mm"),
    end: "23:59",
  });
  const [dateFilter, setDateFilter] = useState(currentDate);
  const [cityFilter, setCityFilter] = useState("Praha");
  const [categoryFilter, setCategoryFilter] = useState();

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
      const filteredByCategory = selectedCategory ? orgsData.filter(org => org.user.services.some(service => service.service_id === selectedCategory)) : orgsData;

      setFoundOrganizations(filteredByCategory);
    },
  });

  const [getActionsQuery, { loading, data }] = useLazyQuery(
    FILTERED_ACTIONS_QUERY
  );

  const requestActions = async ({ filter }) => {
    console.log("requesting actions with filter", filter);

    getActionsQuery({ variables: { filter } });
  };

  const [searchResults, setSearchResults] = useState([]);

  const updateResults = async (input) => {
    const res = await mapProvider.search({
      query: input,
    });
    console.log(res);
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
              <Formik
                initialValues={{ value: "" }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    getOrganizationsByCityStringQuery({
                      variables: { cityString: values.value },
                    });

                    setSubmitting(false);
                  }, 400);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  setFieldValue,
                  /* and other goodies */
                }) => (
                  <>
                    <form
                      onSubmit={handleSubmit}
                      onChange={(e) => updateResults(e.target.value)}
                    >
                      <Autocomplete
                        getItemValue={(item) => item.label}
                        items={searchResults}
                        renderMenu={(children) =>
                          children && (
                            <div className="result-menu">{children}</div>
                          )
                        }
                        wrapperStyle={{
                          position: "relative",
                          display: "inline-block",
                        }}
                        renderItem={(item, isHighlighted) => (
                          <div
                            style={{
                              background: isHighlighted ? "lightgray" : "white",
                            }}
                          >
                            {item.label}
                          </div>
                        )}
                        renderInput={function (props) {
                          return <input {...props} style={{ width: "60vw" }} />;
                        }}
                        value={values.value}
                        onChange={(e) => setFieldValue("value", e.target.value)}
                        onSelect={(val) => setFieldValue("value", val)}
                      />
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="ml-2 mb-1"
                      >
                        Hledat
                      </Button>
                    </form>
                  </>
                )}
              </Formik>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="justify-content-center justify-items-center text-center mt-5">
            {loadingOrg && <Loading />}
            {foundOrganizations && (
              <PaginationList
                data={foundOrganizations}
                pageSize={5}
                renderItem={(item, key) => (
                  <Card key={key} style={{ width: "60vw" }} className="mb-3">
                    <div className="d-flex">
                      <Card.Img
                        variant="top"
                        src={item.profile_photo.url}
                        style={{ width: "25%", textAlign: "left" }}
                      />
                      <div
                        style={{
                          textAlign: "left",
                          padding: "10px",
                          width: "100%",
                        }}
                      >
                        <Card.Title>{item.organization_name}</Card.Title>
                        <Card.Text>
                          <Row className="m-0">
                            {[...Array(5)].map((star, index) => (
                              <div
                                className={
                                  "organization-detail-rating-star" +
                                  (index + 1 <= item.avgSum ? " star-full" : "")
                                }
                                key={index}
                              >
                                <Image
                                  src={
                                    "/images/icons/" +
                                    (index + 1 <= item.avgSum
                                      ? "star-solid.svg"
                                      : "star-regular.svg")
                                  }
                                  style={{ width: "23px" }}
                                ></Image>
                              </div>
                            ))}
                          </Row>

                          <a
                            href={
                              route.organizationDetailPage() +
                              "?organizationId=" +
                              item.user_id
                            }
                            target="_blank"
                          >
                            <Button
                              variant="primary"
                              style={{ float: "right" }}
                              className="mt-5"
                            >
                              Detail
                            </Button>
                          </a>
                        </Card.Text>
                      </div>
                    </div>
                  </Card>
                )}
              />
            )}
          </Col>
        </Row>
        <Row className="justify-content-md-center organization-profile-section-container">
          <h1>Filtr</h1>
        </Row>

        <Row className="justify-content-md-center organization-profile-section-container">
          <Col sm="12" md="4">
            <DatePicker
              className="mx-2"
              dateFormat="dd/MM/yyyy"
              selected={dateFilter}
              onChange={(date) => {
                const filter = {
                  date: moment(date.toISOString()).format("YYYY-MM-DD"),
                  hourStart: timeFilter.start,
                  hourEnd: timeFilter.end,
                  city: cityFilter,
                  category_id: categoryFilter,
                };
                setDateFilter(date);
                requestActions({ filter: filter });
              }}
            />
          </Col>

          <Col sm="12" md="7">
            <p>
              Začátek: {timeFilter.start} Konec: {timeFilter.end}
            </p>
            <TimeRangeSlider
              disabled={false}
              format={24}
              maxValue={"23:59"}
              minValue={"00:00"}
              name={"time_range"}
              onChangeComplete={(time) => {
                const filter = {
                  date: moment(dateFilter.toISOString()).format("YYYY-MM-DD"),
                  hourStart: timeFilter.start,
                  hourEnd: timeFilter.end,
                  city: cityFilter,
                  category_id: categoryFilter,
                };
                requestActions({ filter: filter });
              }}
              onChange={(time) => {
                setTimeFilter(time);
              }}
              step={60}
              value={timeFilter}
            />
          </Col>
        </Row>

        <Row className="justify-content-md-center organization-profile-section-container">
          <Col sm="12" md="4">
            <Form>
              <Form.Row>
                <Form.Label>Město</Form.Label>
                <Form.Control
                  id="actionsCityFilter"
                  as="select"
                  onChange={(event) => {
                    const filter = {
                      date: moment(dateFilter.toISOString()).format(
                        "YYYY-MM-DD"
                      ),
                      hourStart: timeFilter.start,
                      hourEnd: timeFilter.end,
                      city: event.target.value,
                      category_id: categoryFilter,
                    };
                    setCityFilter(event.target.value);
                    requestActions({ filter: filter });
                  }}
                >
                  <option value="Praha">Praha</option>
                  <option value="Bratislava">Bratislava</option>
                </Form.Control>

                <Form.Label>Sport - CATEGORY CHYBI V DB</Form.Label>
                <Form.Control
                  id="categoriesCityFilter"
                  as="select"
                  onChange={(event) => {
                    const categoryID = parseInt(event.target.value);
                    const filter = {
                      date: moment(dateFilter.toISOString()).format(
                        "YYYY-MM-DD"
                      ),
                      hourStart: timeFilter.start,
                      hourEnd: timeFilter.end,
                      city: cityFilter,
                      category_id: categoryID,
                    };
                    setCategoryFilter(categoryID);
                    requestActions({ filter: filter });
                  }}
                >
                  {/** hodnota value muze sedet s category_id v DB (jestli ty
                  categories budou "hardcoded"), usetrime tim praci

                  mozna pujde neco podobnyho i u mesta ... zalezi jestli tam zustane
                  nejaky dropdown*/}
                  <option value="null">Vše</option>
                  <option value="1">Aerial Jóga</option>
                  <option value="2">Gravid Jóga</option>
                  <option value="3">Hot Jóga</option>
                  <option value="4">Strala Jóga</option>
                  <option value="5">Jóga pro začátečníky</option>
                  <option value="6">Body Pump</option>
                  <option value="7">Krav Maga</option>
                  <option value="8">Thai Box</option>
                  <option value="9">Kruhový trénink</option>
                  <option value="10">Soukromé Lekce</option>
                  <option value="11">Sportovní aerobik</option>
                  <option value="12">Pilates</option>
                  <option value="13">Plavání</option>
                  <option value="14">Pole Dance</option>
                  <option value="15">Zumba</option>
                </Form.Control>
              </Form.Row>
            </Form>
          </Col>
        </Row>

        {loading && <Loading />}

        {data && (
          <>
            <Row className="justify-content-md-center organization-profile-section-container">
              <h1>Seznam hodin</h1>
            </Row>

            <Row className="justify-content-md-center organization-profile-section-container">
              <Col sm="12" md="11">
                <ListGroup>
                  {data.filteredActions.map((action) => (
                    <ListGroup.Item
                      key={action.action_id}
                      className="borderNone"
                    >
                      <p>
                        Jméno hodiny: {action.name} <br />
                        Datum: {action.date} <br />
                        Čas: {action.time}
                      </p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
}
