import { csrfFetch } from "./csrf";

//song switch cases
const create = "songs/CREATE";
const get = "songs/GET";
const update = "songs/UPDATE"
const remove = "songs/DELETE";
const setErr = "error/newError";

//ACTIONS//
//SONG ACTIONS
const createSongAction = (song) => ({
  type: create,
  song,
});

const getAllSongsAction = (songs) => ({
  type: get,
  songs,
});

const updateSong = (song) => ({
  type: update,
  song
});

const deleteSongAction = (songs) => ({
  type: remove,
  songs,
  // songId,
});

const newError = (error) => ({
  type: setErr,
  error,
});

//THUNKS//
//SONG THUNKS
export const createSongThunk = (song) => async (dispatch) => {
  console.log("SONGOBJTHUNK", song)
  const response = await csrfFetch(`/api/songs/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(song),
  });
  console.log("RESPONSE", response);
  if (response.ok) {
    //console
    const song = await response.json();
    dispatch(createSongAction(song));
    return response;
    // } else {
    //   const error = {
    //     status_code: response.status,
    //     error_desc: "increment_frame failed",
    //   };
    //   dispatch(newError(error));
  }
};

export const getAllSongsThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/songs/");
  if (response.ok) {
  const {songs} = await response.json();
    console.log("songs:: ", songs);
    // return songs;
    dispatch(getAllSongsAction(songs));
    return response;
  // } else {
  //   const error = {
  //     status_code: response.status,
  //     error_desc: "increment_frame failed",
  //   };
  //   dispatch(newError(error));
  }
};

export const updateSongThunk = (song) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${song.id}`, {
    method: 'PATCH',
    body: JSON.stringify(song),
  });

  if(response.ok) {
    const song = await response.json();
    dispatch(updateSong(song))
    return song;
  }
}

export const deleteSongThunk = (song) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/delete/song/${song.id}`, {
    method: "DELETE",
    body: JSON.stringify(song)
  });

  if (response.ok) {
    const  songs  = await response.json();
    dispatch(deleteSongAction(songs));
  }
};


//REDUCER
const initalState = {songs: []}
export default function songReducer(state = initalState, action) {

  let newState;

  switch (action.type) {
    case create:
      //create structure of new object in state.
      newState = {...state, songs:[...state.songs]}
      newState[action.song.id] = action.song
      newState.songs.push(action.song)
      return newState;

    case get:
      // return {
      //   ...state,
      //   songs: {...action.songs}
      // };
      newState = {}
      action.songs.forEach(song => {
        newState[song.id] = song
      });
      newState.songs = action.songs
      return newState;

    case update:
      newState = {...state, songs:[...state.songs]}
      newState[action.song.id] = action.song
      return newState;

    case remove:
      newState = {};
      console.log("NEWSTATE SONGS IN DELETE", action)
      action.songs.forEach((song) => {
        newState[song.id] = song;
      });
      newState.songs = action.songs;

      newState.songs.splice(
        newState.songs.findIndex((s) => s.id === action.songId),
        1
      );
      delete newState[action.songId];

      // newState.songs = action.songs

      //Mutate a COPY of the old array, find object by id and splice it out:


      // //Overwrite array key with new array value:
      // newState.songs = [...newState.songs];

      return newState;

    //comments cases ================================================
    // case createComment: {
    //   //saving this path to a var saves space
    //   const songId = action.comment.songId;

    //   //insert new comment into NEW array, and spread old values behind it(keep newest comments on top when component maps this):
    //   const newArr = [action.comment, ...state[songId].comments.all];

    //   //Shape your new comment object:
    //   const newComment = {
    //     ...action.comment,
    //   };

    //   //Return the new shape of this slice of state. Spread all old state objects into new objects. Making a deep copy of nested state can get confusing; try to organize your syntax to make it easier to keep track of where you are in the object.
    //   return {
    //     ...state,
    //     [songId]: {
    //       ...state[songId],
    //       comments: {
    //         ...state[songId].comments,
    //         [action.comment.id]: newComment,
    //         all: newArr,
    //       },
    //     },
    //   };
    // }

    // //NOTE: we aren't using this case in our components.
    // case getComment: {
    //   //Save yourself some space:
    //   const songId = action.comment.songId;

    //   //Return a normalized deep copy of state:
    //   return {
    //     ...state,
    //     [songId]: {
    //       ...state[songId],
    //       comments: {
    //         ...update_keys(action.comments),
    //         all: action.comments,
    //       },
    //     },
    //   };
    // }

    // case removeComment: {
    //   //saving path to object saves space. Note it is referencing the array in new state object.
    //   const commentArr = newState[action.songId].comments.all;

    //   //Delete comment from new copy of state:
    //   delete newState[action.songId].comments[action.comment_id];

    //   //Mutate the array copy only. Remove object from array copy:
    //   commentArr.splice(
    //     commentArr.findIndex((c) => c.id === action.comment_id),
    //     1
    //   );

    //   //Construct the proper state shape:
    //   newState[action.songId].comments = {
    //     ...newState[action.songId].comments,
    //     all: [...commentArr],
    //   };

    //   return newState;
    // }


    //error cases ================================================
    case setErr:
      return { ...state, error: action.error };

    default:
      return state;
  }
}

//OLD CODE

// //create
// import { csrfFetch } from "./csrf";

// const createSongThunk = "songs/createSongThunk";
// const GET_SONG = "songs/getSong";
// const UPDATE_SONG = "songs/updateSong";
// const deleteSongThunk = "songs/deleteSongThunk";

// const actioncreateSongThunk = (song) => {
//   return {
//     type: createSongThunk,
//     song,
//   };
// };
// const actionGetSong = (songs) => {
//   return {
//     type: GET_SONG,
//     songs,
//   };
// };
// const actionUpdateSong = (song) => {
//   return {
//     type: UPDATE_SONG,
//     song,
//   };
// };
// const actiondeleteSongThunk = (songId) => {
//   return {
//     type: deleteSongThunk,
//     songId,
//   };
// };

// //THUNKS
// //GET
// export const thunkgetAllSongsThunk = (userId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/songs/user/${userId}`);

