"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicket = exports.updateTicket = exports.createTicketPhoto = exports.createTicket = exports.getTicketId = exports.getTicketUserId = exports.getTickets = void 0;
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
