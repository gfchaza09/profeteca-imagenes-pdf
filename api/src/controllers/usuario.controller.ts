import { NextFunction, Request, Response } from "express";

import { logError, logWarning } from "../loggers";
import { StatusError } from "../classes/StatusError";
import UsuarioService from "../services/usuario.service";

class UsuarioController {
  constructor() {}

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UsuarioService.login(req);
      res.status(200).json({ message: data });
    } catch (err: StatusError | unknown) {
      logError(err);
      logWarning(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      if (err instanceof StatusError) {
        next(err);
      } else {
        const statusError = new StatusError("Internal Server Error", 500);
        next(statusError);
      }
    }
  }
}

export default new UsuarioController();
