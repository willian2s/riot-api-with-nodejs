import z from "zod";

export const MatchMetadataSchema = z.object({
  dataVersion: z.string(),
  matchId: z.string(),
  participants: z.array(z.string()),
});

export const MatchParticipantsSchema = z.object({
  assists: z.number(),
  championName: z.string(),
  deaths: z.number(),
  doubleKills: z.number(),
  kills: z.number(),
  lane: z.string(),
  pentaKills: z.number(),
  puuid: z.string(),
  quadraKills: z.number(),
  summonerName: z.string(),
  tripleKills: z.number(),
  win: z.boolean(),
});

export const MatchInfoSchema = z.object({
  gameEndTimestamp: z.number(),
  gameId: z.number(),
  gameMode: z.string(),
  gameName: z.string(),
  gameStartTimestamp: z.number(),
  gameType: z.string(),
  mapId: z.number(),
  participants: z.array(MatchParticipantsSchema),
  tournamentCode: z.string(),
});

export const MatchSchema = z.object({
  metadata: MatchMetadataSchema,
  info: MatchInfoSchema,
});

export const StatsSchema = z.object({
  assists: z.number(),
  championName: z.string(),
  deaths: z.number(),
  kills: z.number(),
  doubleKills: z.number(),
  tripleKills: z.number(),
  quadraKills: z.number(),
  pentaKills: z.number(),
  win: z.boolean(),
  lane: z.string(),
  summonerName: z.string(),
});

export const UserMatchSchema = z.object({
  matchId: z.string(),
  stats: StatsSchema,
});

export const MatchListSchema = z.array(MatchSchema);

export const MatchIdlistSchema = z.array(z.string());

export const UserMatchesSchema = z.array(UserMatchSchema);

export type MatchIdList = z.infer<typeof MatchIdlistSchema>;

export type MatchList = z.infer<typeof MatchListSchema>;

export type UserMatches = z.infer<typeof UserMatchesSchema>;
