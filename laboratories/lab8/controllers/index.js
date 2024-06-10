// controllers/index.js

const addExpensesRouter = require("./expenses/addExpenses");
const listExpensesRouter = require("./expenses/listExpenses");
const addIncomeRouter = require("./income/addIncome");
const listIncomeRouter = require("./income/listIncome");

module.exports = {
  addExpensesRouter,
  listExpensesRouter,
  addIncomeRouter,
  listIncomeRouter,
};
