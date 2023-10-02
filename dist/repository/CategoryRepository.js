"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryBilling = exports.getCategory = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
function getCategory() {
    return prisma_1.default.instance.category.findMany({
        orderBy: {
            categoryId: "asc",
        },
    });
}
exports.getCategory = getCategory;
function getCategoryBilling() {
    return prisma_1.default.instance.categoryBilling.findMany({
        orderBy: {
            categoryBillingId: "asc",
        },
    });
}
exports.getCategoryBilling = getCategoryBilling;
function createCategory(data) {
    return prisma_1.default.instance.category.create({ data });
}
exports.createCategory = createCategory;
function updateCategory(categoryId, data) {
    return prisma_1.default.instance.category.update({
        where: { categoryId },
        data,
    });
}
exports.updateCategory = updateCategory;
function deleteCategory(categoryId) {
    return prisma_1.default.instance.category.delete({
        where: {
            categoryId,
        },
    });
}
exports.deleteCategory = deleteCategory;
