import React, { useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Form, Button, Row, Badge } from 'react-bootstrap';

import { route } from '../Routes';
import { FormikGroup } from '../molecules';
import { SignInPage } from '../pages/SignInPage';
import Nav from 'react-bootstrap/Nav';
import { ForgottenPasswordPage } from '../pages/ForgottenPasswordPage';

const initialValues = {
  email: '',
  password: '',
};

const schema = yup.object().shape({
  email: yup.string().required('Vyplňte email').matches(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i, 'Prosím zadajte email v správním tvaru'),
  password: yup.string().required('Vyplňte heslo').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Musí obsahovat 8 znaků, alespoň jeden velký a malý znak a číslo')
});


export function SignInForm({
                             isLoading,
                             errorMessage,
                             className,
                             onSubmit,
                             children,
                             handleClose,
                             handleShowForgotten,
                           }) {

  const handleShow = () => {
    handleClose();
    handleShowForgotten();
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validateOnBlur={false}
      validationSchema={schema}
    >
      {({ errors, touched, handleSubmit }) => (

        <Form onSubmit={handleSubmit}>
          <Row className='justify-content-md-center'>
            <h3>
              <Badge variant="warning">
                {errorMessage}
              </Badge>
            </h3>
          </Row>

          <Form.Row>
            <FormikGroup
              name="email"
              id="email"
              label="Email"
            />
          </Form.Row>

          <Form.Row>
            <FormikGroup
              name="password"
              id="password"
              label="Heslo"
              type="password"
            />
          </Form.Row>

          <Button size="lg" block variant="dark" type="submit" disabled={isLoading}>Přihlásit se</Button>
          <Button size="lg" block variant="danger" onClick={handleShow}>Zapomenuté heslo</Button>

          {children}
        </Form>
      )}
    </Formik>
  );


}
