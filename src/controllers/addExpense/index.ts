import type { Request, Response } from "express";

import { createExpense } from "../../services/transaction.js";
import {
  createFailureResponse,
  createSuccessResponse,
} from "@9akashnp8/express-response-module";

export async function addExpenseController(req: Request, res: Response) {
  const expenseDetails = req.body;
  const result = await createExpense(expenseDetails);
  if (!result) {
    return createFailureResponse(res, 500, "expense creation failed");
  }
  return createSuccessResponse(res, 200, result);
}
