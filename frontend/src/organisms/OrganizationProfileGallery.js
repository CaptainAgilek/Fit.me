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
import { Col, Row, Container } from 'react-bootstrap';

import { Image } from 'react-bootstrap';

export function OrganizationProfileGallery({
  user,
  photoGallery,
  galleryFetcher,
  removeGalleryPhotoHandler,
}) {
  return (
    <Container className="organization-profile-section-container">
      <OrganizationProfileSectionHeading>
        Galerie
      </OrganizationProfileSectionHeading>
      <Container className="organization-profile-section-contents" fluid>
        <Row>
          {photoGallery &&
            photoGallery.map((x) => (
              <Col xl={3} lg={4} md={6} sm={12}>
                <Container className="organization-profile-gallery-card">
                  <Row className="organization-profile-gallery-card-header">
                    <GalleryPhotoTitle photo={x} />
                    <GalleryPhotoRemoveButton
                      user={user}
                      photo={x}
                      removeGalleryPhotoHandler={removeGalleryPhotoHandler}
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
      <Col fluid>
        <hr />
        <Row className="d-flex align-items-center">
          <GalleryCounter>{photoGallery && photoGallery.length}</GalleryCounter>
          <Col lg={2}>
            <GalleryUploadPhotoButton
              user_id={user.user_id}
              photo_id={undefined}
              refetchGallery={galleryFetcher.refetch}
            ></GalleryUploadPhotoButton>
          </Col>
        </Row>

        <hr />
      </Col>
    </Container>
  );
}
