// ========================================
// TRẠNG THÁI CHUNG CỦA MÔ PHỎNG
// ========================================

let simulationRunning = false;

let currentTime = 0;

let currentN0 = 1000;

let currentRemaining = 1000;

let currentHalfLife = 10;

let currentDt = 0.1;


// ========================================
// QUẦN THỂ HẠT NHÂN
//
// Vẽ tối đa MAX_DRAWN_CELLS chấm. Khi N₀ lớn hơn, mỗi chấm đại diện
// cho một nhóm k hạt nhân; trong mỗi bước, số hạt phân rã của nhóm
// được lấy mẫu từ phân bố nhị thức B(k, p), tương đương với việc gieo
// xác suất cho từng hạt một. Khi N₀ ≤ MAX_DRAWN_CELLS, mỗi chấm là
// đúng một hạt nhân như trước.
// ========================================

const MAX_DRAWN_CELLS = 2500;

const MAX_N0 = 1000000;

// nuclei[i]: số hạt chưa phân rã trong chấm i
// nucleiInitial[i]: số hạt ban đầu trong chấm i
let nuclei = [];

let nucleiInitial = [];


function createNuclei(numberOfNuclei) {

    const cells =
        Math.min(numberOfNuclei, MAX_DRAWN_CELLS);

    const base =
        Math.floor(numberOfNuclei / cells);

    const extra =
        numberOfNuclei % cells;

    nucleiInitial = new Array(cells);

    for (let i = 0; i < cells; i++) {
        nucleiInitial[i] = i < extra ? base + 1 : base;
    }

    nuclei = nucleiInitial.slice();

}


// Số hạt nhân trung bình mà mỗi chấm đại diện.
function getNucleiPerCell() {

    if (nuclei.length === 0) {
        return 1;
    }

    return nucleiInitial.reduce((sum, count) => sum + count, 0) / nuclei.length;

}


// ========================================
// THỰC HIỆN MỘT BƯỚC MONTE CARLO
// ========================================

function performDecayStep(lambda, dt) {

    const decayProbability =
        calculateDecayProbability(
            lambda,
            dt
        );

    let remaining = 0;

    for (let i = 0; i < nuclei.length; i++) {

        if (nuclei[i] > 0) {
            nuclei[i] -= sampleBinomial(nuclei[i], decayProbability);
            remaining += nuclei[i];
        }

    }

    return remaining;

}
