"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = __importDefault(require("../midlewares/verifyToken"));
const AccessController_1 = __importDefault(require("../controllers/AccessController"));
const accesHandler = new AccessController_1.default();
const router = (0, express_1.Router)();
// Routes users
router.post("/:username", accesHandler.createAccessUser);
router.post("/", accesHandler.loginUser);
router.patch("/", accesHandler.logoutUser);
router.get("/", verifyToken_1.default, accesHandler.getAccess);
router.get("/:username", verifyToken_1.default, accesHandler.getAccessUser);
router.put("/:username", verifyToken_1.default, accesHandler.updateAccess);
router.put("/", verifyToken_1.default, accesHandler.updatePasswords);
//router.delete("/:dni", accesHandler.deleteUser);
exports.default = router;
