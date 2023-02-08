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

export const MatchListSchema = z.array(MatchSchema);

export const MatchIdlistSchema = z.array(z.string());

export type MatchIdList = z.infer<typeof MatchIdlistSchema>;

export type MatchList = z.infer<typeof MatchListSchema>;
