import React, { useState, useContext } from 'react';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import './Signup.css'
import TextInput from '../../shared/components/FormElements/TextInput';
import Select from '../../shared/components/FormElements/Select';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import { AuthContext } from "../../shared/context/Auth-context";

/****************************************************************************************** 
 * 
 * Signup.js
 * 
 * This page allows the user to create an account which includes:
 * email, password, name, dog name, location, description, picture
 * 
******************************************************************************************/
const Signup = (props) => {

  const auth = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  //handle signup form submit event
  const signupSubmitHandler = async (values) => {
    //console.log(JSON.stringify(values, null, 6));

    console.log("api url: " + props.API_URL);
    
    //Call backend API
    const FormData = require('form-data');
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('ownerName', values.ownerName);
    formData.append('dogName', values.dogName);
    formData.append('city', values.city);
    formData.append('description', values.description);
    formData.append('pictures', values.image);
    
    axios.post(
      //send post request to backend
      `${props.API_URL}/api/signup`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then((response) => {
  
      //save token and redirect to user's home page upon signup successfully
      if (response) {
        auth.login(response.data.uid, response.data.token, response.data);
        //redirect to account page
        window.location = "/";
      }

    }).catch((error) =>{
      //error handling
      setShowError(true);
      setErrorMessage(error.response.data.error);
    });

  };

  return (
    <React.Fragment>
      <div className="signup-formHolder">
        <Formik
        //form data schema
          initialValues={{
            email:'',
            password:'',
            ownerName:'',
            dogName:'',
            city:'',
            description:'',
            image:''
          }} 

          //input validation
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Required'),
            ownerName: Yup.string().required('Required'),
            dogName: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
            image: Yup.mixed().test(
              "File Size", 
              "File is not selected or too large", 
              (value) => { return (value&&value.size <= 3000000);}
            )
          })}
          onSubmit={signupSubmitHandler} 
        >
          {({ errors, touched, setFieldValue }) => (
            //sign up form
            <Form className="signup-form">
              <h1 className="signup-title" data-testid="header">Sign up</h1>
              <TextInput name="email" label="Email" type="text" data-testid="email"/>
              <TextInput name="password" label="Password" type="password" data-testid="password"/>
              <TextInput name="ownerName" label="My Name" type="text" data-testid="ownerName"/>
              <TextInput name="dogName" label="My Puppy's Name" type="text" data-testid="dogName"/>
              <Select name="city" label="City" data-testid="city">
                <option value="" data-testid="select_city">Select A City</option>
                <option value="Winnipeg" data-testid="winnipeg">Winnipeg</option>
                <option value="Toronto" data-testid="toronto">Toronto</option>
              </Select>
              <TextInput name="description" label="About Me And My Puppy" type="text" data-testid="description"/>
              <ImageUpload 
                name="image"
                id="image" 
                label="Upload A Picture Of You With Your Puppy"
                onInput={
                  (id, pickedFile, fileIsValid) => {setFieldValue("image", pickedFile);}
                }
                errorText=" "
              />
              {touched.image && errors.image ? (<div className="signup-errorMessage">{errors.image}</div>) : null}
              <div className="signup-errorMessage" data-testid="errorMsg" style={showError ? {display:"block"} : {display:"none"}}> {errorMessage} </div>
              <input type="submit" className="signupBtn" value="Sign up" data-testid="button"/>
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default Signup; 
