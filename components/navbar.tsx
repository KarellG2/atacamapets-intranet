import Link from "next/link"

export default function Navbar() {
    return(
        <aside style={estilos.sidebar}>
            {/* TITULO / ATACAMAPETS */}
            <div style={estilos.brand}>
                <span></span>
                <span style={estilos.brandTexto}>Atacama<strong style={{ color: "var(--celeste)" }}>PETS</strong></span>
                <span></span>
            </div>
            <div style={estilos.nav}>
            {/* link inicio */}
                <Link href="/" style={estilos.navLink}>
                Inicio
                </Link>
            {/* link pacientes */}
                <Link href='/mascotas' style={estilos.navLink}>
                Mascotas
                </Link>
            {/* link agenda */}
                <Link href="/agenda" style={estilos.navLink}>
                Agenda
                </Link>
            </div>
        </aside>
    )
}
const estilos: Record<string, React.CSSProperties> = {
  sidebar: {
    width: 240,
    minHeight: "100vh",
    background: "var(--negro2)",
    borderRight: "1px solid rgba(255,255,255,.06)",
    display: "flex",
    flexDirection: "column",
    padding: "24px 16px",
    gap: 32,
    position: "sticky",
    top: 0,
  },
  brand: { display: "flex", alignItems: "center", gap: 10, padding: "0 8px" },
  brandTexto: { fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "var(--gris)" },
  nav: { display: "flex", flexDirection: "column", gap: 4, flex: 1 },
  navLink: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 14px",
    borderRadius: 10,
    color: "rgba(209,211,209,.7)",
    textDecoration: "none",
    fontSize: ".95rem",
    transition: "background .2s, color .2s",
  },
  navLinkActivo: {
    background: "rgba(41,184,158,.12)",
    color: "var(--celeste)",
    fontWeight: 600,
  },
  usuarioBox: {
    borderTop: "1px solid rgba(255,255,255,.06)",
    paddingTop: 16,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  usuarioInfo: { padding: "0 4px" },
  usuarioNombre: { fontSize: ".9rem", color: "var(--gris)", fontWeight: 500 },
  usuarioRol: { fontSize: ".75rem", color: "var(--celeste)", textTransform: "capitalize" },
}
