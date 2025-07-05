import { useState } from 'react'
import NavButton from './components/NavButton'
import { useVisualizerStore } from './store/visualizer.store'
import { PlusCircle, Edit3, Trash2, DollarSign, TrendingUp, Target, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Dashboard from './components/DashBoard';
import Transactions from './components/Transactions';
import AddTransaction from './components/AddTransaction';
import Budgets from './components/Budgets';
import { Toaster } from 'react-hot-toast';


function App() {
  const {currentView, transactions} = useVisualizerStore();


  const getCurrentMonthExpenses = () => {
    const currentMonth = getCurrentMonth();
    return transactions.filter(t => t.date.startsWith(currentMonth));
  };

  const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
  };

  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
  const currentMonthExpenses = getCurrentMonthExpenses();
  const currentMonthTotal = currentMonthExpenses.reduce((sum, t) => sum + t.amount, 0);
  

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Personal Finance Visualizer</h1>
          <nav className="flex space-x-4 max-sm:space-x-2 flex-wrap">
            <NavButton text="Dashboard" />
            <NavButton text="Transactions" />
            <NavButton text="Add Transaction" />
            <NavButton text="Budgets" />
          </nav>
        </header>
        {currentView === 'dashboard' && (<Dashboard />)}
        {currentView === 'transactions' && (<Transactions />)}
        {currentView === 'add transaction' && (<AddTransaction />)}
        {currentView === 'budgets' && (<Budgets />)}
      </div>

      <Toaster 
        position="top-center"
        reverseOrder={false}
      />
    </div>  
  )
}

export default App
