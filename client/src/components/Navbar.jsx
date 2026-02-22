import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, History, PiggyBank, LogOut } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-logo">
                <PiggyBank size={32} color="#4ecca3" />
                <span>FinanceTracker</span>
            </div>
            <div className="nav-links">
                <Link to="/dashboard" className="nav-link">
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </Link>
                <Link to="/history" className="nav-link">
                    <History size={20} />
                    <span>History</span>
                </Link>
                <Link to="/budgets" className="nav-link">
                    <PiggyBank size={20} />
                    <span>Budgets</span>
                </Link>
            </div>
            <button onClick={handleLogout} className="logout-btn">
                <LogOut size={20} />
                <span>Logout</span>
            </button>
        </nav>
    );
};

export default Navbar;
