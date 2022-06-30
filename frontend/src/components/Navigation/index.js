import React from "react";
import * as sessionActions from "../../store/session";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

// setCredential is a usestate and youre reseting the state

function Navigation({ isLoaded }) {
  const dispatch = useDispatch(); //another way to call dispatch
  // const [credential, setCredential] = useState(""); //creating a state for crential
  // const [password, setPassword] = useState(""); //creating a state for password
  const sessionUser = useSelector((state) => state.session.user);
  //checking the current state and looking at the sessiion object and then the user object
  //inside of that to see if there is a current user and if there is, which one it is

  // const handleSubmit = (e) => {
  //   e.preventDefault(); //preventing the redirect/refresh
  //   setErrors([]); //defining errors
  //   return dispatch(sessionActions.login({ credential, password })).catch(
  //     async (res) => {
  //       const data = await res.json(); //we're awaiting the response and turning it into data we can use
  //       if (data && data.errors) setErrors(data.errors);
  //       //if we have data and errors in the data, we set the errors state to the value of those errors
  //     }
  //   );
  // };
  // if (sessionUser) return <Redirect to="/" />;

  const handleDemo = (e) => {
    e.preventDefault();
    dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password" })
    );
  };

  let sessionLinks;
  if (sessionUser) { //is there a session user
    sessionLinks =
    <>
      <ProfileButton user={sessionUser} />
      <NavLink to={`/users/${sessionUser.id}`}>profile</NavLink>
    </>
    //if there is, sessionLinks carries a value of a
    //profileButton component that holds the prop user with the value of sessionUser
  } else {
    sessionLinks = ( // otherwise, sessionLinks will render navlinks and demo button below
      <>
        {/* link to login page */}
        <NavLink to="/login">Log In</NavLink>
        {/* link to signup page */}
        <NavLink to="/signup">Sign Up</NavLink>
        {/* button that will sign us in with demo credentials */}
        <button onClick={handleDemo}>Demo</button>
      </>
    );
  }


  //THIS IS WHAT IS ACTUALLY RENDERED. WE USE THE VARIABLES DEFINED ABOVE IN THE JSX BELOW
  return (
    <ul>
      <li>
        {/* navlink that will redirect us home */}
        <NavLink exact to="/">
          Home
        </NavLink>
        {/* the elements that we defined above with our conditionals */}
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
