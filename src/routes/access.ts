import { Router } from "express";
import verifyToken from "../midlewares/verifyToken";
import AccesHandler from "../controllers/AccessController";

const accesHandler = new AccesHandler();

const router = Router();

// Routes users
router.post("/:username", accesHandler.createAccessUser);
router.post("/", accesHandler.loginUser);
router.patch("/", accesHandler.logoutUser);
router.get("/", verifyToken, accesHandler.getAccess);
router.get("/:username", verifyToken, accesHandler.getAccessUser);
router.put("/:username", verifyToken, accesHandler.updateAccess);
router.put("/", verifyToken, accesHandler.updatePasswords);

//router.delete("/:dni", accesHandler.deleteUser);

export default router;
