const express = require('express');
const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
    try {
        const { category, amount, month, year } = req.body;
        const budget = await Budget.findOneAndUpdate(
            { userId: req.user, category, month, year },
            { amount },
            { upsert: true, new: true }
        );
        res.json(budget);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const { month, year } = req.query;
        const userId = req.user;

        const budgets = await Budget.find({ userId, month, year });
        
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);

        const expenses = await Transaction.aggregate([
            {
                $match: {
                    userId: new (require('mongoose').Types.ObjectId)(userId),
                    type: 'expense',
                    date: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $group: {
                    _id: '$category',
                    totalSpent: { $sum: '$amount' }
                }
            }
        ]);

        const spendingMap = {};
        expenses.forEach(e => spendingMap[e._id] = e.totalSpent);

        const budgetData = budgets.map(b => ({
            ...b._doc,
            actualSpent: spendingMap[b.category] || 0
        }));

        res.json(budgetData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
