import React, { useContext } from 'react'
import './stories.scss'
import { stories } from '../../constants/stories'
import { AuthContext } from '../../context/authContext'
export default function Stories() {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className="stories" >
      <div className="story">
          <img src={currentUser.profilePic} alt="" />
          <span>{currentUser.name}</span>
          <button>+</button>
        </div>
      {stories.map(story=>(
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  )
}
