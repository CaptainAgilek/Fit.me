import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Button, Row, Badge } from "react-bootstrap";

import { FormikGroup } from "../molecules";

const initialValues = {
  email: "",
};

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Vyplňte email")
    .matches(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
      "Prosím zadajte email v správním tvaru"
    ),
});

export function ForgottenPasswordTemplate({
  isLoading,
  errorMessage,
  className,
  onSubmit,
  children,
}) {
  return (
    <Formik
      onSubmit={(values) => {
        console.log("email", values.email);
        onSubmit({
          variables: {
            email: values.email,
          },
        });
      }}
      initialValues={initialValues}
      validateOnBlur={false}
      validationSchema={schema}
    >
      {({ errors, touched, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-md-center">
            <h3>
              <Badge variant="warning">{errorMessage}</Badge>
            </h3>
          </Row>

          <Form.Row>
            <FormikGroup name="email" id="email" label="EMAIL" />
          </Form.Row>

          <Button
            size="lg"
            block
            variant="success"
            type="submit"
            disabled={isLoading}
          >
            Odeslat nové heslo
          </Button>
          {children}
        </Form>
      )}
    </Formik>
  );
}
