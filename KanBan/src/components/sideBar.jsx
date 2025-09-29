import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.scss";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2> </h2>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/">
              <i className="bi bi-house-door"></i>
            </Link>
          </li>
          <li>
            <Link to="/cadUsuario">
              <i className="bi bi-people"></i>
            </Link>
          </li>
          <li>
            <Link to="/cadTarefa">
              <i className="bi bi-list-task"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
