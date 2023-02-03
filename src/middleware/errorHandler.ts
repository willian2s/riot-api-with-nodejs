import { internal, isBoom } from "@hapi/boom";
import { StatusCodes } from "http-status-codes";

import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  if (isBoom(error)) {
    req.log.warn(error);
    return res
      .status(error.output.payload.statusCode)
      .json(error.output.payload);
  }

  req.log.error(error);

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json(internal(String(error), String(error)));
};
