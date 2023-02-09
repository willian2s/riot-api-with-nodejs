import { Router } from "express";
import { AxiosError } from "axios";

import { validate } from "@app/middleware/validate";
import { Account, Lol } from "@app/schemas";
import { getMatchesByPuuid } from "@app/modules/lol/services";

require("express-async-errors");

export const LolController = Router();

LolController.get(
  "/match/matches/riot-id/:gameName/:tagLine",
  validate({
    params: Account.RequestParams.GetAccountByRiotIdSchema,
    response: Lol.Response.UserMatchesSchema,
  }),
  async (req, res) => {
    try {
      res.json(await getMatchesByPuuid(req.params));
    } catch (error) {
      if (error instanceof AxiosError) {
        res
          .status(error?.response?.status as number)
          .json(error?.response?.data);
      }
    }
  }
);
