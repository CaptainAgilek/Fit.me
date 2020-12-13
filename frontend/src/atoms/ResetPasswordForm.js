import React from "react";

import { Formik } from "formik";
import * as yup from "yup";

import Form from "react-bootstrap/Form";

import { UserProfileActionButton } from "src/atoms/";
import { FormikGroup } from "src/molecules/";

const schema = yup.object({
    newPassword: yup
        .string()
        .required("Vložte nové heslo")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            "Musí obsahovat 8 znaků, alespoň jeden velký a malý znak a číslo"
        ),
    newPasswordAgain: yup
        .string()
        .required("Vložte nové heslo znovu")
        .oneOf([yup.ref("newPassword"), null], "Hesla se musí shodovat"),
});

const initialValues = {
    newPassword: "",
    newPasswordAgain: "",
};

export function ResetPasswordForm({ userEmail, onSubmit, handleClose }) {
    return (
        <Formik
            validationSchema={schema}
            onSubmit={(values) => {
                console.log("sending values:", values);
                console.log("sending email:", userEmail);
                onSubmit({
                    variables: {
                        email: userEmail,
                        newPassword: values.newPassword,
                        newPasswordAgain: values.newPasswordAgain,
                    },
                });
                console.log("firing handleclose");
                handleClose();
            }}
            initialValues={initialValues}
        >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Row>

                        <FormikGroup
                            name="newPassword"
                            label="Nové heslo"
                            id="newPasswordValidation"
                            type="password"
                        />

                        <FormikGroup
                            name="newPasswordAgain"
                            label="Nové heslo znovu"
                            id="newPasswordAgainValidation"
                            type="password"
                        />
                    </Form.Row>

                    <UserProfileActionButton variant="outline-success" type="submit">
                        Změnit heslo
          </UserProfileActionButton>
                </Form>
            )}
        </Formik>
    );
}
