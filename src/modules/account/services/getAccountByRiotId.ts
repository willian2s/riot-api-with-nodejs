import { Account } from "@app/schemas";
import { api } from "@app/services/api";

export const getAccountByRiotId = async ({
  gameName,
  tagLine,
}: Account.RequestParams.GetAccountByRiotId): Promise<Account.Response.GetAccountByRiotId> => {
  const { data } = await api.get(
    `/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`
  );

  const dataParse = Account.Response.GetAccountByRiotIdSchema.parse(data);

  return dataParse;
};
