import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ListGroup from 'react-bootstrap/ListGroup'

import { UserReservation } from 'src/atoms/';

export function ReservationList({ reservations }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Container>
      <Row>
        <h1>Historie rezervací</h1>
        <ListGroup horizontal className="userReservationsHistory">
        {reservations.map((reservation) => (
          <ListGroup.Item>
            <UserReservation
              key={reservation.id}
              reservation={reservation}
            />
          </ListGroup.Item>
        ))}
        </ListGroup>
      </Row>
    </Container>
  );
}
