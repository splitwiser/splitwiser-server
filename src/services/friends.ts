import { supabase } from "./supabase.js";

export async function listFriends(userId: string) {
  const { data, error } = await supabase.rpc("get_user_friends", {
    userid: userId,
  });
  if (error) return error;
  return data;
}

export async function listFriendsWithAmountDue(userId: string) {
  const { data, error } = await supabase.rpc("get_friends_with_due", {
    userid: userId,
  });
  if (error) return [];
  return data;
}

export async function listFriendsWithAmountPaid(userId: string) {
  const { data, error } = await supabase.rpc("get_friends_with_paid", {
    userid: userId,
  });
  if (error) return [];
  return data;
}

export async function listFriendsWithBalance(userId: string) {
  const { data, error } = await supabase.rpc("get_friends_and_amount_due", {
    user_id_param: userId,
  });
  if (error) return [];
  return data;
}
