import React, { useContext } from 'react'
import './comments.scss'
import { comments } from '../../constants/comments'
import { AuthContext } from '../../context/authContext';
export default function Comments() {
  const auth = useContext(AuthContext);
 
  if(!auth) {
    return null
  }

  const { currentUser } = auth;

  return (
    <div className='comments' style={{ backgroundColor: "#5555", borderRadius: "10px" }}>
      <div className="write">
        <img src={currentUser?.profilePic} alt="" />
        <input type="text" placeholder='escreva seu comentário' />
        <button>Enviar</button>
      </div>
      {comments.map((comment) => (
        <div className="comment" style={{ padding: "10px" }}>
          <img src={comment.profilePicture} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">
            faz 1 hora
          </span>
        </div>
      ))}
    </div>
  )
}
