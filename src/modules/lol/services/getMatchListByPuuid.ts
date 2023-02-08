import { api } from "@app/services/api";
import { Lol } from "@app/schemas";
import { getMatchById } from "./getMatchById";

export const getMatchesByPuuid = async ({
  puuid,
}: Lol.RequestParams.GetMatchesByPuuid) => {
  try {
    const { data } = await api.get<Lol.Response.MatchIdList>(
      `/lol/match/v5/matches/by-puuid/${puuid}/ids`
    );

    const matches = await Promise.all(
      data.map(async (matchId) => await getMatchById({ matchId, puuid }))
    );

    return matches;
  } catch (error) {
    console.log("🚀 ~ error", error);
    return error;
  }
};
