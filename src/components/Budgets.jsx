import React, { useState } from 'react'
import { useVisualizerStore } from '../store/visualizer.store';

const Budgets = () => {
    const { categories, budgets, setBudgets } = useVisualizerStore();
    const [budgetForm, setBudgetForm] = useState({
        category: 'food',
        amount: ''
    });

    const handleBudgetSubmit = (e) => {
        if (e) e.preventDefault();
        if (!budgetForm.amount || isNaN(budgetForm.amount) || parseFloat(budgetForm.amount) <= 0) {
            return;
        }
        setBudgets(budgetForm);
        setBudgetForm({ category: 'food', amount: '' });
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Set Monthly Budgets</h2>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                value={budgetForm.category}
                                onChange={(e) => setBudgetForm({ ...budgetForm, category: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Budget Amount</label>
                            <input
                                type="number"
                                step="0.01"
                                value={budgetForm.amount}
                                onChange={(e) => setBudgetForm({ ...budgetForm, amount: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0.00"
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                type="button"
                                onClick={handleBudgetSubmit}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Set Budget
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Budgets</h3>
                <div className="space-y-3">
                    {categories.map(cat => (
                        <div key={cat.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium text-gray-900">{cat.name}</span>
                            <span className="text-lg font-bold text-gray-900">
                                ${budgets[cat.id] ? budgets[cat.id].toFixed(2) : '0.00'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Budgets