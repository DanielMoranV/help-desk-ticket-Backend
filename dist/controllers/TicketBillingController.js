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
const multeruploadBilling_1 = require("../midlewares/multeruploadBilling");
const TicketBillingRepository_1 = require("../repository/TicketBillingRepository");
const response_1 = require("../utils/response");
const app_1 = require("../app"); // Importa 'io' desde tu archivo 'app.ts'
// Datos de Categorias
// --------------------------------
class TicketHandler {
    // Lista de Tickets
    getTickets(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield (0, TicketBillingRepository_1.getTickets)();
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
    getTicketUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = Number(req.params.userId);
                console.log(userId);
                const users = yield (0, TicketBillingRepository_1.getTicketUserId)(userId);
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
    getTicketId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticketId = Number(req.params.ticketBillingId);
                const ticket = yield (0, TicketBillingRepository_1.getTicketId)(ticketId);
                if (ticket.length != 0) {
                    const message = "Operación exitosa Lista de empleados";
                    (0, response_1.success)({ res, data: ticket, message });
                }
                else {
                    const message = "Operación exitosa sin registros";
                    (0, response_1.success)({ res, data: ticket, message });
                }
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    // Crear nuevo Ticket
    createTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const newTicket = yield (0, TicketBillingRepository_1.createTicket)(data);
                // Emitir un evento de Socket.io cuando se crea un nuevo ticket
                const users = yield (0, TicketBillingRepository_1.getTickets)();
                app_1.io.emit("newTicketBilling", users);
                console.log("ticket creado io emitido");
                const message = "Operación exitosa Registro Creado";
                (0, response_1.success)({ res, data: newTicket, message });
            }
            catch (error) {
                console.log(error);
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    // Actualizar datos de Ticket (ticketId)
    updateTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticketId = Number(req.params.ticketBillingId);
                const data = req.body;
                const ticket = yield (0, TicketBillingRepository_1.updateTicket)(ticketId, data);
                // Emitir un evento de Socket.io cuando se actualiza un ticket
                const users = yield (0, TicketBillingRepository_1.getTickets)();
                app_1.io.emit("updateTicketBilling", users);
                const message = "Operación exitosa Registro Actualizado";
                (0, response_1.success)({ res, data: ticket, message });
            }
            catch (error) {
                console.log(error);
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    // Actualizar foto de tickets
    updatePhotoTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticketId = Number(req.params.ticketBillingId);
                // Esperar a que la imagen se cargue antes de continuar
                yield new Promise((resolve, reject) => {
                    (0, multeruploadBilling_1.uploadImage)(req, res, (err) => {
                        if (err) {
                            err.message = "Archivo no permitido";
                            return reject(err);
                        }
                        resolve();
                    });
                });
                // Verificación de Archivos Subidos
                if (!req.files) {
                    res.status(400).json({ error: "No se subió ninguna imagen" });
                }
                if (req.files) {
                    const uploadedFilesData = req.files.map((file) => {
                        return {
                            ticketBillingId: ticketId,
                            filename: file.filename,
                        };
                    });
                    const ticketPhoto = yield (0, TicketBillingRepository_1.createTicketPhoto)(uploadedFilesData);
                    const users = yield (0, TicketBillingRepository_1.getTickets)();
                    app_1.io.emit("updateTicketBilling", users);
                    const message = "Operación exitosa Registro Actualizado";
                    (0, response_1.success)({ res, data: ticketPhoto, message });
                }
            }
            catch (error) {
                console.log(error);
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    // Eliminar datos de Ticket (ticketId)
    deleteTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticketId = Number(req.params.ticketBillingId);
                const ticket = yield (0, TicketBillingRepository_1.deleteTicket)(ticketId);
                const users = yield (0, TicketBillingRepository_1.getTickets)();
                app_1.io.emit("updateTicketBilling", users);
                const message = "Operación exitosa Registro Eliminado";
                (0, response_1.success)({ res, data: ticket, message });
            }
            catch (error) {
                console.log(error);
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
}
exports.default = TicketHandler;
