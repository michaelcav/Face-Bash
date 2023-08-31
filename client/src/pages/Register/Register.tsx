import React from 'react'
import './register.scss'
import { Link } from 'react-router-dom'
export default function login() {
  return (
    <div className='register'>
     <div className="card">
      <div className="left">
        <h1>Face Bash</h1>
        <span>Você já tem uma conta?</span>
        <Link to="/login">
        <button>Login</button>
        </Link>
      </div>
      <div className="right">
        <h1>Crie a sua conta</h1>
        <form action="">
          <input type="text" name="username"  id="" 
          placeholder='Username'/>
          <input type="email" name="" placeholder='Email' id="" />
          <input type="password" name="password" placeholder='Password' id="" />
          <input type="text" name="name" placeholder='Name' id="" />
          <button>Registrar</button>
        </form>
      </div>
     </div>
    </div>
  )
}
