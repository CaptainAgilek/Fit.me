import React from 'react';

import Card from 'react-bootstrap/Card'

export function UserReservation({ reservation }){
  return(
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={reservation.icon} />
      <Card.Body>
        <Card.Title>{reservation.name}</Card.Title>
        <Card.Text>{reservation.date}</Card.Text>
        <Card.Text>{reservation.hour}</Card.Text>
        <Card.Text>{reservation.address}</Card.Text>
      </Card.Body>
    </Card>
  );
}
