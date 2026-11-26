// src/App.jsx
import { useState } from "react";
import { obtenerPacientesIniciales } from "./data/pacientesMock";
import "./App.css";

function App() {
  // 1. Estados principales de la aplicación
  const [pacientes, setPacientes] = useState(() => obtenerPacientesIniciales(1500));
  const [busqueda, setBusqueda] = useState("");
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(pacientes[0]);

  // 2. Lógica de búsqueda instantánea (por nombre, cédula o código)
  const pacientesFiltrados = pacientes.filter((paciente) => {
    const termino = busqueda.toLowerCase();
    return (
      paciente.nombre.toLowerCase().includes(termino) ||
      paciente.cedula.includes(termino) ||
      paciente.id.toLowerCase().includes(termino)
    );
  });

  // 3. Función para cambiar el estado de la cita (prefigura integración con Outlook)
  const cambiarEstadoCita = (idPaciente, nuevoEstado) => {
    const listaActualizada = pacientes.map((p) =>
      p.id === idPaciente ? { ...p, estadoCita: nuevoEstado } : p
    );
    setPacientes(listaActualizada);

    if (pacienteSeleccionado && pacienteSeleccionado.id === idPaciente) {
      setPacienteSeleccionado({ ...pacienteSeleccionado, estadoCita: nuevoEstado });
    }
  };

  return (
    <div className="app-container">
      {/* Encabezado Superior */}
      <header className="topbar">
        <div>
          <h1>Centralist Dent — Gestión Clínica</h1>
          <span className="badge-sucursal">Sede Activa: Santa Isabel</span>
        </div>
        <div className="stats-rapidas">
          <span>Registros en memoria: <strong>{pacientes.length}</strong></span>
        </div>
      </header>

      {/* Buscador Principal */}
      <section className="search-bar-section">
        <input
          type="text"
          placeholder="Buscar paciente por nombre, cédula o código (ej. SI-0001, María, 0104...)"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="search-input"
        />
        <span className="resultados-count">
          Mostrando {Math.min(pacientesFiltrados.length, 25)} de {pacientesFiltrados.length} coincidencias
        </span>
      </section>

      {/* Contenido Principal en 2 Columnas: Lista + Ficha Clínica Digital */}
      <main className="main-grid">
        {/* Columna Izquierda: Tabla de Pacientes */}
        <div className="card lista-card">
          <h2>Directorio de Pacientes (Santa Isabel)</h2>
          <table className="pacientes-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Paciente</th>
                <th>Cédula</th>
                <th>Cita</th>
              </tr>
            </thead>
            <tbody>
              {pacientesFiltrados.slice(0, 25).map((paciente) => (
                <tr
                  key={paciente.id}
                  onClick={() => setPacienteSeleccionado(paciente)}
                  className={pacienteSeleccionado?.id === paciente.id ? "fila-activa" : ""}
                >
                  <td><strong>{paciente.id}</strong></td>
                  <td>{paciente.nombre}</td>
                  <td>{paciente.cedula}</td>
                  <td>
                    <span className={`estado-pill ${paciente.estadoCita.toLowerCase().replace(" ", "-")}`}>
                      {paciente.estadoCita}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Columna Derecha: Ficha Clínica Digital (Reemplazo de Word) */}
        <div className="card ficha-card">
          {pacienteSeleccionado ? (
            <>
              <div className="ficha-header">
                <h2>Ficha Clínica Digital</h2>
                <span className="ficha-id">{pacienteSeleccionado.id}</span>
              </div>

              <div className="ficha-datos">
                <p><strong>Paciente:</strong> {pacienteSeleccionado.nombre}</p>
                <p><strong>Cédula:</strong> {pacienteSeleccionado.cedula}</p>
                <p><strong>Teléfono:</strong> {pacienteSeleccionado.telefono}</p>
                <p><strong>Sucursal:</strong> {pacienteSeleccionado.sucursal}</p>
                <p><strong>Última Visita:</strong> {pacienteSeleccionado.ultimaVisita}</p>
              </div>

              <hr />

              <div className="ficha-clinica-detalle">
                <h3>Detalle Odontológico</h3>
                <p><strong>Motivo de consulta:</strong> {pacienteSeleccionado.motivoConsulta}</p>
                <p><strong>Diagnóstico:</strong> {pacienteSeleccionado.diagnostico}</p>
                <p><strong>Tratamiento:</strong> {pacienteSeleccionado.tratamiento}</p>
              </div>

              <hr />

              {/* Control rápido de estado de cita */}
              <div className="ficha-acciones">
                <label><strong>Estado de Cita (Sincronización Agenda):</strong></label>
                <div className="botones-estado">
                  {["Agendada", "Confirmada", "No asistió"].map((estado) => (
                    <button
                      key={estado}
                      onClick={() => cambiarEstadoCita(pacienteSeleccionado.id, estado)}
                      className={pacienteSeleccionado.estadoCita === estado ? "btn-activo" : "btn-secundario"}
                    >
                      {estado}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p>Selecciona un paciente de la lista para ver su ficha.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;