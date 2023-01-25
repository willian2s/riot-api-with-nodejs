import { ENV } from "@app/config";
import createLogger from "@app/utils/loggerConfig";

export const logger = createLogger("riot-api", ENV !== "production");
