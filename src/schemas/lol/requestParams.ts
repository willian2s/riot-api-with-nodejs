import z from "zod";

export const GetMatchesByPuuidSchema = z.object({
  puuid: z.string(),
});

export type GetMatchesByPuuid = z.infer<typeof GetMatchesByPuuidSchema>;
