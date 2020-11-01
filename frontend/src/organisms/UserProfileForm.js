import React from 'react';

import { Formik } from 'formik';
import * as yup from 'yup';

import { UserBenefitsEnum } from 'src/utils/const';
import { Form, Col, Card } from 'react-bootstrap';

import { UserProfileActionButton } from 'src/atoms/';

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().email().required(),
  mobile: yup.number(),
  address: yup.string(),
  city: yup.string(),
  state: yup.string(),
  zip: yup.number(),
  multisport: yup.boolean(),
  active_pass: yup.boolean()
});

export function UserProfileForm( {user} ) {

  const address = user.places[0];

  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    mobile: user.mobile,
    street: user.places[0] ? user.places[0].street : "",
    city: user.places[0] ? user.places[0].city : "",
    country: user.places[0] ? user.places[0].city : "",
    zip: user.places[0] ? user.places[0].zip : "",
    multisport: user.benefits.includes(UserBenefitsEnum.MULTISPORT),
    active_pass: user.benefits.includes(UserBenefitsEnum.ACTIVE_PASS),
  };

  return (
    <Card>
      <Card.Body>
        <Formik
          validationSchema={schema}
          onSubmit={console.log}
          initialValues={initialValues}
          enableReinitialize
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>

              <Form.Row>
                <Form.Group as={Col} md="6" controlId="validationFormik101">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    isValid={touched.firstName && !errors.firstName}
                  />
                  <Form.Control.Feedback tooltip/>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationFormik102">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    isValid={touched.lastName && !errors.lastName}
                  />

                  <Form.Control.Feedback tooltip/>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="validationFormikUsername2">
                  <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      aria-describedby="inputGroupPrepend"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback tooltip/>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.username}
                    </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    aria-describedby="inputGroupPrepend"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback tooltip/>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="mobile"
                    aria-describedby="inputGroupPrepend"
                    name="mobile"
                    value={values.mobile}
                    onChange={handleChange}
                    isInvalid={!!errors.mobile}
                />
                <Form.Control.Feedback tooltip/>
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.mobile}
                </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  aria-describedby="inputGroupPrepend"
                  name="street"
                  value={values.street}
                  onChange={handleChange}
                  isInvalid={!!errors.street}
                />
                <Form.Control.Feedback tooltip/>
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.street}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} md="6" controlId="validationFormik103">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    isInvalid={!!errors.city}
                  />
                  <Form.Control.Feedback tooltip/>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.city}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationFormik104">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                    isInvalid={!!errors.state}
                  />
                  <Form.Control.Feedback tooltip/>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.state}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationFormik105">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    type="text"
                    name="zip"
                    value={values.zip}
                    onChange={handleChange}
                    isInvalid={!!errors.zip}
                  />
                  <Form.Control.Feedback tooltip/>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.zip}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Group>
                <Form.Label>Benefits</Form.Label>
                <Form.Check
                 type="switch"
                 id="multisport-switch"
                 label="Multisport"
                 checked={values.multisport}
               />
               <Form.Check
                 type="switch"
                 label="Active Pass"
                 id="active-pass-switch"
                 checked={values.active_pass}
               />
              </Form.Group>

              <UserProfileActionButton variant="primary">Submit form</UserProfileActionButton>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
}
