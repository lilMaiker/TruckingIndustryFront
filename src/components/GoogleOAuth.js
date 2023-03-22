import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import authService from "../services/auth.service";

const GoogleOAuth = () => {
  const onSuccess = (credentialResponse) => {
    //console.log(credentialResponse);
    const person = jwt_decode(credentialResponse.credential);
    //console.log(person);
    localStorage.setItem("userGoogle", JSON.stringify(person));
    let credential = {provider: 'GOOGLE', idToken: credentialResponse.credential};
    //console.log('credential => ' + JSON.stringify(credential));
    authService.ExternalAuth(credential)
      .then((response) => {
        //console.log("результат: " + response.data)
        if (response.data.accessToken) {
          //console.log("результат" + response.data)
          localStorage.setItem("user", JSON.stringify(response.data));
          window.location.reload();
        }
      })
      .catch((error) => {
        //console.error("ошибка" + error);
      });
  };

  const onError = () => {
    console.log('Login Failed');
  };

  return (
    <GoogleOAuthProvider clientId="242778390481-kuoh0eugc5bo3lm78h6u6g8jiq2u6lr6.apps.googleusercontent.com">
      <GoogleLogin onSuccess={onSuccess} onError={onError} useOneTap />
    </GoogleOAuthProvider>
  );
};

export default GoogleOAuth;