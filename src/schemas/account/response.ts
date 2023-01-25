import z from "zod";

export const GetAccountByGameNameSchema = z.object({
  gameName: z.string(),
  tagLine: z.string(),
  puuid: z.string(),
});

export type GetAccountByGameName = z.infer<typeof GetAccountByGameNameSchema>;
