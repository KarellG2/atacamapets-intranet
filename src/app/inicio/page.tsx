import Navbar from "../../../components/navbar"
import { CITAS_INICIALES } from "@/app/demo_data/citasIniciales"
import { MASCOTAS_INICIALES} from "@/app/demo_data/mascotasIniciales"

export default function Inicio() {

    const dia = new Date().toISOString().slice(0, 10);
    const citasHoy = CITAS_INICIALES.filter(cita => cita.fecha === dia)
    const citasPendientes = CITAS_INICIALES.filter(cita => cita.estado === 'pendiente')



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

                <div style={estilos.grid}>
                    <div className="card-info" style={estilos.statCard}>
                        <div>
                            {/* valor harcoded cambiar luego */}
                            <p style={estilos.statNum}>{MASCOTAS_INICIALES.length}</p>
                            <p style={estilos.statLabel}>Pacientes registrados</p>
                        </div>
                    </div>
                    <div className="card-info" style={estilos.statCard}>
                        <div>
                            {/* valor harcoded cambiar luego */}
                            <p style={estilos.statNum}>{citasHoy.length}</p>
                            <p style={estilos.statLabel}>Citas para hoy</p>
                        </div>
                    </div>
                    <div className="card-info" style={estilos.statCard}>
                        <div>
                            {/* valor harcoded cambiar luego */}
                            <p style={estilos.statNum}>{citasPendientes.length}</p>
                            <p style={estilos.statLabel}>Citas pendientes</p>
                        </div>
                    </div>
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
    header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, marginTop: 25,flexWrap: "wrap", gap: 12 },
    statCard: { display: "flex", alignItems: "center", gap: 16 },
    statNum: { fontFamily: "'Fraunces', serif", fontSize: "1.8rem", fontWeight: 900, color: "var(--celeste)" },
    statLabel: { fontSize: ".85rem", color: "rgba(209,211,209,.6)" },
    citaItem: {
        display: "flex",
        gap: 16,
        alignItems: "center",
        fontSize: ".9rem",
        color: "rgba(209,211,209,.7)",
        borderBottom: "1px solid rgba(255,255,255,.05)",
        paddingBottom: 10,
    },
  citaMotivo: { marginLeft: "auto", color: "var(--verde)", fontSize: ".82rem" },
}
