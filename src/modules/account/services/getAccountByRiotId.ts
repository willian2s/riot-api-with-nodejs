import axios from "axios";

import { Account } from "@app/schemas";
import { RIOT_PERSONAL_API_KEY } from "@app/config";

export const getAccountByRiotId = async ({
  gameName,
  tagLine,
}: Account.RequestParams.GetAccountByRiotId): Promise<Account.Response.GetAccountByRiotId> => {
  const { data } = await axios.get(
    `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
    {
      headers: {
        "X-Riot-Token": RIOT_PERSONAL_API_KEY,
      },
    }
  );

  const dataParse = Account.Response.GetAccountByRiotIdSchema.parse(data);

  return dataParse;
};
