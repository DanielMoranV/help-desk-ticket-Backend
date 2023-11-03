"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RoleController_1 = __importDefault(require("../controllers/RoleController"));
const verifyToken_1 = __importDefault(require("../midlewares/verifyToken"));
const roleHandler = new RoleController_1.default();
const router = (0, express_1.Router)();
// Routes role
router.get("/", verifyToken_1.default, roleHandler.getRole);
exports.default = router;
