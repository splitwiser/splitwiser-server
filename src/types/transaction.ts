export type TxnBody = {
  name: string;
  amount: number;
};

export type TxnPayerPayeeBody = {
  transactionId: number;
  payerId: number;
  payeeId: number;
  splitAmount: number;
};

export type ExpenseBody = Omit<TxnBody & TxnPayerPayeeBody, "transactionId">;
