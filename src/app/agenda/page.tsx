'use client';

import { useState, useMemo } from "react"
import Navbar from "../../../components/navbar"
import { useLocalStorage } from "@/app/useLocalStorage"

import type { Cita, CitaData, Estado, Mascota } from "@/app/types/types"

import { CITAS_INICIALES } from "@/app/demo_data/citasIniciales"
import { MASCOTAS_INICIALES } from "@/app/demo_data/mascotasIniciales"
import FormularioCita from "../../../components/formularioCita";

const COLOR_ESTADO: Record<Estado, string> = {
    pendiente: 'var(--amarillo)',
    confirmada: 'var(--verde)',
    finalizada: 'var(--celeste)',
    cancelada: 'var(--rojo)'
}

function generarID(): string {
    return `c${Date.now()}`
}

export default function Agenda() {
    const { datos: citas, setDatos: setCitas, cargando } = useLocalStorage<Cita>("ap_citas", CITAS_INICIALES)
    const { datos: mascotas } = useLocalStorage<Mascota>("ap_mascotas", MASCOTAS_INICIALES)

    const [mostrarForm, setMostrarForm] = useState(false)
    const [fechaFiltro, setFiltroFecha] = useState('')
    const [estadoFiltro, setFiltroEstado] = useState<'todos' | Estado>('todos')

    const [editando, setEditando] = useState<Cita | null>(null)

    const filtroCitas = useMemo(() => {
        return citas
            .filter(c => {
                const coincidirFecha = fechaFiltro === '' || c.fecha === fechaFiltro
                const coincidirEstado = estadoFiltro === 'todos' || c.estado === estadoFiltro
                return coincidirFecha && coincidirEstado
            })
            .sort((a, b) => `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`))
    }, [citas, fechaFiltro, estadoFiltro])

    if (cargando) {
        return <p style={{ color: 'var(--gris)' }}>Cargando citas...</p>
    }

    function creacion (datos: CitaData){
        const nueva: Cita = { ...datos, id:generarID() }
        setCitas(previo => [ ...previo, nueva ])
        setMostrarForm(false)
    }
    function edicion  (datos:CitaData){
        if (!editando) return
        setCitas(previo => previo.map(c=>c.id ===editando.id ? { ...c, ...datos } : c))
        setEditando(null)
    }
    function eliminar (id:string){
        const confirmado = window.confirm('¿Cancelar y eliminar esta cita?')
        if (confirmado) {
            setCitas(previo => previo.filter(c => c.id !== id))
        }
    }
    if (cargando){
        return <p style={{ color: "var(--gris)" }}>Cargando agenda</p>

    }

    return (
        <div style={estilos.pageShell}>
            <Navbar />
            <main style={estilos.pageMain}>
                <div style={estilos.header}>
                    <div>
                        <h1 className='page-titulo'>Agenda</h1>
                        <p className='page-sub'>Gestion de citas registradas</p>
                    </div>
                    <button className='btn-primario' style={{ marginRight: '2rem' }} onClick={() => setMostrarForm(true)}>
                        Nueva Cita
                    </button>
                </div>
                {/* CITAS */}
                {(mostrarForm || editando) && (
                    <div className='card-info' style={{ marginBottom:24 }}>
                        <h3 style={{ color: 'var(--verde)', marginBottom: 16}}>
                            {editando ? 'Editar Cita' : 'Agendar cita nueva'}
                        </h3>
                        <FormularioCita
                            mascotas = {mascotas}
                            valoresIniciales = {editando ?? undefined}
                            onGuardar = {editando ? edicion : creacion}
                            onCancelar = {() => {setMostrarForm(false) ; setEditando(null) }}
                            textoBoton ={editando ? 'Guardar cambios' : 'Agendar cita'}
                            /></div>
                        )}

                        <div style={estilos.controles}>  
                            <input type='date' className="input-base" style={{ maxWidth:180 }} value={fechaFiltro} onChange={e => setFiltroFecha(e.target.value)}></input>                     
                            {fechaFiltro && (
                                <button className="btn-secundario" style={{ fontSize: '.9rem', padding:'8px 14px' }} onClick={() =>setFiltroFecha('')}>Limpiar Fecha</button>
                            )}
                            <select className="input-base" style={{ maxWidth: 180 }} value={estadoFiltro} onChange={e => setFiltroEstado(e.target.value as 'todos' | Estado)}>
                                <option value="todos">Todos los estados</option>
                                <option value="pendiente">Pendiente</option>
                                <option value="confirmada">Confirmada</option>
                                <option value="finalizada">Finalizada</option>
                                <option value="cancelada">Cancelada</option>
                            </select>
                            <span style={estilos.contador}>
                                {filtroCitas.length} cita{filtroCitas.length !== 1 ? 's' : ''}
                            </span>
                        </div>

                        {filtroCitas.length === 0 ? (
                            <p style={{ color: 'var(--gris)', marginTop: 20 }}>No se encontraron citas</p>
                        ): 
                        (
                            <div style={{ display:'flex', flexDirection: 'column', gap: 12}}>
                                {filtroCitas.map(c => (
                                    <div key={c.id} className="card-info" style={estilos.citaCard}>
                                        <div style={estilos.citaFechaBox}>
                                            <span style={estilos.citaFecha}>{c.fecha}</span>
                                            <span style={estilos.citaHora}>{c.hora}</span>
                                        </div>
                                        {/* Datos Masoca */}
                                        <div style={{ flex: 1}}>
                                            <p style={estilos.citaPaciente}>{c.nombreMascota}</p>
                                            <p style={estilos.citaDetalle}>{c.descripcion}</p>
                                        </div>
                                        <span style={{ ...estilos.estadoBadge, color: COLOR_ESTADO[c.estado], borderColor: COLOR_ESTADO[c.estado] }}>{c.estado}</span>
                                        <div style={{ display: 'flex', gap:8 }}>
                                            <button className="btn-secundario" style={{ fontSize: '.8rem', padding:'6px 12px' }} onClick={() => { setEditando(c) ; setMostrarForm(false) }}>Editar</button>
                                            <button className="btn-peligro" onClick={() => eliminar(c.id)}>Eliminar</button>

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
    header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, marginTop: 25, flexWrap: "wrap", gap: 12 },
    controles: { display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 24 },
    contador: { color: "var(--celeste)", fontSize: "1rem" },
    citaCard: { display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" },
    citaFechaBox: { display: "flex", flexDirection: "column", minWidth: 90 },
    citaFecha: { fontSize: ".8rem", color: "rgba(209,211,209,.5)" },
    citaHora: { fontFamily: "'Fraunces', serif", fontSize: "1.2rem", color: "var(--celeste)", fontWeight: 700 },
    citaPaciente: { fontFamily: "'Fraunces', serif", fontSize: "1rem", color: "var(--blanco, #fff)" },
    citaDetalle: { fontSize: ".85rem", color: "rgba(209,211,209,.6)" },
    estadoBadge: { border: "1px solid", padding: "4px 12px", borderRadius: 20, fontSize: ".78rem", textTransform: "capitalize" },
}
