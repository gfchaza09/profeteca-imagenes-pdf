import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import path from "path";
import fs from "fs";

// Importacion de Router
import router from "./routers/index.routes";
import notFoundRouter from "./routers/notFound.routes";

// Importacion de loggers
import { logInfo } from "./loggers/index";

import { StatusError } from "./classes/StatusError";
import connectDB from "./database/database";

//------------------------------------------------------------------------
// server
const app = express();

// configuracion server
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//--------------------------------------------
// logging general

app.use((req, res, next): void => {
  logInfo(`${req.method} ${req.url}`);
  next();
});

app.get("/api", (req: Request, res: Response) => {
  res.send("Bienvenido a la API de Trami-Imagenes!");
});

// Router Api
app.use(router);
//--------------------------------------------
// Router Frontend CLient
app.use(express.static(path.join(__dirname, "../public/dist/app")));
app.use("/", express.static("../public/dist/app"));

app.use(function (req, res, next) {
  //Si el formato aceptado no es "html",
  //significa que la solicitud no está buscando una página HTML y se pasa al siguiente middleware
  const accept = req.accepts("html", "json", "xml");
  if (accept !== "html") {
    return next();
  }

  // Si la solicitud acepta el formato "html", se verifica si la ruta de la solicitud tiene una extensión de archivo
  const ext = path.extname(req.path);
  if (ext !== "") {
    return next();
  }

  fs.createReadStream(
    path.join(__dirname, "../public/dist/app/") + "index.html"
  ).pipe(res);
});
//--------------------------------------------

// Ruta inexistente
app.use(notFoundRouter);
//--------------------------------------------

// Manejo de errores
app.use(
  (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response<any, Record<string, any>> => {
    const statusError = error as StatusError;
    const status = statusError.status ?? 500;
    const message = statusError.message;
    return res.status(status).json({ status, message });
  }
);
//--------------------------------------------

// Conexión a la base de datos MongoDB
connectDB();
//-------------------------------------------

export default app;
