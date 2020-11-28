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
      console.log('filtered ', filteredData);
      setFilteredData(filteredData);
      setAlreadyFiltered(true);
    }
  });

  return (
    <Col>
      <Row>
        Od
        <DatePicker
          className="mx-2"
          dateFormat="dd/MM/yyyy"
          selected={dateFrom}
          onChange={(val) => {
            setDateFrom(val);
            //todo filter
            //todo filter
            console.log('to filter ', dataToFilter);
            console.log('from ', val);
            console.log(
              'comparign with action date  ',
              new Date(parseInt(dataToFilter[0].date, 10)),
            );
            const filteredData = dataToFilter.filter(
              (item) =>
                new Date(parseInt(item.date, 10)) >= val &&
                new Date(parseInt(item.date, 10)) <= dateTo,
            );
            console.log('filtered ', filteredData);
            setFilteredData(filteredData);
          }}
        />
        Do
        <DatePicker
          className="mx-2"
          dateFormat="dd/MM/yyyy"
          selected={dateTo}
          onChange={(val) => {
            setDateTo(val);
            //todo filter
            const filteredData = dataToFilter.filter(
              (item) =>
                new Date(parseInt(item.date, 10)) >= dateFrom &&
                new Date(parseInt(item.date, 10)) <= val,
            );
            console.log('filtered ', filteredData);

            setFilteredData(filteredData);
          }}
        />
      </Row>
    </Col>
  );
}
