import { Router } from "express";
import { AccountController } from "@app/modules/account";

export const router = Router();

router.use("/account", AccountController);
