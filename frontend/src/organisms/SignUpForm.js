import React from 'react';
import { Form, Formik, Field } from 'formik';
import * as yup from 'yup';

import { ErrorBanner } from 'src/atoms/';
import { FormikField, LoadingButton } from 'src/molecules/';

const initialValues = {
  role: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirmation: ''
};

const schema = yup.object().shape({
  //role: yup.string().required().label('Choosing a role is required'),
  firstName: yup.string().required().label('First name'),
  lastName: yup.string().required().label('Last name'),
  email: yup.string().email().required().label('Email'),
  password: yup.string().required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number').label('Password'),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .label('Password Confirmation')
});

export function SignUpForm({
  isLoading,
  errorMessage,
  className,
  onSubmit,
  children,
}) {
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={schema}
      validateOnBlur={false}
    >
    <Form className={className}>
      {errorMessage && <ErrorBanner title={errorMessage} className="mb3" />}

      <div role="group" aria-labelledby="radio-group">
        <label>
          <Field type="radio" name="role" value="Sportsman" />
          Sportsman
        </label>
        <label>
          <Field type="radio" name="role" value="Trainer" />
          Trainer
        </label>
        <label>
          <Field type="radio" name="role" value="Organization" />
          Organization
        </label>
      </div>

        <FormikField
          id="firstName"
          name="firstName"
          label="Fist Name"
          type="text"
          autoFocus="autofocus"
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormikField
          id="lastName"
          name="lastName"
          label="Last Name"
          type="text"
          autoFocus="autofocus"
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormikField
          id="email"
          name="email"
          label="Email"
          type="text"
          placeholder="e.g. tobias.ehr@gmail.com"
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormikField
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormikField
          id="passwordConfirmation"
          name="passwordConfirmation"
          label="Password Confirmation"
          type="password"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <LoadingButton type="submit" className="mt2 mb3" loading={isLoading}>
          Sign Up
        </LoadingButton>
        {children}
      </Form>
    </Formik>
  );
}
