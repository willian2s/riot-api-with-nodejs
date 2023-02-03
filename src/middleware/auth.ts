import { NextFunction, Request, Response } from "express";
import { unauthorized } from "@hapi/boom";

import { MD5_HASH } from "@app/config";

function compareToken(token: string): Boolean | Error {
  const isAuthicate = MD5_HASH === token;

  if (!isAuthicate) {
    throw unauthorized();
  }

  return true;
}

export function auth(
  req: Partial<Request>,
  res: Partial<Response>,
  next: NextFunction
): void {
  const token = req.headers?.["x-access-token"];

  try {
    compareToken(token as string);

    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status?.(401).send(error);
    }
  }
}
