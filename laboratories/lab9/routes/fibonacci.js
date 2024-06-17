const express = require('express');
const router = express.Router();

// Función para calcular la serie de Fibonacci hasta un número dado
function fibonacciSeries(num) {
  const series = [0, 1];
  for (let i = 2; i < num; i++) {
    series[i] = series[i - 1] + series[i - 2];
  }
  return series.slice(0, num);
}

// Ruta GET para obtener la serie de Fibonacci de un número dado
router.get('/fibonacci/:number', (req, res) => {
  const number = parseInt(req.params.number);
  if (isNaN(number) || number <= 0) {
    return res.status(400).json({ error: 'Please enter a positive integer' });
  }
  const fibonacciArray = fibonacciSeries(number);
  res.json(fibonacciArray);
});

module.exports = router;
