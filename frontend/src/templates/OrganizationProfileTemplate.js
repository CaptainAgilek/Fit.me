import React from 'react';
import { Navigation } from 'src/organisms/';
import { Footer } from 'src/molecules/';
import { Container } from 'react-bootstrap';

export function OrganizationProfileTemplate() {
  return (
    <>
      <Navigation />
      <div className="headerImg"></div>
      <Container>todo</Container>
      <Footer />
    </>
  );
}
