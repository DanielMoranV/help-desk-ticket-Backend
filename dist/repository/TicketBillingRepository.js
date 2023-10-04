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
exports.countTicketsByStatus = exports.deleteTicket = exports.updateTicket = exports.createTicketPhoto = exports.createTicket = exports.getTicketId = exports.getTicketUserId = exports.getTickets = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
function getTickets() {
    return prisma_1.default.instance.ticketBilling.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            TicketPhotoBilling: true,
            categoryBilling: true,
            priority: true,
            user: true,
        },
    });
}
exports.getTickets = getTickets;
function getTicketUserId(userId) {
    return prisma_1.default.instance.ticketBilling.findMany({
        where: { userId },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            TicketPhotoBilling: true,
            categoryBilling: true,
            priority: true,
        },
    });
}
exports.getTicketUserId = getTicketUserId;
function getTicketId(ticketBillingId) {
    return prisma_1.default.instance.ticketBilling.findMany({
        where: { ticketBillingId },
        orderBy: {
            ticketBillingId: "asc",
        },
        include: {
            user: {
                select: {
                    name: true,
                },
            },
            categoryBilling: true,
            priority: true,
            TicketPhotoBilling: true,
        },
    });
}
exports.getTicketId = getTicketId;
function createTicket(data) {
    return prisma_1.default.instance.ticketBilling.create({ data });
}
exports.createTicket = createTicket;
function createTicketPhoto(data) {
    return prisma_1.default.instance.ticketPhotoBilling.createMany({ data });
}
exports.createTicketPhoto = createTicketPhoto;
function updateTicket(ticketBillingId, data) {
    return prisma_1.default.instance.ticketBilling.update({
        where: { ticketBillingId },
        data,
    });
}
exports.updateTicket = updateTicket;
function deleteTicket(ticketBillingId) {
    return prisma_1.default.instance.ticketBilling.delete({
        where: {
            ticketBillingId,
        },
    });
}
exports.deleteTicket = deleteTicket;
function countTicketsByStatus() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const estados = ["Pendiente", "Espera", "Aprobado"];
        const counts = yield prisma_1.default.instance.ticketBilling.groupBy({
            by: ["status"],
            _count: {
                _all: true,
            },
            where: {
                status: {
                    in: estados,
                },
            },
        });
        // Crear un objeto con los resultados
        const countsObject = {};
        let total = 0;
        // Inicializar countsObject con 0 para cada estado
        estados.forEach((estado) => {
            countsObject[estado] = 0;
        });
        // Procesar resultados de la consulta
        for (const count of counts) {
            const estado = count.status || "Desconocido"; // Si no hay estado, usar 'Desconocido'
            const recuento = ((_a = count._count) === null || _a === void 0 ? void 0 : _a._all) || 0; // Modificar la referencia al recuento
            countsObject[estado] = recuento;
            total += recuento;
        }
        // Agregar el total al objeto
        countsObject["Total"] = total;
        return countsObject;
    });
}
exports.countTicketsByStatus = countTicketsByStatus;
