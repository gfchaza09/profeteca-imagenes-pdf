import { Router } from "express";

import imagenRouter from "./imagen.routes";
import uploadRouter from "./uploads.routes";
import usuarioRouter from "./usuario.routes";

const router = Router();

// Ruta Imagenes
router.use("/imagen", imagenRouter);

// Ruta Uploads
router.use("/api/uploads", uploadRouter);

// Ruta Usuarios
router.use("/api/usuario", usuarioRouter);

export default router;
