import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getVisitantes,
    createVisitante,
    getVisitante,
    updateVisitante,
    deleteVisitante,
    getVisitantesByPc
} from "../controllers/visitante.controller.js";
import { validatorSchema } from "../middlewares/validator.middlewares.js";
import { createVisitanteSchema } from "../schemas/visitante.schema.js";

const router = Router();

router.get('/visitante', authRequired, getVisitantes);
router.get('/visitante/:id', authRequired, getVisitante);
router.post('/visitante', authRequired, validatorSchema(createVisitanteSchema), createVisitante);
router.delete('/visitante/:id', authRequired, deleteVisitante);
router.put('/visitante/:id', authRequired, updateVisitante);
router.get('/visitante/pc/:id', authRequired, getVisitantesByPc);

export default router;