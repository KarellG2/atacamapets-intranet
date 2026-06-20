import Link from "next/link"
import Navbar from "../../../components/navbar"

export default function Home() {

    return(
        <div>
            <div style={estilos.header}>
                {/* titulo */}
                <div>
                    <Navbar></Navbar>
                </div>

                <div style={{marginTop:'2rem'}}>
                    <h1 className="page-titulo">Pacientes</h1>                    
                    <p className="page-sub">Gestion de mascotas registradas</p>
                </div>
                {/* form */}
                <button className="btn-primario" style={{marginTop:'2rem', marginRight:'2rem'}}>
                    Nuevo Paciente
                </button>
                {/* <div className="card-info" style={{ margin: 24 }}>
                    <h3 style={{ color:'var(--verde)', marginBottom:24 }}>
                    </h3>

                </div> */}
            </div>
        </div>
    )
}





const estilos: Record<string, React.CSSProperties> = {
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, flexWrap: "wrap", gap: 12 },
  controles: { display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 24 },
  contador: { color: "var(--celeste)", fontSize: ".85rem" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 },
  card: { display: "flex", flexDirection: "column", gap: 12 },
  cardHeader: { display: "flex", gap: 12, alignItems: "center" },
  cardNombre: { fontFamily: "'Fraunces', serif", fontSize: "1.1rem", color: "var(--blanco, #fff)", textDecoration: "none" },
  cardRaza: { fontSize: ".8rem", color: "rgba(209,211,209,.5)" },
  cardDueno: { fontSize: ".88rem", color: "rgba(209,211,209,.7)" },
  cardAcciones: { display: "flex", gap: 8, marginTop: 4 },
}
