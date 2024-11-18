import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getCursos,
    createCurso,
    getCurso,
    updateCurso,
    deleteCurso
} from "../controllers/curso.controller.js";
import { validatorSchema } from "../middlewares/validator.middlewares.js";
import { createCursoSchema } from "../schemas/curso.schema.js";

const router = Router();

router.get('/curso', authRequired, getCursos);
router.get('/curso/:id', authRequired, getCurso);
router.post('/curso', authRequired, validatorSchema(createCursoSchema), createCurso);
router.delete('/curso/:id', authRequired, deleteCurso);
router.put('/curso/:id', authRequired, updateCurso);

export default router;