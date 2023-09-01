"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePriority = exports.updatePriority = exports.createPriority = exports.getPriority = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
function getPriority() {
    return prisma_1.default.instance.priority.findMany({
        orderBy: {
            priorityId: "asc",
        },
    });
}
exports.getPriority = getPriority;
function createPriority(data) {
    return prisma_1.default.instance.priority.create({ data });
}
exports.createPriority = createPriority;
function updatePriority(priorityId, data) {
    return prisma_1.default.instance.priority.update({
        where: { priorityId },
        data,
    });
}
exports.updatePriority = updatePriority;
function deletePriority(priorityId) {
    return prisma_1.default.instance.priority.delete({
        where: {
            priorityId,
        },
    });
}
exports.deletePriority = deletePriority;
