import { Router } from "express";

import TicketHandler from "../controllers/TicketBillingController";

const ticketHandler = new TicketHandler();

const router = Router();

// Routes tickets
router.post("/", ticketHandler.createTicket);
router.get("/", ticketHandler.getTickets);
router.get("/countStatus", ticketHandler.countTicketsStatus);
router.get("/user/:userId", ticketHandler.getTicketUserId);
router.get("/:ticketBillingId", ticketHandler.getTicketId);
router.put("/:ticketBillingId", ticketHandler.updateTicket);
router.post("/:ticketBillingId/photo", ticketHandler.updatePhotoTicket);
router.delete("/:ticketBillingId", ticketHandler.deleteTicket);

export default router;
//app.use(express.static(path.join(__dirname, 'public')));
