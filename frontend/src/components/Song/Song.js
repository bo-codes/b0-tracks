import React from 'react'

export default function Song( props ) {
  const {
    id,
    userId,
    playlistId,
    title,
    description,
    url,
    coverImg
  } = props
  return (
    <div>
      <div>
        <span>{coverImg}</span>
      </div>
      <div>
        <h3>title</h3>
        <div>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
      <div>
        <span>{description}</span>
      </div>
    </div>
  )
}
