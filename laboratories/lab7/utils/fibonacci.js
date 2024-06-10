/**
 * @param {number} n
 */
function fibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
  
    let fibSeries = [0, 1];
    for (let i = 2; i < n; i++) {
        fibSeries.push(fibSeries[i - 1] + fibSeries[i - 2]);
    }
    return fibSeries;
}

module.exports = { fibonacci };
