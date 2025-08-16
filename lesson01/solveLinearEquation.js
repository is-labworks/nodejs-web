const solveLinearEquation = (a, b) => {
    if (a === 0) {
        if (b === 0) return 'Infinite solutions';
        return 'No solution';
    }
    let x = -b / a;
    return [x.toFixed(2)];
};

module.exports = solveLinearEquation;