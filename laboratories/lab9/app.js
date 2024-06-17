const express = require('express');
const cors = require('cors');
const path = require('path');
const fibonacciRoute = require('./routes/fibonacci');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));

// Rutas
app.use('/api', fibonacciRoute); 

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((req, res, next) => {
  res.status(404).send('404 - Not Found');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
