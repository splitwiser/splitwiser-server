import type { Request, Response } from "express";

import {
  getFriendsBalance,
  listFriends,
  listFriendsTransaction,
} from "../services/user.js";

export async function listFriendsController(req: Request, res: Response) {
  const { userId } = req.params;
  const friends = await listFriends(userId!);
  return res.status(200).json(friends);
}

export async function listFriendsTransactionsController(
  req: Request,
  res: Response,
) {
  const { userId, friendId } = req.params;
  const transactions = await listFriendsTransaction(userId!, friendId!);
  return res.status(200).json(transactions);
}

export async function getFriendBalanceController(req: Request, res: Response) {
  const { userId, friendId } = req.params;
  const balance = await getFriendsBalance(userId!, friendId!);
  return res.status(200).json({ balance });
}
