// controllers/income/addIncome.js
const express = require('express');
const router = express.Router();

let incomeDB = [];

router.post('/', (req, res) => {
  const newIncome = req.body;
  incomeDB.push(newIncome);
  res.send('Income stored successfully.');
});

module.exports = { router, incomeDB };
