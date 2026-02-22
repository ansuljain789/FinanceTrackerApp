const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Groceries', 'Utilities', 'Entertainment', 'Salary', 'Bonuses', 'Freelance', 'Dining Out', 'Transportation', 'Clothing', 'Other']
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    description: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ['income', 'expense']
    },
    frequency: {
        type: String,
        enum: ['one-time', 'monthly', 'weekly'],
        default: 'one-time'
    }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
