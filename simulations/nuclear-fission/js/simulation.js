// ======================================================
// simulation.js
// BÀI 9 - ANIMATION PHÂN HẠCH
// ======================================================


// ======================================================
// TRẠNG THÁI MÔ PHỎNG
// ======================================================

let fissionAnimationRunning =
    false;


let fissionAnimationPaused =
    false;


let fissionAnimationFrameId =
    null;


let fissionAnimationStartTime =
    null;


let fissionElapsedTime =
    0;


let fissionSpeed =
    1;


// ======================================================
// THỜI GIAN CÁC GIAI ĐOẠN
//
// Đơn vị: giây
// ======================================================

const FISSION_STAGE_TIMES =
[
    0,
    2.0,
    3.1,
    4.5,
    6.0,
    7.2,
    9.0
];


// ======================================================
// XÁC ĐỊNH GIAI ĐOẠN
// ======================================================

function getFissionStageFromTime(
    time
) {

    if (
        time <
        FISSION_STAGE_TIMES[1]
    ) {

        return 0;
    }


    if (
        time <
        FISSION_STAGE_TIMES[2]
    ) {

        return 1;
    }


    if (
        time <
        FISSION_STAGE_TIMES[3]
    ) {

        return 2;
    }


    if (
        time <
        FISSION_STAGE_TIMES[4]
    ) {

        return 3;
    }


    if (
        time <
        FISSION_STAGE_TIMES[5]
    ) {

        return 4;
    }


    return 5;
}


// ======================================================
// TIẾN TRÌNH TRONG GIAI ĐOẠN
// ======================================================

function calculateStageProgress(
    time,
    stage
) {

    const start =
        FISSION_STAGE_TIMES[
            stage
        ];


    const end =
        FISSION_STAGE_TIMES[
            stage + 1
        ];


    if (
        !Number.isFinite(
            end
        )
    ) {

        return 1;
    }


    return Math.max(
        0,
        Math.min(
            1,
            (
                time - start
            )
            /
            (
                end - start
            )
        )
    );
}


// ======================================================
// DỪNG ANIMATION FRAME
// ======================================================

function stopFissionAnimationFrame() {

    if (
        fissionAnimationFrameId !==
        null
    ) {

        cancelAnimationFrame(
            fissionAnimationFrameId
        );


        fissionAnimationFrameId =
            null;
    }
}