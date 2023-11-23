import express from "express";
import { listGroupsController } from "./controllers/group.js";

import listFriendsController from "./controllers/friends/listFriends/index.js";
import { listExpensesWithFriendController } from "./controllers/friends/listExpensesWithFriend/index.js";
import { getBalanceWithFriendController } from "./controllers/friends/getBalanceWithFriend/index.js";

export const router = express.Router();

router.get("/group", listGroupsController);
router.get("/users/:userId/friends", listFriendsController);
router.get(
  "/users/:userId/friends/:friendId/expenses",
  listExpensesWithFriendController,
);
router.get(
  "/users/:userId/friends/:friendId/balance",
  getBalanceWithFriendController,
);
