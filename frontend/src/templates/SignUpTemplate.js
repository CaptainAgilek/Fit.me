import React, { useState } from "react";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { Form, Col, Button, Row } from "react-bootstrap";

import { UserRegistration } from "../organisms/UserRegistration";
import { OrganizationRegistration } from "../organisms/OrganizationRegistration";
import Alert from "react-bootstrap/Alert";

const initialValues = {
  type: "SPORTSMAN",
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

const userSchema = yup.object().shape({
  username: yup.string().required("Vyplňte uživatelské jméno"),
  firstname: yup.string().required("Vyplňte jméno"),
  lastname: yup.string().required("Vyplňte příjmení"),
  email: yup
    .string()
    .required("Vyplňte email")
    .matches(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
      "Prosím zadejte email ve správném tvaru"
    ),
  password: yup
    .string()
    .required("Vyplňte heslo")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Musí obsahovat 8 znaků, alespoň jeden velký a malý znak a číslo"
    ),
  passwordConfirmation: yup
    .string()
    .required("Vyplňte heslo")
    .oneOf([yup.ref("password"), null], "Hesla se musí shodovat"),
});

const organizationSchema = yup.object().shape({
  name: yup.string().required("Vyplňte název organizace"),
  street: yup.string().required("Vyplňte ulici organizace"),
  city: yup.string().required("Vyplňte město organizace"),
  country: yup.string().required("Vyplňte zemi organizace"),
  zipCode: yup
    .number()
    .integer("PSČ musí být číslo")
    .required("Vyplňte PSČ organizace")
    .typeError("PSČ musí být číslo")
    .test(
      "len",
      "PSČ musí mít přesně 5 znaků",
      (val) => val.toString().length === 5
    ),
  email: yup
    .string()
    .required("Vyplňte email")
    .matches(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
      "Prosím zadejte email ve správném tvaru"
    ),
  password: yup
    .string()
    .required("Vyplňte heslo")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Musí obsahovat 8 znaků, alespoň jeden velký a malý znak a číslo"
    ),
  passwordConfirmation: yup
    .string()
    .required("Vyplňte heslo")
    .oneOf([yup.ref("password"), null], "Hesla se musí shodovat"),
});

export function SignUpTemplate({
  isLoading,
  error,
  onSubmit,
  children,
  showSignIn,
}) {
  const [registrationType, setRegistrationType] = useState("SPORTSMAN");

  return (
    <>
      <Row className="justify-content-md-center">
        <h1>REGISTRACE</h1>
      </Row>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validateOnBlur={true}
        validationSchema={
          registrationType === "ORGANIZATION" ? organizationSchema : userSchema
        }
      >
        {({ errors, touched, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            {error && (
              <Row className="justify-content-md-center">
                <Alert variant="danger">
                  <Col className="justify-content-md-center">
                    <p>{error.message}</p>
                    <div className="d-flex justify-content-end"></div>
                  </Col>
                </Alert>
              </Row>
            )}
            <Row className={"justify-content-md-center radio-group form-group"}>
              <Col>
                <label>
                  <Field
                    onClick={() => setRegistrationType("SPORTSMAN")}
                    type="radio"
                    name="type"
                    value="SPORTSMAN"
                  />
                  Sportovec
                </label>
              </Col>
              <Col>
                <label>
                  <Field
                    onClick={() => setRegistrationType("TRAINER")}
                    type="radio"
                    name="type"
                    value="TRAINER"
                  />
                  Trenér
                </label>
              </Col>
              <Col>
                <label>
                  <Field
                    onClick={() => setRegistrationType("ORGANIZATION")}
                    type="radio"
                    name="type"
                    value="ORGANIZATION"
                  />
                  Organizace
                </label>
              </Col>
            </Row>

            {registrationType === "ORGANIZATION" ? (
              <OrganizationRegistration />
            ) : (
              <UserRegistration />
            )}

            <Button
              size="lg"
              block
              variant="success"
              type="submit"
              disabled={isLoading}
            >
              REGISTROVAT SE
            </Button>
            <Button size="lg" block variant="outline-dark" onClick={showSignIn}>
              PŘIHLÁSIT SE
            </Button>

            {children}
          </Form>
        )}
      </Formik>
    </>
  );
}
