import React from 'react';
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
} from 'src/molecules/';
import { Col, Row, Container, ListGroup } from 'react-bootstrap';

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

export function OrganizationProfileTemplate({ user }) {
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
        <Col>
          <h1>Kalendář akcí</h1>
          <Row>
            <CustomDatePicker />
            až
            <CustomDatePicker />
          </Row>
        </Col>
      </Container>

      <Container className="organization-profile-section-container">
        <Row className="organization-profile-heading">
          <Col>
            <h1>Trenéři</h1>
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
                                className="organization-secondary-button"
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

      <OrganizationProfileGallery
        user={user}
        photoGallery={photoGallery}
        galleryFetcher={galleryFetcher}
        removeGalleryPhotoHandler={removeGalleryPhotoHandler}
      />

      <Container className="organization-profile-section-container">
        <OrganizationProfileSectionHeading>
          Hodnocení
        </OrganizationProfileSectionHeading>
        <Row>
          <Col xs={4}>
            <h4>Počet hvězdiček</h4>
            <hr></hr>
          </Col>
        </Row>
        <Container fluid>
          <Row>
            <Col sm={12} md={6}>
              <Container className="organization-profile-rating-container">
                <Row>
                  <Col xs={3}>
                    <Image
                      src="/images/icons/calendar.png"
                      fluid
                      rounded
                    ></Image>
                  </Col>
                  <Col>
                    <Row className="d-flex flex-row-reverse">5/5</Row>
                    <Row>
                      <h5>Enci</h5>
                    </Row>
                    <Row className="font-italic">
                      “Já byla spokojna. Fitko s dobrými službami. Určite záleží
                      od trenéra. Mým byl Tobias Reuter - skvelý přístup i
                      odbornost. Určite odporúčam.”
                    </Row>
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col sm={12} md={6}>
              <Container className="organization-profile-rating-container">
                <Row>
                  <Col xs={3}>
                    <Image
                      src="/images/icons/calendar.png"
                      fluid
                      rounded
                    ></Image>
                  </Col>
                  <Col>
                    <Row className="d-flex flex-row-reverse">5/5</Row>
                    <Row>
                      <h5>Enci</h5>
                    </Row>
                    <Row className="font-italic">
                      “Já byla spokojna. Fitko s dobrými službami. Určite záleží
                      od trenéra. Mým byl Tobias Reuter - skvelý přístup i
                      odbornost. Určite odporúčam.”
                    </Row>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer />
    </>
  );
}
