import './post.scss'
import React, { useState } from 'react'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { PostProps } from '../../constants/posts'
import { Link } from "react-router-dom";
import Comments from '../Comments/Comments';

export default function Post({ post }: PostProps) {
  const [commentOpen, setcommentOpen] = useState(false)
  const liked = true
  return (
    <div className="post" >
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="datails">
              <Link to={`/profile/${post.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
                <span className='name'>{post.name} </span>
              </Link>
              <br /> <span className="date">postado a 3 minutos</span>
            </div>
          </div>
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
          {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            12 Likes
          </div>
          <div className="item" onClick={() => setcommentOpen(!commentOpen)}>
         <TextsmsOutlinedIcon/>
            12 Comments
          </div>
          <div className="item">
          <ShareOutlinedIcon/>
            Share
          </div>
        </div>
        {commentOpen && <Comments/>}
      </div>
    </div>
  )
}
