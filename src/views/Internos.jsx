import { useEffect, useState } from "react";
import { apiGet } from "/src/api.js";

export default function Internos() {
  const [internos, setInternos] = useState([]);

  useEffect(() => {
    async function cargar() {
      const data = await apiGet("/interns");
      setInternos(data.internos);
    }
    cargar();
  }, []);

  return (
    <section className="main-view">
      <h1 className="main-header">Internos</h1>

      <section className="card row-3">
        <div className="table-header">
          <div className="table-title">Listado de internos</div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
            </tr>
          </thead>

          <tbody>
            {internos.map((i, idx) => (
              <tr key={idx}>
                <td>{i}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
}
