import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Form, Button, Row, Badge } from 'react-bootstrap';

import { route } from '../Routes';

const initialValues = {
  email: '',
  password: '',
};

const schema = yup.object().shape({
  email: yup.string().email().required('Vyplňte email'),
  password: yup.string().required('Vyplňte heslo'),
});


export function SignInForm({
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

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field name="email" type="email"
                   className={'form-control' + (errors.email || touched.email ? ' is-invalid' : '')} />
            <ErrorMessage name="email" component="div" className="invalid-feedback" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Heslo</label>
            <Field name="password" type="password"
                   className={'form-control' + (errors.password || touched.password ? ' is-invalid' : '')} />
            <ErrorMessage name="password" component="div" className="invalid-feedback" />
          </div>

          <Button size="lg" block variant="dark" type="submit" disabled={isLoading}>Přihlásit se</Button>
          <Button size="lg" block variant="danger" to={route.signIn()}>Zapomenuté heslo</Button>
          {/*todo doplnit spravnou route*/}

          {children}
        </Form>
      )}
    </Formik>
  );


}
