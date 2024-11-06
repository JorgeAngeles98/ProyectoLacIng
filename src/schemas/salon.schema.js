import {z} from 'zod';
export const createSalonSchema = z.object({
    nombre: z.string({
        required_error: "El nombre es requerido",
    }),
    descripcion: z.string({
        required_error: "La descripcion es requerida",
    }),
    date: z.string().datetime().optional(),
});