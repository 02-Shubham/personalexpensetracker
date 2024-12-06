export type TransactionType = 'income' | 'expense' | 'loan';

export type LoanDirection = 'given' | 'taken';
export type Category = {
  id: string;
  name: string;
  icon: string;
};

export type Transaction = {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  description: string;
  date: string;
  personName?: string; // For loans
  loanDirection?: LoanDirection;
};

export type FinancialState = {
  balance: number;
  transactions: Transaction[];
};