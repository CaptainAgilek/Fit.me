import React from 'react';
import { Navigation } from 'src/organisms/';
import { Footer, OrganizationMenu } from 'src/molecules/';
import { Container } from 'react-bootstrap';

export function OrganizationProfileTemplate() {
  return (
    <>
      <Navigation />
      <div className="headerImg">
        <OrganizationMenu />
      </div>
      <Container className="mt-5">todo</Container>
      <Footer />
    </>
  );
}
