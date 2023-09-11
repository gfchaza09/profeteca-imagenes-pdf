import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

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
