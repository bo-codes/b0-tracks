import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";


//THIS IS A COMPONENT THAT WE RENDER WHERE WE WANT//
function ProfileButton({ user }) {
  //setting up to use dispatch
  const dispatch = useDispatch();
  //defining the value of showMenu which is false rn. It's basically saying that the menu is not shown rn
  const [showMenu, setShowMenu] = useState(false);


  //this is a function that we are defining to use below
  //THIS FUNCTION OPENS THE MENU BY SETTING ITS STATE TO TRUE
  const openMenu = () => {
    if (showMenu) return; //if showMenu is set to true, then return;
    setShowMenu(true); //if showMenu is not set to true, set it to true;
  };


  //setting up async for something to happen when something else happens
  //THIS IS OPPOSITE FUNCTION OF THE ONE ABOVE
  //THE USEEFFECT CLOSES THE MENU BY SETTING TO FALSE
  //BASICALLY, THE USEEFFECT CHECKS IF THE MENU IS VISIBLE, AND IF IT IS, IT WILL CLOSE WHEN THE USER CLICKS AGAIN
  useEffect(() => {
    if (!showMenu) return; //if showMenu is false, return

    //otherwise, run the function below
    const closeMenu = () => {
      setShowMenu(false); //set showMenu to false
    };


    //whenever there is a change in the showMenu state(see dependecy arr 5 lines below),
    //create this event listener which will close the menu on a click
    document.addEventListener("click", closeMenu);
    //then remove the event listener immediately after it's been executed.
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]); //dependecy arr

  //another function to use below. this one logs out
  const logout = (e) => {
    e.preventDefault(); //when its called, stop it from refreshing
    dispatch(sessionActions.logout()); //and then dispatch the logout action
  };

  return (
    <>
    {/* when user clicks button, open the menu */}
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && ( //here, youre showing the menu. now its listening for a click, if you click anywhere, itll
      //set showMenu to false which will hide the menu below again
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            {/* this button calls logout function when it is clicked */}
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
