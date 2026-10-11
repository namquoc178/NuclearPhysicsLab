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
// Nguồn: tia γ 662 keV của Cs-137, chùm hẹp.
// μ = (μ/ρ)·ρ, với μ/ρ nội suy log–log từ bảng NIST
// (X-Ray Mass Attenuation Coefficients, Hubbell & Seltzer):
//   chì    μ/ρ = 0,1111 cm²/g, ρ = 11,35 g/cm³ → μ = 0,126 mm⁻¹ (x½ ≈ 5,5 mm)
//   nhôm   μ/ρ = 0,0746 cm²/g, ρ = 2,699 g/cm³ → μ = 0,0201 mm⁻¹ (x½ ≈ 34 mm)
//   giấy   coi gần đúng μ/ρ như nước 0,0857 cm²/g, ρ ≈ 0,8 g/cm³
//          → μ = 0,0069 mm⁻¹ (x½ ≈ 100 mm)
// Phiên bản trước dùng bộ số hiệu dụng (0,015; 0,055; 0,240 mm⁻¹)
// không ứng với một năng lượng photon nào.
// ======================================================


const GAMMA_SOURCE_LABEL =
    "Cs-137 (662 keV)";


const GAMMA_MODEL_MU = {

    paper:
        0.0069,

    aluminum:
        0.0201,

    lead:
        0.126

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
// CƯỜNG ĐỘ / SỐ PHOTON KÌ VỌNG
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