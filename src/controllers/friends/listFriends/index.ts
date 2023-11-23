import type { Request, Response } from "express";
import { createSuccessResponse } from "@9akashnp8/express-response-module";

import { listFriends } from "../../../services/user.js";

export default async function listFriendsController(
  req: Request,
  res: Response,
) {
  const { userId } = req.params;
  const friends = await listFriends(userId!);
  return createSuccessResponse(res, 200, friends);
}
