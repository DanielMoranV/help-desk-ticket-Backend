"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TicketBillingController_1 = __importDefault(require("../controllers/TicketBillingController"));
const ticketHandler = new TicketBillingController_1.default();
const router = (0, express_1.Router)();
// Routes tickets
router.post("/", ticketHandler.createTicket);
router.get("/", ticketHandler.getTickets);
router.get("/countStatus", ticketHandler.countTicketsStatus);
router.get("/user/:userId", ticketHandler.getTicketUserId);
router.get("/:ticketBillingId", ticketHandler.getTicketId);
router.put("/:ticketBillingId", ticketHandler.updateTicket);
router.post("/:ticketBillingId/photo", ticketHandler.updatePhotoTicket);
router.delete("/:ticketBillingId", ticketHandler.deleteTicket);
exports.default = router;
//app.use(express.static(path.join(__dirname, 'public')));
