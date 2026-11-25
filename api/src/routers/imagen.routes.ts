import { Router } from "express";
import ImagenController from "../controllers/imagen.controller";
import { requireDb } from "../middlewares/requireDb";

const imagenRouter = Router();

imagenRouter.use(requireDb);

// [GET] 🌐/imagen/:tipo/:text1/:text2/img.jpg
imagenRouter.get("/:tipo/:text1/:text2/img.jpg", ImagenController.getImage);

export default imagenRouter;
