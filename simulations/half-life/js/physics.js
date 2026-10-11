function calculateLambda(halfLife) {
    return Math.LN2 / halfLife;
}

function calculateTheoreticalN(N0, lambda, time) {
    return N0 * Math.exp(-lambda * time);
}

function calculateDecayProbability(lambda, dt) {
    return 1 - Math.exp(-lambda * dt);
}