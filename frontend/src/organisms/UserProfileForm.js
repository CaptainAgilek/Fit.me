import React, { useState } from 'react';

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
  phone: yup.string(),
  street: yup.string(),
  city: yup.string(),
  country: yup.string(),
  zip: yup.number(),
  hasMultisport: yup.boolean(),
  hasActivePass: yup.boolean()
});

export function UserProfileForm( {user, updateUserRequest} ) {
  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    phone: user.phone,
    street: user.places[0] ? user.places[0].street : undefined,
    city: user.places[0] ? user.places[0].city : undefined,
    country: user.places[0] ? user.places[0].country : undefined,
    zip: user.places[0] ? user.places[0].zip : undefined,
    hasMultisport: user.benefits.includes(UserBenefitsEnum.MULTISPORT),
    hasActivePass: user.benefits.includes(UserBenefitsEnum.ACTIVE_PASS),
  }

  return (
    <Card>
      <Card.Body>
        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            const profile = {
              user_id: user.user_id,
              firstname: values.firstName,
              lastname: values.lastName,
              username: values.username,
              email: values.email,
              phone: values.phone ? values.phone : null,
              place: {
                place_id: user.places[0] ? user.places[0].place_id : null,
                user_id: user.user_id,
                city: values.city,
                street: values.street,
                zip: parseInt(values.zip),
                country: values.country,
              }
            };

            console.log("profile", profile)
            updateUserRequest({ variables: { input: profile} });
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
                    type="text"
                    aria-describedby="inputGroupPrepend"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    isValid={touched.phone && !errors.phone}
                    isInvalid={errors.phone}
                />
                <Form.Control.Feedback tooltip/>
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.mobile}
                </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="userProfileAddressStreetValidation">
                <Form.Label>Street</Form.Label>
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
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                    isValid={touched.country && !errors.country}
                    isInvalid={errors.country}
                  />
                  <Form.Control.Feedback tooltip/>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.country}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="userProfileAddressZipValidation">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    type="integer"
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
