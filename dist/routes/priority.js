"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PriorityController_1 = __importDefault(require("../controllers/PriorityController"));
const verifyToken_1 = __importDefault(require("../midlewares/verifyToken"));
const priorityHandler = new PriorityController_1.default();
const router = (0, express_1.Router)();
// Routes prioritys
router.post("/", verifyToken_1.default, priorityHandler.createPriority);
router.get("/", verifyToken_1.default, priorityHandler.getPriority);
router.put("/:priorityId", verifyToken_1.default, priorityHandler.updatePriority);
router.delete("/:priorityId", verifyToken_1.default, priorityHandler.deletePriority);
exports.default = router;
