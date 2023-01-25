import { riotApi } from "@app/services";
import { Account } from "@app/schemas";
import { AxiosError } from "axios";

export const getAccountByRiotId = async ({
  gameName,
  tagLine,
}: Account.RequestParams.GetAccountByRiotId): Promise<
  Account.Response.GetAccountByRiotId | Error
> => {
  try {
    const { data } = await riotApi.get(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`
    );
    console.log("🚀 ~ data", data);

    const dataParse = Account.Response.GetAccountByRiotIdSchema.parse(data);

    return dataParse;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return error as Error;
  }
};
