import z from "zod";

export const GetAccountByRiotIdSchema = z.object({
  gameName: z.string(),
  tagLine: z.string(),
});

export type GetAccountByRiotId = z.infer<typeof GetAccountByRiotIdSchema>;
