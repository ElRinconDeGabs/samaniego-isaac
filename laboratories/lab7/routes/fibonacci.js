import { Router } from 'express';
const router = Router();
import { fibonacci } from '../utils/fibonacci';

router.get('/', (req, res) => {
    // @ts-ignore
    const n = parseInt(req.query.n);
    if (isNaN(n) || n <= 0) {
        return res.status(400).json({ error: 'El parámetro "n" debe ser un número entero positivo.' });
    }
    
    const fibSeries = fibonacci(n);
    res.json(fibSeries);
});

export default router;
