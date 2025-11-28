import { useEffect, useState } from "react";
import { apiGet } from "/src/api.js";

export default function Permisos() {
  const [permisos, setPermisos] = useState([]);

  useEffect(() => {
    async function cargar() {
      const res = await apiGet("/permisos");
      setPermisos(res.permisos);
    }
    cargar();
  }, []);

  return (
    <section className="view">
      <h1 className="main-header">Permisos</h1>

      <table className="card">
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
          {permisos.map((p, i) => (
            <tr key={i}>
              <td>{p.Nombre}</td>
              <td>{p.Area}</td>
              <td>{p.App}</td>
              <td>{p.Estatus}</td>
              <td>{p.Fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
