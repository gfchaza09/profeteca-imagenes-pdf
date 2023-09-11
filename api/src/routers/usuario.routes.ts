import { Router } from "express";
import UsuarioController from "../controllers/usuario.controller";

const usuarioRouter = Router();

// [POST] 🌐/api/usuario/login
usuarioRouter.post("/login", UsuarioController.login);

export default usuarioRouter;
