import { csrfFetch } from "./csrf";

//song switch cases
const create = "songs/CREATE";
const get = "songs/GET";
const remove = "songs/DELETE";
const setErr = "error/newError";

// //comment switch cases
// const createComment = "comment/CREATE";
// const getComment = "comment/GET";
// const removeComment = "comment/DELETE";

//ACTIONS//
//SONG ACTIONS
// const createSongAction = (song) => ({
//   type: create,
//   song,
// });

const getAllSongsAction = (songs) => ({
  type: get,
  songs,
});

// const deleteSongAction = (songId) => ({
//   type: remove,
//   songId: songId,
// });

const newError = (error) => ({
  type: setErr,
  error,
});

//COMMENT ACTIONS
// const addCommentAction = (comment) => ({
//   type: createComment,
//   comment,
// });

// const getAllCommentsAction = (comments) => ({
//   type: getComment,
//   comments,
// });

// const deleteCommentAction = (ids) => ({
//   type: removeComment,
//   ...ids,
// });


//THUNKS//
//SONG THUNKS
// export const createSongThunk = (song) => async (dispatch) => {
//   const response = await csrfFetch(`/api/songs/`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(song),
//   });

//   if (response.ok) {
//     const song = await response.json();
//     dispatch(createSongAction(song));
//   } else {
//     const error = {
//       status_code: response.status,
//       error_desc: "increment_frame failed",
//     };
//     dispatch(newError(error));
//   }
// };

export const getAllSongsThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/songs/");
  if (response.ok) {
  const {songs} = await response.json();
    console.log("songs:: ", songs);
    // return songs;
    dispatch(getAllSongsAction(songs));
  } else {
    const error = {
      status_code: response.status,
      error_desc: "increment_frame failed",
    };
    dispatch(newError(error));
  }
};

// export const deleteSongThunk = (songId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/songs/delete/song/${songId}`, {
//     method: "DELETE",
//   });

//   if (response.ok) {
//     dispatch(deleteSongAction(songId));
//   }
// };

// //COMMENTS THUNKS
// export const createCommentThunk = (comment) => async (dispatch) => {
//   const response = await csrfFetch("/api/comments", {
//     method: "song",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(comment),
//   });

//   if (response.ok) {
//     const comment = await response.json();
//     dispatch(addCommentAction(comment));
//   } else {
//     const error = {
//       status_code: response.status,
//       error_desc: "createCommentThunk failed",
//     };
//     dispatch(newError(error));
//   }
// };

// export const getAllCommentsThunk = () => async (dispatch) => {
//   const response = await csrfFetch("/api/songs/comments");
//   if (response.ok) {
//     const { comments } = await response.json();
//     dispatch(getAllCommentsAction(comments));
//   } else {
//     const error = {
//       status_code: response.status,
//       error_desc: "increment_frame failed",
//     };
//     dispatch(newError(error));
//   }
// };

// export const deleteCommentThunk = (ids) => async (dispatch) => {
//   const response = await csrfFetch(
//     `/api/songs/delete/comment/${ids.comment_id}`,
//     {
//       method: "DELETE",
//     }
//   );

//   if (response.ok) {
//     dispatch(deleteCommentAction(ids));
//   }
// };


//REDUCER
const initalState = {songs: null}
export default function songReducer(state = initalState, action) {
  // const update_keys = (array) => {
  //   const obj = {};
  //   array.forEach((i) => {
  //     obj[i.id] = i;
  //     if (i.hasOwnProperty("comments")) {
  //       obj[i.id].comments = { ...update_keys(i.comments), all: i.comments };
  //     } else if (i.hasOwnProperty("subcomments")) {
  //       obj[i.id].subcomments = {
  //         ...update_keys(i.subcomments),
  //         all: i.subcomments,
  //       };
  //     }
  //   });
  //   // console.log("\narray param in update_keys(), array:: ", array)
  //   // console.log("\nfilled object in update_keys(), obj:: ", obj)
  //   return obj;
  // };


  const newState = { ...state };

  switch (action.type) {
    // case create:
    //   //create structure of new object in state.
    //   const new_song = {
    //     id: action.song.id,
    //     title: action.song.title,
    //     url: action.song.url,
    //     description: action.song.description,
    //   };

    //   //Normalize new object into slice of state, and insert new object into appropriate place in new array literal:
    //   return {
    //     ...state,
    //     [action.song.id]: new_song,
    //     allSongs: [new_song, ...state.allSongs],
    //   };

    case get:
      //You may need to normalize objects from database if your store is not in sync with backend. Normalize redux using a helper function:
      return {
        ...state,
        // ...update_keys(action.songs),
        allSongs: {...state.songs, [action.song.id]: action.song}
      };

    // case remove:
    //   delete newState[action.songId];

    //   //Mutate a COPY of the old array, find object by id and splice it out:
    //   newState.getAllSongsAction.splice(
    //     newState.getAllSongsAction.findIndex((p) => p.id === action.songId),
    //     1
    //   );

    //   //Overwrite array key with new array value:
    //   newState.getAllSongsAction = [...newState.getAllSongsAction];

    //   return newState;

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