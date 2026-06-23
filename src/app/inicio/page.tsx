'use client';

import Navbar from "../../../components/navbar"
import { useLocalStorage } from "@/app/useLocalStorage"
import { CITAS_INICIALES } from "@/app/demo_data/citasIniciales"
import { MASCOTAS_INICIALES} from "@/app/demo_data/mascotasIniciales"

export default function Inicio() {

    const { datos: citas, cargando: cargandoCitas } = useLocalStorage("ap_citas", CITAS_INICIALES)
    const { datos: mascotas, cargando: cargandoMascotas } = useLocalStorage("ap_mascotas", MASCOTAS_INICIALES)
    const dia = new Date().toISOString().slice(0, 10);
    const citasHoy = citas.filter(cita => cita.fecha === dia)
    const citasPendientes = citas.filter(cita => cita.estado === 'pendiente')
    

    if (cargandoCitas || cargandoMascotas) {
        return (
            <div style={estilos.pageShell}>
                <Navbar />
                <main style={estilos.pageMain}>
                    <p style={{ color: 'var(--gris)' }}>Cargando resumen...</p>
                </main>
            </div>
        )
    }

    return (
        <div style={estilos.pageShell}>
            <Navbar />
            <main style={estilos.pageMain}>
                <div style={estilos.header}>
                    <div>
                        <h1 className="page-titulo">Bienvenido a la Intranet de AtacamaPets</h1>
                        <p className="page-sub">Resumen de la clinica hoy {dia}</p>
                    </div>
                </div>
                {/* Cartas de info general */}
                <div style={estilos.grid}>
                    <div className="card-info" style={estilos.statCard}>
                        <div>
                            <p style={estilos.statNum}>{mascotas.length}</p>
                            <p style={estilos.statLabel}>Pacientes registrados</p>
                        </div>
                    </div>
                    <div className="card-info" style={estilos.statCard}>
                        <div>
                            <p style={estilos.statNum}>{citasHoy.length}</p>
                            <p style={estilos.statLabel}>Citas para hoy</p>
                        </div>
                    </div>
                    <div className="card-info" style={estilos.statCard}>
                        <div>
                            <p style={estilos.statNum}>{citasPendientes.length}</p>
                            <p style={estilos.statLabel}>Citas pendientes</p>
                        </div>
                    </div>
                </div>
                {/* Proximas Citas */}
                <div className="card-info" style={{ marginTop: 30 }}>
                    <h3 style={{ color:"var(--verde)", fontSize:"1.1rem", marginBottom: 14 }}>
                        Citas Proximas
                    </h3>
                    {citas.length === 0  ? (
                        <p style={{color: "var(--gris)"}}>
                            No se encontro citas agendadas
                        </p>
                    ): (
                        <ul className="infoDisp">
                            {citas.slice(0, 10).map(cita => (
                                <li key={cita.id} style={estilos.citaItem}>
                                    <p>{cita.fecha} - {cita.hora}</p>
                                    <p style={{color:"var(--blanco)"}}><strong>{cita.nombreMascota}</strong></p>
                                    <p style={estilos.citaMotivo}>{cita.descripcion}</p>
                                </li>
                            ))}
                        </ul>
                    )
                }
                </div>
            </main>
        </div>  
  )
}
const estilos: Record<string, React.CSSProperties> = {
    pageShell: { display: "flex", alignItems: "flex-start", gap: 20, width: "100%" },
    pageMain: { flex: 1, minWidth: 0 },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 18,
  },
    infoDisp: {listStyle:"none", display:"flex", flexDirection:"column", gap:10},
    header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, marginTop: 25,flexWrap: "wrap", gap: 12 },
    statCard: { display: "flex", flexDirection: "column",alignItems: "center",textAlign: "center", gap: 16 },
    statNum: { fontFamily: "'Fraunces', serif", fontSize: "2rem", fontWeight: 900, color: "var(--celeste)" },
    statLabel: { fontSize: "1.3rem", color: "var(--GRIS)" },
    citaItem: {
        display: "flex",
        gap: 16,
        alignItems: "center",
        fontSize: ".9rem",
        color: "rgba(209,211,209,.7)",
        borderBottom: "1px solid rgba(255,255,255,.05)",
        paddingBottom: 10,
    },
  citaMotivo: { marginLeft: "auto", color: "var(--verde)", fontSize: ".82rem", marginRight:"2rem", paddingTop:"1rem" },
}
