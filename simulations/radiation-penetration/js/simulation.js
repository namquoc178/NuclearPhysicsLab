// simulation.js


// ======================================================
// BIẾN TRẠNG THÁI MÔ PHỎNG
// ======================================================

let radiationRays =
    [];


let animationFrameId =
    null;


let simulationRunning =
    false;


// ======================================================
// TẠO KẾT QUẢ MONTE CARLO CHO TỪNG TIA
// ======================================================

function buildRayResults(
    totalRays,
    transmissionProbability
) {

    const results =
        [];


    for (
        let i = 0;
        i < totalRays;
        i++
    ) {

        const randomValue =
            Math.random();


        const transmitted =
            randomValue
            <
            transmissionProbability;


        results.push(
            {

                transmitted:
                    transmitted,

                randomValue:
                    randomValue

            }
        );

    }


    return results;

}


// ======================================================
// ĐẾM SỐ TIA TRUYỀN QUA
// ======================================================

function countTransmitted(
    results
) {

    let transmitted =
        0;


    for (
        const result
        of
        results
    ) {

        if (
            result.transmitted
        ) {

            transmitted++;

        }

    }


    return transmitted;

}


// ======================================================
// DỪNG ANIMATION
// ======================================================

function stopRadiationAnimation() {

    if (
        animationFrameId
        !==
        null
    ) {

        cancelAnimationFrame(
            animationFrameId
        );


        animationFrameId =
            null;

    }


    simulationRunning =
        false;

}