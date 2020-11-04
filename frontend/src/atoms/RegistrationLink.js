import React from 'react';

import { route } from 'src/Routes';

import { Row } from 'react-bootstrap';

export function RegistrationLink() {
  const linkToRegistration = route.home();

  return (
    <Row className="justify-content-md-center" sm="4">
      <p>Unknown User</p>
      <a href={linkToRegistration}>Registration</a>
    </Row>
  );
}
