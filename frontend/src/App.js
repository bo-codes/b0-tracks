import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import UsersList from "./components/UsersList";
import User from "./components/User";
import SongList from "./components/SongList/SongList";
// import PlaylistForm from "./components/PlaylistForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const [credential, setCredential] = useState("");
  // const [password, setPassword] = useState("");

  useEffect(() => {
    (async () => {
      await dispatch(sessionActions.restoreUser());
      // dispatch(getAllSongs()); //ND
      setIsLoaded(true);
    })();
  }, [dispatch]);

  return (
    <>
      <SongList />
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <ProtectedRoute path="/users" exact={true}>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true}>
            <User />
          </ProtectedRoute>
          {/* <Route path="/playlists">
            <PlaylistForm />
          </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;
