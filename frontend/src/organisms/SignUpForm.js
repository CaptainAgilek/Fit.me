import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Form, Col, Button, Row } from 'react-bootstrap';

import { ErrorBanner } from 'src/atoms/';

const initialValues = {
  type: 'SPORTSMAN',
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

const schema = yup.object().shape({
  // role: yup.string().required().label('Choosing a role is required'),
  // formHorizontalFirstName: yup.string().required().label('First name'),
  // lastname: yup.string().required().label('Last name'),
  // email: yup.string().email().required().label('Email'),
  // password: yup.string().required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number').label('Password'),
  // passwordConfirmation: yup
  //   .string()
  //   .required()
  //   .oneOf([yup.ref('password'), null], 'Passwords must match')
  //   .label('Password Confirmation'),
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
      validateOnBlur={false}
    >
      {({ values, handleChange, handleSubmit }) => (

        <Form onSubmit={handleSubmit}>
          {errorMessage && <ErrorBanner title={errorMessage} />}

          <Row className={"justify-content-md-center radio-group form-group"}>
              <Col>
                <label>
                  <Field type="radio" name="type" value="SPORTSMAN" />
                  Sportovec
                </label>
              </Col>
              <Col>
                <label>
                  <Field type="radio" name="type" value="TRAINER" />
                  Trenér
                </label>
              </Col>
              <Col>
                <label>
                  <Field type="radio" name="type" value="ORGANIZATION" />
                  Organizace
                </label>
              </Col>
          </Row>

          <div className="form-group">
            <label htmlFor="firstname">Jméno</label>
            <Field name="firstname" type="text" className={'form-control'} />
            <ErrorMessage name="firstname" component="div" className="invalid-feedback" />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Příjmení</label>
            <Field name="lastname" type="text" className={'form-control'} />
            <ErrorMessage name="lastname" component="div" className="invalid-feedback" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" className={'form-control'} />
            <ErrorMessage name="email" component="div" className="invalid-feedback" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Heslo</label>
            <Field name="password" type="password" className={'form-control'} />
            <ErrorMessage name="password" component="div" className="invalid-feedback" />
          </div>

          <div className="form-group">
            <label htmlFor="passwordConfirmation">Heslo znova</label>
            <Field name="passwordConfirmation" type="password" className={'form-control'} />
            <ErrorMessage name="passwordConfirmation" component="div" className="invalid-feedback" />
          </div>

          <Button type="submit">Zaregistrovat se</Button>

          {children}
        </Form>
      )}
    </Formik>
  );


}
