const express = require('express');
const fibonacciRouter = require('./routes/fibonacci').default;

const app = express();
const port = 3000;

app.use('/fibonacci', fibonacciRouter);

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
