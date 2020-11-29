import React from 'react';
import {
  GalleryUploadPhotoButton,
  GalleryPhotoRemoveButton,
} from 'src/molecules/';
import {
  OrganizationProfileSectionHeading,
  GalleryPhotoTitle,
  GalleryCounter,
} from 'src/atoms/';
import { Col, Row, Container, Image } from 'react-bootstrap';
import { gql, useMutation } from '@apollo/client';

const GALLERY_REMOVE_PHOTO_MUTATION = gql`
  mutation updateOrganizationGalleryPhoto(
    $input: UpdatePhotoGalleryNameInput!
  ) {
    updateOrganizationGalleryPhoto(input: $input)
  }
`;

export function OrganizationProfileGallery({ photoGallery, profileFetcher }) {
  const [removeGalleryPhotoHandler] = useMutation(
    GALLERY_REMOVE_PHOTO_MUTATION,
    {
      onCompleted: () => {
        profileFetcher.refetch();
      },
    },
  );

  return (
    <Container className="organization-profile-section-container">
      <Container className="organization-profile-section-contents" fluid>
        <Row>
          {photoGallery &&
            photoGallery.map((x) => (
              <Col xl={3} lg={4} md={6} sm={12}>
                <Container className="organization-profile-gallery-card">
                  <Row className="organization-profile-gallery-card-header">
                    <GalleryPhotoTitle photo={x} />
                    <GalleryPhotoRemoveButton
                      user={profileFetcher.data.organization}
                      photo={x}
                      removeGalleryPhotoHandler={removeGalleryPhotoHandler}
                      photoName={x.url
                        .split('#')
                        .shift()
                        .split('?')
                        .shift()
                        .split('/')
                        .pop()}
                    />
                  </Row>
                  <Row>
                    <Image src={x.url} fluid></Image>
                  </Row>
                </Container>
              </Col>
            ))}
        </Row>
      </Container>
      <Col>
        <hr />
        <Row className="d-flex align-items-center">
          <GalleryCounter>{photoGallery && photoGallery.length}</GalleryCounter>
          <Col lg={2}>
            <GalleryUploadPhotoButton
              user_id={profileFetcher.data.organization.user_id}
              photo_id={undefined}
              refetchGallery={profileFetcher.refetch}
            ></GalleryUploadPhotoButton>
          </Col>
        </Row>

        <hr />
      </Col>
    </Container>
  );
}
