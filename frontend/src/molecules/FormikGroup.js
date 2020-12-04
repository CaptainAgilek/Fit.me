import React from "react";

import { Form, Col } from "react-bootstrap";
import { useField } from "formik";

export function FormikGroup({
  name,
  label,
  id,
  type = "text",
  md = "12",
  ...props
}) {
  const [field, meta] = useField(name);
  return (
    <Form.Group as={Col} md={md} controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        isValid={meta.touched && !meta.error}
        isInvalid={meta.touched && meta.error}
        {...field}
        {...props}
      />
      <Form.Control.Feedback tooltip />
      <Form.Control.Feedback type="invalid" tooltip>
        {meta.error}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
