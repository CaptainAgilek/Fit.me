import { Form } from "react-bootstrap";
import { FormikGroup } from "../molecules";
import React from "react";

export function OrganizationRegistration() {
  return (
    <>
      <Form.Row>
        <FormikGroup name="name" id="name" label="JMÉNO ORGANIZACE" />
      </Form.Row>

      <Form.Row>
        <FormikGroup name="street" id="street" label="ULICE" />
      </Form.Row>
      <Form.Row>
        <FormikGroup name="city" id="city" label="MĚSTO" />
      </Form.Row>
      <Form.Row>
        <FormikGroup name="zipCode" id="zipCode" label="PSČ" />
      </Form.Row>
      <Form.Row>
        <FormikGroup name="country" id="country" label="ZEMĚ" />
      </Form.Row>
      <Form.Row>
        <FormikGroup name="email" id="email" label="EMAIL" />
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
