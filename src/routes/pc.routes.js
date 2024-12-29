import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getPcs,
    createPc,
    getPc,
    updatePc,
    deletePc,
    getPcsBySalon,
    getPcsBySalonOpIno,
    countPcsBySalonOpIno,
    getPcsBySalonDDB,
    getPcsActivos,
    getPcsDDB
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

// Nuevas rutas
router.get('/opino/:id', authRequired, getPcsBySalonOpIno);
router.get('/countopino/:id', authRequired, countPcsBySalonOpIno);
router.get('/ddb/:id', authRequired, getPcsBySalonDDB);

// Nuevas rutas para obtener todas las PCs activas y dadas de baja
router.get('/pc-activos', authRequired, getPcsActivos);
router.get('/pc-ddb', authRequired, getPcsDDB);

export default router;