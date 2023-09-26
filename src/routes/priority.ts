import { Router } from "express";

import PriorityHandler from "../controllers/PriorityController";
import verifyToken from "../midlewares/verifyToken";

const priorityHandler = new PriorityHandler();

const router = Router();

// Routes prioritys
router.post("/", verifyToken, priorityHandler.createPriority);
router.get("/", verifyToken, priorityHandler.getPriority);
router.put("/:priorityId", verifyToken, priorityHandler.updatePriority);
router.delete("/:priorityId", verifyToken, priorityHandler.deletePriority);

export default router;
