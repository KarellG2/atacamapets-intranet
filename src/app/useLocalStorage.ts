import {useState, useEffect} from "react"

export function useLocalStorage<T>(clave: string, valorInicial: T[]) {
    const [datos, setDatos] = useState<T[]>([])
    const [cargando, setCargando] = useState(true)
    useEffect(() => {
        try {
            const guardado = localStorage.getItem(clave)
            if (guardado) {
                setDatos(JSON.parse(guardado))
            } 
            else {
                setDatos(valorInicial)
            }
        }catch {
                setDatos(valorInicial)
            }
        finally {
            setCargando(false)
        }
    }, [clave])
    useEffect(() => {
        if (!cargando) {
            localStorage.setItem(clave, JSON.stringify(datos))
        }
    }, [datos, clave, cargando])
    return {datos, setDatos, cargando}
}