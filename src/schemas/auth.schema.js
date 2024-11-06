import {z} from 'zod';

export const registroSchema = z.object({
    username: z.string({
        required_error: "El nombre de usuario es requerido",
    }),
    email: z.string({
        required_error: "El email es requerido",
    }).email({
        message: "El email no es válido",
        
    }),
    password: z.string({
        required_error: "La contraseña es requerida",
    }).min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const loginSchema = z.object({
    email: z.string({
        required_error: "El email es requerido",
    }).email({
        message: "El email no es válido",
    }),
    password: z.string({
        required_error: "La contraseña es requerida",
    }).min(6, "La contraseña debe tener al menos 6 caracteres"),
})