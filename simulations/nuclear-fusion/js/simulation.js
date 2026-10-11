// ======================================================
// simulation.js
// BÀI 10 - NHIỆT HẠCH HẠT NHÂN
// MULTI REACTION EXPLORE VERSION 2
// ======================================================


// ======================================================
// TRẠNG THÁI ANIMATION
// ======================================================

let fusionAnimationRunning =
    false;


let fusionAnimationPaused =
    false;


let fusionAnimationFrameId =
    null;


let fusionAnimationStartTimestamp =
    null;


let fusionStoredTime =
    0;


let fusionCurrentTime =
    0;


let fusionSpeed =
    1;


// ======================================================
// THỜI GIAN CÁC GIAI ĐOẠN
//
// Đơn vị: giây
// ======================================================

const FUSION_STAGE_TIMES =
[
    0,
    1.8,
    3.4,
    4.8,
    6.2,
    7.6,
    9.2
];


// ======================================================
// THỜI GIAN CUỐI
// ======================================================

function getFusionFinalTime() {

    return FUSION_STAGE_TIMES[
        FUSION_STAGE_TIMES.length
        -
        1
    ];
}


// ======================================================
// XÁC ĐỊNH GIAI ĐOẠN
// ======================================================

function getFusionStageFromTime(
    time
) {

    if (
        time <
        FUSION_STAGE_TIMES[1]
    ) {

        return 0;
    }


    if (
        time <
        FUSION_STAGE_TIMES[2]
    ) {

        return 1;
    }


    if (
        time <
        FUSION_STAGE_TIMES[3]
    ) {

        return 2;
    }


    if (
        time <
        FUSION_STAGE_TIMES[4]
    ) {

        return 3;
    }


    if (
        time <
        FUSION_STAGE_TIMES[5]
    ) {

        return 4;
    }


    return 5;
}


// ======================================================
// TIẾN TRÌNH TRONG GIAI ĐOẠN
// ======================================================

function getFusionStageProgress(
    time,
    stage
) {

    const start =
        FUSION_STAGE_TIMES[
            stage
        ];


    const end =
        FUSION_STAGE_TIMES[
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
                time
                -
                start
            )
            /
            (
                end
                -
                start
            )
        )
    );
}


// ======================================================
// DỪNG FRAME
// ======================================================

function stopFusionAnimationFrame() {

    if (
        fusionAnimationFrameId !==
        null
    ) {

        cancelAnimationFrame(
            fusionAnimationFrameId
        );


        fusionAnimationFrameId =
            null;
    }
}


// ======================================================
// RESET TRẠNG THÁI
// ======================================================

function resetFusionAnimationState() {

    stopFusionAnimationFrame();


    fusionAnimationRunning =
        false;


    fusionAnimationPaused =
        false;


    fusionAnimationStartTimestamp =
        null;


    fusionStoredTime =
        0;


    fusionCurrentTime =
        0;
}