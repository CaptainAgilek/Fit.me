import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

export function Calendar({ events, freeHours }) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      locale="cs"
      height="auto"
      headerToolbar={{
         left: "prev,next",
         center: "title",
         right: "dayGridMonth,timeGridWeek"
       }}
      eventDidMount={(arg) => {
        arg.el.setAttribute('title', arg.event.title);
      }}
      buttonText={{
        today: 'dnes',
        month: 'měsíc',
        week: 'týden',
      }}
      displayEventEnd={true}
      dayCellDidMount={(arg) => {
        /*if (freeHours.find((item) => sameDay(new Date(item.date), arg.date))) {
          arg.el.bgColor = '#d2fdc8';
        }*/
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
