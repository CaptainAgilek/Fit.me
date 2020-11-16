import { Form } from 'react-bootstrap';
import { FormikGroup } from '../molecules';
import React from 'react';


export function OrganizationRegistration() {
  return (
    <>
      <Form.Row>
        <FormikGroup
          name="name"
          id="name"
          label="JMÉNO ORGANIZACE"
        />
      </Form.Row>

      <Form.Row>
        <FormikGroup
          name="address"
          id="address"
          label="FAKTURAČNÍ ADRESA"
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
