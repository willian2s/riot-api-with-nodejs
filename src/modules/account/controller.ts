import { Router } from "express";
import { getAccountByRiotId } from "@app/modules/account/services";
import { validate } from "@app/middleware/validate";
import { Account } from "@app/schemas";
import { AxiosError } from "axios";

require("express-async-errors");

export const AccountController = Router();

AccountController.get(
  "/by-riot-id/:gameName/:tagLine",
  validate({
    params: Account.RequestParams.GetAccountByRiotIdSchema,
    response: Account.Response.GetAccountByRiotIdSchema,
  }),
  async (req, res) => {
    try {
      res.json(await getAccountByRiotId(req.params));
    } catch (error) {
      if (error instanceof AxiosError) {
        res
          .status(error?.response?.status as number)
          .json(error?.response?.data);
      }
    }
  }
);
