import { createServer } from "http";
import config from "./config/config";
import { logError, logInfo } from "./loggers/index";
import app from "./server";
import { cleanupCache } from "./utils/cache";
import PuppeterManager from "./classes/PuppeteerManager";

const PORT = config.PORT;

const server = createServer(app);

const enableExpress = (): void => {
  server.listen(PORT, () => {
    logInfo(`🚀 Corriendo servidor en http://localhost:${PORT}...`);
  });
  server.on("error", (error) => logError(`Error en servidor ${error}`));

  // Manejar señales de cierre
  const handleShutdown = (signal: string) => {
    logInfo(`Cerrando servidor debido a la señal: ${signal}`);

    // Limpieza de la instancia de Puppeteer y el cache generado de img/pdf
    PuppeterManager.close();
    cleanupCache();

    // Cierra el servidor
    server.close(() => {
      logInfo("Servidor cerrado correctamente.");
      process.exit(0);
    });
  };

  process.on("SIGINT", () => handleShutdown("SIGINT"));
  process.on("SIGTERM", () => handleShutdown("SIGTERM"));
};

enableExpress();
