import dotenv from "dotenv";

import { Config } from "../types/Config";

dotenv.config();

const config: Config = {
  PORT: parseInt(process.env.PORT ?? "8080"),
  PERS: process.env.PERS ?? "mongodb",
  mongodb: {
    mongoUrl: process.env.MONGO_URI ?? "",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    },
  },
  STORAGE: process.env.PATH_STORAGE_FILES ?? "",
  SECRET_KEY: process.env.SECRET_KEY ?? "",
  auth: {
    USER: process.env.AUTH_USER ?? "",
    PASSWORD: process.env.AUTH_PASSWORD ?? "",
  },
};

export default config;
