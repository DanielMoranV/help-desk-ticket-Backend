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
exports.deleteUser = exports.updateUser = exports.createUser = exports.userBydni = exports.getUsers = void 0;
const prisma_1 = __importDefault(require("../connection/prisma"));
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.user.findMany({
            orderBy: {
                userId: "asc",
            },
            include: {
                access: {
                    include: {
                        position: true,
                    },
                },
            },
        });
    });
}
exports.getUsers = getUsers;
function userBydni(dni) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.instance.user.findFirst({
            where: { dni },
            include: {
                access: true,
            },
        });
    });
}
exports.userBydni = userBydni;
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(data);
        const newUser = yield prisma_1.default.instance.user.create({ data });
        return newUser;
    });
}
exports.createUser = createUser;
function updateUser(dni, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_1.default.instance.user.update({
            where: { dni },
            data,
        });
        return user;
    });
}
exports.updateUser = updateUser;
function deleteUser(dni) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedUser = yield prisma_1.default.instance.user.delete({
            where: {
                dni,
            },
            include: {
                access: true,
            },
        });
        return deletedUser;
    });
}
exports.deleteUser = deleteUser;
