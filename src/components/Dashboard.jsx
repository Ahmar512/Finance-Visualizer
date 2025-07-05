import React from 'react'
import { useVisualizerStore } from '../store/visualizer.store'
import { PlusCircle, Edit3, Trash2, DollarSign, TrendingUp, Target, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Dashboard = () => {
    const { transactions, budgets, categories } = useVisualizerStore();

    const getCurrentMonthExpenses = () => {
        const currentMonth = getCurrentMonth();
        return transactions.filter(t => t.date.startsWith(currentMonth));
    };

    const getCurrentMonth = () => {
        const now = new Date();
        return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
    };

    const getMonthlyExpenses = () => {
        const monthly = {};
        transactions.forEach(t => {
            const month = t.date.substring(0, 7);
            monthly[month] = (monthly[month] || 0) + t.amount;
        });
        return Object.entries(monthly).map(([month, amount]) => ({ month, amount }));
    };

    const getCategoryExpenses = () => {
        const categoryTotals = {};
        transactions.forEach(t => {
            categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
        });
        return categories.map(cat => ({
            name: cat.name,
            value: categoryTotals[cat.id] || 0,
            color: cat.color
        })).filter(item => item.value > 0);
    };

    const getBudgetComparison = () => {
        const currentMonth = getCurrentMonth();
        const currentExpenses = {};

        transactions.filter(t => t.date.startsWith(currentMonth)).forEach(t => {
            currentExpenses[t.category] = (currentExpenses[t.category] || 0) + t.amount;
        });

        return categories.map(cat => ({
            category: cat.name,
            budget: budgets[cat.id] || 0,
            actual: currentExpenses[cat.id] || 0,
            color: cat.color
        })).filter(item => item.budget > 0);
    };

    const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
    const currentMonthExpenses = getCurrentMonthExpenses();
    const currentMonthTotal = currentMonthExpenses.reduce((sum, t) => sum + t.amount, 0);


    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                            <p className="text-2xl font-bold text-gray-900">${totalExpenses.toFixed(2)}</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-blue-600" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">This Month</p>
                            <p className="text-2xl font-bold text-gray-900">${currentMonthTotal.toFixed(2)}</p>
                        </div>
                        <Calendar className="h-8 w-8 text-green-600" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Transactions</p>
                            <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-purple-600" />
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Expenses</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={getMonthlyExpenses()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
                            <Bar dataKey="amount" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={getCategoryExpenses()}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {getCategoryExpenses().map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Budget vs Actual */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget vs Actual (Current Month)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getBudgetComparison()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                        <Bar dataKey="budget" fill="#82ca9d" name="Budget" />
                        <Bar dataKey="actual" fill="#8884d8" name="Actual" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                    {transactions.slice(-5).reverse().map(transaction => (
                        <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">{transaction.description}</p>
                                <p className="text-sm text-gray-600">
                                    {categories.find(c => c.id === transaction.category)?.name} • {transaction.date}
                                </p>
                            </div>
                            <span className="text-lg font-bold text-red-600">${transaction.amount.toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard