import { Badge, Button, Form, Row } from 'react-bootstrap';
import {
  EditableActionPicture,
  // FormikSelectField,
} from './ActionCardForm';
import { Field, Formik } from 'formik';
import React from 'react';

const initialValues = {
  type: 'test',
};

const handle = () => {
  console.log('test');
};


export function ServiceCardForm({
                                  initialValues,
                                  handleSubmit,
                                }) {


  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur={false}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleSubmit, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <div className="card" style={{ width: '18rem' }}>
            <EditableActionPicture src={img} user_id={user_id} photo_id={photo_id} />
            <div className="card-body">
              <div className="card-text">
                <Row className="justify-content-md-center">
                  <h3>
                    <Badge variant="warning"></Badge>
                  </h3>
                </Row>
                <div>
                  {/*{editable && (*/}
                  <Field
                    name="name"
                    id="name"
                    className="borderNone"
                  />
                  {/*{!editable && action.max_capacity}*/}
                </div>
                <div>
                  {/*{editable && (*/}
                  <Field
                    name="description"
                    id="description"
                    className="borderNone"
                  />
                  {/*{!editable && action.max_capacity}*/}
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
