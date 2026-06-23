import { useState, useEffect } from "react";
import type { Cita, CitaData, Estado, Mascota } from "@/app/types/types";

interface Props{
    mascotas: Mascota[]
    valoresIniciales?: CitaData
    onGuardar: (datos: CitaData) => void
    onCancelar: () => void
    textoBoton?: string
}

function VALORES_VACIOS(mascotas: Mascota[]): CitaData{
    return{
        idMascota: mascotas[0]?.id ?? '',
        nombreMascota: mascotas[0]?.nombre ?? '',
        veterinario: '',
        fecha: new Date().toISOString().slice(0,10),
        hora: '00:00',
        descripcion: '',
        estado: 'pendiente'
    }
}

export default function FormularioCita({
    mascotas,
    valoresIniciales,
    onGuardar,
    onCancelar,
    textoBoton = 'Agendar cita',
}: Props){
    const  [ datos, setDatos ] = useState<CitaData>(valoresIniciales ?? VALORES_VACIOS(mascotas))
    const  [ errores, setErrores ] = useState<Partial<Record<keyof CitaData, string>>>({})

    useEffect(() => {
        setDatos(valoresIniciales ?? VALORES_VACIOS(mascotas))
    }, [valoresIniciales, mascotas])

    function cambios<K extends keyof CitaData>(campo: K, valor: CitaData[K]) {
        setDatos(previo => ({ ...previo, [campo]: valor }))
        if (errores[campo]){
            setErrores(previo => ({ ...previo, [campo]: undefined }))
        }
    }

    function cambiosMascota(mascotaID: string){
        const mascota = mascotas.find(m => m.id === mascotaID)
        setDatos(previo => ({ ...previo, idMascota: mascotaID, nombreMascota: mascota?.nombre ?? '' }))
    }
    function validar(): boolean {
        const nuevosErrores: Partial<Record<keyof CitaData, string>> = {}
        if (!datos.idMascota){
            nuevosErrores.idMascota = 'Seleccione una Mascota'
        }
        if (datos.veterinario.trim().length < 3){
            nuevosErrores.veterinario = 'Ingrese el nombre del veterinario'
        }
        if (!datos.fecha){
            nuevosErrores.fecha = 'Seleccione una fecha'
        }
        if (!datos.hora){
            nuevosErrores.hora = 'Ingrese una hora'
        }
        if (datos.descripcion.trim().length < 3){
            nuevosErrores.descripcion = 'Describa el motivo de la consulta'
        }
        setErrores(nuevosErrores)
        return Object.keys(nuevosErrores).length === 0
    }
    
    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        if (validar()) {
            onGuardar(datos)
        }
    }

    if (mascotas.length === 0){
        return (
            <p style={{ color: 'var(--rojo)' }}>
                Ingrese al menos un paciente para agendar una consulta
            </p>
        )
    }
    return (
        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection: 'column', gap: 16 }}>
            <div style={estilos.fila}>

                <div style={estilos.campo}>
                    <label style={estilos.label}>Mascota</label>
                    <select className={`input-base ${errores.idMascota ? 'input-error': ''}`} value={datos.idMascota} onChange={m => cambiosMascota(m.target.value)}>
                    {mascotas.map(m=>(
                        <option key={m.id} value={m.id}>{m.nombre} ({m.owner})</option>
                    ))}
                    </select>
                    {errores.idMascota && <span className="campo-error">{errores.idMascota}</span>}
                </div>

                {/* veterinario */}
                <div style={estilos.campo}>
                    <label style={estilos.label}>Veterinario</label>
                    <input className={`input-base ${errores.veterinario ? 'input-error':''}`} value={datos.veterinario} onChange={m => cambios('veterinario', m.target.value)} />
                    {errores.veterinario && <span className="campo-error">{errores.veterinario}</span>}
                </div>
                {/* Fecha */}
                <div style={estilos.fila}>
                    <div style={estilos.campo}>
                        <label style={estilos.label}>Fecha</label>
                        <input type="date" className={`input-base ${errores.fecha ? 'input-error':''}`} value={datos.fecha} onChange={m => cambios('fecha', m.target.value)}></input>
                        {errores.fecha && <span className="campo-error">{errores.fecha}</span>}
                    </div>
                </div>
                
                {/* Hora */}
                <div style={estilos.campo}>
                    <label style={estilos.label}>Hora</label>
                    <input type="time" className={`input-base ${errores.hora ? 'input-error':''}`} value={datos.hora} onChange={m => cambios('hora',m.target.value)}></input>
                    {errores.hora && <span className="campo-error">{errores.hora}</span>}
                </div>
                {/* Descripcion */}
                <div style={estilos.campo}>
                    <label style={estilos.label}>Motivo de la consulta</label>
                    <input className={`input-base ${errores.descripcion ? 'input-error': ''}`} value={datos.descripcion} onChange={m=>cambios('descripcion', m.target.value)}/>
                    {errores.descripcion && <span className="campo-error">{errores.descripcion}</span>}
                </div>
                {/* Estado */}
                <div style={estilos.campo}>
                    <label style={estilos.label}>Estado</label>
                    <select className="input-base" value={datos.estado} onChange={m => cambios('estado', m.target.value as Estado)}>
                        <option value='pendiente'>Pendiente</option>
                        <option value='confirmada'>Confirmada</option>
                        <option value='finalizada'>Finalizada</option>
                        <option value='cancelada'>Cancelada</option>
                    </select>
                </div>
                    {/* Guardar / Cancelar */}
                <div style={{display:'flex', gap:12, marginTop:8}}>
                    <button type="submit" className="btn-primario">{textoBoton}</button>
                    <button type="button" className="btn-secundario" onClick={onCancelar}>Cancelar</button>

                </div>
            </div>

        </form>
    )
}

const estilos: Record<string, React.CSSProperties> = {
  fila: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  campo: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: ".82rem", color: "var(--celeste)", fontWeight: 500 },
}
