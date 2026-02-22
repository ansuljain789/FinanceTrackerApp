import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { PiggyBank, Edit3 } from 'lucide-react';
import '../styles/Budgets.css';

const Budgets = () => {
    const [budgets, setBudgets] = useState([]);
    const [newBudget, setNewBudget] = useState({
        category: 'Groceries',
        amount: '',
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
    });
    const [loading, setLoading] = useState(true);

    const categories = ['Groceries', 'Utilities', 'Entertainment', 'Dining Out', 'Transportation', 'Clothing', 'Other'];

    const fetchBudgets = async () => {
        try {
            const res = await api.get(`/budgets?month=${new Date().getMonth() + 1}&year=${new Date().getFullYear()}`);
            setBudgets(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    const handleSetBudget = async (e) => {
        e.preventDefault();
        try {
            await api.post('/budgets', newBudget);
            setNewBudget({ ...newBudget, amount: '' });
            fetchBudgets();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="loading">Loading Budgets...</div>;

    return (
        <div className="budgets-container">
            <header className="page-header">
                <h1>Monthly Budgets</h1>
                <p>Set and track your spending limits for this month.</p>
            </header>

            <div className="budget-management-grid">
                <section className="set-budget-card">
                    <h2><Edit3 size={20} /> Set Category Budget</h2>
                    <form onSubmit={handleSetBudget}>
                        <div className="form-group">
                            <label>Category</label>
                            <select value={newBudget.category} onChange={e => setNewBudget({ ...newBudget, category: e.target.value })}>
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Amount</label>
                            <input
                                type="number"
                                value={newBudget.amount}
                                onChange={e => setNewBudget({ ...newBudget, amount: e.target.value })}
                                placeholder="0.00"
                                required
                            />
                        </div>
                        <button type="submit" className="set-btn">Set Budget</button>
                    </form>
                </section>

                <section className="budgets-list">
                    {budgets.length > 0 ? (
                        budgets.map(b => {
                            const percent = Math.min((b.actualSpent / b.amount) * 100, 100);
                            const isOver = b.actualSpent > b.amount;
                            return (
                                <div key={b._id} className="budget-item">
                                    <div className="budget-info">
                                        <div className="category-meta">
                                            <span className="name">{b.category}</span>
                                            <span className="spent-detail">${b.actualSpent.toFixed(2)} of ${b.amount.toFixed(2)}</span>
                                        </div>
                                        <span className={`status-pill ${isOver ? 'over' : ''}`}>
                                            {isOver ? 'Over Budget' : `${(100 - percent).toFixed(0)}% Left`}
                                        </span>
                                    </div>
                                    <div className="progress-bar-bg">
                                        <div
                                            className={`progress-bar-fill ${isOver ? 'over' : ''}`}
                                            style={{ width: `${percent}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="no-budgets">
                            <PiggyBank size={48} color="#4ecca3" />
                            <p>No budgets set for this month.</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Budgets;
