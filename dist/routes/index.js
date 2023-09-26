"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRouter = void 0;
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const verifyToken_1 = __importDefault(require("../midlewares/verifyToken"));
const access_1 = __importDefault(require("./access"));
const category_1 = __importDefault(require("./category"));
const priority_1 = __importDefault(require("./priority"));
const ticket_1 = __importDefault(require("./ticket"));
const imageRoutes_1 = __importDefault(require("./imageRoutes"));
function useRouter(app, api_url) {
    return __awaiter(this, void 0, void 0, function* () {
        //version 1
        const router = (0, express_1.Router)();
        // Usuarios
        router.use("/users", user_1.default);
        // Accesos
        router.use("/access", access_1.default);
        // Categorias
        router.use("/category", verifyToken_1.default, category_1.default);
        // Prioridades
        router.use("/priority", verifyToken_1.default, priority_1.default);
        // Tickets
        router.use("/tickets", verifyToken_1.default, ticket_1.default);
        // Fotos Tickets
        router.use("/photos", imageRoutes_1.default);
        app.use(api_url, router);
    });
}
exports.useRouter = useRouter;
