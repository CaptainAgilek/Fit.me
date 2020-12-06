import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export function Calendar({ events, freeHours }) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      locale="cs"
      height="auto"
      eventDidMount={(arg) => {
        arg.el.setAttribute('title', arg.event.title);
      }}
      buttonText={{
        today: 'dnes',
      }}
      dayCellDidMount={(arg) => {
        if (freeHours.find((item) => sameDay(new Date(item.date), arg.date))) {
          arg.el.bgColor = '#d2fdc8';
        }
      }}
    />
  );
}

function sameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}
