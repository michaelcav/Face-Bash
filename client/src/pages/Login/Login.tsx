import React, { useContext } from 'react'
import './login.scss'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

export default function Login() {
  const {login} = useContext(AuthContext);

  const handleLogin = () => {
    login();
  }

  return (
    <div className='login'>
     <div className="card">
      <div className="left">
        <h1>Face Bash</h1>
        <p>Welcome to new world!</p>
        <span>Don't you have an account?</span>
       <Link to="/register">
       <button>Register</button>
       </Link>
      </div>
      <div className="right">
        <h1>Login</h1>
        <form action="">
          <input type="text" name="username" id="" 
          placeholder='Username'/>
          <input type="password" name="password" placeholder='Password' id="" />
          <button onClick={handleLogin}>Login</button>
        </form>
      </div>
     </div>
    </div>
  )
}
