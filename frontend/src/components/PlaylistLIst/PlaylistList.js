import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import song from '../../../../backend/db/models/song';
import { csrfFetch } from '../../store/csrf'
import { thunkGetAllPlaylists } from '../../store/playlists';

export default function PlaylistForm(){
  const selectorPlaylists = useSelector(state = state.playlists)
  const [title, setTitle] = useState('')
  const [songs, setSongs] = useState([])
  const dispatch = useDispatch()

  const remove = "playlist/delete";
  const del_playlist_action = (post_id) => ({
    type: remove,
    songId: song.id,
  });

  async function onSubmit(e) {
    e.preventDefault();

  }

  async function onDelete(playlistId) {
    const response = await csrfFetch(`/api/posts/delete/post/${post_id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      dispatch(del_post_action(post_id));
    }
  }

  //on load, itll run the thunk which fetches all of the playlists from our db
  useEffect(() => {
    dispatch(thunkGetAllPlaylists())
  }, [dispatch]) //whenever the dispatch is run/anything else is dispatched, itll happen again

  useEffect(() => {
    console.log('effect playlists: ', songs)
  }, [playlists]);

  useEffect(() => {
    if(selectorPlaylists) {
      setPlaylists(Object.values(selectorPlaylists))
    }
  }, [selectorPlaylists])

  return (
    <>

    </>
  )
}
