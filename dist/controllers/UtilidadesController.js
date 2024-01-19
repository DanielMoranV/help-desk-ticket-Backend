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
const UtilidadesRepository_1 = require("../repository/UtilidadesRepository");
const response_1 = require("../utils/response");
// Datos de Categorias
// --------------------------------
class UtilidadesHandler {
    // Lista de empleados
    consultaDNI(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dni = req.params.dni;
                const user = yield (0, UtilidadesRepository_1.consultaDNI)(dni);
                if (user.dni == "") {
                    (0, response_1.failure)({ res, message: "DNI no encontrado" });
                    return;
                }
                const message = "Operación exitosa Registro Encontrado";
                (0, response_1.success)({ res, data: user, message });
            }
            catch (error) {
                console.log(error);
                const message = error;
                (0, response_1.failure)({ res, message });
            }
        });
    }
    consultaCMP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cmp = req.params.cmp;
                const user = yield (0, UtilidadesRepository_1.consultaCMP)(cmp);
                if (user.cmp == "") {
                    (0, response_1.failure)({ res, message: "CMP no encontrado" });
                    return;
                }
                const message = "Operación exitosa Registro Encontrado";
                (0, response_1.success)({ res, data: user, message });
            }
            catch (error) {
                console.log(error);
                const message = error;
                (0, response_1.failure)({ res, message });
            }
        });
    }
}
exports.default = UtilidadesHandler;
