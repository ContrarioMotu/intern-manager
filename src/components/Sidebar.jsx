import React from "react";

export default function Sidebar({ currentView, onChangeView }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon"></div>
        <div>
          <div className="logo-text-title">
            Sistema de Gestión<br />de Permisos
          </div>
          <div className="logo-text-sub">Panel administrativo</div>
        </div>
      </div>

      <ul className="sidebar-nav">
        <li
          className={`nav-item ${currentView === "dashboard" ? "active" : ""}`}
          onClick={() => onChangeView("dashboard")}
        >
          🏠 Dashboard
        </li>

        <li
          className={`nav-item ${currentView === "permisos" ? "active" : ""}`}
          onClick={() => onChangeView("permisos")}
        >
          ✅ Permisos
        </li>

        <li
          className={`nav-item ${currentView === "internos" ? "active" : ""}`}
          onClick={() => onChangeView("internos")}
        >
          👥 Internos
        </li>

        <li
          className={`nav-item ${currentView === "aplicaciones" ? "active" : ""}`}
          onClick={() => onChangeView("aplicaciones")}
        >
          🧩 Aplicaciones
        </li>

        <li
          className={`nav-item ${currentView === "areas" ? "active" : ""}`}
          onClick={() => onChangeView("areas")}
        >
          📍 Áreas
        </li>
      </ul>

      <div className="sidebar-footer">Versión 1.0 · Demo</div>
    </aside>
  );
}
