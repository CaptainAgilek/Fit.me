import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Col, Row } from 'react-bootstrap';

export function DateFilter({ dataToFilter, setFilteredData }) {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);

  const weekAgoDate = new Date();
  weekAgoDate.setHours(0);
  weekAgoDate.setMinutes(0);
  weekAgoDate.setSeconds(0);
  weekAgoDate.setDate(weekAgoDate.getDate() - 7);

  const [dateFrom, setDateFrom] = useState(weekAgoDate);
  const [dateTo, setDateTo] = useState(date);
  const [alreadyFiltered, setAlreadyFiltered] = useState(false);

  useEffect(() => {
    if (!alreadyFiltered) {
      const filteredData = dataToFilter.filter(
        (item) =>
          new Date(parseInt(item.date, 10)) >= dateFrom &&
          new Date(parseInt(item.date, 10)) <= dateTo,
      );
      setFilteredData(filteredData);
      setAlreadyFiltered(true);
    }
  });

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

              const filteredData = dataToFilter.filter(
                (item) =>
                  new Date(parseInt(item.date, 10)) >= val &&
                  new Date(parseInt(item.date, 10)) <= dateTo,
              );
              setFilteredData(filteredData);
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

              const filteredData = dataToFilter.filter(
                (item) =>
                  new Date(parseInt(item.date, 10)) >= dateFrom &&
                  new Date(parseInt(item.date, 10)) <= val,
              );
              setFilteredData(filteredData);
            }}
          />
        </div>
      </Row>
    </Col>
  );
}
