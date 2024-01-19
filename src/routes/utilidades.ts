import { Router } from "express";

import UtilidadesHandler from "../controllers/UtilidadesController";
import verifyToken from "../midlewares/verifyToken";

const utilidadesHandler = new UtilidadesHandler();

const router = Router();

// Routes role
router.get("/consultadni/:dni", utilidadesHandler.consultaDNI);
router.get("/consultacmp/:cmp", utilidadesHandler.consultaCMP);

export default router;
