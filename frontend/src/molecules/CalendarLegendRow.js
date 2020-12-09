import React from 'react';
import { CalendarLegendIcon, CalendarLegendText } from 'src/atoms/';
import { Row, Col } from 'react-bootstrap';

export function CalendarLegendRow() {
  return (
    <Row>
      <CalendarLegendIcon color="#2cff0047" />
      <CalendarLegendText>volno</CalendarLegendText>
      <CalendarLegendIcon color="#007bff" />
      <CalendarLegendText>akce</CalendarLegendText>
    </Row>
  );
}
