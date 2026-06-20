import { createContext, useState, useEffect } from "react"
import type { ReactNode } from "react"
import type { Usuario, Credenciales } from "@/app/types/types"

const USUARIOS_VALIDOS: Array<Usuario & { password: string }> = [
  { nombre: "Admin",           email: "admin@atacamapets.com",     password: "admin123", rol: "administrador" },
  { nombre: "Dra. Valentina",  email: "valentina@atacamapets.com", password: "valentina123", rol: "veterinario" }
];

const SESSION_KEY = "atacamapets_session";

interface autenticacionType {
    usuario:        Usuario | null; // Usuario autenticado o null si no hay sesión
    cargandoSesion: boolean;
    login: (credenciales: Credenciales) => { ok: boolean; mensaje: string };
    logout: () => void; // Función para cerrar sesión
}

const autenticacionContext = createContext<autenticacionType | undefined>(undefined);

export function Autenticador ({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [cargandoSesion, setCargandoSesion] = useState(true);

    useEffect(() => {
        const sesionGuardada = localStorage.getItem(SESSION_KEY);
        if (sesionGuardada){
            try {
                const datos: Usuario = JSON.parse(sesionGuardada);
                setUsuario(datos);
            } 
            catch {
                localStorage.removeItem(SESSION_KEY);
            }

        }
        setCargandoSesion(false);
    }, [])

    function login(credenciales: Credenciales): {ok: boolean; mensaje: string}{
        const encontrado = USUARIOS_VALIDOS.find(
            usuario => usuario.email.toLowerCase() === credenciales.email.toLowerCase() && usuario.password === credenciales.password
        )
        if (!encontrado){
            return {ok: false, mensaje: "Las credenciales ingresadas son incorrectas"};
        }
        const sesion: Usuario = {
            nombre: encontrado.nombre,
            email:  encontrado.email,
            rol:    encontrado.rol,
        }
        localStorage.setItem(SESSION_KEY, JSON.stringify(sesion))
        setUsuario(sesion)
        return {ok: true, mensaje: "Sesión iniciada correctamente"}
        }

    function logout() {
        localStorage.removeItem(SESSION_KEY)
        setUsuario(null)
        }
    return (
        <autenticacionContext.Provider value={{ usuario, cargandoSesion, login, logout }}>
            {children}
        </autenticacionContext.Provider>
    )
}