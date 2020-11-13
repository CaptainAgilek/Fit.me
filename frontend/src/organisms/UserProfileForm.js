import React from 'react';

import { Formik } from 'formik';
import * as yup from 'yup';

import { Form, Card } from 'react-bootstrap';

import { UserProfileActionButton, FormikSwitch } from 'src/atoms/';
import { FormikGroup } from 'src/molecules/';

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  username: yup.string().min(3).required(),
  email: yup.string().email().required(),
  phone: yup.string()
    .nullable()
    .matches(
      /^[0-9]{9}$/,
      'Musí obsahovat 9 čísel bez mezer'
    )
  ,
  street: yup.string().nullable(),
  city: yup.string().nullable(),
  country: yup.string().nullable(),
  zip: yup.string()
    .nullable()
    .matches(
      /^[0-9]{5}$/,
      'Musí obsahovat 5 čísel bez mezer'
    )
  ,
  hasMultisport: yup.bool(),
  hasActivePass: yup.bool(),
});

export function UserProfileForm({ user, updateUserRequest }) {
  const initialValues = {
    firstName: user.firstname,
    lastName: user.lastname,
    username: user.username,
    email: user.user.email,
    phone: user.phone,
    street: user.places[0] ? user.places[0].street : "",
    city: user.places[0] ? user.places[0].city : "",
    country: user.places[0] ? user.places[0].country : "",
    zip: user.places[0] ? user.places[0].zip : "",
    hasMultisport: user.benefits.some(benefit => benefit.name === "Multisport"),
    hasActivePass: user.benefits.some(benefit => benefit.name === "Active Pass"),
  };

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
              },
              hasMultisport: values.hasMultisport,
              hasActivePass: values.hasActivePass
            };

            console.log('updating profile', profile);
            updateUserRequest({ variables: { input: profile } });
          }}
          initialValues={initialValues}
          enableReinitialize
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Row>
                <FormikGroup
                   name="firstName"
                   label="Jméno"
                   id="userProfileFirstnameValidation"
                   md="6"
                />

                <FormikGroup
                   name="lastName"
                   label="Příjmení"
                   id="userProfileLastnameValidation"
                   md="6"
                />
              </Form.Row>

              <Form.Row>
                <FormikGroup
                   name="username"
                   label="Uživatelské jméno"
                   id="userProfileUsernameValidation"
                />
              </Form.Row>

              <Form.Row>
                <FormikGroup
                   name="email"
                   label="Email"
                   id="userProfileEmailValidation"
                   md="6"
                />

                <FormikGroup
                   name="phone"
                   label="Telefon"
                   id="userProfileMobileValidation"
                   md="6"
                />
              </Form.Row>

              <Form.Row>
                <FormikGroup
                   name="street"
                   label="Ulice a čp."
                   id="userProfileAddressStreetValidation"
                />
              </Form.Row>

              <Form.Row>
                <FormikGroup
                   name="city"
                   label="Město"
                   id="userProfileAddressCityValidation"
                   md="6"
                />
                <FormikGroup
                   name="country"
                   label="Stát"
                   id="userProfileAddressCountryValidation"
                   md="3"
                />
                <FormikGroup
                   name="zip"
                   label="PSČ"
                   id="userProfileAddressZipValidation"
                   type="integer"
                   md="3"
                />
              </Form.Row>

              <Form.Group>
                <FormikSwitch
                  name="hasMultisport"
                  label="Multisport card"
                  id="userProfileHasMultisportValidation"
                  checked={values.hasMultisport}
                />
              </Form.Group>

              <Form.Group>
                <FormikSwitch
                  name="hasActivePass"
                  label="Active Pass"
                  id="userProfileHasActivePassValidation"
                  checked={values.hasActivePass}
                />
              </Form.Group>

              <UserProfileActionButton variant="primary" type="submit">
                Aktualizovat profil
              </UserProfileActionButton>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
}
