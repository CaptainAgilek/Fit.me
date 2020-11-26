import React from 'react';

import { Field } from 'formik';

export function FormikSelectField({ name, id, options, ...props }) {
  return (
    <Field as="select" name={name} id={id} {...props}>
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </Field>
  );
}
