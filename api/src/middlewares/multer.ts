import multer from "multer";
import config from "../config/config";
import { StatusError } from "../classes/StatusError";

const storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${config.STORAGE}/image`);
  },
  filename: (req, file, cb) => {
    const fileName = `${file.originalname
      .split(".")
      .shift()}.${file.originalname.split(".").pop()}`;
    cb(null, fileName);
  },
});

const storageTemplate = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${config.STORAGE}/template`);
  },
  filename: (req, file, cb) => {
    const fileName = `${file.originalname
      .split(".")
      .shift()}.${file.originalname.split(".").pop()}`;
    cb(null, fileName);
  },
});

const storageJSON = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${config.STORAGE}/json`);
  },
  filename: (req, file, cb) => {
    const fileName = `${file.originalname
      .split(".")
      .shift()}.${file.originalname.split(".").pop()}`;
    cb(null, fileName);
  },
});

// Funcion para cargar cualquier imagen a la carpeta definida en el archivo .env
const uploadImage = multer({
  storage: storageImage,
  fileFilter: (req, file, callback) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/gif"]; // Tipos MIME permitidos

    // Comprueba si el tipo MIME del archivo cargado está en la lista de tipos permitidos
    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true); // El archivo es válido
    } else {
      callback(
        new StatusError(
          "Tipo de archivo no válido. Solo se permiten imágenes JPEG, PNG o GIF.",
          400
        )
      ); // Error de validación
    }
  },
});

// Funcion para cargar un archivo json a la carpeta definida en el archivo .env
const uploadJSON = multer({
  storage: storageJSON,
  fileFilter: (req, file, callback) => {
    // Comprueba si el tipo MIME del archivo cargado está en la lista de tipos permitidos
    if (file.mimetype === "application/json") {
      callback(null, true); // El archivo es válido
    } else {
      callback(
        new StatusError(
          "Tipo de archivo no válido. Solo se permite un archivo JSON.",
          400
        )
      ); // Error de validación
    }
  },
});

// Funcion para cargar templates a la carpeta definida en el archivo .env
const uploadTemplate = multer({
  storage: storageTemplate,
  fileFilter: (req, file, callback) => {
    if (file.originalname.endsWith(".ejs")) {
      callback(null, true);
    } else {
      callback(
        new StatusError(
          "Tipo de archivo no válido. Solo se permiten archivos EJS.",
          400
        )
      ); // Error de validación
    }
  },
});

export { uploadImage, uploadJSON, uploadTemplate };
