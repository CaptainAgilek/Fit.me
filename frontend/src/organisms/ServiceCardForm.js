import { Badge, Button, Col, Form, Row } from 'react-bootstrap';
import { Field, Formik } from 'formik';
import React from 'react';
import { EditableActionPicture } from '../molecules';
import { ActionDeleteButton } from '../molecules';

export function ServiceCardForm({
                                  initialValues,
                                  handleSubmit,
                                  service,
                                  img,
                                  user_id,
                                  photo_id,
                                  editable,
                                  setPhotoId,
                                  deleteServiceRequest,
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
            <EditableActionPicture
              src={img}
              user_id={user_id}
              photo_id={service.photo_id}
              setPhotoId={setPhotoId}
              type='SERVICE' />
            <div className="card-body">
              <div className="card-text">
                <Row className="justify-content-md-center">
                  <h3>
                    <Badge variant="warning"></Badge>
                  </h3>
                </Row>
                <div>
                  {editable && (
                    <Field
                      name="name"
                      id="name"
                      className="borderNone"
                    />
                  )}
                  {!editable && <h5 className="card-title">Název služby</h5>}
                </div>
                <div>
                  {editable && (
                    <Field
                      name="description"
                      id="description"
                      className="borderNone"
                    />
                  )}
                  {!editable && service.description}
                </div>

                <Row>
                  {editable && (
                    <Col>
                      <Button
                        className="mt-1"
                        size="lg"
                        block
                        variant="success"
                        type="submit"
                      >
                        ULOŽIT
                      </Button>
                    </Col>
                  )}

                  {editable && service.service_id && (
                    <ActionDeleteButton
                      handleRemove={() =>
                        deleteServiceRequest({
                          variables: { service_id: service.service_id },
                        })
                      }
                      name={service.name}
                    />
                  )}
                </Row>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
