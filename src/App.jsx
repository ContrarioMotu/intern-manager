import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./views/Dashboard";
import  Permisos from "./views/Permisos";
import  Internos from "./views/Internos";
import  Aplicaciones from "./views/Aplicaciones";
import  Areas from "./views/Areas";

export default function App() {
  const [view, setView] = useState("dashboard");

  return (
    <div className="app">
      <Sidebar currentView={view} onChangeView={setView} />

      <main className="main">
        {view === "dashboard" && <Dashboard />}
        {view === "permisos" && <Permisos />}
        {view === "internos" && <Internos />}
        {view === "aplicaciones" && <Aplicaciones />}
        {view === "areas" && <Areas />}

        {/* más vistas luego */}
      </main>
    </div>
  );
}
