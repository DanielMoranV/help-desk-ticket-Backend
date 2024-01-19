import { Express, Router } from "express";

import user from "./user";
import verifyToken from "../midlewares/verifyToken";
import access from "./access";
import category from "./category";
import priority from "./priority";
import ticket from "./ticket";
import role from "./role";
import ticketBilling from "./ticketBilling";
import imageRoutesBilling from "./imageBillingRoutes";
import imageRoutes from "./imageRoutes";
import utilidades from "./utilidades";

export async function useRouter(app: Express, api_url: string) {
  //version 1

  const router = Router();

  // Usuarios
  router.use("/users", user);
  // Accesos
  router.use("/access", access);
  // Categorias
  router.use("/category", verifyToken, category);
  // Prioridades
  router.use("/priority", verifyToken, priority);

  //Roles
  router.use("/role", verifyToken, role);

  // Tickets
  router.use("/tickets", verifyToken, ticket);

  // TicketsBilling
  router.use("/ticketsBilling", verifyToken, ticketBilling);

  // Fotos Tickets
  router.use("/photos", imageRoutes);

  // Fotos Tickets
  router.use("/photosBilling", imageRoutesBilling);

  //APICSR
  router.use("/utilidades", utilidades);

  app.use(api_url, router);
}
