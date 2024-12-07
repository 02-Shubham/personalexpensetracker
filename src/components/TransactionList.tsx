import React from 'react';
import { Transaction } from '../types/finance';
import { categories } from '../data/categories';
import { formatCurrency } from '../utils/format';
import * as Icons from 'lucide-react';
import { Trash2 } from 'lucide-react';

type TransactionListProps = {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
};

export function TransactionList({ transactions, onDeleteTransaction }: TransactionListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-serif font-semibold">Recent Transactions</h2>
      <div className="space-y-2 ">
        {transactions.map((transaction) => {
          const category = categories.find((c) => c.id === transaction.category);
          const Icon = Icons[category?.icon as keyof typeof Icons];

          return (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-white shadow-[8px_8px_0px_rgba(0,0,0,0.3)] "
            >
              <div className="flex items-center gap-6">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'income'
                    ? 'bg-green-100 text-green-600'
                    : transaction.type === 'expense'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-blue-100 text-blue-600'
                }`}>  
                  {Icon && <Icon size={20} />}
                </div>
                <div>
                  <p className="font-bold font-serif">{transaction.description}</p>
                  <p className="text-sm font-serif text-gray-500">
                    {new Date(transaction.date).toLocaleDateString('en-IN')}
                    {transaction.personName && (
                      <> • {transaction.personName} ({transaction.loanDirection === 'given' ? 'Given to' : 'Taken from'})</>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`font-semibold font-serif ${
                    transaction.type === 'income' || (transaction.type === 'loan' && transaction.loanDirection === 'taken')
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {transaction.type === 'income' || (transaction.type === 'loan' && transaction.loanDirection === 'taken')
                    ? '+'
                    : '-'}{' '}
                  {formatCurrency(transaction.amount)}
                </span>
                  <button
                    onClick={() => onDeleteTransaction(transaction.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete loan and settle"
                  >
                    <Trash2 size={18} />
                  </button>
              </div>
            </div>
          );
        })}
          {transactions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No transactions yet. Add your first transaction using the form.
          </div>
        )}
      </div>
    </div>
  );
}