import { Router } from "express";
import { getAccountByGameName } from "@app/modules/account/services";
import { validate } from "@app/middleware/validate";
import { Account } from "@app/schemas";

require("express-async-errors");

export const AccountController = Router();

AccountController.get(
  "/by-riot-id",
  validate({
    query: Account.RequestQuery.GetAccountByGameNameSchema,
    response: Account.Response.GetAccountByGameNameSchema,
  }),
  async (req, res) => res.json(await getAccountByGameName(req.query))
);
