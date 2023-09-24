import React from 'react'
import './home.scss'
import Stories from '../../components/Stories/Stories'
import Posts from '../../components/Posts/Posts'
import Share from "../../components/Share/Share"
export default function Home() {
  return (
    
     <div className='home' >
      <Stories/>
      <Share/>
      <Posts/>
     </div>
  )
}
