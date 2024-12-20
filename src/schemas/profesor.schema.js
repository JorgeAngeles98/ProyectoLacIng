import {z} from 'zod';

export const createProfesorSchema = z.object({
    nombre: z.string({
        required_error: "El nombre es requerido",
    }),
    apellido: z.string({
        required_error: "El apellido es requerido",
    }),
    codigo: z.string({
        required_error: "El codigo es requerido",
    }),
    correo: z.string({
        required_error: "El correo es requerido",
    }),
    estado: z.string().optional(),
});