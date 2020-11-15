import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import ListGroup from 'react-bootstrap/ListGroup';

import { UserReservation } from 'src/atoms/';

export function ReservationList({ reservations }) {
  const [filter, setFilter] = useState("Tento týden");

  return (
    <Container>
      <Row className="botOffset">
        <h1>Historie rezervací</h1>
      </Row>

      <Row className="botOffset">
        <DropdownButton variant="danger" id="dropdown-basic-button" title={filter}>
          {filter !== "Tento týden" && (
            <Dropdown.Item eventKey="Tento týden" onSelect={(filter) => {setFilter(filter)}}>Tento týden</Dropdown.Item>
          )}
          {filter !== "Tento měsíc" && (
            <Dropdown.Item eventKey="Tento měsíc" onSelect={(filter) => {setFilter(filter)}}>Tento měsíc</Dropdown.Item>
          )}
        </DropdownButton>
      </Row>

      <Row className="botOffset userReservationsHistory">
        <ListGroup horizontal className="userReservationsHistory">
        {reservations.map((reservation) => (
          <ListGroup.Item key={reservation.id} className="userReservationsHistoryItem">
            <UserReservation reservation={reservation} />
          </ListGroup.Item>
        ))}
        </ListGroup>
      </Row>
    </Container>
  );
}
