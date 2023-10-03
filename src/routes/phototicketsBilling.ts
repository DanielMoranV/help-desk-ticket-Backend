import { Router } from "express";

import PhotoTicketsHandler from "../controllers/PhotoTicketsBillingController";
import verifyToken from "../midlewares/verifyToken";

const photoTicketsHandler = new PhotoTicketsHandler();

const router = Router();

// Routes photoTicketss
router.post("/", verifyToken, photoTicketsHandler.updatePhotoTickets);
//router.get("/", verifyToken, photoTicketsHandler.getPhotoTickets);
export default router;
