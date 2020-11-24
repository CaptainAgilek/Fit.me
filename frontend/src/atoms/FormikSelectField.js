import React from 'react';

import { Field } from 'formik';

export function FormikSelectField({ name, id, options, ...props }) {
  return (
    <Field as="select" name="trainer" id="trainer" {...props}>
      {options.map((option) => {
        return (
          <option key={option.key} value={option.value}>
            {option.value}
          </option>
        );
      })}
    </Field>
  );
}
