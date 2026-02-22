import React, { useState } from 'react';
import api from '../api/axios';
import '../styles/TransactionForm.css';

const TransactionForm = ({ onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        amount: '',
        category: 'Groceries',
        date: new Date().toISOString().split('T')[0],
        description: '',
        type: 'expense',
        frequency: 'one-time'
    });

    const categories = {
        expense: ['Groceries', 'Utilities', 'Entertainment', 'Dining Out', 'Transportation', 'Clothing', 'Other'],
        income: ['Salary', 'Bonuses', 'Freelance', 'Other']
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/transactions', formData);
            onSuccess();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form className="transaction-form" onSubmit={handleSubmit}>
            <div className="type-toggle">
                <button
                    type="button"
                    className={formData.type === 'expense' ? 'active' : ''}
                    onClick={() => setFormData({ ...formData, type: 'expense', category: 'Groceries' })}
                >Expense</button>
                <button
                    type="button"
                    className={formData.type === 'income' ? 'active' : ''}
                    onClick={() => setFormData({ ...formData, type: 'income', category: 'Salary' })}
                >Income</button>
            </div>

            <div className="form-grid">
                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        value={formData.amount}
                        onChange={e => setFormData({ ...formData, amount: e.target.value })}
                        required
                        placeholder="0.00"
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                    >
                        {categories[formData.type].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Frequency</label>
                    <select
                        value={formData.frequency}
                        onChange={e => setFormData({ ...formData, frequency: e.target.value })}
                    >
                        <option value="one-time">One-time</option>
                        <option value="monthly">Monthly</option>
                        <option value="weekly">Weekly</option>
                    </select>
                </div>
                <div className="form-group full-width">
                    <label>Description (Optional)</label>
                    <textarea
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        placeholder="What was this for?"
                    />
                </div>
            </div>

            <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
                <button type="submit" className="submit-btn">Save Transaction</button>
            </div>
        </form>
    );
};

export default TransactionForm;
