import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Button, Row } from 'react-bootstrap';

import { ErrorBanner, FormikGroup } from '../molecules';
import classNames from 'classnames';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { UserProfileActionButton } from '../molecules/ErrorBanner';

const initialValues = {
  email: '',
  password: '',
};

const schema = yup.object().shape({
  email: yup.string().required('Vyplňte email').matches(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i, 'Prosím zadajte email v správním tvaru'),
  password: yup.string().required('Vyplňte heslo').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Musí obsahovat 8 znaků, alespoň jeden velký a malý znak a číslo'),
});


export function SignInTemplate({
                                 isLoading,
                                 error,
                                 onSubmit,
                                 children,
                                 showSignUp,
                                 showForgotten,
                               }) {
  return (
    <>
      <Row className='justify-content-md-center'><h1>PŘIHLÁŠENÍ</h1></Row>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validateOnBlur={false}
        validationSchema={schema}
      >
        {({ errors, touched, handleSubmit }) => (

          <Form onSubmit={handleSubmit}>
            {error && (
              <Row className="justify-content-md-center">
                <Alert variant="danger">
                  <Col className="justify-content-md-center">
                    <p>
                      {error.message}
                    </p>
                    <div className="d-flex justify-content-end">
                    </div>
                  </Col>
                </Alert>
              </Row>
            )}
            <Form.Row>
              <FormikGroup
                name="email"
                id="email"
                label="EMAIL"
              />
            </Form.Row>

            <Form.Row>
              <FormikGroup
                name="password"
                id="password"
                label="HESLO"
                type="password"
              />
            </Form.Row>

            <Form.Row className='justify-content-md-center'>
              <Button size="lg" block variant="success" type="submit" disabled={isLoading}>PŘIHLÁSIT</Button>
            </Form.Row>
            <Form.Row style={{ height: '50px' }} className={classNames(
              'align-items-center',
              'justify-content-md-center',
            )}>
              <Button variant="link" onClick={showForgotten}>ZAPOMNĚLI JSTE HESLO?</Button>
            </Form.Row>
            <Form.Row className='justify-content-md-center'>
              <span>NEMÁTE JEŠTĚ ÚČET?<Button variant="link" onClick={showSignUp}>ZAREGISTRUJTE SE!</Button></span>
            </Form.Row>
            {children}
          </Form>
        )}
      </Formik>
    </>
  );


}
