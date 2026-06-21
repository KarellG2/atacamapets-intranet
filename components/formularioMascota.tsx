import { useState } from "react"
import type { MascotaData } from "@/app/types/types"
import { Especie } from "@/app/types/types"

interface Props {
    valoresIniciales?: MascotaData
    onGuardar: (datos: MascotaData) => void
    onCancelar: () => void
    textoBoton?: string
}
const VALORES_VACIOS: MascotaData = {
    nombre: "",
    especie: "perro",
    raza: "",
    edad: 0,
    owner: "",
    telefono: "",
    notas: "",
}
export default function FormularioMascota({
    valoresIniciales,
    onGuardar,
    onCancelar,
    textoBoton = "Guardar mascota",
}: Props) {
    const [datos, setDatos] = useState<MascotaData>(valoresIniciales ?? VALORES_VACIOS)
    const [errores, setErrores] = useState<Partial<Record<keyof MascotaData, string>>>({}) 
    
    function cambios<change extends keyof MascotaData>(campo: change, valor: MascotaData[change]) { 
        setDatos(previo => ({ ...previo, [campo]: valor })) 
        if (errores[campo]) {
            setErrores(previo => ({ ...previo, [campo]: undefined }))
        }
    }

    function validar(): boolean {
        const nuevosErrores: Partial<Record<keyof MascotaData, string>> = {}
        if (datos.nombre.trim().length < 2) {
            nuevosErrores.nombre = "El nombre debe tener al menos 2 caracteres"
        }
        if (datos.raza.trim().length < 2) {
            nuevosErrores.raza = "Ingresa la raza de la mascota"
        }
        if (datos.edad <= 0 || datos.edad > 40) {
            nuevosErrores.edad = "Ingresa una edad válida (1-40 años)"
        }
        if (datos.owner.trim().length < 3) {
            nuevosErrores.owner = "Ingresa el nombre del dueño"
        }
        if (datos.telefono.trim().length < 10 || !/^[+\d\s-]+$/.test(datos.telefono)) {
            nuevosErrores.telefono = "Ingresa un número de teléfono válido"
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
    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={estilos.fila}>
                <div style={estilos.campo}>
                    <label style={estilos.label} htmlFor="nombre">Nombre de la mascota</label>
                    <input placeholder="Ej: Fido" className="input-base" id="nombre" value={datos.nombre} onChange={e => cambios("nombre", e.target.value)} />
                    {errores.nombre && <p style={estilos.error}>{errores.nombre}</p>}
                </div>
                {/* seleccionar especie */}
                <div style={estilos.campo}>
                    <label style={estilos.label} htmlFor="especie">Especie</label>
                    <select className="input-base" id="especie" value={datos.especie} onChange={e => cambios("especie", e.target.value as Especie)}>
                        <option value="perro">Perro</option>
                        <option value="gato">Gato</option>
                        <option value="ave">Ave</option>
                        <option value="otro">Otro</option>
                    </select>
                </div>
            </div>
            {/* campos del formulario */}
            <div style={estilos.fila}>
                {/* Raza */}
                <div style={estilos.campo}>
                    <label style={estilos.label} htmlFor="raza">Raza</label>
                    <input placeholder="Ej: Labrador" className="input-base" value={datos.raza} onChange={e => cambios("raza", e.target.value)} />
                    {errores.raza && <p style={estilos.error}>{errores.raza}</p>}
                </div>
                {/* Edad */}
                <div style={estilos.campo}>
                    <label style={estilos.label} htmlFor="edad">Edad</label>
                    <input className="input-base" type="number" value={datos.edad} onChange={e => cambios("edad", parseInt(e.target.value) || 0)} />
                    {errores.edad && <p style={estilos.error}>{errores.edad}</p>}
                </div>
                {/* Dueño */}
                <div style={estilos.campo}>
                    <label style={estilos.label} htmlFor="owner">Dueño</label>
                    <input placeholder="Ej: Juan Perez" className="input-base" value={datos.owner} onChange={e => cambios("owner", e.target.value)} />
                    {errores.owner && <p style={estilos.error}>{errores.owner}</p>}
                </div>
                {/* Teléfono */}
                <div style={estilos.campo}>
                    <label style={estilos.label} htmlFor="telefono">Teléfono del dueño</label>
                    <input placeholder="Ej: +56 9 1234 5678" className="input-base" value={datos.telefono} onChange={e => cambios("telefono", e.target.value)} />
                    {errores.telefono && <p style={estilos.error}>{errores.telefono}</p>}
                </div>
                {/* Notas adicionales */}
                <div style={estilos.campo}>
                    <label style={estilos.label} htmlFor="notas">Notas adicionales</label>
                    <textarea placeholder="Ej: Vomitos / Alergias" className="input-base" value={datos.notas} onChange={e => cambios("notas", e.target.value)} />
                    {errores.notas && <p style={estilos.error}>{errores.notas}</p>}
                </div>
                {/* Botones */}
                <div style={{ display: "flex", gap: 12, marginTop: 25 }}>
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
