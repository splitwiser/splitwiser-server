import { supabase } from "./supabase.js";

import type {
  ExpenseBody,
  TxnBody,
  TxnPayerPayeeBody,
} from "../types/transaction.js";

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

/**
 * Insert a regular "Transaction" record. Ensure to create
 * respected "Payer Payee" record using service: createTxnPayerPayeeRecord
 * @param details
 * @returns
 */
export async function createTxn(details: TxnBody) {
  const { data, error } = await supabase
    .from("transaction")
    .insert({
      name: details.name,
      amount: details.amount,
    })
    .select("id");
  if (error) {
    return null;
  }
  return data;
}

/**
 * Insert "Payer Payee" record for a given Transaction
 */
export async function createTxnPayerPayeeRecord(details: TxnPayerPayeeBody) {
  const { data, error } = await supabase
    .from("transaction_payer_payee")
    .insert({
      transaction_id: details.transactionId,
      payer: details.payerId,
      payee: details.payeeId,
      split_amount: details.splitAmount,
    })
    .select("id");
  if (error) {
    return null;
  }
  return data;
}

/**
 * Create an expense. Involves creation of both "Transaction" and "Transaction Payer
 * Payee" record.
 */
export async function createExpense(
  details: ExpenseBody,
): Promise<{ id: string } | null> {
  const txnBody = { name: details.name, amount: details.amount };
  const data = await createTxn(txnBody);
  const txnId = data && data[0]?.id;
  if (txnId) {
    const txnPayerPayeeBody = {
      transactionId: txnId,
      payerId: details.payerId,
      payeeId: details.payeeId,
      splitAmount: details.amount,
    };
    const result = await createTxnPayerPayeeRecord(txnPayerPayeeBody);
    const id = result && result[0]?.id;
    return { id };
  }
  return null;
}

/**
 * Settles up balance b/w a user and his friend. Essentially created
 * an expense with the amount specified.
 * @param userId
 * @param friendId
 * @param amount
 * @returns
 */
export async function settleUp(
  userId: number,
  friendId: number,
  amount: number,
) {
  const expenseDetails = {
    name: `${userId} Settle up ${friendId}`,
    amount,
    payerId: userId,
    payeeId: friendId,
    splitAmount: amount,
  };
  const result = await createExpense(expenseDetails);
  return result;
}
