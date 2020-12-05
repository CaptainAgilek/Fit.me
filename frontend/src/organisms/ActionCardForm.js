import React from 'react';
import { Formik, Field } from 'formik';
import { Form, Button, Row, Badge, Col } from 'react-bootstrap';
import {
  CustomDatePickerField,
  CustomTimePickerField,
  FormikSelectField,
} from 'src/atoms/';
import { EditableActionPicture, ActionDeleteButton } from 'src/molecules/';

export function ActionCardForm({
                                 initialValues,
                                 img,
                                 action,
                                 options,
                                 editable,
                                 handleSubmit,
                                 user_id,
                                 photo_id,
                                 setPhotoId,
                                 deleteActionRequest,
                               }) {
  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur={false}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleSubmit, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <div className="card">
            <EditableActionPicture
              src={img}
              user_id={user_id}
              photo_id={action.photo_id}
              setPhotoId={setPhotoId}
              type='ACTION'
            />
            <div className="text-center" style={{ backgroundColor: '#dedede' }}>
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
                  {options.length > 0 && editable && (
                    <FormikSelectField
                      name="trainer"
                      id="trainer"
                      options={options}
                      className="borderNone"
                    />
                  )}
                  {options.length === 0 && <>V organizaci není trenér</>}
                  {options.length > 0 &&
                  !editable &&
                  options.find(
                    (option) => option.value === `${action.trainer_id}`,
                  ).label}
                </div>
                <div>
                  <img
                    className="action-small-icon"
                    src="/images/icons/money.svg"
                  />
                  {editable && (
                    <Field
                      name="price"
                      id="price"
                      label="Cena"
                      className="borderNone"
                    />
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
                      name="max_capacity"
                      id="capacity"
                      className="borderNone"
                    />
                  )}
                  {!editable && action.max_capacity}
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
                        disabled={options.length === 0}
                      >
                        ULOŽIT
                      </Button>
                    </Col>
                  )}

                  {editable && action.action_id && (
                    <ActionDeleteButton
                      handleRemove={() =>
                        deleteActionRequest({
                          variables: { action_id: action.action_id },
                        })
                      }
                      name={action.name}
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
