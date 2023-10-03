"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicket = exports.updateTicket = exports.createTicketPhoto = exports.createTicket = exports.getTicketId = exports.getTicketUserId = exports.getTickets = void 0;
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
