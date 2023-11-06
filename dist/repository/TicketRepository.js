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
    return prisma_1.default.instance.ticket.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            ticketPhoto: true,
            category: true,
            priority: true,
            user: true,
            agent: {
                select: {
                    user: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    });
}
exports.getTickets = getTickets;
function getTicketUserId(userId) {
    return prisma_1.default.instance.ticket.findMany({
        where: { userId },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            ticketPhoto: true,
            category: true,
            priority: true,
            agent: {
                select: {
                    user: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    });
}
exports.getTicketUserId = getTicketUserId;
function getTicketId(ticketId) {
    return prisma_1.default.instance.ticket.findMany({
        where: { ticketId },
        orderBy: {
            ticketId: "asc",
        },
        include: {
            user: {
                select: {
                    name: true,
                },
            },
            category: true,
            priority: true,
            ticketPhoto: true,
            agent: {
                select: {
                    user: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    });
}
exports.getTicketId = getTicketId;
function createTicket(data) {
    return prisma_1.default.instance.ticket.create({ data });
}
exports.createTicket = createTicket;
function createTicketPhoto(data) {
    return prisma_1.default.instance.ticketPhoto.createMany({ data });
}
exports.createTicketPhoto = createTicketPhoto;
function updateTicket(ticketId, data) {
    return prisma_1.default.instance.ticket.update({
        where: { ticketId },
        data,
    });
}
exports.updateTicket = updateTicket;
function deleteTicket(ticketId) {
    return prisma_1.default.instance.ticket.delete({
        where: {
            ticketId,
        },
    });
}
exports.deleteTicket = deleteTicket;
function countTicketsByStatus() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const estados = ["Pendiente", "Espera", "Resuelto"];
        const counts = yield prisma_1.default.instance.ticket.groupBy({
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
