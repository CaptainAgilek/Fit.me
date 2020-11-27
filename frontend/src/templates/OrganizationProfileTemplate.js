import React, { useState } from 'react';
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
import { Col, Row, Container, ListGroup, InputGroup } from 'react-bootstrap';

import { Button, Tab, Image, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { FormikGroup } from '../molecules';
import { gql, useMutation, useQuery } from '@apollo/client';
import { rganizationMenu, ActionCard } from 'src/molecules/';

//TODO: contents of this query are already in the page for this template, remove later
const GALLERY_QUERY = gql`
  query getGalleryPhotos($id: Int!) {
    organization(user_id: $id) {
      organization_name
      user_id
      user {
        email
      }
      photo_gallery {
        url
        photo_id
        gallery_name
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

//TODO: contents of this query are already in the page for this template, remove later
const RATINGS_QUERY = gql`
  query getOrganizationRatings($id: Int!) {
    organization(user_id: $id) {
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

const UPDATE_OPRGANIZATION_TRAINER_DESCRIPTION = gql`
  mutation updateOrganizationTrainerDescription(
    $description: String
    $organization_id: Int!
    $trainer_id: Int!
  ) {
    updateOrganizationTrainerDescription(
      description: $description
      organization_id: $organization_id
      trainer_id: $trainer_id
    )
  }
`;

export function OrganizationProfileTemplate({
  actionsState,
  organizationState,
  user,
}) {
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

  const [modifyTrainerDescription] = useMutation(
    UPDATE_OPRGANIZATION_TRAINER_DESCRIPTION,
    {
      onCompleted: () => {
        organizationState.refetch();
      },
    },
  );

  /* RATINGS TEST */
  const ratingsFetcher = useQuery(RATINGS_QUERY, { variables: { id } });
  const ratingsData = ratingsFetcher.data;
  const ratings =
    ratingsData === undefined ? undefined : ratingsData.organization.ratings;

  /* UPDATE TRAINER DESC */
  const handleTrainerDescriptionSubmit = (variables) => {
    modifyTrainerDescription({
      variables: {
        description: trainerDescription,
        organization_id: id,
        trainer_id: selectedTrainerId,
      },
    });
  };

  const handleTrainerSelection = (trainer) => {
    setSelectedTrainerId(trainer.user_id);
    setTrainerDescription(trainer.description);
  };
  const [selectedTrainerId, setSelectedTrainerId] = useState(null);
  const [trainerDescription, setTrainerDescription] = useState(null);

  //console.log(ratingsFetcher);
  //console.log(ratingsData);
  //console.log(ratings);
  console.log(organizationState.data);
  //console.log(organizationState.data.trainers);

  return (
    <>
      <Navigation />
      <div className="headerImg">
        <OrganizationMenu />
      </div>
      <Container className="organization-profile-top-margin">
        <Col>
          <h1>Kalendář akcí</h1>
          <Row></Row>
          <Row>
            <ListGroup horizontal className="horizontalScroll">
              {organizationState.data &&
                actionsState.data &&
                actionsState.data.actionsForPlace.map((action) => (
                  <ListGroup.Item
                    key={action.action_id}
                    className="borderNone"
                    style={{ paddingLeft: '0.1rem' }}
                  >
                    <ActionCard
                      key={action.action_id}
                      img={action.photo.url || '/images/add_img.png'}
                      action={action}
                      trainers={organizationState.data.organization.trainers}
                      user_id={organizationState.data.organization.user_id}
                      editable={true}
                    />
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Row>
        </Col>
      </Container>

      <Container className="organization-profile-section-container">
        <OrganizationProfileSectionHeading>
          Trenéři
        </OrganizationProfileSectionHeading>
        <Row className="d-flex align-items-center">
          <Col xs={3}>
            <Button
              size="sm"
              style={{ marginBottom: '.8em' }}
              className="organization-secondary-button"
            >
              PŘIDAT TRENÉRA (MODAL)
            </Button>
          </Col>
        </Row>

        <Tab.Container
          defaultActiveKey={
            organizationState.data &&
            '#' + organizationState.data.organization.trainers[0].user_id
          }
        >
          <Row>
            <Col sm={4}>
              <ListGroup className="organization-profile-section-contents">
                {organizationState.data &&
                  organizationState.data.organization.trainers.map(
                    (trainer) => (
                      <ListGroup.Item
                        action
                        href={'#' + trainer.user_id}
                        onClick={() => handleTrainerSelection(trainer)}
                        className="organization-profile-trainer-tab"
                      >
                        <Row className="d-flex align-items-center">
                          <Col xs={10}>{trainer.firstname}</Col>
                          <Col xl={2} md={3} sm={5} xs={2}>
                            <Image src="/images/icons/trash-alt-solid.svg"></Image>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ),
                  )}
              </ListGroup>
            </Col>
            <Col sm={8}>
              {organizationState.data &&
                organizationState.data.organization.trainers.map((trainer) => (
                  <Tab.Content>
                    <Tab.Pane eventKey={'#' + trainer.user_id}>
                      <Container>
                        <Row>
                          <Col xs={12} sm={12} md={4} lg={3} xl={3}>
                            <Row>
                              <Image
                                src={
                                  trainer.profile_photo &&
                                  trainer.profile_photo.url
                                }
                                fluid
                                rounded
                              ></Image>
                            </Row>
                          </Col>

                          <Col xl={9} lg={9} md={8} sm={12}>
                            <Row className="d-flex justify-content-center">
                              <h3>
                                {trainer.firstname + ' ' + trainer.lastname}
                              </h3>
                            </Row>

                            <Form onSubmit={handleTrainerDescriptionSubmit}>
                              <Form.Row>
                                <Form.Group
                                  name="description"
                                  controlId="description"
                                  as={Col}
                                  onChange={(e) =>
                                    setTrainerDescription(e.target.value)
                                  }
                                >
                                  <Form.Label>POPIS</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    style={{
                                      height: '100%',
                                    }}
                                  >
                                    {trainer.description}
                                  </Form.Control>
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
                            {trainer.facebook}
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
                            {trainer.instagram}
                          </Col>
                        </Row>
                      </Container>
                    </Tab.Pane>
                  </Tab.Content>
                ))}
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
