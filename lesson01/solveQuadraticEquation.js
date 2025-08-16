const solveQuadracticEquation = (a, b, c) => {
    if (a === 0) {
        // Degenerates to linear equation: bx + c = 0
        return solveLinearEquation(b, c);
    }
    const delta = b * b - 4 * a * c;
    if (delta < 0) {
        return "Has no real roots";
    } else if (delta === 0) {
        let x = -b / (2 * a);
        return [x.toFixed(2)]; 
    } else {
        let sqrtDelta = Math.sqrt(delta);
        let x1 = (-b + sqrtDelta) / (2 * a);
        let x2 = (-b - sqrtDelta) / (2 * a);
        return [
            x1.toFixed(2),
            x2.toFixed(2)
        ];
    }
};

module.exports = solveQuadracticEquation;