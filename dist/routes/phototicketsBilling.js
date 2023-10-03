"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PhotoTicketsBillingController_1 = __importDefault(require("../controllers/PhotoTicketsBillingController"));
const verifyToken_1 = __importDefault(require("../midlewares/verifyToken"));
const photoTicketsHandler = new PhotoTicketsBillingController_1.default();
const router = (0, express_1.Router)();
// Routes photoTicketss
router.post("/", verifyToken_1.default, photoTicketsHandler.updatePhotoTickets);
//router.get("/", verifyToken, photoTicketsHandler.getPhotoTickets);
exports.default = router;
