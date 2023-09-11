import jwt from "jsonwebtoken";

import config from "../config/config";

export const generateAuthToken = (username: string): string => {
  const secretKey = config.SECRET_KEY;
  const token = jwt.sign({ username }, secretKey, {
    expiresIn: "1d",
  });
  return token;
};

export const validateToken = (token: string, mostrarData: boolean = false) => {
  const secreto = config.SECRET_KEY;
  try {
    if (!secreto) throw new Error("Hay problemas para verificar el token");
    const decoded = jwt.verify(token, secreto);
    return mostrarData ? { valido: true, data: decoded } : { valido: true };
  } catch (error) {
    return {
      valido: false,
    };
  }
};
