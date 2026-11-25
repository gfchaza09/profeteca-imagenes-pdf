import { Router } from "express";
import PDFController from "../controllers/pdf.controller";
import { requireDb } from "../middlewares/requireDb";

const pdfRouter = Router();

pdfRouter.use(requireDb);

// [GET] 🌐/pdf/:tipo/:id/doc.pdf
pdfRouter.get("/:tipo/:id/doc.pdf", PDFController.getPDF);

// [GET] 🌐/pdf/data-fake/:idTipo/:id
pdfRouter.get("/data-fake/:idTipo/:id", PDFController.getDataFake);

export default pdfRouter;
