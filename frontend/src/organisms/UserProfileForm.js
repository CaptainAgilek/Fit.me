import React from 'react';

import { Formik } from 'formik';
import * as yup from 'yup';

import { UserBenefitsEnum } from 'src/utils/const';
import { Form, Col, Card } from 'react-bootstrap';

import { UserProfileActionButton } from 'src/atoms/';

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  username: yup.string().min(3).required(),
  email: yup.string().email().required(),
  mobile: yup.number(),
  address: yup.string(),
  city: yup.string(),
  state: yup.string(),
  zip: yup.number(),
  hasMultisport: yup.boolean(),
  hasActivePass: yup.boolean()
});

export function UserProfileForm( {user} ) {
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
    hasMultisport: user.benefits.includes(UserBenefitsEnum.MULTISPORT),
    hasActivePass: user.benefits.includes(UserBenefitsEnum.ACTIVE_PASS),
  };

  return (
    <Card>
      <Card.Body>
        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            console.log("hodnoty", values)
          }}
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
                <Form.Group as={Col} md="6" controlId="userProfileFirstnameValidation">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    isValid={touched.firstName && !errors.firstName}
                    isInvalid={errors.firstName}
                  />
                  <Form.Control.Feedback tooltip/>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="userProfileLastnameValidation">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    isValid={touched.lastName && !errors.lastName}
                    isInvalid={errors.lastName}
                  />
                  <Form.Control.Feedback tooltip/>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="userProfileUsernameValidation">
                  <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      aria-describedby="inputGroupPrepend"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      isValid={touched.username && !errors.username}
                      isInvalid={errors.username}
                    />
                    <Form.Control.Feedback tooltip/>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.username}
                    </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="userProfileEmailValidation">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    aria-describedby="inputGroupPrepend"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isValid={touched.email && !errors.email}
                    isInvalid={errors.email}
                  />
                  <Form.Control.Feedback tooltip/>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="userProfileMobileValidation">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="mobile"
                    aria-describedby="inputGroupPrepend"
                    name="mobile"
                    value={values.mobile}
                    onChange={handleChange}
                    isValid={touched.email && !errors.mobile}
                    isInvalid={errors.mobile}
                />
                <Form.Control.Feedback tooltip/>
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.mobile}
                </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="userProfileAddressStreetValidation">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  aria-describedby="inputGroupPrepend"
                  name="street"
                  value={values.street}
                  onChange={handleChange}
                  isValid={touched.street && !errors.street}
                  isInvalid={errors.street}
                />
                <Form.Control.Feedback tooltip/>
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.street}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} md="6" controlId="userProfileAddressCityValidation">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    isValid={touched.city && !errors.city}
                    isInvalid={errors.city}
                  />
                  <Form.Control.Feedback tooltip/>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.city}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="userProfileAddressCountryValidation">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                    isValid={touched.state && !errors.state}
                    isInvalid={errors.state}
                  />
                  <Form.Control.Feedback tooltip/>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.state}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="userProfileAddressZipValidation">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    type="text"
                    name="zip"
                    value={values.zip}
                    onChange={handleChange}
                    isValid={touched.zip && !errors.zip}
                    isInvalid={errors.zip}
                  />
                  <Form.Control.Feedback tooltip/>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.zip}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

            <Form.Group>
               <Form.Switch
                 name="hasMultisport"
                 label="Multisport card"
                 id="userProfileHasMultisportValidation"
                 onChange={handleChange}
                 isInvalid={!!errors.hasMultisport}
                 feedback={errors.hasMultisport}
                 value={values.hasMultisport}
                 checked={values.hasMultisport}
               />
             </Form.Group>

             <Form.Group>
                <Form.Switch
                  name="hasActivePass"
                  label="Active Pass"
                  id="userProfileHasActivePassValidation"
                  onChange={handleChange}
                  isInvalid={!!errors.hasActivePass}
                  feedback={errors.hasActivePass}
                  value={values.hasActivePass}
                  checked={values.hasActivePass}
                />
              </Form.Group>

              <UserProfileActionButton variant="primary" type="submit">Update profile</UserProfileActionButton>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
}
