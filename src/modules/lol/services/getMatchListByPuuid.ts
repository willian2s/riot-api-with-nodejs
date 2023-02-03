import axios from "axios";

import { RIOT_API_KEY } from "@app/config";
import { Lol } from "@app/schemas";

export const getMatchesByPuuid = async ({
  puuid,
}: Lol.RequestParams.GetMatchesByPuuid) => {
  const { data } = await axios.get(
    `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`,
    {
      headers: {
        "X-Riot-Token": RIOT_API_KEY,
      },
    }
  );

  return data;
};
