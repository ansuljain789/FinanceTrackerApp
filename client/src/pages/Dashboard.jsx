import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { PlusCircle, ArrowUpCircle, ArrowDownCircle, Wallet, PiggyBank } from 'lucide-react';
import Modal from '../components/Modal';
import TransactionForm from '../components/TransactionForm';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const [summary, setSummary] = useState({ balance: 0, income: 0, expenses: 0 });
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = async () => {
        try {
            const res = await api.get('/transactions');
            const data = res.data;

            let income = 0;
            let expenses = 0;
            data.forEach(t => {
                if (t.type === 'income') income += t.amount;
                else expenses += t.amount;
            });

            setSummary({ balance: income - expenses, income, expenses });
            setRecentTransactions(data.slice(0, 5));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSuccess = () => {
        setIsModalOpen(false);
        fetchData();
    };

    if (loading) return <div className="loading">Loading Dashboard...</div>;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome back, {user?.email ? user.email.split('@')[0] : 'User'}!</h1>
                <p>Here's what's happening with your money today.</p>
            </header>

            <div className="stats-grid">
                <div className="stat-card balance">
                    <div className="stat-info">
                        <span>Total Balance</span>
                        <h3>${summary.balance.toFixed(2)}</h3>
                    </div>
                    <div className="stat-icon">
                        <Wallet size={24} />
                    </div>
                </div>
                <div className="stat-card income">
                    <div className="stat-info">
                        <span>Total Income</span>
                        <h3>${summary.income.toFixed(2)}</h3>
                    </div>
                    <div className="stat-icon">
                        <ArrowUpCircle size={24} />
                    </div>
                </div>
                <div className="stat-card expenses">
                    <div className="stat-info">
                        <span>Total Expenses</span>
                        <h3>${summary.expenses.toFixed(2)}</h3>
                    </div>
                    <div className="stat-icon">
                        <ArrowDownCircle size={24} />
                    </div>
                </div>
                <div className="stat-card savings">
                    <div className="stat-info">
                        <span>Total Savings</span>
                        <h3>${summary.balance.toFixed(2)}</h3>
                        <span className="savings-rate">
                            {summary.income > 0 ? ((summary.balance / summary.income) * 100).toFixed(0) : 0}% saved
                        </span>
                    </div>
                    <div className="stat-icon">
                        <PiggyBank size={24} />
                    </div>
                </div>
            </div>

            <section className="recent-activity">
                <div className="section-header">
                    <h2>Recent Transactions</h2>
                    <Link to="/history" className="view-all-btn">View All</Link>
                </div>
                <div className="transaction-list">
                    {recentTransactions.length > 0 ? (
                        recentTransactions.map(t => (
                            <div key={t._id} className="transaction-item">
                                <div className={`type-indicator ${t.type}`}></div>
                                <div className="transaction-info">
                                    <span className="category">{t.category}</span>
                                    <span className="date">{new Date(t.date).toLocaleDateString()}</span>
                                </div>
                                <div className={`amount ${t.type}`}>
                                    {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-data">No transactions found. Add your first one!</p>
                    )}
                </div>
            </section>

            <button className="fab" onClick={() => setIsModalOpen(true)}>
                <PlusCircle size={32} />
            </button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Transaction"
            >
                <TransactionForm
                    onSuccess={handleSuccess}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
};

export default Dashboard;
