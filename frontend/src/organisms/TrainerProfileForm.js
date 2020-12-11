import React from "react";

import { Formik } from "formik";
import * as yup from "yup";

import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

import { FormikSwitch, UserProfileActionButton } from "src/atoms/";
import { FormikGroup } from "src/molecules/";

const schema = yup.object({
  username: yup.string().nullable(),
  email: yup.string().email().required(),
  phone: yup
    .string()
    .nullable()
    .matches(/^[0-9]{9}$/, "Musí obsahovat 9 čísel bez mezer"),
  description: yup.string().nullable(),
  street: yup.string().nullable(),
  city: yup.string().nullable(),
  country: yup.string().nullable(),
  zip: yup
    .string()
    .nullable()
    .matches(/^[0-9]{5}$/, "Musí obsahovat 5 čísel bez mezer"),
});

export function TrainerProfileForm({ trainer, updateTrainerRequest }) {
  console.log("trainer", trainer);
  const initialValues = {
    firstname: trainer.firstname,
    lastname: trainer.lastname,
    username: trainer.username,
    email: trainer.user.email || "",
    phone: trainer.phone || "",
    description: trainer.description || "",
    street: trainer.places[0] ? trainer.places[0].street : "",
    city: trainer.places[0] ? trainer.places[0].city : "",
    country: trainer.places[0] ? trainer.places[0].country : "",
    zip: trainer.places[0] ? trainer.places[0].zip : "",
  };
  console.log(initialValues);

  return (
    <Card>
      <Card.Body>
        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            console.log("submitted");
            const profile = {
              user_id: trainer.user_id,
              firstname: trainer.firstname,
              lastname: trainer.lastname,
              username: values.username,
              email: values.email,
              phone: values.phone ? values.phone : null,
              description: trainer.description,
              place: {
                place_id: trainer.places[0] ? trainer.places[0].place_id : null,
                user_id: trainer.user_id,
                city: values.city,
                street: values.street,
                zip: parseInt(values.zip),
                country: values.country,
              },
            };

            console.log("updating profile", values);
            updateTrainerRequest({ variables: { input: profile } });
          }}
          initialValues={initialValues}
          enableReinitialize
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Row>
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

              <Form.Row>
                <FormikGroup
                  name="description"
                  label="Popis"
                  id="trainerDescriptionValidation"
                  as="textarea"
                  style={{
                    height: "100%",
                  }}
                />
              </Form.Row>

              <Form.Group
                as={Col}
                className="trainerProfileActionButton"
                md={{ span: 2, offset: 4 }}
                sm={{ span: 2, offset: 3 }}
              >
                <UserProfileActionButton
                  variant="warning"
                  type="submit"
                  size="lg"
                >
                  Uložit
                </UserProfileActionButton>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
}
