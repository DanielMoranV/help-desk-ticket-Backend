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
Object.defineProperty(exports, "__esModule", { value: true });
const errormessagebycode_1 = require("../midlewares/errormessagebycode");
const PriorityRepository_1 = require("../repository/PriorityRepository");
const response_1 = require("../utils/response");
// Datos de Categorias
// --------------------------------
class PriorityHandler {
    // Lista de empleados
    getPriority(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield (0, PriorityRepository_1.getPriority)();
                if (users.length != 0) {
                    const message = "Operación exitosa Lista de empleados";
                    (0, response_1.success)({ res, data: users, message });
                }
                else {
                    const message = "Operación exitosa sin registros";
                    (0, response_1.success)({ res, data: users, message });
                }
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    // Crear nuevo Categoria
    createPriority(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const newPriority = yield (0, PriorityRepository_1.createPriority)(data);
                const message = "Operación exitosa Registro Creado";
                (0, response_1.success)({ res, data: newPriority, message });
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    // Actualizar datos de Categoria (priorityId)
    updatePriority(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const priorityId = Number(req.params.priorityId);
                const data = req.body;
                const priority = yield (0, PriorityRepository_1.updatePriority)(priorityId, data);
                const message = "Operación exitosa Registro Actualizado";
                (0, response_1.success)({ res, data: priority, message });
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    // Eliminar datos de Categoria (priorityId)
    deletePriority(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const priorityId = Number(req.params.priorityId);
                const priority = yield (0, PriorityRepository_1.deletePriority)(priorityId);
                const message = "Operación exitosa Registro Eliminado";
                (0, response_1.success)({ res, data: priority, message });
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
}
exports.default = PriorityHandler;
