import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getCursos,
    createCurso,
    getCurso,
    updateCurso,
    deleteCurso,
    matricularAlumno,
    eliminarAlumnodeCurso,
    asignarProfesor,
    eliminarProfesordeCurso,
    asignarSalon,
    eliminarSalondeCurso
    
} from "../controllers/curso.controller.js";
import { validatorSchema } from "../middlewares/validator.middlewares.js";
import { createCursoSchema } from "../schemas/curso.schema.js";

const router = Router();

router.get('/curso', authRequired, getCursos);
router.get('/curso/:id', authRequired, getCurso);
router.post('/curso', authRequired, validatorSchema(createCursoSchema), createCurso);
router.delete('/curso/:id', authRequired, deleteCurso);
router.put('/curso/:id', authRequired, updateCurso);
router.post('/curso/matricular', authRequired, matricularAlumno);
router.post('/curso/eliminar-alumno', authRequired, eliminarAlumnodeCurso);
router.post('/curso/asignar-profesor', authRequired, asignarProfesor);
router.post('/curso/eliminar-profesor', authRequired, eliminarProfesordeCurso);
router.post('/curso/asignar-salon', authRequired, asignarSalon);
router.post('/curso/eliminar-salon', authRequired, eliminarSalondeCurso);

export default router;