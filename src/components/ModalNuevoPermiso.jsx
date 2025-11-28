import { useState, useEffect } from "react";
import { apiGet, apiPut } from "/src/api.js";

export default function ModalNuevoPermiso({ open, onClose, onAdded }) {
  const [interno, setInterno] = useState("");
  const [area, setArea] = useState("");
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    if (open) {
      apiGet("/areas").then((d) => setAreas(d.areas));
    }
  }, [open]);

  if (!open) return null;

  async function registrar() {
    if (!interno || !area) return alert("Completa los datos.");

    const res = await apiPut(`/intern/${interno}?area=${area}`);

    alert("Permiso agregado correctamente");

    onAdded(); // Recargar dashboard
    onClose();
  }

  return (
    <div className="modal-backdrop active">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Registrar nuevo permiso</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="form-field">
            <label>Interno</label>
            <input
              type="text"
              className="form-input"
              value={interno}
              onChange={(e) => setInterno(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label>Área</label>
            <select
              className="form-input"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            >
              <option value="">Seleccione</option>
              {areas.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={registrar}>Registrar</button>
        </div>
      </div>
    </div>
  );
}
