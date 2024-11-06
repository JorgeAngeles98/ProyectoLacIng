import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getSalones,
    createSalon,
    getSalon,
    updateSalon,
    deleteSalon
} from "../controllers/salon.controller.js";
import { validatorSchema } from "../middlewares/validator.middlewares.js";
import { createSalonSchema } from "../schemas/salon.schema.js";

const router = Router();


router.get('/salon', authRequired, getSalones);
router.get('/salon/:id', authRequired, getSalon);
router.post('/salon', authRequired, validatorSchema(createSalonSchema), createSalon);
router.delete('/salon/:id', authRequired, deleteSalon);
router.put('/salon/:id', authRequired, updateSalon);

export default router;