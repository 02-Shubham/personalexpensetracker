import React, { useState } from 'react';
import { categories } from '../data/categories';
import { TransactionType, Transaction, LoanDirection } from '../types/finance';
import { PlusCircle } from 'lucide-react';

type TransactionFormProps = {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
};

export function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0].id);
  const [description, setDescription] = useState('');
  const [personName, setPersonName] = useState('');
  const [loanDirection, setLoanDirection] = useState<LoanDirection>('given');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTransaction({
      amount: parseFloat(amount),
      type,
      category,
      description,
      date: new Date().toISOString(),
      personName: type === 'loan' ? personName : undefined,
      loanDirection: type === 'loan' ? loanDirection : undefined,
    });
    setAmount('');
    setDescription('');
    setPersonName('');
  };

  return (<>
  <h2 className="text-xl font-serif font-semibold">Add your Transactions</h2>
  <form onSubmit={handleSubmit} className="bg-white p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.4)]">
      <div className="space-y-4">
        <div className="flex gap-4">
          {(['income', 'expense', 'loan'] as TransactionType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`px-4 py-2 shadow-[4px_4px_0px_rgba(0,0,0,0.4)] capitalize ${
                type === t
                  ? 'bg-teal-200 text-black font-serif shadow-none'
                  : 'bg-teal-200 text-gray-900 font-serif'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div>
          <label className="block text-sm font-bold font-serif text-gray-700">Amount</label>
          <input
            type="number"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className=" border border-gray-300 text-teal-900 text-sm  block w-full p-2.5 dark:bg-teal-200 dark:border-gray-600 dark:placeholder-gray-900 dark:text-grey-900"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-serif font-bold text-gray-700">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className=" border border-gray-300 text-teal-900 text-sm  block w-full p-2.5 dark:bg-teal-200 dark:border-gray-600 dark:placeholder-gray-900 dark:text-grey-900"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-serif font-bold text-gray-700">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className=" border border-gray-300 text-teal-900 text-sm  block w-full p-2.5 dark:bg-teal-200 dark:border-gray-600 dark:placeholder-gray-900 dark:text-grey-900"
            placeholder="Enter description"
          />
        </div>

        {type === 'loan' && (
          <>
            <div>
              <label className="block text-sm font-serif font-bold text-gray-700">
                Person Name
              </label>
              <input
                type="text"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                className="border border-gray-300 text-teal-900 text-sm  block w-full p-2.5 dark:bg-teal-200 dark:border-gray-600 dark:placeholder-gray-900 dark:text-grey-900"
                placeholder="Enter person name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-serif font-bold text-gray-700 mb-2">
                Loan Type
              </label>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-teal-500"
                    name="loanDirection"
                    value="given"
                    checked={loanDirection === 'given'}
                    onChange={(e) => setLoanDirection(e.target.value as LoanDirection)}
                  />
                  <span className="ml-2 font-serif">Given</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-teal-500"
                    name="loanDirection"
                    value="taken"
                    checked={loanDirection === 'taken'}
                    onChange={(e) => setLoanDirection(e.target.value as LoanDirection)}
                  />
                  <span className="ml-2 font-serif">Taken</span>
                </label>
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-teal-400 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors"
        >
          <PlusCircle size={18} />
          Add Transaction
        </button>
      </div>
    </form>
  </>
    
  );
}