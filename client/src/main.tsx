import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './style.scss'
import { DarkModeContextProvider } from './context/darkModeContext'
import { AuthContextProvider } from './context/authContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DarkModeContextProvider>
    <AuthContextProvider>
    </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>,
)
