import React from 'react';
import { Navigation } from 'src/organisms/';
import { CustomDatePicker } from 'src/atoms/';
import { Footer, OrganizationMenu } from 'src/molecules/';
import { Col, Row, Container, ListGroup } from 'react-bootstrap';

import { Button, Tab, Image, Form } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import { FormikGroup } from '../molecules';

export function OrganizationProfileTemplate() {
  return (
    <>
      <Navigation />
      <div className="headerImg">
        <OrganizationMenu />
      </div>
      <Container className="organization-profile-top-margin">
        <Col>
          <h1>Kalendář akcí</h1>
          <Row>
            <CustomDatePicker />
            až
            <CustomDatePicker />
          </Row>
        </Col>
      </Container>

      <Container>
        <Row>
          <Col>
            <h1>Trenéři</h1>
          </Col>
        </Row>

        {/* add img to form as well so we dont have to split form and it keeps the layout */}

        <Tab.Container defaultActiveKey="#link1">
          <Row>
            <Col sm={4}>
              <ListGroup
                defaultActiveKey="#"
                className="organization-profile-trainer-select"
              >
                <ListGroup.Item
                  action
                  href="#link1"
                  className="organization-profile-trainer-tab"
                >
                  Sofia Taty
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  href="#link2"
                  className="organization-profile-trainer-tab"
                >
                  Tobias Reuter
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                <Tab.Pane eventKey="#link1">
                  <Container>
                    <Formik
                      initialValues={{
                        facebook: '',
                        instagram: '',
                        description: '',
                        name: '',
                      }}
                    >
                      <Form>
                        <Row>
                          <Col xs={12} sm={6} md={6} lg={5} xl={4}>
                            <Row>
                              <Image
                                src="/images/icons/calendar.png"
                                fluid
                              ></Image>
                            </Row>
                            <Row>
                              <Form.Row className="d-flex align-items-center">
                                <Col sm={2} xs={2}>
                                  <Image
                                    src="/images/icons/facebook-f-brands.svg"
                                    fluid
                                    className="organization-profile-icon-svg"
                                  ></Image>
                                </Col>
                                <Col xs={8} sm={10} md={10} lg={10} xl={10}>
                                  <FormikGroup name="facebook" id="facebook" />
                                </Col>
                              </Form.Row>
                              <Form.Row className="d-flex align-items-center">
                                <Col sm={2} xs={2}>
                                  <Image
                                    src="/images/icons/instagram-square-brands.svg"
                                    fluid
                                    className="organization-profile-icon-svg"
                                  ></Image>
                                </Col>
                                <Col xs={8} sm={10} md={10} lg={10} xl={10}>
                                  <FormikGroup
                                    name="instagram"
                                    id="instagram"
                                  />
                                </Col>
                              </Form.Row>
                            </Row>
                          </Col>
                          <Col>
                            <Form.Row>
                              <FormikGroup
                                name="name"
                                id="name"
                                label="JMÉNO"
                              />
                            </Form.Row>
                            <Form.Row>
                              <Form.Group
                                name="description"
                                id="description"
                                as={Col}
                              >
                                <Form.Label>POPIS</Form.Label>
                                <Form.Control as="textarea"></Form.Control>
                              </Form.Group>
                            </Form.Row>
                            <Form.Row className="d-flex flex-row-reverse">
                              <Button
                                className="organization-primary-button"
                                variant="success"
                                size="sm"
                                type="submit"
                              >
                                ULOŽIT
                              </Button>
                              <Button
                                className="organization-primary-button"
                                variant="outline-success"
                                size="sm"
                                type="submit"
                              >
                                NOVÝ TRENÉR
                              </Button>
                            </Form.Row>
                          </Col>
                        </Row>
                      </Form>
                    </Formik>
                  </Container>
                </Tab.Pane>
                <Tab.Pane eventKey="#link2">testdesc2</Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>

      <Footer />
    </>
  );
}
