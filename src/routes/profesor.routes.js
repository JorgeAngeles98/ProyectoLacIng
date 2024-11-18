import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getProfesores,
    createProfesor,
    getProfesor,
    updateProfesor,
    deleteProfesor
} from "../controllers/profesor.controller.js";
import { validatorSchema } from "../middlewares/validator.middlewares.js";
import { createProfesorSchema } from "../schemas/profesor.schema.js";

const router = Router();

router.get('/profesor', authRequired, getProfesores);
router.get('/profesor/:id', authRequired, getProfesor);
router.post('/profesor', authRequired, validatorSchema(createProfesorSchema), createProfesor);
router.delete('/profesor/:id', authRequired, deleteProfesor);
router.put('/profesor/:id', authRequired, updateProfesor);

export default router;