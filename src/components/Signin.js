import React from "react";
import firebase from "firebase/app";

function Signin(){
  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
      console.log("successfully signed up!");
    }).catch(function(error) {
      console.log(error.message);
    });
  }
  return (
    <>
      <h1>Sign In</h1>
      <form onSubmit={doSignUp}>
        <input
          type="text"
          name="email"
          placeholder="email" />
        <input
          type="password"
          name="password"
          placeholder="Password" />
        <button type="submit">Sign up</button>
      </form>
    </>
  );
}

export default Signin;