'use client';

import Navbar from "../../../components/navbar"
import type { Mascota, MascotaData } from "@/app/types/types"
import { MASCOTAS_INICIALES } from "@/app/demo_data/mascotasIniciales"
import { useLocalStorage } from "@/app/useLocalStorage"
import { useState, useMemo } from "react"
import { Especie } from "../types/types";
import FormularioMascota from "../../../components/formularioMascota";

export default function Home() {

    function generarId(): string {
        return `m${Date.now()}`
    }
    
    const { datos: mascotas, setDatos: setMascotas, cargando } = useLocalStorage<Mascota>( 
        "ap_mascotas", MASCOTAS_INICIALES 
    )
    // controlar el formulario y los filtros
    const [mostrarForm, setMostrarForm]     = useState(false)
    const [editando, setEditando]           = useState<Mascota | null>(null)
    const [texto, setTexto] = useState("")
    const [filtroEspecie, setFiltroEspecie] = useState<"todos" | Especie>("todos")

    const mascotasFiltradas = useMemo(() => {
        return mascotas.filter(m => {
            const coincideTexto = m.nombre.toLowerCase().includes(texto.toLowerCase()) ||  
                                   m.raza.toLowerCase().includes(texto.toLowerCase()) ||
                                   m.owner.toLowerCase().includes(texto.toLowerCase())
            const coincideEspecie = filtroEspecie === "todos" || m.especie === filtroEspecie
            return coincideTexto && coincideEspecie
        })
    }, [mascotas, texto, filtroEspecie])

    // CRUD para mascotas
    function crear(datos: MascotaData) {
        const nueva: Mascota = {
            ...datos,
            id:generarId(),
            fecha_registro: new Date().toISOString().slice(0, 10),
        }
        setMascotas(prev => [...prev, nueva])
        setMostrarForm(false)
    }
    // edicion de mascotas
    function editar(datos: MascotaData) {
        if (!editando) return
        setMascotas(prev => prev.map(m => m.id === editando.id ? { ...m, ...datos } : m))
        setEditando(null)
    }

    // eliminacion de mascotas
    function eliminar(id: string) {
        const confirmado = window.confirm("¿Eliminar esta mascota? Esta accion no se puede deshacer.")
        if (confirmado) {
            setMascotas(prev => prev.filter(m => m.id !== id))
        }
    }
    if (cargando) {
        return <p style={{ color: "var(--gris)" }}>Cargando mascotas...</p>
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
                        {!mostrarForm && !editando && (            
                        <button className="btn-primario" style={{ marginRight:'2rem' }} onClick={() => setMostrarForm(true)}>
                            Nueva Mascota
                        </button>
                        )}
                    </div>
                    {(mostrarForm || editando) && (
                        <div className='card-info' style={{marginBottom:25}}>
                            
                            <h3 style={{ color: "var(--verde)", marginBottom: 16 }}>
                                {editando ? `Editando a ${editando.nombre}` : "Registrar nuevo paciente"} 
                            </h3>
                            
                        <FormularioMascota
                            valoresIniciales={editando ?? undefined }
                            onGuardar={editando ? editar : crear}
                            onCancelar={() => { setMostrarForm(false); setEditando(null) }}
                            textoBoton={editando ? "Guardar cambios" : "Registrar mascota"}
                        />
                        </div>
                    )}
                {/* Edicion de mascotas */}
                    <div style={estilos.controles}>
                        <input 
                            type="text"
                            className="input-base"
                            style={{ maxWidth: 280 }}
                            placeholder="Buscar..."
                            value={texto}
                            onChange={e => setTexto(e.target.value)}
                        />
                        <select
                            className="input-base"
                            value={filtroEspecie}
                            style={{ maxWidth: 180 }}
                            onChange={e => setFiltroEspecie(e.target.value as "todos" | Especie)}
                        >
                            <option value="todos">Todas las especies</option>
                            <option value='perro'>Perro</option>
                            <option value='gato'>Gato</option>
                            <option value='ave'>Ave</option>
                            <option value='otro'>Otro</option>
                        </select>
                        <span style={estilos.contador}>
                            {mascotasFiltradas.length} mascota{mascotasFiltradas.length !== 1 ? "s" : ""} encontrada{mascotasFiltradas.length !== 1 ? "s" : ""}
                        </span>
                    </div>
                {/* informacion de mascotas */}
                    {mascotasFiltradas.length === 0 ? (
                        <p style={{ color: "var(--gris)" }}>No se encontraron mascotas</p>
                    ) : (
                        <div style={estilos.grid}>
                            {mascotasFiltradas.map(m => (
                                <div className="card-info" key={m.id} style={estilos.card}>
                                    <div style={estilos.cardHeader}>
                                        <div>
                                            <p style={estilos.cardNombre}>{m.nombre}</p>
                                            <p style={estilos.cardRaza}>{m.raza} | {m.edad} años</p>
                                        </div>
                                    </div>
                                    <p style={estilos.cardDueno}>Dueño: {m.owner}</p>
                                    <div>
                                        <button className="btn-secundario" style={{ fontSize: ".82rem", padding: "6px 14px", margin: "0 1rem" }}
                                            onClick={() => { setEditando(m); setMostrarForm(false) }}>
                                            Editar
                                        </button>
                                        <button style={{ fontSize: ".82rem", padding: "6px 14px", margin: "0 1rem" }} className="btn-peligro" onClick={() => eliminar(m.id)}>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
            </main>
        </div>
    )
}





const estilos: Record<string, React.CSSProperties> = {
    pageShell: { display: "flex", alignItems: "flex-start", gap: 20, width: "100%" },
    pageMain: { flex: 1, minWidth: 0 },
    header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, marginTop: 25,flexWrap: "wrap", gap: 12 },
    controles: { display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 24 },
    contador: { color: "var(--celeste)", fontSize: "1rem" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 },
    card: { display: "flex", flexDirection: "column", gap: 12, alignItems: "center", textAlign: "center" },
    cardHeader: { display: "flex", gap: 12, alignItems: "center" },
    cardNombre: { fontFamily: "'Fraunces', serif", fontSize: "1.1rem", color: "var(--blanco, #fff)", textDecoration: "none" },
    cardRaza: { fontSize: ".8rem", color: "rgba(209,211,209,.5)" },
    cardDueno: { fontSize: ".88rem", color: "rgba(209,211,209,.7)" },
    cardAcciones: { display: "flex", gap: 8, marginTop: 4 },
}
