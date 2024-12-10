import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getPcs,
    createPc,
    getPc,
    updatePc,
    deletePc,
    getPcsBySalon
} from "../controllers/pc.controller.js";
import { validatorSchema } from "../middlewares/validator.middlewares.js";
import { createPcSchema } from "../schemas/pc.schema.js";

const router = Router();

router.get('/pc', authRequired, getPcs);
router.get('/pc/:id', authRequired, getPc);
router.post('/pc', authRequired, validatorSchema(createPcSchema), createPc);
router.delete('/pc/:id', authRequired, deletePc);
router.put('/pc/:id', authRequired, updatePc);
router.get('/pcsalon/:id', authRequired, getPcsBySalon);

export default router;