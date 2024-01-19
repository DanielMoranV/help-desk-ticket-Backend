"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRole = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
function getRole() {
    return prisma_1.default.instance.position.findMany({
        orderBy: {
            positionId: "asc",
        },
        include: {
            Area: true,
        },
    });
}
exports.getRole = getRole;
