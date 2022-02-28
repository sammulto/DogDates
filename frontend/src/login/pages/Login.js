import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

import "./Login.css";
import TextInput from "../../shared/components/FormElements/TextInput";

export default function Login() {
  //hooks
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  console.log(showError);

  //handle login form submit event
  const loginSubmitHandler = async (values) => {
    setShowError(false);
    //Call backend API
    axios
      .post("http://localhost:5000/api/auth/login/", {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setShowError(true);
        setErrorMessage(error.response.data.error);
      });
  };

  return (
    <React.Fragment>
      <div className="formHolder">
        <Formik
          //form data schema
          initialValues={{
            email: "",
            password: "",
          }}
          //input validation
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
          })}
          onSubmit={loginSubmitHandler}
        >
          {() => (
            //login form
            <Form className="form">
              <h1 className="title">Log in</h1>
              <TextInput name="email" label="Email" type="text" />
              <TextInput name="password" label="Password" type="password" />
              <div
                className="errorMessage"
                style={showError ? { display: "block" } : { display: "none" }}
              >
                {" "}
                {errorMessage}{" "}
              </div>
              <input type="submit" className="loginBtn" value="Login" />
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
}
