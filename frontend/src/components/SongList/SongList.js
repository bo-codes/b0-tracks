import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSongsThunk,
  deleteSongThunk,
} from "../../store/songs";
import UploadForm from "../SongForm/SongForm";

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
  // const DeleteSongActionHandler = (songId) => {
  //   dispatch(deleteSongThunk(songId));
  // };

  console.log("REDUCER SONGS", reducerSongs)
  return (
    <div>
      <ol>
        {reducerSongs?.map((song) => (
          <li key={song.id}>
            <h1>{song.id}</h1>
            <h1>{song.title}</h1>
            <h1>{song.userId}</h1>
          </li>
        ))}
      </ol>
      <UploadForm />
    </div>
  );
}
