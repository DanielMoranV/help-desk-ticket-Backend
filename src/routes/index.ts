import { Express, Router } from "express";

import user from "./user";
import verifyToken from "../midlewares/verifyToken";
import access from "./access";
import category from "./category";
import priority from "./priority";
import ticket from "./ticket";
import imageRoutes from "./imageRoutes";

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

  // Tickets
  router.use("/tickets", verifyToken, ticket);

  // Fotos Tickets
  router.use("/photos", verifyToken, imageRoutes);

  app.use(api_url, router);
}
