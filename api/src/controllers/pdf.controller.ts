import { NextFunction, Request, Response } from "express";

import { logError, logWarning } from "../loggers";
import { StatusError } from "../classes/StatusError";
import PDFService from "../services/pdf.service";

class PDFController {
  constructor() {}

  async getPDF(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PDFService.generatePDF(req);
      res.setHeader("Content-Type", "application/pdf");
      res.send(data);
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

  async getDataFake(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PDFService.getDataFake(req);
      res.send(data);
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

export default new PDFController();
