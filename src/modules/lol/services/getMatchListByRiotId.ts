import { api } from "@app/services/api";
import { Account, Lol } from "@app/schemas";
import { getMatchById } from "./getMatchById";
import { getAccountByRiotId } from "@app/modules/account/services";

export const getMatchesByPuuid = async ({
  gameName,
  tagLine,
}: Account.RequestParams.GetAccountByRiotId) => {
  const { puuid } = await getAccountByRiotId({ gameName, tagLine });

  const { data } = await api.get<Lol.Response.MatchIdList>(
    `/lol/match/v5/matches/by-puuid/${puuid}/ids`
  );

  const matches = await Promise.all(
    data.map(async (matchId) => await getMatchById({ matchId, puuid }))
  );

  return matches;
};
