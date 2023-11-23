import type { Request, Response } from "express";
import { createSuccessResponse } from "@9akashnp8/express-response-module";

import { getBalanceWithFriend } from "../../../services/user.js";

export async function getBalanceWithFriendController(
  req: Request,
  res: Response,
) {
  const { userId, friendId } = req.params;
  const balance = await getBalanceWithFriend(userId!, friendId!);
  return createSuccessResponse(res, 200, { balance });
}
