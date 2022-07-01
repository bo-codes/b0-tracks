import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSongsThunk,
  deleteSongThunk,
} from "../../store/songs";
import UploadForm from "../SongForm/SongForm";
import EditForm from "../SongEditForm/SongEditForm";

export default function SongList() {
  const dispatch = useDispatch();
  // const reducerSongs = useSelector((state) => state.songs.values().sort())

  const GetAllSongsActionHandler = () => {
    dispatch(getAllSongsThunk());
  };

  useEffect(() => {
    GetAllSongsActionHandler()
  },[dispatch])

  const reducerSongs = useSelector((state) => state.songReducer.songs);
  console.log("in component, reducerSongs:: ", reducerSongs);

  const DeleteSongActionHandler = (song) => {
    dispatch(deleteSongThunk(song));
  };

  console.log("REDUCER SONGS", reducerSongs)
  return (
    <div>
      <ol>
        {reducerSongs?.map((song) => (
          <li key={song.id}>
            <h1>{song.id}</h1>
            <h1>{song.title}</h1>
            <h1>{song.userId}</h1>
            <button
              value={song}
              onClick={(e) => DeleteSongActionHandler(song)}
            >
              delete
            </button>
            <EditForm song={song}/>
          </li>
        ))}
      </ol>
      <UploadForm />
    </div>
  );
}
