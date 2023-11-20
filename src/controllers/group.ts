import type { Request, Response } from "express";

import { listGroups } from "../services/group.js";

export async function listGroupsController(req: Request, res: Response) {
  const { memberId } = req.params;
  const groups: any = await listGroups(memberId)
  return res.status(200).json(groups)
}
