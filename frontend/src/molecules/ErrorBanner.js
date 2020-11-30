import React from 'react';

import { useHistory } from 'react-router-dom';
import { route } from 'src/Routes';

import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { UserProfileActionButton } from 'src/atoms/';

export function ErrorBanner( { title, message, onClick } ) {
  const history = useHistory();
  const homePageLink = route.home();

  return (
    <Row className="justify-content-md-center">
      <Col sm="6" className="justify-content-md-center" >
        <Alert variant="danger">
          <Alert.Heading>Někde se stala chyba!</Alert.Heading>
          <p>
            {message}
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <UserProfileActionButton onClick={() => history.replace(homePageLink)} variant="outline-danger">
              Domů
            </UserProfileActionButton>
          </div>
        </Alert>
      </Col>
    </Row>
  );
}
