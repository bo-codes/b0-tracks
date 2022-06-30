import React, { useEffect } from "react";
import MusicPlayer from "../MusicPlayer";
import Navigation from "../Navigation";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import { getAllSongs } from "../../store/songs";
import "./Dashboard.css";

export default function Dashboard({ isLoaded }) {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch]);
// import React from 'react'

// export default function Song( props ) {
//   const {
//     id,
//     userId,
//     playlistId,
//     title,
//     description,
//     url,
//     coverImg
//   } = props
//   return (
//     <div>
//       <div>
//         <span>{coverImg}</span>
//       </div>
//       <div>
//         <h3>title</h3>
//         <div>
//           <button>Edit</button>
//           <button>Delete</button>
//         </div>
//       </div>
//       <div>
//         <span>{description}</span>
//       </div>
//     </div>
//   )
// }
