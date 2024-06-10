// controllers/expenses/addExpenses.js
const express = require('express');
const router = express.Router();

let expensesDB = [];

router.post('/', (req, res) => {
  const newExpense = req.body;
  expensesDB.push(newExpense);
  res.send('Expense stored successfully.');
});

module.exports = { router, expensesDB };
