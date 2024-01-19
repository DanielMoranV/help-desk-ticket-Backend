"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UtilidadesController_1 = __importDefault(require("../controllers/UtilidadesController"));
const utilidadesHandler = new UtilidadesController_1.default();
const router = (0, express_1.Router)();
// Routes role
router.get("/consultadni/:dni", utilidadesHandler.consultaDNI);
router.get("/consultacmp/:cmp", utilidadesHandler.consultaCMP);
exports.default = router;
