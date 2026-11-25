import { NextFunction, Request, Response } from "express";

import config from "../config/config";

export const requireDb = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!config.mongodb.enabled) {
    res.status(503).json({
      status: 503,
      message:
        "Persistencia desactivada. Configure MONGODB_ENABLED=true y MONGO_URI para usar esta función.",
    });
    return;
  }
  next();
};
