import { Router } from "express";
import ImagenController from "../controllers/imagen.controller";

const imagenRouter = Router();

// [GET] 🌐/imagen/:tipo/:text1/:text2/img.jpg
imagenRouter.get("/:tipo/:text1/:text2/img.jpg", ImagenController.getImage);

export default imagenRouter;
