import axios from "axios";
import { RIOT_API_KEY } from "@app/config";

export const riotApi = axios.create({
  headers: {
    "X-Riot-Token": RIOT_API_KEY,
  },
});
