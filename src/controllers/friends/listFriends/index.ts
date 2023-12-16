import type { Request, Response } from "express";
import { createSuccessResponse } from "@9akashnp8/express-response-module";

import {
  listFriends,
  listFriendsWithBalance,
} from "../../../services/friends.js";

export default async function listFriendsController(
  req: Request,
  res: Response,
) {
  let friends = [];
  const { userId } = req.params;
  const { withBalance } = req.query;
  if (withBalance === "True" || withBalance === "true") {
    friends = await listFriendsWithBalance(userId!);
  } else {
    friends = await listFriends(userId!);
  }
  return createSuccessResponse(res, 200, friends);
}
