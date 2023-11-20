import type { Request, Response } from "express";
import type { Group } from "../types/group.js";

export async function listGroups(req: Request, res: Response) {
  const groups: Group[] = [
    {
      id: 1,
      name: 'Group 1'
    },
    {
      id: 2,
      name: 'Group 2'
    }
  ]
  return res.status(200).json(groups)
}
