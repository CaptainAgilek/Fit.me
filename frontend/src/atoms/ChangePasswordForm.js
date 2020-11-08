import React from 'react';

import { Formik } from 'formik';
import * as yup from 'yup';

import Form from 'react-bootstrap/Form';

import { UserProfileActionButton } from 'src/atoms/';
import { FormikGroup } from 'src/molecules/';

const schema = yup.object({
  oldPassword: yup
    .string()
    .required('Vložte současné heslo')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Musí obsahovat 8 znaků, alespoň jeden velký a malý znak a číslo'
    )
  ,
  newPassword: yup
    .string()
    .required('Vložte nové heslo')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Musí obsahovat 8 znaků, alespoň jeden velký a malý znak a číslo'
    )
  ,
  newPasswordAgain: yup
    .string()
    .required('Vložte nové heslo znovu')
    .oneOf([yup.ref('newPassword'), null], 'Hesla se musí shodovat')
});

const initialValues = {
  oldPassword: "",
  newPassword: "",
  newPasswordAgain: "",
};

export function ChangePasswordForm( {userEmail, onSubmit, handleClose } ) {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => {
        onSubmit({ variables: {
          email: userEmail,
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          newPasswordAgain: values.newPasswordAgain
        }});
        handleClose();
      }}
      initialValues={initialValues}
    >
    {({
      handleSubmit,
      handleChange,
      values,
      touched,
      errors,
    }) => (
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <FormikGroup
            name="oldPassword"
            label="Aktuální heslo"
            id="oldPasswordValidation"
            type="password"
          />

          <FormikGroup
            name="newPassword"
            label="Nové heslo"
            id="newPasswordValidation"
            type="password"
          />

          <FormikGroup
            name="newPasswordAgain"
            label="Nové heslo znovu"
            id="newPasswordAgainValidation"
            type="password"
          />
        </Form.Row>

        <UserProfileActionButton variant="outline-success" type="submit">
          Změnit heslo
        </UserProfileActionButton>
      </Form>
    )}
    </Formik>
  );
}
