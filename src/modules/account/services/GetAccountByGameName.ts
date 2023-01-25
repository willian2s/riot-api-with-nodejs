import { riotApi } from "@app/services";
import { Account } from "@app/schemas";

export const getAccountByGameName = async ({
  gameName,
  tagLine,
}: Account.RequestQuery.GetAccountByGameName): Promise<Account.Response.GetAccountByGameName> => {
  const { data } = await riotApi.get(
    `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`
  );

  const dataParse = Account.Response.GetAccountByGameNameSchema.parse(data);

  return dataParse;
};
