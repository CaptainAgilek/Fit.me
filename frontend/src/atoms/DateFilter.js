import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Col, Row } from 'react-bootstrap';

export function DateFilter({ dateFrom, setDateFrom, dateTo, setDateTo }) {

  return (
    <Col>
      <Row>
        <div className="ml-1 mt-1">
          Od
          <DatePicker
            className="mx-2"
            dateFormat="dd/MM/yyyy"
            selected={dateFrom}
            onChange={(val) => {
              setDateFrom(val);
            }}
          />
        </div>
        <div className="ml-1 mt-1">
          Do
          <DatePicker
            className="mx-2"
            dateFormat="dd/MM/yyyy"
            selected={dateTo}
            onChange={(val) => {
              setDateTo(val);
            }}
          />
        </div>
      </Row>
    </Col>
  );
}
