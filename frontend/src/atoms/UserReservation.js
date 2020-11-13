import React from 'react';

import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

import fitness from 'src/assets/fitness.png';
import football from 'src/assets/futbol-solid.svg';
import hockey from 'src/assets/hockey-puck-solid.svg';
import kravmaga from 'src/assets/krav-maga.png';
import pilates from 'src/assets/pilates.png';
import calendar from 'src/assets/calendar-alt-regular.svg';
import clock from 'src/assets/clock-regular.svg';
import placeholder from 'src/assets/placeholder.png';

export function UserReservation({ reservation }){
  return(
    <Card className="userReservationCard">
      <Card.Img variant="top" src={fitness}  className="userReservationSportIcon"/>
      <Card.Body>
        <Card.Title>{reservation.name}</Card.Title>
        <Card.Text>
          <Image src={calendar} className="userReservationIcon"/>
          {reservation.date}
        </Card.Text>
        <Card.Text>
          <Image src={clock} className="userReservationIcon"/>
          {reservation.hour}
        </Card.Text>
        <Card.Text>
          <Image src={placeholder} className="userReservationIcon"/>
          {reservation.address}
          </Card.Text>
      </Card.Body>
    </Card>
  );
}
