import { Router } from "express";

import RoleHandler from "../controllers/RoleController";
import verifyToken from "../midlewares/verifyToken";

const roleHandler = new RoleHandler();

const router = Router();

// Routes role
router.get("/", verifyToken, roleHandler.getRole);

export default router;
