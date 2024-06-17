import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

const fibonacci = (num) => {
  let result = [0, 1];
  for (let i = 2; i < num; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }
  return result.slice(0, num);
};

app.get('/fibonacci/:number', (req, res) => {
  const num = parseInt(req.params.number, 10);
  if (isNaN(num) || num < 1) {
    return res.status(400).json({ error: 'Invalid number' });
  }
  const fibArray = fibonacci(num);
  res.json(fibArray);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
