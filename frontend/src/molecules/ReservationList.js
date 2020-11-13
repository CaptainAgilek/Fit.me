import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import ListGroup from 'react-bootstrap/ListGroup';

import { UserReservation } from 'src/atoms/';

export function ReservationList({ reservations }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Container>
      <Row className="botOffset">
        <h1>Historie rezervací</h1>
      </Row>

      <Row className="botOffset">
        <DropdownButton variant="danger" id="dropdown-basic-button" title="Tento týden">
          <Dropdown.Item href="#/action-1">Tetno měsíc</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Tento týden</Dropdown.Item>
        </DropdownButton>
      </Row>

      <Row className="botOffset">
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
