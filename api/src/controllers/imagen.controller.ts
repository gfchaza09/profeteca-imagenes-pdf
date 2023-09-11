import { NextFunction, Request, Response } from "express";

import { logError, logWarning } from "../loggers";
import { StatusError } from "../classes/StatusError";
import ImagenService from "../services/imagen.service";

class ImagenController {
  constructor() {}

  async getImage(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ImagenService.getImage(req);
      res.writeHead(200, {
        "Content-Type": "image/jpeg",
        "Content-Length": data.length,
      });
      res.end(data);
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

  async generateImage(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ImagenService.generateImage(req);
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

export default new ImagenController();
