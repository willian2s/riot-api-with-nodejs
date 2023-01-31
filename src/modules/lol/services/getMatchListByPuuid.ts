import { Lol } from "@app/schemas";
import { riotApi } from "@app/services";

export const getMatchesByPuuid = async ({
  puuid,
}: Lol.RequestParams.GetMatchesByPuuid) => {
  const { data } = await riotApi.get(
    `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`
  );

  return data;
};
