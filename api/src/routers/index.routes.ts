import { Router } from "express";

import imagenRouter from "./imagen.routes";
import pdfRouter from "./pdf.routes";
import uploadRouter from "./uploads.routes";
import usuarioRouter from "./usuario.routes";

const router = Router();

// Ruta Imagenes
router.use("/imagen", imagenRouter);

// Ruta PDF
router.use("/pdf", pdfRouter);

// Ruta Uploads
router.use("/api/uploads", uploadRouter);

// Ruta Usuarios
router.use("/api/usuario", usuarioRouter);

export default router;
