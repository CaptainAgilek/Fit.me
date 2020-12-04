import React from "react";

import { Form } from "react-bootstrap";
import { useField } from "formik";

export function FormikSwitch({ name, label, id, ...props }) {
  const [field, meta] = useField(name);
  return (
    <Form.Switch
      name={name}
      label={label}
      id={id}
      isInvalid={meta.error}
      feedback={meta.error}
      {...field}
      {...props}
    />
  );
}
