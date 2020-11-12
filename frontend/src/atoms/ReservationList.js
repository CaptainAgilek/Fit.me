import React from 'react';

import { Card, ListGroup } from 'react-bootstrap';

export function ReservationList({ reservations }) {
  return (
    <>
      <h3>Historie lekcí</h3>
      <Card>
        <ListGroup>
          {reservations.map((reservation) => (
            <ListGroup.Item
              key={reservation.id}
              variant={ (reservation.id%2) ? 'secondary' : '' }
            >
              {reservation.className}
              <br/>
              {reservation.date}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </>
  );
}
