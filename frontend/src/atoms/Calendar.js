import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

export function Calendar({ events, freeHours }) {
  const calendarRef = useRef();

  const getHeader = () => {
    return {
      left: "prev,next",
      center: "title",
      right:
        window.innerWidth < 765
          ? "listMonth,listWeek"
          : "dayGridMonth,timeGridWeek",
    };
  };
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
      initialView={window.innerWidth < 765 ? "listMonth" : "dayGridMonth"}
      events={events}
      locale="cs"
      height="auto"
      headerToolbar={getHeader()}
      ref={calendarRef}
      eventDidMount={(arg) => {
        arg.el.setAttribute("title", arg.event.title);
      }}
      buttonText={{
        today: "dnes",
        month: "měsíc",
        week: "týden",
      }}
      displayEventEnd={true}
      dayCellDidMount={(arg) => {
        /*if (freeHours.find((item) => sameDay(new Date(item.date), arg.date))) {
          arg.el.bgColor = '#d2fdc8';
        }*/
      }}
      windowResize={() => {
        const calendar = calendarRef.current.getApi();

        calendar.changeView(
          window.innerWidth < 765 ? "listMonth" : "dayGridMonth"
        );
        calendar.setOption("headerToolbar", getHeader());
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
