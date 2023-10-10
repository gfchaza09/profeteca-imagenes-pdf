import { Request } from "express";
import { isValidObjectId } from "mongoose";
import axios from "axios";
import puppeteer from "puppeteer";
import fs from "fs/promises";
import ejs from "ejs";

import { StatusError } from "../classes/StatusError";
import templateModel from "../models/template.model";
import config from "../config/config";

class PDFService {
  constructor() {}

  async generatePDF(req: Request) {
    const { id, tipo } = req.params;

    if (!isValidObjectId(tipo))
      throw new StatusError("El id del template no es válido", 400);

    const template = await templateModel.findById(tipo);

    if (!template || template.isDeleted === true)
      throw new StatusError("Template no encontrado", 404);

    const templatePath = template.path;

    const res = await axios.get(`${config.API_DATA_URL}/${tipo}/${id}`);

    if (!res.data) throw new StatusError("No se encontraron datos", 404);

    if (typeof res.data !== "object")
      throw new StatusError("Formato de datos no válido", 400);

    try {
      const ejsTemplate = await fs.readFile(templatePath, "utf-8");
      // Renderiza el contrato EJS con los datos
      const html = ejs.render(ejsTemplate, res.data);
      // Crea un navegador Puppeteer
      const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      // Abre una nueva página
      const page = await browser.newPage();

      await page.setContent(html);

      // Genera el PDF
      const pdfBuffer = await page.pdf({ format: "A4" });

      // Cierra el navegador Puppeteer
      await browser.close();

      return pdfBuffer;
    } catch (err: any) {
      if (err.code === "ENOENT") {
        throw new StatusError("Archivo no encontrado", 404);
      } else {
        throw new StatusError("Error generando PDF", 400);
      }
    }
  }

  async getDataFake(req: Request) {
    const { idTipo, id } = req.params;
    return {
      id: id,
      elementos: ["Hola", "Como", "Estas"],
      tipo: idTipo,
      name: "Gabriel",
      nombre: "Gabriel",
      edad: 30,
      date: "12/08/23",
      fullname: "Gabriel Chazarreta",
      dni: "12345678",
      autorizado:
        "https://w7.pngwing.com/pngs/317/744/png-transparent-electronic-signature-show-miscellaneous-angle-electronics.png",
      cliente:
        "https://w7.pngwing.com/pngs/317/744/png-transparent-electronic-signature-show-miscellaneous-angle-electronics.png",
    };
  }
}

export default new PDFService();
