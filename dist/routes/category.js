"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoryController_1 = __importDefault(require("../controllers/CategoryController"));
const verifyToken_1 = __importDefault(require("../midlewares/verifyToken"));
const categoryHandler = new CategoryController_1.default();
const router = (0, express_1.Router)();
// Routes categorys
router.post("/", verifyToken_1.default, categoryHandler.createCategory);
router.get("/", verifyToken_1.default, categoryHandler.getCategory);
router.get("/billing", verifyToken_1.default, categoryHandler.getCategoryBilling);
router.put("/:categoryId", verifyToken_1.default, categoryHandler.updateCategory);
router.delete("/:categoryId", verifyToken_1.default, categoryHandler.deleteCategory);
exports.default = router;
