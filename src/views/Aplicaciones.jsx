import { useEffect, useState } from "react";
import { apiGet } from "/src/api.js";

export default function Aplicaciones() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    async function cargar() {
      const data = await apiGet("/apps");
      setApps(data.apps);
    }
    cargar();
  }, []);

  return (
    <section className="main-view">
      <h1 className="main-header">Aplicaciones</h1>

      <section className="card row-3">
        <div className="table-header">
          <div className="table-title">Listado de aplicaciones</div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Aplicación</th>
            </tr>
          </thead>

          <tbody>
            {apps.map((a, idx) => (
              <tr key={idx}>
                <td>{a}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
}
