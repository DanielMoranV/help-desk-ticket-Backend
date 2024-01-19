import { Position } from "@prisma/client";
import prisma from "../connection/prisma";
import puppeteer from "puppeteer";
import axios from "axios";
import cheerio from "cheerio";

export async function consultaDNI(dni: string): Promise<any> {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // Navegar a la páginas
  await page.goto("https://eldni.com/pe/buscar-datos-por-dni");

  // Completar el formulario con el número de DNI
  await page.type("#dni", dni);

  // Enviar el formulario
  await page.click("#btn-buscar-datos-por-dni");

  // Esperar a que la página cargue los resultados
  await page.waitForSelector("#column-center");

  // Extraer los resultados
  const user = await page.evaluate(() => {
    const nombresElement = document.querySelector(
      "#column-center table tbody tr td:nth-child(2)"
    );
    const nombres = nombresElement ? nombresElement.textContent?.trim() : "";
    const dniElement = document.querySelector(
      "#column-center table tbody tr td:nth-child(1)"
    );
    const dni = dniElement ? dniElement.textContent?.trim() : "";
    const apellidopElement = document.querySelector(
      "#column-center table tbody tr td:nth-child(3)"
    );
    const apellidop = apellidopElement
      ? apellidopElement.textContent?.trim()
      : "";
    const apellidomElement = document.querySelector(
      "#column-center table tbody tr td:nth-child(4)"
    );
    const apellidom = apellidomElement
      ? apellidomElement.textContent?.trim()
      : "";
    const digitoVerificadorElement = document.querySelector(
      "#column-center table:nth-child(3) tbody tr td mark"
    );
    const digitoVerificador = digitoVerificadorElement
      ? digitoVerificadorElement.textContent?.trim()
      : "";

    return { nombres, dni, digitoVerificador, apellidop, apellidom };
  });

  console.log("Resultados:", user);
  await browser.close();
  return user;
}

export async function consultaCMP(cmp: string): Promise<any> {
  // Construir la URL con el CMP proporcionado
  const url = `https://200.48.13.39/cmp/php/detallexmedico.php?id=${cmp}`;

  // Realizar la solicitud HTTP
  const response = await axios.get(url);

  // Cargar el HTML en Cheerio para facilitar la manipulación
  const $ = cheerio.load(response.data);

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
}
