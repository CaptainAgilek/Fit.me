import React from 'react';
import { TrainersPopUp } from 'src/molecules/';
import { Col, Row } from 'react-bootstrap';

export function TrainersTopRow({ organizationState }) {
  return (
    <Row className="d-flex align-items-center">
      <Col xs={8} sm={6} md={4} lg={3}>
        {organizationState.data && (
          <TrainersPopUp
            size="sm"
            btnStyle={{ marginBottom: '.8rem' }}
            className="organization-secondary-button"
            organizationId={
              organizationState.data &&
              organizationState.data.organization.user_id
            }
            organizationState={organizationState}
          >
            PŘIDAT TRENÉRA
          </TrainersPopUp>
        )}
      </Col>
    </Row>
  );
}
