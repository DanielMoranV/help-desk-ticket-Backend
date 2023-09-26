import { Router } from "express";
import express from "express";
import path from "path";
import fs from "fs";

const router = Router();

// Middleware para manejar errores de imágenes no encontradas
const handleImageNotFoundError = (req: any, res: any, next: any) => {
  const imagePath = path.join(
    __dirname,
    "../public/uploads/imgtickets",
    req.url
  );

  // Verificar si la imagen existe
  if (!fs.existsSync(imagePath)) {
    return res.status(404).send("Imagen no encontrada");
  }

  next(); // Pasar al siguiente middleware
};

// Aplicar el middleware antes de servir las imágenes estáticas
router.use(
  "/",
  handleImageNotFoundError,
  express.static(path.join(__dirname, "../public/uploads/imgtickets"))
);

export default router;

// import { Router, Request, Response } from "express";
// import path from "path";

// const imageRouter = Router();

// const imageFolderPath = path.join(__dirname, "../public/uploads/imgtickets");

// imageRouter.get("/:imageName", (req: Request, res: Response) => {
//   const imageName = req.params.imageName;

//   // Ruta completa de la imagen
//   const imagePath = path.join(imageFolderPath, imageName);

//   // Envía la imagen como respuesta
//   res.sendFile(imagePath);
// });

// export default imageRouter;
