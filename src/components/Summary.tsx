// import React from 'react';
import { Transaction } from '../types/finance';
import { formatCurrency } from '../utils/format';
import { WalletCards, TrendingUp, TrendingDown, Users } from 'lucide-react';

type SummaryProps = {
  transactions: Transaction[];
};

export function Summary({ transactions }: SummaryProps) {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const loansGiven = transactions
    .filter((t) => t.type === 'loan' && t.loanDirection === 'given')
    .reduce((sum, t) => sum + t.amount, 0);

  const loansTaken = transactions
    .filter((t) => t.type === 'loan' && t.loanDirection === 'taken')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses - loansGiven + loansTaken;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white p-6 border border-gray-900 shadow-[8px_8px_0px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-green-100 rounded-full">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-lg font-serif font-semibold text-slate-900">Total Income</p>
            <p className="text-xl font-serif font-semibold">{formatCurrency(totalIncome)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 border border-gray-900 shadow-[8px_8px_0px_rgba(0,0,0,0.4)]" >
        <div className="flex items-center gap-4">
          <div className="p-2 bg-red-100 rounded-full">
            <TrendingDown className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-lg font-serif font-semibold text-slate-900">Total Expenses</p>
            <p className="text-xl font-serif font-semibold">{formatCurrency(totalExpenses)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 border border-gray-900 shadow-[8px_8px_0px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-100 rounded-full">
            <WalletCards className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-lg font-serif font-semibold text-slate-900">Current Balance</p>
            <p className="text-xl font-serif font-semibold">{formatCurrency(balance)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 border border-gray-900 shadow-[8px_8px_0px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-purple-100 rounded-full">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-lg font-serif font-semibold text-slate-900">Net Loans</p>
            <p className="text-xl font-serif font-semibold">{formatCurrency(loansGiven - loansTaken)}</p>
            <div className="text-xs font-serif text-gray-500 mt-1">
              Given: {formatCurrency(loansGiven)} • Taken: {formatCurrency(loansTaken)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}