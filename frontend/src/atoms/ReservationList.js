import React from 'react';
import classNames from 'classnames';

export function ReservationList({ reservations }) {
  return (
    <div>
      <h2>Reservation History</h2>
      {reservations.map((reservation) => (
        <div>
          "Class name: "{reservation.className}<br/>
          "Class date: "{reservation.date}
        </div>
      ))}
    </div>
  );
}
