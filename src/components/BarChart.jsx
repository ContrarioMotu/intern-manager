export default function BarChart({ conteo }) {
  const max = Math.max(...Object.values(conteo), 1);

  const areasOrden = ["TI", "Finanzas", "Recursos Humanos", "Operaciones", "Otros"];

  return (
    <div className="card">
      <div className="card-title">Permisos por área</div>

      <div className="chart-with-axis">
        <div className="y-axis">
          <span>80</span>
          <span>60</span>
          <span>40</span>
          <span>20</span>
          <span>0</span>
        </div>

        <div className="bar-chart">
          {areasOrden.map((area, i) => (
            <div className="bar" key={i}>
              <div
                className="bar-fill"
                style={{
                  height: `${(conteo[area] || 0) / max * 100}%`,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <div className="chart-x-labels">
        {areasOrden.map((a, i) => (
          <span key={i}>{a}</span>
        ))}
      </div>
    </div>
  );
}
