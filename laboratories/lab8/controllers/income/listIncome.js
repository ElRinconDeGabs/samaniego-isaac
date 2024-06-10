// controllers/income/listIncome.js
const express = require('express');
const router = express.Router();

const { incomeDB } = require('./addIncome');

router.get('/', (req, res) => {
  res.json(incomeDB);
});

module.exports = router;
