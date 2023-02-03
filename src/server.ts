require("express-async-errors");
import express, { Request, Response } from "express";
import cors from "cors";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import promBundle from "express-prom-bundle";
import prom from "prom-client";
import { router } from "@app/router";
import { expressLogger } from "@app/utils";
import { logger } from "@app/services/logger";
import { auth, errorHandler } from "@app/middleware";

const app = express();

app.use(cors());
app.use(expressLogger(logger));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const register = new prom.Registry();
prom.collectDefaultMetrics({ register });

const metricsMiddleware = promBundle({
  autoregister: false,
  includeMethod: true,
  includePath: true,
  promRegistry: register,
});

app.use(metricsMiddleware);

app.get("/health", async (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).send(ReasonPhrases.OK);
});

app.get("/metrics", async (_req: Request, res: Response) => {
  const appMetrics = await register.metrics();
  res.end(appMetrics);
});

app.use("/api/v1", auth, router);

app.use(errorHandler);

export default app;
