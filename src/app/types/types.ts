//Este modulo declara las clases / tipos que se utilizaran en la web

export type Especie = 'perro'      | 'gato'       | 'ave'       | 'otro' 
export type Estado  = 'pendiente'  | 'confirmada' | 'cancelada' | 'finalizada'
export type Rol     = 'veterinario'| 'administrador' 

export interface Mascota{
    id              : string
    nombre          : string
    especie         : Especie
    raza            : string
    edad            : number
    owner           : string
    telefono        : string
    fecha_registro  : string 
}
export type MascotaData = Omit <Mascota, 'id' | 'fecha_registro'>

export interface Cita{
    id              : string
    idMascota       : string   
    nombreMascota   : string
    fecha           : string
    hora            : string
    descripcion     : string
    estado          : Estado
}
export type CitaData = Omit <Cita, 'id'>

export interface Usuario {
    nombre          : string
    email           : string
    rol             : Rol
}
export interface Credenciales{
    email           : string
    password        : string
}