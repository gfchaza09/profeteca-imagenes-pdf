import path from "path";
import fs from "fs";
import puppeteer from "puppeteer";
import { Request } from "express";
import sizeOf from "image-size";
import { StatusError } from "../classes/StatusError";
import { cleanHTML } from "../utils/cleanerText";
import config from "../config/config";
import tipoModel from "../models/tipo.model";
import { isValidObjectId } from "mongoose";
import imagenModel from "../models/imagen.model";

class ImagenService {
  constructor() {}

  async getImage(req: Request) {
    const { text1, text2, tipo } = req.params;

    if (!isValidObjectId(tipo))
      throw new StatusError("El id de la configuración no es válido", 400);

    const configuracion = await tipoModel.findById(tipo);

    if (!configuracion || configuracion.isDeleted === true)
      throw new StatusError("Configuración no encontrada", 404);

    try {
      // Leer el archivo JSON asociado con el "tipo"
      const jsonPath = path.join(__dirname, `../../${configuracion.path}`);
      const configJSON = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

      // Extraer la configuración de CSS y la imagen de fondo del JSON
      const cssConfig = configJSON.css;
      const backgroundImage = configJSON.backgroundImage;

      if (!isValidObjectId(backgroundImage))
        throw new StatusError("El id de la imagen no es válido", 400);

      const imagen = await imagenModel.findById(backgroundImage);

      if (!imagen || imagen.isDeleted === true)
        throw new StatusError("Imagen no encontrada", 404);

      const imagePath = path.join(__dirname, `../../${imagen.path}`);
      const dimensions = sizeOf(imagePath);

      const { width: originalWidth, height: originalHeight } = dimensions;

      const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();

      // Configurar el tamaño de la página para que se adapte a las dimensiones de la imagen
      await page.setViewport({
        width: originalWidth || 800, // Por defecto width: 800
        height: originalHeight || 600, // Por defecto height: 800
        deviceScaleFactor: 1,
      });
      const imageBuffer = fs.readFileSync(imagePath);
      const imageBase64 = imageBuffer.toString("base64");
      // Reemplaza "-" por "/", "+" por ".", "%0A" por "<br>"
      const text1Convertido = cleanHTML(text1)
        .replace(/-/g, "/")
        .replace(/\+/g, ".")
        .replace(/\n/g, "<br>");

      const text2Convertido = cleanHTML(text2)
        .replace(/-/g, "/")
        .replace(/\+/g, ".")
        .replace(/\n/g, "<br>");

      const htmlContent = `
          <html>
            <head>
              <style>
              @import url(${cssConfig.fontFamilyUrl});
              body {
                margin: 0;
                padding: 0;
              }
              img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
              }
              .text1 {
                  position: absolute;
                  top: ${cssConfig.text1.top};
                  left: ${cssConfig.text1.left};
                  font-family: ${cssConfig.text1.fontFamily};
                  color: ${cssConfig.text1.textColor};
                  font-size: ${cssConfig.text1.fontSize};
                  font-weight: ${cssConfig.text1.fontWeight};
                  font-style: ${cssConfig.text1.fontStyle};
                  letter-spacing: ${cssConfig.text1.letterSpacing};
                  line-height: ${cssConfig.text1.lineHeight};
                  text-align: ${cssConfig.text1.textAlign};
                  text-shadow: ${cssConfig.text1.textShadow};
                }
                .text2 {
                  position: absolute;
                  top: ${cssConfig.text2.top};
                  left: ${cssConfig.text2.left};
                  font-family: ${cssConfig.text2.fontFamily};
                  color: ${cssConfig.text2.textColor};
                  font-size: ${cssConfig.text2.fontSize};
                  font-weight: ${cssConfig.text2.fontWeight};
                  font-style: ${cssConfig.text2.fontStyle};
                  letter-spacing: ${cssConfig.text2.letterSpacing};
                  line-height: ${cssConfig.text2.lineHeight};
                  text-align: ${cssConfig.text2.textAlign};
                  text-shadow: ${cssConfig.text2.textShadow};
                }
              </style>
            </head>
            <body>
              <img src="data:image/jpeg;base64,${imageBase64}" alt="bg" />
              <div class="text1">${text1Convertido}</div>
              <div class="text2">${text2Convertido}</div>
            </body>
          </html>
        `;

      await page.setContent(htmlContent, { waitUntil: "networkidle2" });

      // Captura una captura de pantalla de la página
      const screenshot = await page.screenshot();

      await browser.close();

      return screenshot;
    } catch (err: any) {
      console.log(err.message);
      if (err.code === "ENOENT") {
        throw new StatusError("Archivo no encontrado", 404);
      } else if (err.message === "Imagen no encontrada") {
        throw new StatusError(err.message, 404);
      } else {
        throw new StatusError("Error generando imagen", 400);
      }
    }
  }

  async generateImage(req: Request) {
    const { file } = req.body;

    const {
      text1 = "Manuel<br>te esperamos",
      text2,
      text1X = 360,
      text1Y = 270,
      text2X = 280,
      text2Y = 460,
      textColor = "white",
    } = req.body;
    if (!file)
      throw new StatusError("Archivo no proporcionado o no válido.", 400);

    const backgroundImage = sizeOf(file.buffer);
    const { width: originalWidth, height: originalHeight } = backgroundImage;

    const browser = await puppeteer.launch({ headless: "new" });

    const page = await browser.newPage();

    // Configurar el tamaño de la página para que coincida con las dimensiones de la imagen de fondo
    await page.setViewport({
      width: originalWidth || 0,
      height: originalHeight || 0,
      deviceScaleFactor: 1,
    });

    // Convierte la foto en base64 para incluirla en la página HTML
    const photoBase64 = file.buffer.toString("base64");
    const photoDataUri = `data:image/jpeg;base64,${photoBase64}`;

    // Configurar el contenido HTML con la imagen de fondo y el texto
    const htmlContent = `
        <html>
          <head>
            <style>
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap');
            body {
              margin: 0;
              padding: 0;
              color: ${textColor};
              font-family: Montserrat, sans-serif;
            }
            img {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            }
              .text1 {
                position: absolute;
                top: ${text1Y}px;
                left: ${text1X}px;
                font-size: 80px;
                font-weight: 900;
                line-height: 0.8;
                text-align: center;
              }
              .text2 {
                position: absolute;
                top: ${text2Y}px;
                left: ${text2X}px;
                font-size: 63px;
                font-weight: 400;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <img src=${photoDataUri} alt="bg" border="0" />
            <div class="text1">${text1}</div>
            <div class="text2">${text2}</div>
          </body>
        </html>
      `;

    await page.setContent(htmlContent, { waitUntil: "networkidle2" });

    // Captura una captura de pantalla de la página
    const screenshot = await page.screenshot();

    // Cierra el navegador Puppeteer
    await browser.close();

    return screenshot;
  }
}

export default new ImagenService();
