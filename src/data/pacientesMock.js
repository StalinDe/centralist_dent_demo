// src/data/pacientesMock.js

const pacientesBase = [
  {
    id: "SI-0001",
    cedula: "0104589231",
    nombre: "María Fernanda López",
    telefono: "0998123456",
    sucursal: "Santa Isabel",
    ultimaVisita: "2026-11-18",
    motivoConsulta: "Limpieza dental y revisión general",
    diagnostico: "Gingivitis leve en sector anteroinferior",
    tratamiento: "Profilaxis ultrasónica + técnica de cepillado",
    estadoCita: "Confirmada",
  },
  {
    id: "SI-0002",
    cedula: "0106234890",
    nombre: "Carlos Andrés Méndez",
    telefono: "0987654321",
    sucursal: "Santa Isabel",
    ultimaVisita: "2026-11-20",
    motivoConsulta: "Dolor agudo en molar superior derecho",
    diagnostico: "Caries profunda en pieza 16",
    tratamiento: "Endodoncia programada - Sesión 1",
    estadoCita: "Agendada",
  },
  {
    id: "SI-0003",
    cedula: "0103987412",
    nombre: "Valeria Sofía Ordóñez",
    telefono: "0991122334",
    sucursal: "Santa Isabel",
    ultimaVisita: "2026-11-22",
    motivoConsulta: "Control mensual de ortodoncia",
    diagnostico: "Evolución favorable en arcada superior",
    tratamiento: "Cambio de arcos y ligaduras elásticas",
    estadoCita: "No asistió",
  },
  {
    id: "SI-0004",
    cedula: "0105129843",
    nombre: "Jorge Luis Pesántez",
    telefono: "0984455667",
    sucursal: "Santa Isabel",
    ultimaVisita: "2026-11-24",
    motivoConsulta: "Evaluación para corona cerámica",
    diagnostico: "Fractura coronaria en pieza 24",
    tratamiento: "Toma de impresión digital y provisional",
    estadoCita: "Confirmada",
  },
];

// Generador de volumen para probar velocidad frente a Excel
export function obtenerPacientesIniciales(totalSimulado = 1500) {
  const nombres = ["Ana", "Luis", "Carmen", "Pedro", "Sofía", "Diego", "Elena", "Mateo"];
  const apellidos = ["Vega", "Torres", "Salazar", "Ríos", "Cárdenas", "Mora", "Paredes", "Guamán"];
  const tratamientos = [
    "Profilaxis dental",
    "Resina compuesta pieza 36",
    "Control de ortodoncia",
    "Exodoncia simple",
    "Blanqueamiento clínico",
  ];
  const estados = ["Confirmada", "Agendada", "No asistió"];

  const listaCompleta = [...pacientesBase];

  for (let i = pacientesBase.length + 1; i <= totalSimulado; i++) {
    const nombreAleatorio = `${nombres[i % nombres.length]} ${apellidos[(i * 3) % apellidos.length]}`;
    const numeroFormateado = String(i).padStart(4, "0");

    listaCompleta.push({
      id: `SI-${numeroFormateado}`,
      cedula: `010${String(1000000 + i).slice(-7)}`,
      nombre: nombreAleatorio,
      telefono: `099${String(1000000 + i).slice(-7)}`,
      sucursal: "Santa Isabel",
      ultimaVisita: "2026-11-15",
      motivoConsulta: "Consulta odontológica general",
      diagnostico: "Evaluación clínica registrada en ficha digital",
      tratamiento: tratamientos[i % tratamientos.length],
      estadoCita: estados[i % estados.length],
    });
  }

  return listaCompleta;
}