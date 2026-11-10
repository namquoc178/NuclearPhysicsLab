function calculateLambda(halfLife) {
    return Math.LN2 / halfLife;
}

function calculateTheoreticalN(N0, lambda, time) {
    return N0 * Math.exp(-lambda * time);
}

function calculateDecayProbability(lambda, dt) {
    return 1 - Math.exp(-lambda * dt);
}

// Số hạt phân rã trong một bước khi có n hạt, mỗi hạt phân rã với xác
// suất p: biến ngẫu nhiên nhị thức B(n, p). Lấy mẫu chính xác bằng cách
// nhảy qua các khoảng cách hình học giữa hai lần "phân rã" liên tiếp,
// nên chi phí tỉ lệ với n·p chứ không với n. Kết quả có cùng phân bố
// với việc gieo n lần Math.random() < p, nhưng chạy được tới N₀ = 10⁶.
function sampleBinomial(n, p, random) {
    const rand = random || Math.random;
    if (n <= 0 || p <= 0) return 0;
    if (p >= 1) return n;
    if (p > 0.5) return n - sampleBinomial(n, 1 - p, rand);
    const logQ = Math.log(1 - p);
    let successes = 0;
    let position = 0;
    while (true) {
        position += Math.floor(Math.log(1 - rand()) / logQ) + 1;
        if (position > n) return successes;
        successes++;
    }
}

// Độ lệch tương đối trung bình dự kiến (so với giá trị lí thuyết N₀/2) của
// số hạt còn lại tại t = T₁/₂. Khi đó mỗi hạt còn lại với xác suất 1/2:
// σ = √(N₀·0,5·0,5) = √N₀/2, nên σ/(N₀/2) = 1/√N₀.
// Trung bình của |độ lệch| bằng √(2/π)·σ (phân bố gần chuẩn).
function expectedMeanRelativeDeviationAtHalfLife(N0) {
    return Math.sqrt(2 / Math.PI) / Math.sqrt(N0);
}
