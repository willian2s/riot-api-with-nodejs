/* eslint-disable node/no-process-env */
// eslint-disable-next-line @typescript-eslint/no-var-requires
import dotenv from "dotenv";

dotenv.config();

function assertEnvVarPresent(
  value: string | undefined,
  envName: string
): string {
  if (value == null) {
    console.log("env:", process.env.NODE_ENV);
    throw new Error(
      `Required environment variable missing on init: ${envName}`
    );
  }
  // toString is to guard against pure number environment variables
  return value.toString();
}

export const ENV = process.env.NODE_ENV || "development";
export const PORT = process.env.PORT ?? 3010;
export const RIOT_API_KEY = assertEnvVarPresent(
  process.env.RIOT_API_KEY,
  "RIOT_API_KEY"
);
