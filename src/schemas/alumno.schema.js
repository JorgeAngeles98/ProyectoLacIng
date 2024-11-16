import { z } from 'zod';

export const AlumnoSchema = z.object({
    nombreAlu: z.string({
        required_error: "El nombre es requerido",
    })
    .refine(value => /^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(value), {
        message: "El nombre solo puede contener letras y acentos",
    }),

    apellidoAlu: z.string({
        required_error: "El apellido es requerido",
    })
    .refine(value => /^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(value), {
        message: "El apellido solo puede contener letras, acentos y espacios",
    }),

    codigo: z.string({
        required_error: "El código es requerido",
    }).regex(/^(19\d{2}|20\d{2})([012])\d{4}$/, "Ingresar un código válido"),

    dni: z.string({
        required_error: "El DNI es requerido",
    }).regex(/^\d{8}$/, "El DNI debe tener exactamente 8 dígitos"),

    facultad: z.string({
        required_error: "La facultad es requerida",
    }),

    correoInst: z.string({
        required_error: "El correo institucional es requerido",
    }).email("El correo institucional debe ser un email válido")
    .regex(/^[\w.-]+@urp\.edu\.pe$/, "El correo debe pertenecer al dominio @urp.edu.pe"),
});
