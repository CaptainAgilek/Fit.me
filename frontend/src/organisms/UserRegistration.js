import { Form } from 'react-bootstrap';
import { FormikGroup } from '../molecules';
import React from 'react';


export function UserRegistration() {
  return (
    <>
      <Form.Row>
        <FormikGroup
          name="username"
          id="username"
          label="UŽIVATELSKÉ JMÉNO"
        />
      </Form.Row>

      <Form.Row>
        <FormikGroup
          name="firstname"
          id="firstname"
          label="JMÉNO"
        />
      </Form.Row>
      <Form.Row>
        <FormikGroup
          name="lastname"
          id="lastname"
          label="PŘÍJMENÍ"
        />
      </Form.Row>
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
      <Form.Row>
        <FormikGroup
          name="passwordConfirmation"
          id="passwordConfirmation"
          label="ZOPAKOVAT HESLO"
          type="password"
        />
      </Form.Row>
    </>
  );
}
