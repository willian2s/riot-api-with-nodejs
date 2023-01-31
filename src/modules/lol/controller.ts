import { Router } from "express";
import { AxiosError } from "axios";
import { validate } from "@app/middleware/validate";
import { Lol } from "@app/schemas";
import { getMatchesByPuuid } from "./services/getMatchListByPuuid";

require("express-async-errors");

export const LolController = Router();

LolController.get(
  "/match/matches/by-puuid/:puuid",
  validate({
    params: Lol.RequestParams.GetMatchesByPuuidSchema,
    response: Lol.Response.MatchlistSchema,
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