//   if (response.ok) {
//     const data = await response.json();
//     dispatch(actionGetSong(data));
//     return response;
//   } else return await response.json();
// };
// //CREATE
// export const thunkcreateSongThunk = (user) => async (dispatch) => {
//   const { credential, password } = user;
//   const response = await csrfFetch("/api/songs/", {
//     method: "song",
//     body: JSON.stringify({
//       credential,
//       password,
//     }),
//   });
//   const data = await response.json();
//   dispatch(actionCreatePlaylist(data.user));
//   return response;
// };
// //UPDATE
// export const thunkUpdatePlaylist = (user) => async (dispatch) => {
//   const { credential, password } = user;
//   const response = await csrfFetch("/api/session", {
//     method: "song",
//     body: JSON.stringify({
//       credential,
//       password,
//     }),
//   });
//   const data = await response.json();
//   dispatch(actionUpdatePlaylist(data.user));
//   return response;
// };
// //DELETE
// export const thunkDeletePlaylist = (user) => async (dispatch) => {
//   const { credential, password } = user;
//   const response = await csrfFetch("/api/session", {
//     method: "song",
//     body: JSON.stringify({
//       credential,
//       password,
//     }),
//   });
//   const data = await response.json();
//   dispatch(actionDeletePlaylist(data.user));
//   return response;
// };

// const playlistsReducer = (state = {}, action) => {
//   let newState = { ...state };
//   switch (action.type) {
//     case GET_PLAYLIST:
//       action.playlists.forEach((playlist) => {
//         newState[playlist.id] = playlist;
//       });
//       return newState;

//     case CREATE_PLAYLIST:
//       newState.user = action.payload;
//       return newState;

//     case UPDATE_PLAYLIST:
//       newState.user = action.payload;
//       return newState;

//     case DELETE_PLAYLIST:
//       delete newState[action.playlistId];
//       return newState;

//     default:
//       return state;
//   }
// };

// export default playlistsReducer;
