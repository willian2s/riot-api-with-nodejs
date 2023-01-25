import type { Boom } from "@hapi/boom";
import { badRequest } from "@hapi/boom";
import type { RequestHandler } from "express";
import type { z } from "zod";
import { ZodError } from "zod";

export type Validation<Params, Response, Body, Query> = {
  body?: z.ZodSchema<Body>;
  params?: z.ZodSchema<Params>;
  query?: z.ZodSchema<Query>;
  response?: z.ZodSchema<Response>;
};

export type ValidatedHandler<V> = V extends Validation<
  infer Params,
  infer Response,
  infer Body,
  infer Query
>
  ? RequestHandler<Params, Response, Body, Query>
  : never;

export type RequestError = {
  message: string;
};

export type MaybeBoom<T> = Boom | T;

/**
 *
 * @param schema the schema to validate req.body
 *
 * ```
 * import z from 'zod';
 *
 * const BodySchema = z.object({ name: z.string() });
 * const ParamsSchema = z.object({ id: z.string() });
 * const QuerySchema = z.object({ skip: z.number() });
 *
 * app.get('/', validate({ body: BodySchema, params: ParamsSchema, query: QuerySchema }), (req, res) => {
 *  // if req.body, req.params and req.query is successfully validated, we will have the correct type for them
 *  // otherwise, it will return a "Bad Request" response.
 * })
 * ```
 */
export const validate = <
  Params = unknown,
  Response = unknown,
  Body = unknown,
  Query = unknown
>(
  validation: Validation<Params, MaybeBoom<Response>, Body, Query>
): ValidatedHandler<typeof validation> =>
  function (req, res, next) {
    try {
      if (validation.body) {
        validation.body.parse(req.body);
      }
      if (validation.query) {
        validation.query.parse(req.query);
      }
      if (validation.params) {
        validation.params.parse(req.params);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw badRequest(error.message);
      }
      next(error);
    }
  };
