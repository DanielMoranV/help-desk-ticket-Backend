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
const response_1 = require("../utils/response");
const AccessRepository_1 = require("../repository/AccessRepository");
const UserRepository_1 = require("../repository/UserRepository");
const strings_1 = require("../utils/strings");
const createToken_1 = require("../midlewares/createToken");
// Login de empleados
// --------------------------------
class AccesHandler {
    // Crear nuevo acceso de  empleado
    createAccessUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const username = req.params.username;
                let data = req.body;
                data.password = yield (0, strings_1.hashPassword)(req.body.password);
                data.createAt = new Date();
                const user = yield (0, UserRepository_1.userBydni)(username);
                if (user) {
                    data = Object.assign({ username, userId: user.userId }, data);
                    let newAccessUser = yield (0, AccessRepository_1.createAccessUser)(data);
                    const message = "Operación exitosa Registro Acceso Creado";
                    (0, response_1.success)({ res, data: newAccessUser, message });
                }
                else {
                    const message = "dni no existe";
                    (0, response_1.failure)({ res, message });
                }
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    // public async addUser(req: Request, res: Response): Promise<void> {
    //   try {
    //     let data = req.body;
    //     data.password = await hashPassword(req.body.password);
    //     data.createAt = new Date();
    //     let newAccessUser = await addUser(data);
    //     const message = "Operación exitosa Registro Acceso Creado";
    //     success({ res, data: newAccessUser, message });
    //   } catch (error: any) {
    //     console.log(error);
    //     const message = getErrorMessageByCode(error.code);
    //     failure({ res, message });
    //   }
    // }
    // Login de empleado
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const access = yield (0, AccessRepository_1.accessBydni)(username);
                if (!access) {
                    (0, response_1.failure)({ res, message: "dni no encontrado" });
                }
                else {
                    const comparePass = yield (0, strings_1.comparePassword)(password, access.password);
                    if (comparePass) {
                        yield (0, AccessRepository_1.updateLastSession)(access.username);
                        const token = yield (0, createToken_1.createToken)(username);
                        (0, response_1.success)({ res, data: Object.assign(Object.assign({}, access), { token }) });
                    }
                    else {
                        (0, response_1.failure)({ res, message: "Clave incorrecta" });
                    }
                }
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    logoutUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.body;
                const userLoggedOut = yield (0, AccessRepository_1.deleteSessions)(username);
                const message = "Sesión cerrada correctamente";
                (0, response_1.success)({ res, data: userLoggedOut, message });
            }
            catch (error) {
                console.log(error);
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    // Lista de datos de acceso empleados
    getAccess(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const access = yield (0, AccessRepository_1.getAccess)();
                if (access.length != 0) {
                    const message = "Operación exitosa Lista de Accesos";
                    (0, response_1.success)({ res, data: access, message });
                }
                else {
                    const message = "Operación exitosa sin registros";
                    (0, response_1.success)({ res, data: access, message });
                }
            }
            catch (error) {
                console.log(error);
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    // Lista de datos de acceso de empleados por dni
    getAccessUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const username = req.params.username;
                const access = yield (0, AccessRepository_1.accessBydni)(username);
                if (access) {
                    const message = "Operación exitosa Registro Encontrado";
                    (0, response_1.success)({ res, data: access, message });
                }
                else {
                    const message = "Operación exitosa No se encontraron resultados";
                    (0, response_1.success)({ res, data: null, message });
                }
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    // Actualizar datos de acceso de empleados
    updateAccess(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const username = req.params.username;
                let data = req.body;
                data.password = yield (0, strings_1.hashPassword)(req.body.password);
                const access = yield (0, AccessRepository_1.updateAccess)(username, data);
                const message = "Operación exitosa Registro Actualizado";
                (0, response_1.success)({ res, data: access, message });
            }
            catch (error) {
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                (0, response_1.failure)({ res, message });
            }
        });
    }
    // Actualizar contraseñas de una lista de usuarios
    updatePasswords(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = req.body; // Array de objetos de usuarios con { username, password }
                // Recorrer la lista de usuarios y actualizar las contraseñas
                const updatedUsers = [];
                for (const user of users) {
                    const hashedPassword = yield (0, strings_1.hashPassword)(user.password);
                    const updatedUser = yield (0, AccessRepository_1.updatePasswordByUsername)(user.username, hashedPassword);
                    updatedUsers.push(updatedUser);
                }
                // Mensaje exitoso para la respuesta
                const message = "Operación exitosa: Contraseñas actualizadas";
                // Enviar una respuesta exitosa con los usuarios actualizados y el mensaje
                (0, response_1.success)({ res, data: updatedUsers, message });
            }
            catch (error) {
                // Si ocurre un error, obtener un mensaje de error basado en el código del error
                const message = (0, errormessagebycode_1.getErrorMessageByCode)(error.code);
                // Enviar una respuesta de error con el mensaje de error correspondiente
                (0, response_1.failure)({ res, message });
            }
        });
    }
}
exports.default = AccesHandler;
