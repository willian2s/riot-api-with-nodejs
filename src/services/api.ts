import axios from "axios";

import { RIOT_API_KEY } from "@app/config";

export const api = axios.create({
  baseURL: "https://americas.api.riotgames.com",
  headers: {
    "X-Riot-Token": RIOT_API_KEY,
  },
});
