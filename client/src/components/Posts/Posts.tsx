import React from 'react'
import {posts} from '../../constants/posts'
import Post from '../contentPosts/Post';

export default function Posts() {
  return <div className="posts">
  {posts.map(post=>(
    <Post post={post} key={post.id}/>
  ))}
</div>;
}

