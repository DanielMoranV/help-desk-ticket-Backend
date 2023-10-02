"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
// Middleware para manejar errores de imágenes no encontradas
const handleImageNotFoundError = (req, res, next) => {
    const imagePath = path_1.default.join(__dirname, "../public/uploads/imgticketsBilling", req.url);
    // Verificar si la imagen existe
    if (!fs_1.default.existsSync(imagePath)) {
        return res.status(404).send("Imagen no encontrada");
    }
    next(); // Pasar al siguiente middleware
};
// Aplicar el middleware antes de servir las imágenes estáticas
router.use("/", handleImageNotFoundError, express_2.default.static(path_1.default.join(__dirname, "../public/uploads/imgticketsBilling")));
exports.default = router;
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
