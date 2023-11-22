import type { Request, Response } from "express";

import { getUserFriendBalance } from "../services/user.js";

export async function getUserFriendBalanceController(
  req: Request,
  res: Response,
) {
  const { userId, friendId } = req.params;
  const balance = await getUserFriendBalance(userId!, friendId!);
  return res.status(200).json({ balance });
}
