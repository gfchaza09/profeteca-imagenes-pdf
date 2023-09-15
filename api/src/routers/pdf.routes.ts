import { Router } from "express";
import PDFController from "../controllers/pdf.controller";
import { verificarToken } from "../middlewares/auth";

const pdfRouter = Router();

// [GET] 🌐/pdf/:tipo/:id/doc.pdf
pdfRouter.get("/:tipo/:id/doc.pdf", PDFController.getPDF);

// [GET] 🌐/pdf/data-fake/:idTipo/:id
pdfRouter.get("/data-fake/:idTipo/:id", PDFController.getDataFake);

export default pdfRouter;
