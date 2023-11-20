import { supabase } from "./supabase.js";

/**
 * Return total amount of money paid by a certain user.
 * @param payerId the user ID
 * @param groupId Optional group ID to return total paid in a certain
 * group
 * @returns number
 */
export async function getTotalAmountPaid(
  payerId: number,
  groupId: number | null = null,
) {
  const { data, error } = await supabase.rpc("get_total_amount_paid", {
    payer_id: payerId,
    group_id: groupId,
  });
  if (error) return null;
  return data;
}

/**
 * Return total amount of money due by a certain user.
 * @param payerId the user ID
 * @param groupId Optional group ID to return total due in a certain
 * group
 * @returns number
 */
export async function getTotalAmountDue(
  payee: number,
  groupId: number | null = null,
) {
  const { data, error } = await supabase.rpc("get_total_amount_due", {
    payee_id: payee,
    group_id: groupId,
  });
  if (error) return null;
  return data;
}

/**
 * Calculate remaining balance based on total amount paid
 * and total amount due by a given user (optional: In an given group)
 * @param payerId the user ID
 * @param groupId Optional group ID to return total paid in a certain
 * group
 * @returns number
 */
export async function getUserBalance(
  userId: number,
  groupId: number | null = null,
) {
  const [amountPaid, amountDue] = await Promise.all([
    getTotalAmountPaid(userId, groupId),
    getTotalAmountDue(userId, groupId),
  ]);
  if (typeof amountPaid === "number" || typeof amountDue === "number")
    return amountPaid - amountDue;
  return null;
}
