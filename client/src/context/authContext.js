import axios from "axios";
import React from 'react'
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(undefined);

export const AuthContextProvider = function AuthContextProvider({
  children,
}) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async function login(inputs) {
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        inputs,
        {
          withCredentials: true,
        }
      );

      setCurrentUser(res.data);
    } catch (error) {
      // erros de autenticação aqui
      console.error("Erro durante o login:", error);
    }
  };

  useEffect(function () {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const contextValue = {
    currentUser,
    login,
  };

  return React.createElement(
    AuthContext.Provider,
    { value: contextValue },
    children
  );
};
