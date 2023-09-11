import { Request } from "express";

import { StatusError } from "../classes/StatusError";
import { generateAuthToken } from "../utils/token";
import config from "../config/config";

class UsuarioService {
  constructor() {}

  async login(req: Request) {
    const { username, password } = req.body;

    if (config.auth.USER !== username || config.auth.PASSWORD !== password)
      throw new StatusError("Credenciales inválidas", 401);

    const token = generateAuthToken(username);

    return token;
  }
}

export default new UsuarioService();
