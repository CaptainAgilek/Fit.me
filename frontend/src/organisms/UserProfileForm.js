import React from 'react';
import { Formik, Field, Form } from 'formik';

export function UserProfileForm( {user} ) {

  const initialValues = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  return (
    <div>
    <h1>User Profile</h1>
    <Formik
      initialValues={ initialValues }
      onSubmit={async (values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <label htmlFor="firstName">First Name</label>
        <Field id="firstName" name="firstName" />

        <label htmlFor="lastName">Last Name</label>
        <Field id="lastName" name="lastName" />

        <label htmlFor="email">Email</label>
        <Field
          id="email"
          name="email"
          type="email"
        />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
  );
}
