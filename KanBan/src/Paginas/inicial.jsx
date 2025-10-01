import { BarraNavegacao } from "../components/BarraNavegacao";
import Cabecalho from "../components/Cabecalho";
import { Outlet } from "react-router-dom";
import "../styles/main.scss";
import Quadro from "../components/Quadro";
import { CardUsuario } from "./CardUsuarios";
import { CardTarefas } from "./CardTarefas";
import "../styles/Inicial.scss";
import Sidebar from "../components/sideBar";

export function Inicial() {
  return (
    <div className="layout">
      <div className="main-content">
        <Cabecalho />
        <Quadro />
        <Outlet />
      </div>
    </div>
  );
}
