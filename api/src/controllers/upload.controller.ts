import { NextFunction, Request, Response } from "express";

import { logError, logWarning } from "../loggers";
import { StatusError } from "../classes/StatusError";
import UploadService from "../services/upload.service";

class UploadController {
  constructor() {}

  async getImages(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UploadService.getImages();
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

  async postBackgroundImage(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UploadService.postBackgroundImage(req);
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

  async deleteBackgroundImage(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UploadService.deleteBackgroundImage(req);
      res.status(204).send({ message: data });
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

  async getConfigs(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UploadService.getConfigs();
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

  async postJSONConfig(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UploadService.postJSONConfig(req);
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

  async deleteJSONConfig(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UploadService.deleteJSONConfig(req);
      res.status(204).send({ message: data });
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

  async getTemplates(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UploadService.getTemplates();
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

  async postTemplate(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UploadService.postTemplate(req);
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

  async deleteTemplate(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UploadService.deleteTemplate(req);
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

export default new UploadController();
