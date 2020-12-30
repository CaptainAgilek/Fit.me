import React, { useState } from "react";

import { gql, useLazyQuery } from "@apollo/client";
import DatePicker from "react-datepicker";
import TimeRangeSlider from "react-time-range-slider";
import { Col, Row, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import moment from "moment";

import { Loading, HeaderImg, SimpleBanner } from "src/atoms/";
import { Footer, ErrorBanner } from "src/molecules/";
import { Navigation } from "src/organisms/";

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

export function SignedInUserLandingTemplate({ error }) {
  const currentDate = new Date();

  const [timeFilter, setTimeFilter] = useState({
    start: moment(currentDate.toISOString()).format("HH:mm"),
    end: "23:59",
  });
  const [dateFilter, setDateFilter] = useState(currentDate);
  const [cityFilter, setCityFilter] = useState("Praha");
  const [categoryFilter, setCategoryFilter] = useState();

  const [getActionsQuery, { loading, data }] = useLazyQuery(
    FILTERED_ACTIONS_QUERY
  );

  const requestActions = async ({ filter }) => {
    console.log("requesting actions with filter", filter);

    getActionsQuery({ variables: { filter } });
  };

  return (
    <>
      <Navigation />
      <HeaderImg img="/images/landing_page_header.jpg" className="d-flex">
          <SimpleBanner headline="Najdi si cvičení přesně pro tebe">Rychle a jednoduše</SimpleBanner>
      </HeaderImg>
      {error && <ErrorBanner message={error.message} />}

      <Container className="organization-profile-top-margin organization-profile-section-container">
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
