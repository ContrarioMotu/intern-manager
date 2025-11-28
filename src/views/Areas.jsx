import { useEffect, useState } from "react";
import { apiGet } from "/src/api.js";

export default function Areas() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    async function cargar() {
      const data = await apiGet("/areas");
      setAreas(data.areas);
    }
    cargar();
  }, []);

  return (
    <section className="main-view">
      <h1 className="main-header">Áreas</h1>

      <section className="card row-3">
        <div className="table-header">
          <div className="table-title">Listado de áreas</div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Área</th>
            </tr>
          </thead>

          <tbody>
            {areas.map((a, idx) => (
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
