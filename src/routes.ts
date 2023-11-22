import express from "express";
import { listGroupsController } from "./controllers/group.js";
import { getUserFriendBalanceController } from "./controllers/user.js";

export const router = express.Router();

router.get("/group", listGroupsController);
router.get(
  "/users/:userId/friends/:friendId/balance",
  getUserFriendBalanceController,
);
