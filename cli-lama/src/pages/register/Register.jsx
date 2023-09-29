import React, { useState,  } from 'react';
import './register.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Register() {
  const initialInputs = {
    username: '',
    email: '',
    password: '',
    name: '',
  };

  const [inputs, setInputs] = useState(initialInputs);
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8800/api/auth/register', inputs);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErr(error.response?.data || 'An error occurred.');
      } else {
        setErr('An error occurred.');
      }
    }
  };

  return (
    <div className="register">
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
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={inputs.username}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={inputs.name}
              onChange={handleChange}
            />
            {err && <p className="error">{err}</p>}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
