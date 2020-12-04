import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import classNames from "classnames";

export const CustomDatePickerField = ({ borderless, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      dateFormat="dd/MM/yyyy"
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
      popperPlacement="top-end"
      popperModifiers={{
        offset: {
          enabled: true,
          offset: "20px, 10px",
        },
      }}
      className={("", classNames({ borderNone: borderless }))}
    />
  );
};
