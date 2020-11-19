import React from 'react';
import { Navigation } from 'src/organisms/';
import { Footer } from 'src/molecules/';
import { Container } from 'react-bootstrap';

export function OrganizationProfilePage() {
  return (
    <>
      <Navigation />
      <div className="headerImg">
      </div>
      <Container></Container>
      <Footer />
    </>
  );
}
