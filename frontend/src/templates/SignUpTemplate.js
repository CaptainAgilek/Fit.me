import React from 'react';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { Form, Col, Button, Row, Badge } from 'react-bootstrap';

import { UserRegistration } from '../organisms/UserRegistration';

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
  username: yup.string().required('Vyplňte uživatelské jméno'),
  firstname: yup.string().required('Vyplňte jméno'),
  lastname: yup.string().required('Vyplňte příjmení'),
  email: yup.string().required('Vyplňte email').matches(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i, 'Prosím zadejte email ve správném tvaru'),
  password: yup.string().required('Vyplňte heslo').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Musí obsahovat 8 znaků, alespoň jeden velký a malý znak a číslo'),
  passwordConfirmation: yup
    .string()
    .required('Vyplňte heslo')
    .oneOf([yup.ref('password'), null], 'Hesla se musí shodovat'),
});


export function SignUpTemplate({
                                 isLoading,
                                 errorMessage,
                                 className,
                                 onSubmit,
                                 children,
                                 showSignIn,
                               }) {

  let registrationForm = <div />;
  if (initialValues.type !== 'ORGANIZATION') {
    registrationForm = <UserRegistration />;
  } else {
    // todo
    registrationForm = <div />;
  }

  const test = () => {
    initialValues.type = 'TRAINER';
  };

  return (
    <>
      <Row className='justify-content-md-center'><h1>REGISTRACE</h1></Row>
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
                <label onChange={test}>
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

            <div>
              {registrationForm}
            </div>

            <Button size="lg" block variant="success" type="submit" disabled={isLoading}>REGISTROVAT SE</Button>
            <Button size="lg" block variant="outline-dark" onClick={showSignIn}>PŘIHLÁSIT SE</Button>

            {children}
          </Form>
        )}
      </Formik>
    </>
  );


}
