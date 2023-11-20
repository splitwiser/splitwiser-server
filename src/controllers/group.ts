import type { Request, Response } from "express";
import type { Group } from "../types/group.js";
import { listGroups } from "../services/group.js";

export async function listGroupsController(req: Request, res: Response) {
  const { memberId } = req.params;
  const groups: Group[] = await listGroups(memberId);
  return res.status(200).json(groups);
}
