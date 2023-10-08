import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";
import * as yup from "yup"; // Importe o Yup

export default function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({}); // Estado para armazenar mensagens de erro
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Crie um esquema Yup para validar os campos
    const schema = yup.object().shape({
      username: yup.string().required("Username is required"),
      password: yup.string().required("Password is required"),
    });

    try {
      await schema.validate(inputs, { abortEarly: false }); // Adicione abortEarly: false para pegar todas as mensagens de erro

      if (login) {
        // Verifica se login está definido
        await login(inputs);
        navigate("/");
      } else {
        // Lida com o caso em que login é undefined
        throw new Error("Login function is undefined");
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        // Se a validação falhar, atualize o estado de errors com as mensagens de erro do Yup
        const validationErrors = {};
        error.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        setErrors(validationErrors);
      } else {
        // Lida com outros erros
        setErrors({ general: "An error occurred during login." });
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
            {errors.username && (
              <div className="error" style={{color: "red"}}>{errors.username}</div>
            )}
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="error" style={{color: "red"}}>{errors.password}</div>
            )}
            {errors.general && (
              <div className="error" style={{color: "red"}}>{errors.general}</div>
            )}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
