// app.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const { router: addIncomeRouter, incomeDB } = require('./controllers/income/addIncome');
const listIncomeRouter = require('./controllers/income/listIncome');
const { router: addExpensesRouter, expensesDB } = require('./controllers/expenses/addExpenses');
const listExpensesRouter = require('./controllers/expenses/listExpenses');

app.use('/api/income/add', addIncomeRouter);
app.use('/api/income/list', listIncomeRouter);
app.use('/api/expenses/add', addExpensesRouter);
app.use('/api/expenses/list', listExpensesRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
