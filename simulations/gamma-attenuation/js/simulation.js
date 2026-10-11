// ======================================================
// simulation.js
// MONTE CARLO CHO PHOTON GAMMA
// ======================================================


let gammaPhotons =
    [];


let animationFrameId =
    null;


let simulationRunning =
    false;


// ======================================================
// TẠO KẾT QUẢ CHO TỪNG PHOTON
// ======================================================

function buildGammaPhotonResults(
    totalPhotons,
    transmissionProbability
) {

    const results =
        [];


    for (
        let i = 0;
        i < totalPhotons;
        i++
    ) {

        const randomValue =
            Math.random();


        const transmitted =
            randomValue <
            transmissionProbability;


        results.push(
            {

                transmitted,

                randomValue

            }
        );

    }


    return results;
}


// ======================================================
// ĐẾM PHOTON TRUYỀN QUA
// ======================================================

function countGammaTransmitted(
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

function stopGammaAnimation() {

    if (
        animationFrameId !==
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