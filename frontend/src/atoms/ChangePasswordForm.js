import React from 'react';

import { Formik } from 'formik';
import * as yup from 'yup';

import { Form, Col } from 'react-bootstrap';

import { UserProfileActionButton } from 'src/atoms/';

const schema = yup.object({
  password: yup
    .string()
    .required("Enter new password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
  ,
  passwordConfirmation: yup
    .string()
    .required("Enter new password again")
    .oneOf([yup.ref('password'), null], 'Passwords must match')
});

const initialValues = {
  password: "",
  passwordConfirmation: "",
};

export function ChangePasswordForm( {user} ) {
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
          <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formGroupPassword1">
                <Form.Label>New password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  aria-describedby="inputGroupPrepend"
                  value={values.password}
                  onChange={handleChange}
                  isValid={touched.password && !errors.password}
                  isInvalid={errors.password}
                />
                <Form.Control.Feedback tooltip/>
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formGroupPassword2">
                <Form.Label>New password again</Form.Label>
                <Form.Control
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Enter new password again"
                  aria-describedby="inputGroupPrepend"
                  value={values.passwordConfirmation}
                  onChange={handleChange}
                  isValid={touched.passwordConfirmation && !errors.passwordConfirmation}
                  isInvalid={errors.passwordConfirmation}
                />
                <Form.Control.Feedback tooltip/>
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.passwordConfirmation}
                </Form.Control.Feedback>
              </Form.Group>
         </Form>
        )}
      </Formik>
  );
}
