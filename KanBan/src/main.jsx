import "./styles/main.scss"
import { BrowserRouter } from "react-router-dom"
import { Rotas } from "./rotas/rotas.jsx"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "bootstrap-icons/font/bootstrap-icons.css";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Rotas/>
  </BrowserRouter>
)
