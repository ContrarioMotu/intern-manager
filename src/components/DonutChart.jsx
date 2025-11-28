export default function DonutChart({ aprobados, pendientes, rechazados }) {
  const total = aprobados + pendientes + rechazados;

  if (total === 0) {
    return (
      <div className="card">
        <div className="card-title">Distribución por estatus</div>
        <div className="donut-wrapper">
          <div className="donut" style={{ background: "#e5e7eb" }}></div>
        </div>
      </div>
    );
  }

  const pA = (aprobados / total) * 100;
  const pP = (pendientes / total) * 100;
  const pR = (rechazados / total) * 100;

  return (
    <div className="card">
      <div className="card-title">Distribución por estatus</div>

      <div className="donut-wrapper">
        <div
          className="donut"
          style={{
            background: `
              conic-gradient(
                #16a34a 0 ${pA}%,
                #ef4444 ${pA}% ${pA + pP}%,
                #f59e0b ${pA + pP}% ${pA + pP + pR}%
              )
            `,
          }}
        ></div>

        <div className="legend">
          <div className="legend-item"><div className="legend-dot green"></div><span>Aprobado</span></div>
          <div className="legend-item"><div className="legend-dot red"></div><span>Pendiente</span></div>
          <div className="legend-item"><div className="legend-dot amber"></div><span>Rechazado</span></div>
        </div>
      </div>
    </div>
  );
}
