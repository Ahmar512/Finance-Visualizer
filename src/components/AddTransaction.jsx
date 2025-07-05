import React, { useEffect, useState } from 'react'
import { useVisualizerStore } from '../store/visualizer.store';

const AddTransaction = () => {

    const { categories, addTransaction, editingTransaction, setEditingTransaction, errors, setErrors } = useVisualizerStore();


    const [formData, setFormData] = useState({
        amount: '',
        date: '',
        description: '',
        category: 'food'
    });
    useEffect(()=>{
        if(editingTransaction){
        setFormData({
            amount: editingTransaction.amount.toString(),
            date: editingTransaction.date,
            description: editingTransaction.description,
            category: editingTransaction.category
        });
    }
    },[editingTransaction]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.amount || isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
            newErrors.amount = 'Amount must be a positive number';
        }
        if (!formData.date) {
            newErrors.date = 'Date is required';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        if (!validateForm()) return;

        const transaction = {
            id: editingTransaction ? editingTransaction.id : Date.now(),
            amount: parseFloat(formData.amount),
            date: formData.date,
            description: formData.description.trim(),
            category: formData.category
        };

        addTransaction(transaction);

        setFormData({ amount: '', date: '', description: '', category: 'food' });
        setErrors({});
    };




    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
            </h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <input
                        type="number"
                        step="0.01"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.amount ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="0.00"
                    />
                    {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.date ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input
                        type="text"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Transaction description"
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    >
                        {categories.map(cat => (
                            <option className='max-sm:text-sm' key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex space-x-3">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
                    </button>
                    {editingTransaction && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingTransaction(null);
                                setFormData({ amount: '', date: '', description: '', category: 'food' });
                                // setErrors({});
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AddTransaction