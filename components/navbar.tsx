'use client';
import Link from "next/link"
import { useAutenticacion } from "../components/autenticacion"


export default function Navbar() {
  const { usuario, logout } = useAutenticacion()
  const logoutHandler = () => {
    logout()
  }

  return(
        <aside style={estilos.sidebar}>
            {/* TITULO / ATACAMAPETS */}
            <div style={estilos.brand}>
                <span></span>
                <span style={estilos.brandTexto}>Atacama<strong style={{ color: "var(--celeste)" }}>Pets</strong></span>
                <span></span>
            </div>
            <div style={estilos.nav}>
            {/* link vista general */}
                <Link href="/inicio" style={estilos.navLink}>
                Dashboard
                </Link>
            {/* link pacientes */}
                <Link href='/mascotas' style={estilos.navLink}>
                Mascotas
                </Link>
            {/* link agenda */}
                <Link href="/agenda" style={estilos.navLink}>
                Agenda
                </Link>
            {/* Logout */}
                <div style={estilos.usuarioBox}>
                  <div style={estilos.usuarioInfo}>
                    <p style={estilos.usuarioNombre}>{usuario?.nombre}</p>
                    <p style={estilos.usuarioRol}>{usuario?.rol}</p>
                  </div>
                  <button className="btn-secundario" style={{ width: "100%", fontSize: ".85rem" }} onClick={logoutHandler}>
                    <a href='/' style={{ textDecoration: "none", color: "inherit" }}>Cerrar sesión</a>
                  </button>
                </div>
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
  brandTexto: { fontFamily: "'DM Sans', sans-serif", fontSize: "1.6rem", color: "var(--gris)" },
  nav: { display: "flex", flexDirection: "column", gap: 4, flex: 1, marginTop: 28 },
  navLink: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
    padding: "15px 14px",
    borderRadius: 10,
    color: "rgba(209,211,209,.7)",
    textDecoration: "none",
    fontSize: "1.2rem",
    transition: "background .2s, color .2s",
  },
  navLinkActivo: {
    background: "rgba(41,184,158,.12)",
    color: "var(--celeste)",
    fontWeight: 600,
  },
  usuarioBox: {
    marginTop: "auto",
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
