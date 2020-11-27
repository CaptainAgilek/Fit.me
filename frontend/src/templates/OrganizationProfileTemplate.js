import React, { useRef } from 'react';
import { Navigation, OrganizationProfileGallery } from 'src/organisms/';
import {
  CustomDatePicker,
  GalleryPhotoTitle,
  OrganizationProfileSectionHeading,
} from 'src/atoms/';
import {
  Footer,
  OrganizationMenu,
  GalleryUploadPhotoButton,
  ActionCard,
  TestimonialBoxCol
} from 'src/molecules/';
import { Col, Row, Container, ListGroup, InputGroup } from 'react-bootstrap';

import { Button, Tab, Image, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { FormikGroup } from '../molecules';
import { gql, useMutation, useQuery } from '@apollo/client';

const GALLERY_QUERY = gql`
  query getGalleryPhotos($id: Int!) {
    organization(id: $id) {
      name
      user_id
      user {
        email
      }
      photo_gallery {
        url
        photo_id
        gallery_name
        is_profile_picture
      }
    }
  }
`;

const GALLERY_REMOVE_PHOTO_MUTATION = gql`
  mutation updateOrganizationGalleryPhoto(
    $input: UpdatePhotoGalleryNameInput!
  ) {
    updateOrganizationGalleryPhoto(input: $input)
  }
`;

const RATINGS_QUERY = gql`
  query getOrganizationRatings($id: Int!) {
    organization(id: $id) {
      ratings {
        id
        sportsman {
          firstname
          lastname
          profile_photo {
            url
          }
        }
        text
        stars
      }
    }
  }
`;

export function OrganizationProfileTemplate({ user, actionsState, organizationState }) {
  const id = user.user_id;
  const galleryFetcher = useQuery(GALLERY_QUERY, { variables: { id } });
  const data = galleryFetcher.data;
  const photoGallery =
    data === undefined ? undefined : data.organization.photo_gallery;

  const [removeGalleryPhotoHandler] = useMutation(
    GALLERY_REMOVE_PHOTO_MUTATION,
    {
      onCompleted: () => {
        galleryFetcher.refetch();
      },
    },
  );

  /* RATINGS TEST */
  const ratingsFetcher = useQuery(RATINGS_QUERY, { variables: { id } });
  const ratingsData = ratingsFetcher.data;
  const ratings =
    ratingsData === undefined ? undefined : ratingsData.organization.ratings;

  //console.log(ratingsFetcher);
  console.log(ratingsData);
  console.log(ratings);

  return (
    <>
      <Navigation />
      <div className="headerImg">
        <OrganizationMenu />
      </div>
      <Container className="organization-profile-top-margin">
      <h1 id="kalendar">Kalendář akcí</h1>
      <Row>
        <ListGroup horizontal className="horizontalScroll">
          {actionsState.data &&
            actionsState.data.actionsForPlace.map((action) => (
              <ListGroup.Item key={action.action_id} className="borderNone" style={{paddingLeft:"0.1rem"}}>
                <ActionCard
                  key={action.action_id}
                  img="/images/slide_1.jpg"
                  action={action}
                  editable={true}
                />
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Row>

      </Container>

      <Container className="organization-profile-section-container">
        <h1 id="treneri">Trenéři</h1>
        <Row className="d-flex align-items-center">
          <Col xs={2}>
            <input
              class="custom-select custom-select-sm"
              list="encodings"
              id="encodingsInput"
            />
            <datalist id="encodings">
              <option value="Sofia Taty"></option>
              <option value="Tobias Reuter"></option>
            </datalist>
          </Col>

          <Col xs={2}>
            <Button
              size="sm"
              style={{ marginBottom: '.8em' }}
              className="organization-secondary-button"
            >
              PŘIDAT TRENÉRA
            </Button>
          </Col>
        </Row>

        <Tab.Container defaultActiveKey="#link1">
          <Row>
            <Col sm={4}>
              <ListGroup
                defaultActiveKey="#"
                className="organization-profile-section-contents"
              >
                <ListGroup.Item
                  action
                  href="#link1"
                  className="organization-profile-trainer-tab"
                >
                  <Row className="d-flex align-items-center">
                    <Col>Sofia Taty</Col>
                    <Col xl={2} md={3} sm={5} xs={2}>
                      <Image src="/images/icons/trash-alt-solid.svg"></Image>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  href="#link2"
                  className="organization-profile-trainer-tab"
                >
                  <Row className="d-flex align-items-center">
                    <Col>Tobias Reuter</Col>
                    <Col xl={2} md={3} sm={5} xs={2}>
                      <Image src="/images/icons/trash-alt-solid.svg"></Image>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                <Tab.Pane eventKey="#link1">
                  <Container>
                    <Row>
                      <Col xs={12} sm={12} md={4} lg={3} xl={3}>
                        <Row>
                          <Image src="/images/icons/calendar.png" fluid></Image>
                        </Row>
                      </Col>

                      <Col xl={9} lg={9} md={8} sm={12}>
                        <Row className="d-flex justify-content-center">
                          <h3>Sofia Taty</h3>
                        </Row>

                        <Form>
                          <Form.Row>
                            <Form.Group
                              name="description"
                              id="description"
                              as={Col}
                            >
                              <Form.Label>POPIS</Form.Label>
                              <Form.Control
                                as="textarea"
                                style={{
                                  height: '100%',
                                }}
                              ></Form.Control>
                            </Form.Group>
                          </Form.Row>
                          <Form.Row className="d-flex flex-row-reverse">
                            <Button
                              className="organization-primary-button"
                              variant="success"
                              size="md"
                              type="submit"
                              style={{ marginTop: '1.5rem' }}
                            >
                              ULOŽIT
                            </Button>
                          </Form.Row>
                        </Form>
                      </Col>

                      <Col md={2} sm={3} xs={3} lg={1}>
                        <Image
                          src="/images/icons/facebook-f-brands.svg"
                          className="organization-profile-icon-svg"
                        ></Image>
                      </Col>
                      <Col
                        xs={9}
                        md={10}
                        sm={9}
                        lg={11}
                        className="d-flex align-items-center"
                      >
                        facebook
                      </Col>

                      <Col md={2} sm={3} xs={3} lg={1}>
                        <Image
                          src="/images/icons/instagram-square-brands.svg"
                          fluid
                          className="organization-profile-icon-svg"
                        ></Image>
                      </Col>
                      <Col
                        xs={9}
                        md={10}
                        sm={9}
                        lg={11}
                        className="d-flex align-items-center"
                      >
                        instagram
                      </Col>
                    </Row>
                  </Container>
                </Tab.Pane>
                <Tab.Pane eventKey="#link2">testdesc2</Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>

      <Container className="organization-profile-section-container">
        <h1 id="galerie">Galerie</h1>
        <OrganizationProfileGallery
          user={user}
          photoGallery={photoGallery}
          galleryFetcher={galleryFetcher}
          removeGalleryPhotoHandler={removeGalleryPhotoHandler}
        />
      </Container>

      <Container className="organization-profile-section-container">
        <h1 id="hodnoceni">Hodnocení</h1>
        <TestimonialBoxCol/>
      </Container>

      <Footer />
    </>
  );
}
