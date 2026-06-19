import Link from "next/link";

export default function Home() {
  return (  
<div style={estilos.fondo}>
  <div style={estilos.blob}></div>

  <form style={estilos.tarjeta}>
    <div style={estilos.encabezado}>
      <h1 style={estilos.titulo}>
        Atacama<strong style={{ color: "var(--celeste)" }}>Pets</strong>
      </h1>
      <p style={estilos.subtitulo}>Acceso Intranet</p>
    </div>

    <div style={estilos.campo}>
      <label htmlFor="email" style={estilos.label}>Correo</label>
      <input
        type="text"
        id="email"
        placeholder="Nombre@atacamapets.cl"
      />
    </div>

    <div style={estilos.campo}>
      <label htmlFor="passwd" style={estilos.label}>Contraseña</label>
      <input
        type="password"
        id="passwd"
        placeholder="*******"
      />
    </div>
  </form>
</div>  );
}
const estilos: Record<string, React.CSSProperties> = {
  fondo: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--negro)",
    position: "relative",
    overflow: "hidden",
    padding: 20,
  },
  blob: {
    position: "absolute",
    width: 500,
    height: 500,
    borderRadius: "50%",
    background: "radial-gradient(circle at 50% 50%, #29b89e33 0%, transparent 70%)",
    top: "-15%",
    left: "-10%",
    pointerEvents: "none",
  },
  tarjeta: {
    position: "relative",
    zIndex: 1,
    background: "var(--grad-info-card)",
    border: "1px solid rgba(41,184,158,.2)",
    borderRadius: 20,
    padding: "40px 36px",
    width: "100%",
    maxWidth: 480,
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  encabezado: { textAlign: "center", marginBottom: 8 },
  titulo: { fontSize: "2.5rem", color: "var(--gris)", marginTop: 8 },
  subtitulo: { fontSize: "1.5rem", color: "rgba(209,211,209,.5)", marginTop: 4 },
  campo: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: ".82rem", color: "var(--celeste)", fontWeight: 500 },
  ayuda: { fontSize: ".75rem", color: "rgba(209,211,209,.4)", textAlign: "center", marginTop: 4 },
}
