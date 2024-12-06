import React, { useState, useEffect } from 'react';
import { Transaction } from './types/finance';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { Summary } from './components/Summary';
import { saveTransactions, loadTransactions } from './utils/storage';

export function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    return loadTransactions();
  });

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: crypto.randomUUID(),
    };
    setTransactions((prev) => [transaction, ...prev]);
  };

  const handleDeleteTransaction = (transactionId: string) => {
    setTransactions((prev) => {
      const transaction = prev.find((t) => t.id === transactionId);
      if (transaction?.type === 'loan') {
        // Add a settlement transaction when a loan is deleted
        const settlementTransaction: Transaction = {
          id: crypto.randomUUID(),
          type: 'income',
          amount: transaction.amount,
          category: 'settlement',
          description: `Settlement for loan ${transaction.loanDirection === 'given' ? 'from' : 'to'} ${transaction.personName}`,
          date: new Date().toISOString(),
        };
        
        // If it was a given loan, add positive settlement
        // If it was a taken loan, add negative settlement
        if (transaction.loanDirection === 'given') {
          return prev.filter((t) => t.id !== transactionId).concat(settlementTransaction);
        } else {
          settlementTransaction.type = 'expense';
          return prev.filter((t) => t.id !== transactionId).concat(settlementTransaction);
        }
      }
      return prev.filter((t) => t.id !== transactionId);
    });
  };

  return (
    <div className="min-h-screen bg-teal-400">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif text-center font-bold text-slate-900 mb-10">
           Shubham's Personal Finance Tracker
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Summary transactions={transactions} />
            <TransactionList 
              transactions={transactions} 
              onDeleteTransaction={handleDeleteTransaction}
            />
          </div>
          
          <div className="lg:col-span-1">
            <TransactionForm onAddTransaction={handleAddTransaction} />
          </div>
        </div>
      </div>
    </div>
  );
}