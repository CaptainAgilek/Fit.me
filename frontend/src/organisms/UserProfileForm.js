import React from 'react';

import { Formik } from 'formik';
import * as yup from 'yup';

import { UserBenefitsEnum } from 'src/pages/UserProfilePage';
import { Form, Col, Button, InputGroup } from 'react-bootstrap';

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

  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    mobile: user.mobile,
    street: user.address.street,
    city: user.address.city,
    country: user.address.country,
    zip: user.address.country,
    multisport: user.benefits.includes(UserBenefitsEnum.MULTISPORT),
    active_pass: user.benefits.includes(UserBenefitsEnum.ACTIVE_PASS),
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={initialValues}
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
                  placeholder="Username"
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
                placeholder="Enter email"
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
                name="email"
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
              placeholder="1234 Main St"
              aria-describedby="inputGroupPrepend"
              name="email"
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
                placeholder="City"
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
                placeholder="State"
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
                placeholder="Zip"
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

          <Button type="submit">Submit form</Button>
        </Form>
      )}
    </Formik>
  );
}
