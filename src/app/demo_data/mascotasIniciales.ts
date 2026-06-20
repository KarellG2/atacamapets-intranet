import type { Mascota } from "../types/types"

export const MASCOTAS_INICIALES: Mascota[] = [
  {
    id: "p1",
    nombre: "Firulais",
    especie: "perro",
    raza: "Labrador",
    edad: 4,
    owner: "Marcela Pérez",
    telefono: "+56 9 1234 5678",
    notas: "Alérgico a la penicilina",
    fecha_registro: "2026-01-15",
  },
  {
    id: "p2",
    nombre: "Michi",
    especie: "gato",
    raza: "Mestizo",
    edad: 2,
    owner: "Joaquín Reyes",
    telefono: "+56 9 8765 4321",
    notas: "",
    fecha_registro: "2026-02-03",
  },
  {
    id: "p3",
    nombre: "Rocky",
    especie: "perro",
    raza: "Bulldog Francés",
    edad: 6,
    owner: "Andrea Soto",
    telefono: "+56 9 5555 1212",
    notas: "Problemas respiratorios, evitar ejercicio intenso",
    fecha_registro: "2026-03-10",
  },
]
