import {z} from 'zod';

export const createCursoSchema = z.object({
    nombre: z.string({
        required_error: "El nombre es requerido",
    }),
    codigo: z.string({
        required_error: "El codigo es requerido",
    }),
    carrera: z.string({
        required_error: "La carrera es requerida",
    }),
    dateinicio: z.string().datetime().optional(),
    datefinal: z.string().datetime().optional(),
});