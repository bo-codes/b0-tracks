// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux'
// import playlist from '../../../backend/db/models/playlist';
// import { csrfFetch } from '../store/csrf'
// import { thunkGetAllPlaylists } from '../store/playlists';


// export default function PlaylistForm(){
//   const selectorPlaylists = useSelector(state = state.playlists)
//   const [title, setTitle] = useState('')
//   const [playlists, setPlaylists] = useState([])
//   const dispatch = useDispatch()

//   const remove = "playlist/delete";
//   const del_playlist_action = (post_id) => ({
//     type: remove,
//     playlistId: playlist.id,
//   });

//   async function onSubmit(e) {
//     e.preventDefault();

//   }

//   async function onDelete(playlistId) {
//     const response = await csrfFetch(`/api/posts/delete/post/${post_id}`, {
//       method: "DELETE",
//     });

//     if (response.ok) {
//       dispatch(del_post_action(post_id));
//     }
//   }

//   //on load, itll run the thunk which fetches all of the playlists from our db
//   useEffect(() => {
//     dispatch(thunkGetAllPlaylists())
//   }, [dispatch]) //whenever the dispatch is run/anything else is dispatched, itll happen again

//   useEffect(() => {
//     console.log('effect playlists: ', playlists)
//   }, [playlists]);

//   useEffect(() => {
//     if(selectorPlaylists) {
//       setPlaylists(Object.values(selectorPlaylists))
//     }
//   }, [selectorPlaylists])

//   return (
//     <>
//       <form onSubmit={onSubmit}>
//         <label>Title:</label>
//         <input
//           onChange={(e) => setTitle(e.target.value)}
//           value={title}
//         />
//         <button>Create Playlist</button>
//       </form>

//       <br />
//       {/* this is only relevant if there are playlists which is why it checks first */}
//       {/* if playlists exist/the variable carries a value, then map those playlists with a delete button */}
//       {playlists && playlists.map(playlist => (
//         <div key={playlist.id}>
//           <span>Playlist Id:: {playlist.id}</span>
//           <br />
//           <span>Title:: {playlist.title}</span>
//           <button type='button' onClick={() => onDelete(playlist.id)}>Delete Playlist</button>
//           <hr />
//         </div>
//       ))}
//     </>
//   )
// }
