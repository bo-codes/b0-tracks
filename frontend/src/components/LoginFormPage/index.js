import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

//THIS IS A COMPONENT THAT WE RENDER//
function LoginFormPage() {
  //GRABBING EVERYTHING FROM STATE//
  const dispatch = useDispatch(); //setting up to use dispatch

  const sessionUser = useSelector((state) => state.session.user);
  //checking for the current session user and setting that value to the variable

  const [credential, setCredential] = useState(""); //setting the current state for credential with a value
  //of "" along with the function needed to change its value

  const [password, setPassword] = useState(""); //doing the same as the line above, but for password

  const [errors, setErrors] = useState([]); //defining errors by declaring a state again like the lines above
  //GRABBING EVERYTHING FROM STATE END//


  //Basically, what this line is doing is, when it is called to be rendered, it's checking if someone is already signed in by checking the
  //value of the state.session.user and if it is, it is just sending us home automatically
  if (sessionUser) return <Redirect to="/" />;

  //this is just a function that we define here to run below if the redirect above doesnt hit
  const handleSubmit = (e) => {
    e.preventDefault(); //preventing the redirect/refresh
    setErrors([]); //defining errors
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json(); //we're awaiting the response and turning it into data we can use
        if (data && data.errors) setErrors(data.errors);
        //if we have data and errors in the data, we set the errors state to the value of those errors
      }
    );
  };


  return (
    // just a form
    <form onSubmit={handleSubmit}>
      {/* an unordered list */}
      <ul>
        {/* displaying each error as a list item using map */}
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      {/* displaying the username or email box */}
      <label>
        Username or Email
        <input
          type="text"
          // setting the value to credential which is nothing at the moment
          value={credential}
          // on input, changing the value of credential to whatever the current value of the box is each time the value changes/you type something
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          // setting the value to password which is nothing at the moment
          value={password}
          // on input, changing the value of password to whatever the current value of the box is each time the value changes/you type something
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log In</button>
      {/* <button onClick={handleDemo}>Demo</button> */}
    </form>
  );
}

export default LoginFormPage;
