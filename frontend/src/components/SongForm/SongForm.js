import React, { useState } from "react";
import { createSongThunk } from "../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function UploadForm() {
  const [coverImg, setCoverImg] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [audio, setAudio] = useState(null);


  const dispatch = useDispatch();

  const history = useHistory();

  const songs = useSelector((state) => state.songsReducer.songs);

  const handleSubmit = (e) => {
    e.preventDefault();
    const song = {
      coverImg,
      title,
      artist,
      audio,
    };
    const newSong = dispatch(createSongThunk(song));
    history.push(`/`);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
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
            className="upload__inputs"
            required
          />
          {/* <label>Audio File</label>
          <input
            type="file"
            placeholder="Audio/MP3"
            value={audio}
            onChange={(e) => setAudio(e.target.value)}
            required
          /> */}
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
