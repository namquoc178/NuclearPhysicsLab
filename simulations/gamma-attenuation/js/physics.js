// ======================================================
// physics.js
// BÀI 7 - SUY GIẢM CƯỜNG ĐỘ TIA GAMMA
// ======================================================
//
// Mô hình:
// I = I0 * exp(-mu * x)
//
// hoặc:
//
// I / I0 = exp(-mu * x)
//
// Các giá trị mu bên dưới là tham số hiệu dụng
// dùng trong mô hình giáo dục hiện tại.
// ======================================================


const GAMMA_MODEL_MU = {

    paper:
        0.015,

    aluminum:
        0.055,

    lead:
        0.240

};


// ======================================================
// LẤY HỆ SỐ SUY GIẢM
// ======================================================

function getGammaMu(
    material
) {

    const mu =
        GAMMA_MODEL_MU[
            material
        ];


    if (
        !Number.isFinite(mu)
    ) {

        throw new Error(
            `Không có hệ số μ cho vật liệu "${material}".`
        );

    }


    return mu;
}


// ======================================================
// TÍNH TỈ LỆ TRUYỀN QUA
//
// I / I0 = exp(-mu*x)
// ======================================================

function calculateGammaTransmission(
    mu,
    thicknessMm
) {

    return Math.exp(
        -mu *
        thicknessMm
    );
}


// ======================================================
// CƯỜNG ĐỘ / SỐ PHOTON KỲ VỌNG
// ======================================================

function calculateExpectedGammaCount(
    initialCount,
    mu,
    thicknessMm
) {

    return (
        initialCount *
        calculateGammaTransmission(
            mu,
            thicknessMm
        )
    );
}


// ======================================================
// BỀ DÀY BÁN GIÁ TRỊ
//
// x_1/2 = ln(2) / mu
// ======================================================

function calculateHalfValueLayer(
    mu
) {

    return (
        Math.LN2 /
        mu
    );
}