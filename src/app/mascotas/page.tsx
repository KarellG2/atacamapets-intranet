'use client';
import Navbar from "../../../components/navbar"
import type { Mascota, MascotaData } from "../../types/types"
import { MASCOTAS_INICIALES } from "../../demo_data/mascotasIniciales"
import { useLocalStorage } from "../../../hooks/useLocalStorage"
import { useState, useMemo } from "react"

export default function Home() {
    function generarId(): string {
        return `m${Date.now()}`
    }
    
    return(
        <div style={estilos.pageShell}>
            <Navbar />
            <main style={estilos.pageMain}>
                <div style={estilos.header}>
                    <div>
                        <h1 className="page-titulo">Mascotas</h1>
                        <p className="page-sub">Gestion de mascotas registradas</p>
                    </div>
                    <button className="btn-primario" style={{ marginRight:'2rem' }}>
                        Nuevo Paciente
                    </button>
                </div>
                {/* <div className="card-info" style={{ margin: 24 }}>
                    <h3 style={{ color:'var(--verde)', marginBottom:24 }}>
                    </h3>

                </div> */} 
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
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 },
    card: { display: "flex", flexDirection: "column", gap: 12 },
    cardHeader: { display: "flex", gap: 12, alignItems: "center" },
    cardNombre: { fontFamily: "'Fraunces', serif", fontSize: "1.1rem", color: "var(--blanco, #fff)", textDecoration: "none" },
    cardRaza: { fontSize: ".8rem", color: "rgba(209,211,209,.5)" },
    cardDueno: { fontSize: ".88rem", color: "rgba(209,211,209,.7)" },
    cardAcciones: { display: "flex", gap: 8, marginTop: 4 },
}
