import { supabase } from "./supabase.js";

export async function listFriends(userId: string) {
  const { data, error } = await supabase.rpc("get_user_friends", {
    userid: userId,
  });
  if (error) return error;
  return data;
}

export async function listExpensesWithFriend(payerId: string, payeeId: string) {
  const { data, error } = await supabase.rpc("get_friends_transactions", {
    payerid: payerId,
    payeeid: payeeId,
  });
  if (error) return error;
  return data;
}

export async function getPayerPayeeBalance(payerId: string, payeeId: string) {
  const { data, error } = await supabase.rpc("get_balance_due", {
    payerid: payerId,
    payeeid: payeeId,
  });
  if (error) console.error(error); // eslint-disable-line no-console
  return data;
}

export async function getBalanceWithFriend(userId: string, friendId: string) {
  const [paid, due] = await Promise.all([
    getPayerPayeeBalance(userId, friendId),
    getPayerPayeeBalance(friendId, userId),
  ]);
  if (typeof paid === "number" && typeof due === "number") {
    return paid - due;
  }
  return null;
}
