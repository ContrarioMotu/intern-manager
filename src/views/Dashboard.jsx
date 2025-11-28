import { useEffect, useState } from "react";
import { apiGet } from "/src/api.js";
import BarChart from "/src/components/BarChart.jsx";
import DonutChart from "/src/components/DonutChart.jsx";
import ModalNuevoPermiso from "/src/components/ModalNuevoPermiso.jsx";
import ModalEditarPermiso from "/src/components/ModalEditarPermiso.jsx";




export default function Dashboard() {
  const [permisos, setPermisos] = useState([]);
  const [areas, setAreas] = useState([]);
  const [apps, setApps] = useState([]);
  const [modalNuevo, setModalNuevo] = useState(false);

  const [modalEditar, setModalEditar] = useState(false);
  const [permisoSeleccionado, setPermisoSeleccionado] = useState(null);
  const [filtroArea, setFiltroArea] = useState("all");
  const [filtroApp, setFiltroApp] = useState("all");

  async function cargarDatos() {
    const p = await apiGet("/permisos");
    const a = await apiGet("/areas");
    const b = await apiGet("/apps");

    setPermisos(p.permisos);
    setAreas(a.areas);
    setApps(b.apps);
}


  useEffect(() => {
    cargarDatos();
  }, []);

  // --------------------------
  // FILTRADO
  // --------------------------

  const permisosFiltrados = permisos.filter((p) => {
    const matchArea = filtroArea === "all" || p.Area === filtroArea;
    const matchApp = filtroApp === "all" || p.App === filtroApp;
    return matchArea && matchApp;
  });

  // --------------------------
  // MÉTRICAS
  // --------------------------
  const total = permisosFiltrados.length;
  const pendientes = permisosFiltrados.filter((p) => p.Estatus === "Sin solicitar" || p.Estatus === "Pendiente").length;
  const aprobados = permisosFiltrados.filter((p) => p.Estatus === "Aprobado").length;
  const rechazados = permisosFiltrados.filter((p) => p.Estatus === "Rechazado").length;

  // --------------------------
  // GRÁFICA DE BARRAS
  // --------------------------
  const conteoPorArea = {};
    permisosFiltrados.forEach((p) => {
    conteoPorArea[p.Area] = (conteoPorArea[p.Area] || 0) + 1;
    });
  // --------------------------
  // ORDENAR POR FECHA (tabla)
  // --------------------------
  const permisosOrdenados = [...permisosFiltrados].sort(
    (a, b) => new Date(b.Fecha) - new Date(a.Fecha)
  );

  return (
    <section className="dashboard">

      <h1 className="main-header">Dashboard</h1>

      {/* FILTROS */}
      <section className="filters-row">

        <div className="filters-left">

            <button
            type="button"
            className="btn btn-primary"
            onClick={() => setModalNuevo(true)}
            >
            + Nuevo permiso
            </button>


          {/* FILTRO ÁREA */}
          <label className="filter">
            <span className="filter-label">Área</span>
            <select
              className="filter-select"
              value={filtroArea}
              onChange={(e) => setFiltroArea(e.target.value)}
            >
              <option value="all">Todas</option>
              {areas.map((a, i) => (
                <option key={i} value={a}>{a}</option>
              ))}
            </select>
          </label>

          {/* FILTRO APP */}
          <label className="filter">
            <span className="filter-label">Aplicación</span>
            <select
              className="filter-select"
              value={filtroApp}
              onChange={(e) => setFiltroApp(e.target.value)}
            >
              <option value="all">Todas</option>
              {apps.map((app, i) => (
                <option key={i} value={app}>{app}</option>
              ))}
            </select>
          </label>

        </div>

      </section>

      {/* MÉTRICAS */}
      <section className="stats-row">
        <div className="stat-card">
          <div className="stat-icon green">✔</div>
          <div>
            <div className="stat-number">{total}</div>
            <div className="stat-label">Permisos totales</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon red">⏺</div>
          <div>
            <div className="stat-number">{pendientes}</div>
            <div className="stat-label">Pendientes</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">✔</div>
          <div>
            <div className="stat-number">{aprobados}</div>
            <div className="stat-label">Aprobados</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon amber">!</div>
          <div>
            <div className="stat-number">{rechazados}</div>
            <div className="stat-label">Rechazados</div>
          </div>
        </div>
      </section>

    <section className="row-2">
      <BarChart conteo={conteoPorArea} />

      <DonutChart
        aprobados={aprobados}
        pendientes={pendientes}
        rechazados={rechazados}
      />
    </section>


      {/* TABLA */}
      <section className="row-3 card">
        <div className="table-header">
          <div className="table-title">Últimos permisos tramitados</div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Interno</th>
              <th>Área</th>
              <th>Aplicación</th>
              <th>Estatus</th>
              <th>Fecha</th>
            </tr>
          </thead>

          <tbody>
            {permisosOrdenados.map((p, i) => (
              <tr key={i}>
                <td>{p.Nombre}</td>
                <td>{p.Area}</td>
                <td>{p.App}</td>
                <td>{p.Estatus}</td>
                <td>{p.Fecha}</td>

                <td>
                    <button
                    className="icon-button"
                    onClick={() => {
                        setPermisoSeleccionado(p);
                        setModalEditar(true);
                    }}
                    >
                    ✏️
                    </button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
        <ModalNuevoPermiso
        open={modalNuevo}
        onClose={() => setModalNuevo(false)}
        onAdded={() => {
            apiGet("/permisos").then((p) => setPermisos(p.permisos));
        }}
        />
        <ModalEditarPermiso
        open={modalEditar}
        onClose={() => setModalEditar(false)}
        permiso={permisoSeleccionado}
        onUpdated={() => cargarDatos()}  // vuelve a llamar al backend
        />
      </section>
    </section>
  );
}
