import React from "react";
import { CalendarLegendIcon, CalendarLegendText } from "src/atoms/";
import { Row } from "react-bootstrap";

export function CalendarLegendRow() {
  return (
    <Row>
      <CalendarLegendIcon color="#63d14ccc" />
      <CalendarLegendText>volno</CalendarLegendText>
      <CalendarLegendIcon color="#007bff" />
      <CalendarLegendText>akce</CalendarLegendText>
    </Row>
  );
}
