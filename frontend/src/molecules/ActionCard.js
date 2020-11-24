import React from 'react';

import { Formik, Field } from 'formik';
import { Form, Button, Row, Badge } from 'react-bootstrap';
import { CustomDatePickerField } from 'src/atoms/';
import { CustomTimePickerField } from 'src/atoms/';

export function ActionCard({ img, action, editable }) {
  let time = new Date();

  if (action) {
    const [hours, minutes, seconds] = action.time.split(':');
    time.setHours(hours);
    time.setMinutes(minutes);
  }

  return (
    <Formik
      //onSubmit={onSubmit}
      initialValues={{
        name: action.name || 'Název akce',
        date: parseInt(action.date) || new Date(),
        time: time || new Date(),
        trainer: action.trainer_id || '',
        price: action.price || '',
        capacity: action.max_capacity || '',
        // name: action.name || '',
        // date: parseInt(action.date) || new Date(),
        // time: time || new Date(),
        // trainer: action.trainer_id || '',
        // price: action.price || '',
        // capacity: action.max_capacity || '',
      }}
      validateOnBlur={false}
    >
      {({ errors, touched, handleSubmit, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src={img} />
            <div
              className="text-center"
              style={{ backgroundColor: '#dedede', height: '50px' }}
            >
              {editable && (
                <Field
                  name="name"
                  id="name"
                  className=" h5 card-title text-center mt-2 borderNone"
                  style={{ backgroundColor: '#dedede' }}
                />
              )}
              {!editable && <h5 className="card-title">Název akce</h5>}
            </div>
            <div className="card-body">
              <div className="card-text">
                <Row className="justify-content-md-center">
                  <h3>
                    <Badge variant="warning"></Badge>
                  </h3>
                </Row>
                <div>
                  <img
                    className="action-small-icon"
                    src="/images/icons/calendar.png"
                  />
                  {editable && (
                    <CustomDatePickerField name="date" borderless={true} />
                  )}
                  {!editable && action.date}
                </div>
                <div>
                  <img
                    className="action-small-icon"
                    src="/images/icons/clock-regular.svg"
                  />
                  {editable && (
                    <CustomTimePickerField name="time" borderless={true} />
                  )}
                  {!editable && action.time}
                </div>
                <div>
                  <img
                    className="action-small-icon"
                    src="/images/icons/personal.svg"
                  />
                  {editable && (
                    <Field name="trainer" id="trainer" className="borderNone" />
                  )}
                  {!editable && action.trainer_id}
                </div>
                <div>
                  <img
                    className="action-small-icon"
                    src="/images/icons/money.svg"
                  />
                  {editable && (
                    <Field name="price" id="price" label="Cena" className="borderNone" />
                  )}
                  {!editable && action.price}
                </div>
                <div>
                  <img
                    className="action-small-icon"
                    src="/images/icons/users-solid.svg"
                  />
                  {editable && (
                    <Field
                      name="capacity"
                      id="capacity"
                      className="borderNone"
                    />
                  )}
                  {!editable && action.max_capacity}
                </div>

                <Button
                  className="mt-1"
                  size="lg"
                  block
                  variant="success"
                  type="submit"
                >
                  ULOŽIT
                </Button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
