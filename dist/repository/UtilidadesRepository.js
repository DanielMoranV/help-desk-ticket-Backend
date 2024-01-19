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
exports.consultaCMP = exports.consultaDNI = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
function consultaDNI(dni) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch({ headless: "new" });
        const page = yield browser.newPage();
        // Navegar a la páginas
        yield page.goto("https://eldni.com/pe/buscar-datos-por-dni");
        // Completar el formulario con el número de DNI
        yield page.type("#dni", dni);
        // Enviar el formulario
        yield page.click("#btn-buscar-datos-por-dni");
        // Esperar a que la página cargue los resultados
        yield page.waitForSelector("#column-center");
        // Extraer los resultados
        const user = yield page.evaluate(() => {
            var _a, _b, _c, _d, _e;
            const nombresElement = document.querySelector("#column-center table tbody tr td:nth-child(2)");
            const nombres = nombresElement ? (_a = nombresElement.textContent) === null || _a === void 0 ? void 0 : _a.trim() : "";
            const dniElement = document.querySelector("#column-center table tbody tr td:nth-child(1)");
            const dni = dniElement ? (_b = dniElement.textContent) === null || _b === void 0 ? void 0 : _b.trim() : "";
            const apellidopElement = document.querySelector("#column-center table tbody tr td:nth-child(3)");
            const apellidop = apellidopElement
                ? (_c = apellidopElement.textContent) === null || _c === void 0 ? void 0 : _c.trim()
                : "";
            const apellidomElement = document.querySelector("#column-center table tbody tr td:nth-child(4)");
            const apellidom = apellidomElement
                ? (_d = apellidomElement.textContent) === null || _d === void 0 ? void 0 : _d.trim()
                : "";
            const digitoVerificadorElement = document.querySelector("#column-center table:nth-child(3) tbody tr td mark");
            const digitoVerificador = digitoVerificadorElement
                ? (_e = digitoVerificadorElement.textContent) === null || _e === void 0 ? void 0 : _e.trim()
                : "";
            return { nombres, dni, digitoVerificador, apellidop, apellidom };
        });
        console.log("Resultados:", user);
        yield browser.close();
        return user;
    });
}
exports.consultaDNI = consultaDNI;
function consultaCMP(cmp) {
    return __awaiter(this, void 0, void 0, function* () {
        // Construir la URL con el CMP proporcionado
        const url = `https://200.48.13.39/cmp/php/detallexmedico.php?id=${cmp}`;
        // Realizar la solicitud HTTP
        const response = yield axios_1.default.get(url);
        // Cargar el HTML en Cheerio para facilitar la manipulación
        const $ = cheerio_1.default.load(response.data);
        // Extraer los datos deseados
        const cmpNumber = $("#simple-example-table1 td").eq(0).text().trim();
        const apellidos = $("#simple-example-table1 td").eq(1).text().trim();
        const nombres = $("#simple-example-table1 td").eq(2).text().trim();
        const email = $("#simple-example-table3 td").eq(0).text().trim();
        const consejoRegional = $("#simple-example-table3 td").eq(1).text().trim();
        const registro = $("#simple-example-table4 td").eq(0).text().trim();
        const tipo = $("#simple-example-table4 td").eq(1).text().trim();
        const codigo = $("#simple-example-table4 td").eq(2).text().trim();
        // Imprimir los datos
        console.log("CMP:", cmpNumber);
        console.log("Apellidos:", apellidos);
        console.log("Nombres:", nombres);
        console.log("Email:", email);
        console.log("Consejo Regional:", consejoRegional);
        console.log("Registro:", registro);
        console.log("Tipo:", tipo);
        console.log("Código:", codigo);
        const user = {
            cmpNumber,
            apellidos,
            nombres,
            email,
            consejoRegional,
            registro,
            tipo,
            codigo,
        };
        return user;
    });
}
exports.consultaCMP = consultaCMP;
