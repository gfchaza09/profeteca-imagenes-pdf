import fs from "fs";
import sizeOf from "image-size";
import axios from "axios";
import { Browser } from "puppeteer";
import { Request } from "express";
import { isValidObjectId } from "mongoose";

import { StatusError } from "../classes/StatusError";
import { cleanHTML } from "../utils/cleanerText";
import tipoModel from "../models/tipo.model";
import imagenModel from "../models/imagen.model";
import { imageCache } from "../utils/cache";
import config from "../config/config";

class ImagenService {
  async getImage(req: Request) {
    const { text1, text2, tipo } = req.params;

    if (!isValidObjectId(tipo))
      throw new StatusError("El id de la configuración no es válido", 400);

    const configuracion = await tipoModel.findById(tipo);

    if (!configuracion || configuracion.isDeleted === true)
      throw new StatusError("Configuración no encontrada", 404);

    const cacheKey = `${text1}-${text2}-${tipo}`;

    // Verifica si la imagen ya existe en caché
    if (imageCache[cacheKey]) {
      return imageCache[cacheKey];
    }

    try {
      // Leer el archivo JSON asociado con el "tipo"
      const jsonPath = `${configuracion.path}`;
      const configJSON = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

      // Extraer la configuración de CSS y la imagen de fondo del JSON
      const cssConfig = configJSON.css;
      const backgroundImage = configJSON.backgroundImage;

      if (!isValidObjectId(backgroundImage))
        throw new StatusError("El id de la imagen no es válido", 400);

      const imagen = await imagenModel.findById(backgroundImage);

      if (!imagen || imagen.isDeleted === true)
        throw new StatusError("Imagen no encontrada", 404);

      const imagePath = `${imagen.path}`;
      const dimensions = sizeOf(imagePath);

      const { width: originalWidth, height: originalHeight } = dimensions;

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
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="${cssConfig.fontFamilyUrl}" rel="stylesheet">
            </head>
            <body>
              <img src="data:image/jpeg;base64,${imageBase64}" alt="bg" />
              <div class="text1">${text1Convertido}</div>
              <div class="text2">${text2Convertido}</div>
            </body>
          </html>
        `;

      const cssContent = `
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
        }`;

      const res = await axios.post(
        "https://hcti.io/v1/image",
        {
          html: htmlContent,
          css: cssContent,
          viewport_width: originalWidth,
          viewport_height: originalHeight,
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${config.htmlCssToImage.HTMLTOCSSIMAGE_USER_ID}:${config.htmlCssToImage.HTMLTOCSSIMAGE_API_KEY}`
            ).toString("base64")}`,
          },
        }
      );

      imageCache[cacheKey] = res.data.url;

      return res.data.url;
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
}

export default new ImagenService();
