"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TicketController_1 = __importDefault(require("../controllers/TicketController"));
const ticketHandler = new TicketController_1.default();
const router = (0, express_1.Router)();
// Routes tickets
router.post("/", ticketHandler.createTicket);
router.get("/countStatus", ticketHandler.countTicketsStatus);
router.get("/", ticketHandler.getTickets);
router.get("/user/:userId", ticketHandler.getTicketUserId);
router.get("/:ticketId", ticketHandler.getTicketId);
router.put("/:ticketId", ticketHandler.updateTicket);
router.post("/:ticketId/photo", ticketHandler.updatePhotoTicket);
router.delete("/:ticketId", ticketHandler.deleteTicket);
exports.default = router;
//app.use(express.static(path.join(__dirname, 'public')));
