import React, { useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Form, Col, Button, Row, Badge, Modal, Container } from 'react-bootstrap';

import { FormikGroup } from '../molecules';

const initialValues = {
  type: 'SPORTSMAN',
  username: '',
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

const schema = yup.object().shape({
  username: yup.string().required('Vyplňte username'),
  firstname: yup.string().required('Vyplňte jméno'),
  lastname: yup.string().required('Vyplňte příjmení'),
  email: yup.string().required('Vyplňte email').matches(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i, 'Prosím zadejte email ve správném tvaru'),
  password: yup.string().required('Vyplňte heslo').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Musí obsahovat 8 znaků, alespoň jeden velký a malý znak a číslo'),
  passwordConfirmation: yup
    .string()
    .required('Vyplňte heslo')
    .oneOf([yup.ref('password'), null], 'Hesla se musí shodovat'),
});


export function SignUpForm({
                             isLoading,
                             errorMessage,
                             className,
                             onSubmit,
                             children,
                             handleClose,
                             handleShowSignIn,
                           }) {
  const handleShow = () => {
    handleClose();
    handleShowSignIn();
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validateOnBlur={true}
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
          <Row className={'justify-content-md-center radio-group form-group'}>
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

          <Form.Row>
            <FormikGroup
              name="username"
              id="username"
              label="Username"
            />
          </Form.Row>

          <Form.Row>
            <FormikGroup
              name="firstname"
              id="firstname"
              label="Jméno"
            />
          </Form.Row>
          <Form.Row>
            <FormikGroup
              name="lastname"
              id="lastname"
              label="Příjmení"
            />
          </Form.Row>
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
          <Form.Row>
            <FormikGroup
              name="passwordConfirmation"
              id="passwordConfirmation"
              label="Heslo znova"
              type="password"
            />
          </Form.Row>

          <Button size="lg" block variant="dark" type="submit" disabled={isLoading}>Zaregistrovat se</Button>
          <Button size="lg" block variant="success" onClick={handleShow}>Přihlásit se</Button>

          {children}
        </Form>
      )}
    </Formik>
  );


}
