import React from 'react'
import Post from '../contentPosts/Post';
import {useQuery} from '@tanstack/react-query'
import { makeRequest } from '../../axios';

export default function Posts() {
  const {isLoading, error, data} = useQuery(['posts'], () => 
   makeRequest.get('/posts').then((res) => {
    return res.data
   })
  )
 console.log(data)
  return <div className="posts">
  {/* {data.map((post: PostType)=>(
    <Post post={post} key={post.id}/>
  ))} */}
</div>;
}

