import React from 'react'
import { useVisualizerStore } from '../store/visualizer.store';
import { Edit3, Trash2 } from 'lucide-react';

const Transactions = () => {
    const { transactions, categories, handleEdit, handleDelete} = useVisualizerStore();

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">All Transactions</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Description</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(transaction => (
                                <tr key={transaction.id} className="border-b border-gray-100">
                                    <td className="py-3 px-4 text-gray-900">{transaction.date}</td>
                                    <td className="py-3 px-4 text-gray-900">{transaction.description}</td>
                                    <td className="py-3 px-4 text-gray-600">
                                        {categories.find(c => c.id === transaction.category)?.name}
                                    </td>
                                    <td className="py-3 px-4 text-gray-900 font-medium">${transaction.amount.toFixed(2)}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEdit(transaction)}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <Edit3 className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(transaction.id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Transactions