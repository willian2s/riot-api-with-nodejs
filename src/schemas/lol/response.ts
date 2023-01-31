import z from "zod";

export const MatchlistSchema = z.array(z.string());

export type MatchList = z.infer<typeof MatchlistSchema>;
