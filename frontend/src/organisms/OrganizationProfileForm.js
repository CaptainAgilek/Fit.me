import React from 'react';

import { Formik } from 'formik';
import * as yup from 'yup';

import { Form, Card } from 'react-bootstrap';

import { UserProfileActionButton, FormikSwitch } from 'src/atoms/';
import { FormikGroup } from 'src/molecules/';

const schema = yup.object({
  name: yup.string().required(),
  username: yup.string().nullable(),
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
  acceptMultisport: yup.bool(),
  acceptActivePass: yup.bool(),
});

export function OrganizationProfileForm({ organization, updateOrganizationRequest }) {

  console.log("org", organization);
  const initialValues = {
    name: organization.organization_name,
    username: organization.username,
    email: organization.user.email,
    phone: organization.phone || "",
    street: organization.places[0] ? organization.places[0].street : "",
    city: organization.places[0] ? organization.places[0].city : "",
    country: organization.places[0] ? organization.places[0].country : "",
    zip: organization.places[0] ? organization.places[0].zip : "",
    acceptMultisport: organization.acceptedBenefits.some(benefit => benefit.name === "Multisport"),
    acceptActivePass: organization.acceptedBenefits.some(benefit => benefit.name === "Active Pass"),
  };

  return (
    <Card>
      <Card.Body>
        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            const profile = {
              user_id: organization.user_id,
              organization_name: values.name,
              username: values.username,
              email: values.email,
              phone: values.phone ? values.phone : null,
              place: {
                place_id: organization.places[0] ? organization.places[0].place_id : null,
                user_id: organization.user_id,
                city: values.city,
                street: values.street,
                zip: parseInt(values.zip),
                country: values.country,
              },
              acceptingMultisport: values.acceptMultisport,
              acceptingActivePass: values.acceptActivePass
            };

            console.log('updating profile', values);
            updateOrganizationRequest({ variables: { input: profile } });
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
                   name="name"
                   label="Jméno Sportoviště"
                   id="orgProfileNameValidation"
                />

                <FormikGroup
                   name="username"
                   label="Uživatelské jméno"
                   id="orgProfileUsernameValidation"
                />
              </Form.Row>

              <Form.Row>
                <FormikGroup
                   name="email"
                   label="Email"
                   id="orgProfileEmailValidation"
                   md="6"
                />

                <FormikGroup
                   name="phone"
                   label="Telefon"
                   id="orgProfileMobileValidation"
                   md="6"
                />
              </Form.Row>

              <Form.Row>
                <FormikGroup
                   name="street"
                   label="Ulice a čp."
                   id="orgProfileAddressStreetValidation"
                />
              </Form.Row>

              <Form.Row>
                <FormikGroup
                   name="city"
                   label="Město"
                   id="orgProfileAddressCityValidation"
                   md="6"
                />
                <FormikGroup
                   name="country"
                   label="Stát"
                   id="orgProfileAddressCountryValidation"
                   md="3"
                />
                <FormikGroup
                   name="zip"
                   label="PSČ"
                   id="orgProfileAddressZipValidation"
                   type="integer"
                   md="3"
                />
              </Form.Row>

              <Form.Group>
                <FormikSwitch
                  name="acceptMultisport"
                  label="Multisport card"
                  id="orgProfileAcceptMultisportValidation"
                  checked={values.acceptMultisport}
                />
              </Form.Group>

              <Form.Group>
                <FormikSwitch
                  name="acceptActivePass"
                  label="Active Pass"
                  id="orgProfileAcceptActivePassValidation"
                  checked={values.acceptActivePass}
                />
              </Form.Group>

              <UserProfileActionButton variant="primary" type="submit">
                Uložit
              </UserProfileActionButton>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
}
