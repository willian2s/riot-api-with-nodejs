import { Lol } from "@app/schemas";
import { api } from "@app/services/api";

export const getMatchById = async ({
  matchId,
  puuid,
}: Lol.RequestParams.GetMatchById) => {
  const { data } = await api.get(`/lol/match/v5/matches/${matchId}`);

  const match = Lol.Response.MatchSchema.parse(data);

  const stats = match.info.participants
    .filter((participant) => participant.puuid === puuid)
    .map(
      ({
        assists,
        championName,
        deaths,
        kills,
        doubleKills,
        tripleKills,
        quadraKills,
        pentaKills,
        win,
        lane,
        summonerName,
        puuid,
      }) => ({
        assists,
        championName,
        deaths,
        kills,
        doubleKills,
        tripleKills,
        quadraKills,
        pentaKills,
        win,
        lane,
        summonerName,
      })
    )[0];

  return {
    matchId,
    stats,
  };
};
