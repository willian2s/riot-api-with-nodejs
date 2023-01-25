import { ENV, PORT } from "@app/config";
import app from "@app/server";
import { logger } from "@app/services/logger";

async function start() {
  logger.info(`⚡️[server]: Starting app on environment: ${ENV}`);

  app.listen(PORT, () => {
    logger.info(
      `⚡️[server]: Server is running at http://localhost:${PORT}/api/v1`
    );
  });
}

void start();
