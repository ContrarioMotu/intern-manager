import { useState, useEffect } from "react";
import { apiPost } from "/src/api.js";


export default function ModalEditarPermiso({ open, onClose, permiso, onUpdated }) {
  const [estatus, setEstatus] = useState("");

  useEffect(() => {
    if (permiso) {
      setEstatus(permiso.Estatus);
    }
  }, [permiso]);

  if (!open || !permiso) return null;

  const guardar = async () => {
    const res = await apiPost(`/intern/estatus/${permiso.ID}?app=${permiso.App}&estatus=${estatus}`);

    if (res.mensaje) {
      onUpdated(); // refrescar dashboard
      onClose();   // cerrar modal
    }
  };

  return (
    <div className="modal-backdrop active">
      <div className="modal">
        
        <div className="modal-header">
          <h2 className="modal-title">Modificar permiso</h2>
          <button type="button" className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="form-row">
            <div className="form-field">
              <span className="form-label">Interno</span>
              <div className="form-readonly">{permiso.Nombre}</div>
            </div>

            <div className="form-field">
              <span className="form-label">Área</span>
              <div className="form-readonly">{permiso.Area}</div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <span className="form-label">Aplicación</span>
              <div className="form-readonly">{permiso.App}</div>
            </div>

            <div className="form-field">
              <label className="form-label">Estatus</label>

              <select
                className="form-input"
                value={estatus}
                onChange={(e) => setEstatus(e.target.value)}
              >
                <option value="Sin solicitar">Sin solicitar</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Aprobado">Aprobado</option>
                <option value="Rechazado">Rechazado</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <span className="form-label">Fecha</span>
              <div className="form-readonly">{permiso.Fecha}</div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Cancelar
          </button>

          <button type="button" className="btn btn-primary" onClick={guardar}>
            Guardar cambios
          </button>
        </div>

      </div>
    </div>
  );
}
