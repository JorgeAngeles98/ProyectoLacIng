import {z} from 'zod';

export const createPcSchema = z.object({
    marca: z.string({
        required_error: "La marca es requerida",
    }),
    serial: z.string({
        required_error: "El número de serie es requerido",
    }),
    numpatrimonio: z.string({
        required_error: "El número de patrimonio es requerido",
    }),
    nombre: z.string({
        required_error: "El nombre de la máquina es requerido",
    }),
    estado: z.string({
        required_error: "El estado es requerido",
    }),
    observacion: z.string().optional(),
});