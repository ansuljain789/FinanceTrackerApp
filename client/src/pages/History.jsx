import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Search, Filter, Trash2 } from 'lucide-react';
import '../styles/History.css';

const History = () => {
    const [transactions, setTransactions] = useState([]);
    const [filters, setFilters] = useState({
        type: '',
        category: '',
        search: '',
        startDate: '',
        endDate: ''
    });
    const [loading, setLoading] = useState(true);

    const fetchTransactions = async () => {
        try {
            const params = new URLSearchParams();
            Object.keys(filters).forEach(key => {
                if (filters[key]) params.append(key, filters[key]);
            });
            const res = await api.get(`/transactions?${params.toString()}`);
            setTransactions(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [filters]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this transaction?')) return;
        try {
            await api.delete(`/transactions/${id}`);
            fetchTransactions();
        } catch (err) {
            console.error(err);
        }
    };

    const categories = ['Groceries', 'Utilities', 'Entertainment', 'Salary', 'Bonuses', 'Freelance', 'Dining Out', 'Transportation', 'Clothing', 'Other'];

    return (
        <div className="history-container">
            <header className="page-header">
                <h1>Transaction History</h1>
                <div className="search-bar">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Search description..."
                        value={filters.search}
                        onChange={e => setFilters({ ...filters, search: e.target.value })}
                    />
                </div>
            </header>

            <div className="filters-section">
                <div className="filter-group">
                    <label><Filter size={14} /> Type</label>
                    <select value={filters.type} onChange={e => setFilters({ ...filters, type: e.target.value })}>
                        <option value="">All Types</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Category</label>
                    <select value={filters.category} onChange={e => setFilters({ ...filters, category: e.target.value })}>
                        <option value="">All Categories</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div className="filter-group">
                    <label>From</label>
                    <input type="date" value={filters.startDate} onChange={e => setFilters({ ...filters, startDate: e.target.value })} />
                </div>
                <div className="filter-group">
                    <label>To</label>
                    <input type="date" value={filters.endDate} onChange={e => setFilters({ ...filters, endDate: e.target.value })} />
                </div>
            </div>

            <div className="history-table-container">
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Frequency</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length > 0 ? (
                            transactions.map(t => (
                                <tr key={t._id}>
                                    <td>{new Date(t.date).toLocaleDateString()}</td>
                                    <td>
                                        <div className="description-cell">
                                            <span>{t.description || '-'}</span>
                                            {t.frequency !== 'one-time' && <span className="recurring-tag">Recurring</span>}
                                        </div>
                                    </td>
                                    <td>{t.category}</td>
                                    <td><span className={`badge ${t.type}`}>{t.type}</span></td>
                                    <td><span className="frequency-val">{t.frequency}</span></td>
                                    <td className={`amount ${t.type}`}>
                                        {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                                    </td>
                                    <td>
                                        <button className="delete-btn" onClick={() => handleDelete(t._id)}>
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="no-data">No transactions matching your filters.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default History;
