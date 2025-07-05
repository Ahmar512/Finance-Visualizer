import toast from "react-hot-toast";
import { create } from "zustand";

export const useVisualizerStore = create((set, get) => ({
    transactions: [],
    budgets: {},
    currentView: 'dashboard',
    editingTransaction: null,
    errors: {},
    categories: [
        { id: 'food', name: 'Food & Dining', color: '#8884d8' },
        { id: 'transport', name: 'Transportation', color: '#82ca9d' },
        { id: 'shopping', name: 'Shopping', color: '#ffc658' },
        { id: 'bills', name: 'Bills & Utilities', color: '#ff7c7c' },
        { id: 'entertainment', name: 'Entertainment', color: '#8dd1e1' },
        { id: 'health', name: 'Health & Fitness', color: '#d084d0' },
        { id: 'other', name: 'Other', color: '#87d068' }
    ],
    setCurrentView: (view) => {set({ currentView: view })},
    handleEdit: (transaction) => {
        console.log('Editing transaction:', transaction);
        set({editingTransaction: transaction, currentView: 'add transaction' });
        
    },
    handleDelete: (id) =>{
        toast.success('Transaction deleted successfully!');
        set((state) => ({
            transactions: state.transactions.filter(t => t.id !== id)
        }));
    },
    setEditingTransaction: (transaction) => {set({ editingTransaction: transaction })},
    addTransaction : (transaction) => {
        
        if (get().editingTransaction) {
            
            set((state) => ({
                transactions: state.transactions.map(t => t.id === transaction.id ? transaction : t),
                editingTransaction: null
            }));
            toast.success('Transaction updated successfully!');

        } else {
            
            set((state) => ({
                transactions: [...state.transactions, transaction],
                editingTransaction: null
            }));
            toast.success('Transaction added successfully!');
        }
    },
    setBudgets: (newBudgets) =>{
        
        set({ budgets: { ...get().budgets, [newBudgets.category]: parseFloat(newBudgets.amount) } });
        toast.success('Budget set successfully!');
    },
    setErrors: (error) =>{
        if(Object.keys(error).length === 0) set({ errors: {} }); 
        set({ errors: { ...get().errors, ...error } });
    }
}))