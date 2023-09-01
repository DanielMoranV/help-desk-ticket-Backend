import { Router } from "express";

import CategoryHandler from "../controllers/CategoryController";
import verifyToken from "../midlewares/verifyToken";

const categoryHandler = new CategoryHandler();

const router = Router();

// Routes categorys
router.post("/", verifyToken, categoryHandler.createCategory);
router.get("/", verifyToken, categoryHandler.getCategory);
router.put("/:categoryId", verifyToken, categoryHandler.updateCategory);
router.delete("/:categoryId", verifyToken, categoryHandler.deleteCategory);

export default router;
