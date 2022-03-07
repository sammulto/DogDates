import React, { useContext, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

import TextInput from "../../shared/components/FormElements/TextInput";
import Select from "../../shared/components/FormElements/Select";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { AuthContext } from "../../shared/context/auth-context";
import "./UpdateAccInfo.css";

const UpdateAccountInfo = (props) => {
  const { userInfo } = useContext(AuthContext);
  const auth = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //handle signup form submit event
  const updateProfileHandler = async (values) => {
    setShowError(false);

    //Call backend API
    const FormData = require("form-data");
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("ownerName", values.ownerName);
    formData.append("dogName", values.dogName);
    formData.append("city", values.city);
    formData.append("description", values.description);
    formData.append("pictures", values.image);
    formData.append("uid", userInfo.uid);

    console.log(userInfo.uid);

    axios
      .patch(
        //send patch request to backend
        `https://www.sammul.live/api/users/${userInfo.uid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      )
      .then((response) => {
        //save token and redirect to confirm page
        if (response) {
          auth.logout();
          //redirect to confirm page
          window.location = "/profileupdated";
        }
      })
      .catch((error) => {
        //error handling
        setShowError(true);
        setErrorMessage(error.response.data.error);
      });
  };

  return (
    <React.Fragment>
      <div className="updateFormHolder">
        <Formik
          //form data schema
          initialValues={{
            email: "",
            password: "",
            ownerName: "",
            dogName: "",
            city: "",
            description: "",
            image: "",
          }}
          //input validation
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            ownerName: Yup.string().required("Required"),
            dogName: Yup.string().required("Required"),
            city: Yup.string().required("Required"),
            image: Yup.mixed().test(
              "File Size",
              "File is not selected or too large",
              (value) => {
                return value && value.size <= 3000000;
              }
            ),
          })}
          onSubmit={updateProfileHandler}
        >
          {({ errors, touched, setFieldValue }) => (
            //profile update form
            <Form className="updateForm">
              <h1 className="updateTitle">Update Account Profile</h1>
              <TextInput name="email" label="Email" type="text" />
              <TextInput name="password" label="Password" type="password" />
              <TextInput name="ownerName" label="My Name" type="text" />
              <TextInput name="dogName" label="My Puppy's Name" type="text" />
              <Select name="city" label="City">
                <option id="1" value="">
                  Select A City
                </option>
                <option id="2" value="Winnipeg">
                  Winnipeg
                </option>
                <option id="3" value="Toronto">
                  Toronto
                </option>
              </Select>
              <TextInput
                name="description"
                label="About Me And My Puppy"
                type="text"
              />
              <ImageUpload
                name="image"
                id="image"
                label="Upload A Picture Of You With Your Puppy"
                onInput={(id, pickedFile, fileIsValid) => {
                  setFieldValue("image", pickedFile);
                }}
                errorText=" "
              />
              {touched.image && errors.image ? (
                <div className="errorMessage">{errors.image}</div>
              ) : null}
              <div
                className="errorMessage"
                style={showError ? { display: "block" } : { display: "none" }}
              >
                {" "}
                {errorMessage}{" "}
              </div>
              <input
                type="submit"
                className="updateBtn"
                value="Update Profile"
              />
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default UpdateAccountInfo;
