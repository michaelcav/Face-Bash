import { DarkModeOutlined, EmailOutlined, GridViewOutlined, HomeOutlined, NotificationsOutlined, PersonOutline, SearchOutlined, WbSunnyOutlined } from '@mui/icons-material'
import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import './navbar.scss'
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";


export default function Navbar() {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/">
          <span>Face Bash</span>
        </Link>
       <HomeOutlined className='icon' />
        {darkMode ? (
        
          <WbSunnyOutlined className='toggle' onClick={toggle} />
         
        ) : (
          <DarkModeOutlined className='toggle' onClick={toggle} />
        )}
        <GridViewOutlined />
        <div className="search">
          <SearchOutlined />
          <input type="search" name="Search" placeholder='Search...' id="" />
        </div>
      </div>
      <div className="right">
        <PersonOutline />
        <EmailOutlined />
        <NotificationsOutlined />
        <div className="user">
          <img
            src={currentUser.profilePic}
            alt=""
          />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  )
}
