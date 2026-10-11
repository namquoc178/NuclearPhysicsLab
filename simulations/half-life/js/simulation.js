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
// DANH SÁCH CÁC HẠT NHÂN
// ========================================

// 1 = hạt nhân chưa phân rã
// 0 = hạt nhân đã phân rã

let nuclei = [];


// ========================================
// TẠO QUẦN THỂ HẠT NHÂN BAN ĐẦU
// ========================================

function createNuclei(numberOfNuclei) {

    nuclei = new Array(numberOfNuclei);

    nuclei.fill(1);

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

    for (
        let i = 0;
        i < nuclei.length;
        i++
    ) {

        // Chỉ xét những hạt nhân
        // chưa phân rã

        if (nuclei[i] === 1) {

            const randomNumber =
                Math.random();

            if (
                randomNumber <
                decayProbability
            ) {

                // Hạt nhân phân rã

                nuclei[i] = 0;

            } else {

                // Hạt nhân vẫn tồn tại

                remaining++;

            }

        }

    }

    return remaining;

}