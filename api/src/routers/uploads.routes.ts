import { Router } from "express";
import UploadController from "../controllers/upload.controller";
import { uploadImage, uploadJSON } from "../middlewares/multer";
import { verificarToken } from "../middlewares/auth";

const uploadRouter = Router();

// [GET] 🌐/api/uploads/bg
uploadRouter.get("/bg", verificarToken, UploadController.getImages);

// [POST] 🌐/api/uploads/bg
uploadRouter.post(
  "/bg",
  verificarToken,
  uploadImage.single("foto"),
  UploadController.postBackgroundImage
);

// [GET] 🌐/api/uploads/json
uploadRouter.get("/json", verificarToken, UploadController.getConfigs);

// [POST] 🌐/api/uploads/json
uploadRouter.post(
  "/json",
  verificarToken,
  uploadJSON.single("config"),
  UploadController.postJSONConfig
);

export default uploadRouter;
