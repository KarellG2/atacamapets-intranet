"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAutenticacion } from "../../../components/autenticacion";

export default function Home() {
  const autenticacion = useAutenticacion();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const enviar_formulario = (enviar: React.SubmitEvent<HTMLFormElement>) => {
    enviar.preventDefault();
    setError("");
    const resultado = autenticacion.login({ email, password });
    if (!resultado.ok) {
      setError(resultado.mensaje);
      return;
    }
    router.push("/inicio");
  };

  return (  
  <div style={estilos.fondo}>
    <div style={estilos.blob}></div>
    <form style={estilos.tarjeta} onSubmit={enviar_formulario}>

      <div style={estilos.encabezado}>
        <h1 style={estilos.titulo}>
          Atacama<strong style={{ color: "var(--celeste)" }}>Pets</strong>
        </h1>
        <p style={estilos.subtitulo}>Acceso Intranet</p>
      </div>

      <div style={estilos.campo}>
            <label style={estilos.label} htmlFor="email">Correo</label>
            <input
              id="email"
              type="text"
              className='input-base'
              placeholder="nombre@atacamapets.cl"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
      </div>

      <div style={estilos.campo}>
        <label style={estilos.label} htmlFor="password" >Contraseña</label>
        <input
          type="password"
          id="password"
          className='input-base'
          placeholder="*******"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

        <div style={estilos.campo}>
          <button type="submit" className='btn-primario'>Iniciar Sesión</button>
        </div>

      < p style={estilos.ayuda}>
        ¿Olvidaste tu contraseña? <Link href="/" style={{ color: "var(--celeste)" }}>Recuperala aquí</Link>
      </p>

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
    padding: "3.8rem 3rem",
    width: "100%",
    maxWidth: 380,
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  encabezado: { textAlign: "center", marginBottom: 8 },
  titulo: { fontSize: "2.5rem", color: "var(--gris)", marginTop: 8 },
  subtitulo: { fontSize: "1rem", color: "rgba(209,211,209,.5)", marginTop: 4 },
  campo: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: ".82rem", color: "var(--celeste)", fontWeight: 500 },
  ayuda: { fontSize: ".75rem", color: "rgba(209,211,209,.4)", textAlign: "center", marginTop: 4 },
}
