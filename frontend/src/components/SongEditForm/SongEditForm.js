import React, { useEffect, useState } from "react";
import { updateSongThunk, getAllSongsThunk } from "../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

export default function EditForm({song}) {
  const [coverImg, setCoverImg] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [url, setUrl] = useState(null);
  const [description, setDescription] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  //USEFFECT
  useEffect(() => {
    const errors = [];

    if (!title.length) {
      errors.push("Song must have title");
    }
    if (!artist.length) {
      errors.push("Song must have artist");
    }
    if (!coverImg.length) {
      errors.push("Song must have cover image");
    }
    if (!coverImg.endsWith(".jpg")) {
      errors.push("File must be in jpg format");
    }

    setValidationErrors(errors);
  }, [title, artist, coverImg]);

  const dispatch = useDispatch();

  const GetAllSongsActionHandler = () => {
    dispatch(getAllSongsThunk());
  };

  const UpdateSongActionHandler = (updatedSong) => {
    dispatch(updateSongThunk(updatedSong))
  }

  useEffect(() => {
    GetAllSongsActionHandler();
  }, [dispatch]);


  const reducerSongs = useSelector((state) => state.songReducer.songs);

  const history = useHistory();

  const { userId } = useParams();

  // const songs = useSelector((state) => state.songsReducer.songs);

  const handleSubmit = async (e) => {
    //console
    console.log("TARGET ID", song.id)
    e.preventDefault();
    console.log("PASSED IN SONG", song.title)
    const updatedSong = {
      id: song.id,
      coverImg,
      title,
      artist,
      url,
      description,
      //NEED TO ADD
      userId,
      // playlistId,
    };
    //console
    await UpdateSongActionHandler(updatedSong);
    //console
    history.push(`/`);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <ul>
            {validationErrors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="coverImg"
            value={coverImg}
            onChange={(e) => setCoverImg(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label>url File</label>
          <input
            type="text"
            placeholder="url/MP3"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
