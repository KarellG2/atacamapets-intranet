import Navbar from "../../../components/navbar"

export default function Agenda(){
    return(
        <div style={estilos.pageShell}>
            <Navbar />
            <main style={estilos.pageMain}>
                <div style={estilos.header}>
                    <div>
                        <h1 className="page-titulo">Agenda</h1>
                        <p className="page-sub">Gestion de citas registradas</p>
                    </div>
                    <button className="btn-primario" style={{ marginRight:'2rem' }}>
                        Nueva Cita
                    </button>
                </div>
            </main>
        </div>
    )
}
const estilos: Record<string, React.CSSProperties> = {
    pageShell: { display: "flex", alignItems: "flex-start", gap: 20, width: "100%" },
    pageMain: { flex: 1, minWidth: 0 },
    header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, marginTop: 25,flexWrap: "wrap", gap: 12 },
    controles: { display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 24 },
    contador: { color: "var(--celeste)", fontSize: ".85rem" },
    citaCard: { display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" },
    citaFechaBox: { display: "flex", flexDirection: "column", minWidth: 90 },
    citaFecha: { fontSize: ".8rem", color: "rgba(209,211,209,.5)" },
    citaHora: { fontFamily: "'Fraunces', serif", fontSize: "1.2rem", color: "var(--celeste)", fontWeight: 700 },
    citaPaciente: { fontFamily: "'Fraunces', serif", fontSize: "1rem", color: "var(--blanco, #fff)" },
    citaDetalle: { fontSize: ".85rem", color: "rgba(209,211,209,.6)" },
    estadoBadge: { border: "1px solid", padding: "4px 12px", borderRadius: 20, fontSize: ".78rem", textTransform: "capitalize" },
}
