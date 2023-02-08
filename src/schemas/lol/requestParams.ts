import z from "zod";

export const GetMatchesByPuuidSchema = z.object({
  puuid: z.string(),
});

export const GetMatchById = z.object({
  matchId: z.string(),
  puuid: z.string(),
});

export type GetMatchesByPuuid = z.infer<typeof GetMatchesByPuuidSchema>;

export type GetMatchById = z.infer<typeof GetMatchById>;
