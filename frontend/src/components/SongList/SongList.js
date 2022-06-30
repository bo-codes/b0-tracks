import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSongThunk,
  getAllSongsThunk,
  deleteSongThunk,
} from "../../store/songs";

export default function Songs() {
  const dispatch = useDispatch();
  // const reducerSongs = useSelector((state) => state.songs.values().sort())


  const CreateSongActionHandler = () => {
    dispatch(createSongThunk({ content: "song id" }));
  };

  const GetAllSongsActionHandler = () => {
    dispatch(getAllSongsThunk());
  };


  useEffect(() => {
    GetAllSongsActionHandler()
  },[dispatch])

  const reducerSongs = useSelector((state) => state.songReducer.songs);
  console.log("in component, reducerSongs:: ", reducerSongs);
  // const DeleteSongActionHandler = (songId) => {
  //   dispatch(deleteSongThunk(songId));
  // };

  console.log("REDUCER SONGS", reducerSongs)
  return (
    <div>
      {/* Nested Objects: CRUD for songs, comments and subcomments. */}
      <button
        onClick={GetAllSongsActionHandler}
      >
        get songs from backend
      </button>
      <button
        onClick={CreateSongActionHandler}
      >
        new song
      </button>
      <ol>
        {reducerSongs?.map((song) => (
          <li>
            <h1>{song.id}</h1>
            <h1>{song.title}</h1>
          </li>
        ))}
      </ol>
    </div>
  );
}
