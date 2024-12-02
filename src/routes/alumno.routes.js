import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getAlumnos,
    createAlumno,
    getAlumno,
    updateAlumno,
    deleteAlumno,
    getAlumnoPorCodigo,
} from "../controllers/alumno.controller.js";
import { validatorSchema } from "../middlewares/validator.middlewares.js";
import { AlumnoSchema } from "../schemas/alumno.schema.js";

const router = Router();

router.get('/listar_alumnos', authRequired, getAlumnos);
router.get('/ver_alumno/:id', authRequired, getAlumno);
router.get('/verificar_alumno/:codigo', getAlumnoPorCodigo);
router.post('/nuevo_alumno', authRequired, validatorSchema(AlumnoSchema), createAlumno); 
router.delete('/borrar_alumno/:id', authRequired, deleteAlumno);
router.put('/editar_alumno/:id', authRequired, validatorSchema(AlumnoSchema), updateAlumno);

export default router;
