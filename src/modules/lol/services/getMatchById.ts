import { Lol } from "@app/schemas";
import { api } from "@app/services/api";

export const getMatchById = async ({
  matchId,
}: Lol.RequestParams.GetMatchById) => {
  const { data } = await api.get(`/lol/match/v5/matches/${matchId}`);

  return data;
};
