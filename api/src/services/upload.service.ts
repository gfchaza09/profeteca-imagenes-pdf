import fs from "fs";
import { Request } from "express";
import { StatusError } from "../classes/StatusError";
import imagenModel from "../models/imagen.model";
import tipoModel from "../models/tipo.model";

class UploadService {
  constructor() {}

  async getImages() {
    const images = await imagenModel.find({ isDeleted: false });

    // Itera sobre todas las imágenes y las convierte a objetos con la estructura deseada
    const imagesToSend = images.map((image) => {
      const imageBuffer = fs.readFileSync(image.path);

      const imageBase64 = imageBuffer.toString("base64");

      return {
        id: image.id,
        path: image.path,
        descripcion: image.descripcion,
        base64: imageBase64,
      };
    });

    return imagesToSend;
  }

  async postBackgroundImage(req: Request) {
    const { descripcion } = req.body;

    if (!descripcion) throw new StatusError("Descripción requerida", 400);

    if (!req.file) throw new StatusError("Falló subida de archivo", 400);

    const imagePath = req.file.path;

    const newImage = new imagenModel({ path: imagePath, descripcion });

    await newImage.save();

    return "Imagen de fondo subida correctamente";
  }

  async deleteBackgroundImage(req: Request) {
    const { id } = req.params;

    const image = await imagenModel.findById(id);

    if (!image) throw new StatusError("Imagen no encontrada", 404);

    image.isDeleted = true;

    await image.save();

    return "Imagen borrada con éxito";
  }

  async getConfigs() {
    const configs = await tipoModel.find({ isDeleted: false }).select("nombre");

    return configs;
  }

  async postJSONConfig(req: Request) {
    const { nombre } = req.body;
    if (!nombre) throw new StatusError("Nombre requerido", 400);
    if (!req.file) throw new StatusError("Falló subida de archivo", 400);
    const jsonPath = req.file.path;
    const newJSON = new tipoModel({ path: jsonPath, nombre });
    await newJSON.save();
    return "Archivo JSON subido correctamente";
  }

  async deleteJSONConfig(req: Request) {
    const { id } = req.params;

    const config = await tipoModel.findById(id);

    if (!config) throw new StatusError("Configuración no encontrada", 404);

    config.isDeleted = true;

    await config.save();

    return "Configuración borrada con éxito";
  }
}

export default new UploadService();
