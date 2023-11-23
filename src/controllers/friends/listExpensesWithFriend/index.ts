import type { Request, Response } from "express";
import { createSuccessResponse } from "@9akashnp8/express-response-module";

import { listExpensesWithFriend } from "../../../services/user.js";

export async function listExpensesWithFriendController(
  req: Request,
  res: Response,
) {
  const { userId, friendId } = req.params;
  const transactions = await listExpensesWithFriend(userId!, friendId!);
  return createSuccessResponse(res, 200, transactions);
}
