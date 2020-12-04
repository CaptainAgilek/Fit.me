import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'


import { UserReservation } from 'src/atoms/';

export function ReservationList({ reservations }) {
  const [filter, setFilter] = useState("Tento týden");

  return (
    <Container>
      <Row className="botOffset">
        <h1>Historie rezervací</h1>
      </Row>

      <Row className="botOffset">
        <Form>
          <Form.Control as="select" onChange={(value) => {console.log("zmena filteru", value)}}>
            <option value="1">Tento týden</option>
            <option value="2">Tento Měsíc</option>
          </Form.Control>
        </Form>
      </Row>

      <Row className="botOffset">
        <ListGroup horizontal className="horizontalScroll">
        {reservations.map((reservation) => (
          <ListGroup.Item key={reservation.id} className="borderNone">
            <UserReservation reservation={reservation} />
          </ListGroup.Item>
        ))}
        </ListGroup>
      </Row>
    </Container>
  );
}
