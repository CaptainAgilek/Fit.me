import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Form, Col, Button, Row, Badge } from 'react-bootstrap';

import { route } from '../Routes';

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
  email: yup.string().required('Vyplňte email').matches(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i, 'Prosím zadajte email v správním tvaru'),
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
                           }) {

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

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Field name="username" type="text"
                   className={'form-control' + (errors.username ? ' is-invalid' : '')} />
            <ErrorMessage name="username" component="div" className="invalid-feedback" />
          </div>

          <div className="form-group">
            <label htmlFor="firstname">Jméno</label>
            <Field name="firstname" type="text"
                   className={'form-control' + (errors.firstname ? ' is-invalid' : '')} />
            <ErrorMessage name="firstname" component="div" className="invalid-feedback" />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Příjmení</label>
            <Field name="lastname" type="text"
                   className={'form-control' + (errors.lastname ? ' is-invalid' : '')} />
            <ErrorMessage name="lastname" component="div" className="invalid-feedback" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field name="email" type="email"
                   className={'form-control' + (errors.email ? ' is-invalid' : '')} />
            <ErrorMessage name="email" component="div" className="invalid-feedback" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Heslo</label>
            <Field name="password" type="password"
                   className={'form-control' + (errors.password ? ' is-invalid' : '')} />
            <ErrorMessage name="password" component="div" className="invalid-feedback" />
          </div>

          <div className="form-group">
            <label htmlFor="passwordConfirmation">Heslo znova</label>
            <Field name="passwordConfirmation" type="password"
                   className={'form-control' + (errors.passwordConfirmation ? ' is-invalid' : '')} />
            <ErrorMessage name="passwordConfirmation" component="div" className="invalid-feedback" />
          </div>

          <Button size="lg" block variant="dark" type="submit" disabled={isLoading}>Zaregistrovat se</Button>
          <Button size="lg" block variant="danger" to={route.signIn()}>Přihlásit se</Button>

          {children}
        </Form>
      )}
    </Formik>
  );


}
