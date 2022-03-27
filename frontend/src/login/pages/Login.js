import React, { useState, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { AuthContext } from "../../shared/context/auth-context";
import "./Login.css";
import TextInput from "../../shared/components/FormElements/TextInput";


export default function Login(props) {
  const auth = useContext(AuthContext);
  //hooks
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //handle login form submit event
  const loginSubmitHandler = async (values) => {
    setShowError(false);
    //Call backend API
    axios
      .post(`${props.API_URL}/api/auth/login/`, {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        if (response) {
          auth.login(response.data.uid, response.data.token, response.data);
          //redirect to user home page
          window.location = "/";
        }
      })
      .catch((error) => {
        setShowError(true);
        setErrorMessage(error.response.data.error);
      });
  };

  return (
    <React.Fragment>
      <div className="login-formHolder">
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
            <Form className="login-form">
              <h1 className="login-title">Log in</h1>
              <TextInput name="email" label="Email" type="text" data-testid="email"/>
              <TextInput name="password" label="Password" type="password" data-testid="password" />
              <div
                className="login-errorMessage" data-testid="errorMsg"
                style={showError ? { display: "block" } : { display: "none" }}
              >
                {" "}
                {errorMessage}{" "}
              </div>
              <input type="submit" className="loginBtn" value="Login" data-testid="button"/>
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
}
