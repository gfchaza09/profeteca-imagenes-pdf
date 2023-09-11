import { NextFunction, Request, Response } from "express";
import { validateToken } from "../utils/token";

export const verificarToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const autorizacion = req.headers.authorization;
  const message = { message: "No estas autorizado" };
  const token = autorizacion && autorizacion.split(" ")[1];

  if (!token) return res.status(403).json(message);

  const result: any = validateToken(token, true);

  if (result && !result.valido) return res.status(403).json(message);

  next();
};
