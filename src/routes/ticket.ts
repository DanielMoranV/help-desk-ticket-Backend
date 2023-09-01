import { Router } from "express";

import TicketHandler from "../controllers/TicketController";

const ticketHandler = new TicketHandler();

const router = Router();

// Routes tickets
router.post("/", ticketHandler.createTicket);
router.get("/", ticketHandler.getTickets);
router.get("/user/:userId", ticketHandler.getTicketUserId);
router.get("/:ticketId", ticketHandler.getTicketId);
router.put("/:ticketId", ticketHandler.updateTicket);
router.post("/:ticketId/photo", ticketHandler.updatePhotoTicket);
router.delete("/:ticketId", ticketHandler.deleteTicket);

export default router;
//app.use(express.static(path.join(__dirname, 'public')));
