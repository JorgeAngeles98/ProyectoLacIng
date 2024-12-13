import {z} from 'zod';
export const createVisitanteSchema = z.object({
    nombre: z.string({
        required_error: "El nombre es requerido",
    }),
    apellido: z.string({
        required_error: "El apellido es requerido",
    }),
    codigo: z.string({
        required_error: "El documento es requerido",
    }),
    correo: z.string({
        required_error: "El correo es requerido",
    }),
    actividad: z.string({
        required_error: "La actividad es requerida",
    }),
    horaInicio: z.string().datetime().optional(),
    horaSalida: z.string().datetime().optional(),
    estado: z.string().optional(),
    observacion: z.string().optional(),
    rol: z.string().optional(),
});