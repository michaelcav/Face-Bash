import React, { useContext, useState, } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";



export default function Login() {

    const [inputs, setInputs] = useState({
      username: "",
      password: "",
    });
    const [err, setErr] = useState(null);
  
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const {login} = useContext(AuthContext)
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        if (login) { // Verifica se login está definido
          await login(inputs);
          navigate("/");
        } else {
          // Lida com o caso em que login é undefined
          throw new Error("Login function is undefined");
        }
      } catch (error) {
        if (error.response && error.response.data) {
          setErr(error.response.data);
        } else {
          setErr("An error occurred during login.");
        }
      }
    };
  
    return (
      <div className="login">
        <div className="card">
          <div className="left">
            <h1>Hello World.</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
              alias totam numquam ipsa exercitationem dignissimos, error nam,
              consequatur.
            </p>
            <span>Don't you have an account?</span>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </div>
          <div className="right">
            <h1>Login</h1>
            <form>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={inputs.username}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
              />
              {err && <div className="error">{err}</div>}
              <button onClick={handleLogin}>Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
