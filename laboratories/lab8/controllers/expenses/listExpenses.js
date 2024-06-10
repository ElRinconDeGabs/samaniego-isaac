// controllers/expenses/listExpenses.js
const express = require('express');
const router = express.Router();

const { expensesDB } = require('./addExpenses');

router.get('/', (req, res) => {
  res.json(expensesDB);
});

module.exports = router;
