import React from "react";
import { Formik, Field } from "formik";
import Autocomplete from "react-autocomplete";
import {Button } from "react-bootstrap";


export function SearchCityForm({initialValues, getOrganizationsByCityStringQuery, updateResults, searchResults}) {
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          getOrganizationsByCityStringQuery({
            variables: { cityString: values.value },
          });

          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        /* and other goodies */
      }) => (
        <>
          <form
            onSubmit={handleSubmit}
            onChange={(e) => updateResults(e.target.value)}
          >
            <Autocomplete
              getItemValue={(item) => item.label}
              items={searchResults}
              renderMenu={(children) =>
                children && <div className="result-menu">{children}</div>
              }
              wrapperStyle={{
                position: "relative",
                display: "inline-block",
              }}
              renderItem={(item, isHighlighted) => (
                <div key={item.raw.place_id}
                  style={{
                    background: isHighlighted ? "lightgray" : "white",
                  }}
                >
                  {item.label}
                </div>
              )}
              renderInput={function (props) {
                return <input {...props} style={{ width: "60vw" }} />;
              }}
              value={values.value}
              onChange={(e) => setFieldValue("value", e.target.value)}
              onSelect={(val) => setFieldValue("value", val)}
            />
            <Button type="submit" disabled={isSubmitting} className="ml-2 mb-1">
              Hledat
            </Button>
          </form>
        </>
      )}
    </Formik>
  );
}
