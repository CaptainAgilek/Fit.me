import React from 'react';

import { Card, ListGroup } from 'react-bootstrap';

import classNames from 'classnames';

export function ReservationList({ reservations }) {
  return (
    <>
      <h3>Reservation History</h3>
      <Card>
        <ListGroup>
          {reservations.map((reservation) => (
            <ListGroup.Item>{reservation.className}<br/>{reservation.date}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </>
  );
}
