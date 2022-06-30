//create
import { csrfFetch } from "./csrf"

const CREATE_PLAYLIST = 'playlists/createPlaylist'
const GET_PLAYLIST = 'playlists/getPlaylist'
const UPDATE_PLAYLIST = 'playlists/updatePlaylist'
const DELETE_PLAYLIST = 'playlists/deletePlaylist'


const actionCreatePlaylist = (playlist) => {
  return {
    type: CREATE_PLAYLIST,
    playlist
  }
}
const actionGetPlaylist = (playlists) => {
  return {
    type: GET_PLAYLIST,
    playlists
  }
}
const actionUpdatePlaylist = (playlist) => {
  return {
    type: UPDATE_PLAYLIST,
    playlist
  }
}
const actionDeletePlaylist = (playlistId) => {
  return {
    type: DELETE_PLAYLIST,
    playlistId
  }
}


//THUNKS
//GET
export const thunkGetAllPlaylists = (userId) => async (dispatch) => {

  const response = await csrfFetch(`/api/playlists/user/${userId}` );

  if(response.ok) {
    const data = await response.json();
    dispatch(actionGetPlaylist(data));
    return response;
  } else return await response.json();
};
//CREATE
export const thunkCreatePlaylist = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(actionCreatePlaylist(data.user));
  return response;
};
//UPDATE
export const thunkUpdatePlaylist = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(actionUpdatePlaylist(data.user));
  return response;
};
//DELETE
export const thunkDeletePlaylist = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(actionDeletePlaylist(data.user));
  return response;
};

const playlistsReducer = (state = {}, action) => {
  let newState = {...state}
  switch (action.type) {
    case GET_PLAYLIST:
      action.playlists.forEach(playlist => {
        newState[playlist.id] = playlist
      });
      return newState;

    case CREATE_PLAYLIST:
      newState.user = action.payload;
      return newState;

    case UPDATE_PLAYLIST:
      newState.user = action.payload;
      return newState;

    case DELETE_PLAYLIST:
      delete newState[action.playlistId]
      return newState;

    default:
      return state;
  }
};

export default playlistsReducer;
