import express from "express";
import { listGroupsController } from "./controllers/group.js";
import {
  getFriendBalanceController,
  listFriendsController,
  listFriendsTransactionsController,
} from "./controllers/user.js";

export const router = express.Router();

router.get("/group", listGroupsController);
router.get("/users/:userId/friends", listFriendsController);
router.get(
  "/users/:userId/friends/:friendId/transactions",
  listFriendsTransactionsController,
);
router.get(
  "/users/:userId/friends/:friendId/balance",
  getFriendBalanceController,
);
