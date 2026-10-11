// physics.js
// Mô hình giáo dục về khả năng đâm xuyên của bức xạ.
// Các hệ số dưới đây là hệ số hiệu dụng dùng để tạo hành vi định tính,
// KHÔNG phải dữ liệu thực nghiệm tuyệt đối cho mọi năng lượng bức xạ.

const EFFECTIVE_MU = {
    alpha: {
        paper: 3.2,
        aluminum: 5.0,
        lead: 7.0
    },

    beta: {
        paper: 0.22,
        aluminum: 1.15,
        lead: 1.75
    },

    gamma: {
        paper: 0.015,
        aluminum: 0.055,
        lead: 0.24
    }
};


// ======================================================
// LẤY HỆ SỐ TƯƠNG TÁC HIỆU DỤNG
// ======================================================

function getEffectiveMu(
    radiationType,
    material
) {

    const radiationTable =
        EFFECTIVE_MU[
            radiationType
        ];


    if (
        !radiationTable
        ||
        !Number.isFinite(
            radiationTable[
                material
            ]
        )
    ) {

        throw new Error(
            "Không tìm thấy hệ số tương tác hiệu dụng cho lựa chọn hiện tại."
        );

    }


    return radiationTable[
        material
    ];

}


// ======================================================
// XÁC SUẤT TRUYỀN QUA
//
// P = exp(-μx)
// ======================================================

function calculateTransmissionProbability(
    mu,
    thicknessMm
) {

    return Math.exp(
        -mu
        *
        thicknessMm
    );

}


// ======================================================
// SỐ TIA TRUYỀN QUA KỲ VỌNG
// ======================================================

function calculateExpectedTransmittedCount(
    totalRays,
    transmissionProbability
) {

    return (
        totalRays
        *
        transmissionProbability
    );

}