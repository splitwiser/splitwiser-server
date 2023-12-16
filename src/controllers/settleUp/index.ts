import type { Request, Response } from "express";

import { settleUp } from "../../services/transaction.js";
import {
  createFailureResponse,
  createSuccessResponse,
} from "@9akashnp8/express-response-module";

export async function settleUpController(req: Request, res: Response) {
  const { userId, friendId } = req.params;
  const { amount } = req.body;
  const result = await settleUp(Number(userId!), Number(friendId!), amount);
  if (!result) return createFailureResponse(res);
  return createSuccessResponse(res, 200, result);
}
