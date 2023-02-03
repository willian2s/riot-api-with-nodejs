import { Router } from "express";

import { AccountController } from "@app/modules/account";
import { LolController } from "@app/modules/lol";

export const router = Router();

router.use("/account", AccountController);
router.use("/lol", LolController);
