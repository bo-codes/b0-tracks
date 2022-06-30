import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSongsThunk,
} from "../../store/songs";
import Comments from "../Comments/Comments";

export default function Songs() {
  const dispatch = useDispatch();
  const reducerSongs = useSelector((state) => state.songs);
  // const reducerSongs = useSelector((state) => state.songs.values().sort())
  console.log("in component, reducerSongs:: ", reducerSongs);


  // const CreateSongActionHandler = () => {
  //   dispatch(createSongThunk({ content: "song id" }));
  // };

  // const GetAllSongsActionHandler = () => {
  //   dispatch(getAllSongsThunk());
  // };


  useEffect(() => {
    dispatch(getAllSongsThunk())
  }, [dispatch])
  // const DeleteSongActionHandler = (songId) => {
  //   dispatch(deleteSongThunk(songId));
  // };

  // const CreateCommentActionHandler = (songId) => {
  //   dispatch(createCommentThunk({ content: "comment id", songId }));
  // };

  // const DeleteCommentActionHandler = (ids) => {
  //   dispatch(deleteCommentThunk(ids));
  // };

  // const songs = reducerSongs
  //   ? reducerSongs.map((song) => {
  //       const child_props = {
  //         songId: song.id,
  //         comments: song?.comments?.all,
  //         hnadleCreateComment: CreateCommentActionHandler,
  //         handleDeleteComment: DeleteCommentActionHandler,
  //       };

  //       return (
  //         <div key={"song" + song.id.toString()}>
  //           <div>
  //             <h4>{song.content}</h4>
  //             <button
  //               onClick={() => DeleteSongActionHandler(song.id)}
  //             >
  //               delete song
  //             </button>
  //             <button
  //               onClick={() => CreateCommentActionHandler(song.id)}
  //             >
  //               new comment
  //             </button>
  //           </div>
  //           {song?.comments?.all ? <Comments props={child_props} /> : null}
  //         </div>
  //       );
  //     })
  //   : null;

  // console.log("checking render! running before return in SONGS");

  return (
    <div>
      {/* Nested Objects: CRUD for songs, comments and subcomments. */}
      {/* <button
        onClick={GetAllSongsActionHandler}
      >
        get songs from backend
      </button> */}
      <button
        // onClick={CreateSongActionHandler}
      >
        new song
      </button>
      {/* <ol>
        {reducerSongs.map((song) => (
          <li>
            <h1>{song.id}</h1>
            <h1>{song.title}</h1>
          </li>
        ))}
      </ol> */}
      <div>
        {reducerSongs}
      </div>
    </div>
  );
}
