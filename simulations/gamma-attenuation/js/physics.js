// ======================================================
// physics.js
// BÀI 6 - SUY GIẢM CƯỜNG ĐỘ TIA GAMMA
// ======================================================
//
// Mô hình chùm hẹp: I / I0 = exp(-mu * x)
//
// μ = (μ/ρ)·ρ, với μ/ρ nội suy log–log theo năng lượng photon từ bảng NIST
// (X-Ray Mass Attenuation Coefficients, Hubbell & Seltzer), lưu trong
// assets/shared/gamma-mu-data.js. Giấy coi là cellulose (quy tắc cộng khối
// lượng từ H, C, O). Năng lượng vạch γ của các nguồn lấy theo bảng chuẩn
// của IAEA (nds.iaea.org/xgamma_standards).
//
// Ở 662 keV (Cs-137, nguồn mặc định của các nhiệm vụ):
//   chì    μ/ρ = 0,1111 cm²/g → μ = 0,126 mm⁻¹ (x½ ≈ 5,5 mm)
//   nhôm   μ/ρ = 0,0746 cm²/g → μ = 0,0201 mm⁻¹ (x½ ≈ 34 mm)
//   giấy   μ/ρ = 0,0819 cm²/g, ρ ≈ 0,8 g/cm³ → μ = 0,0066 mm⁻¹ (x½ ≈ 106 mm)
// ======================================================


const GAMMA_SOURCES = [
    { id: "Am241", label: "Am-241", energyMeV: 0.0595409 },
    { id: "Ba133", label: "Ba-133", energyMeV: 0.3560129 },
    { id: "Cs137", label: "Cs-137", energyMeV: 0.661657, isDefault: true },
    // Hai vạch 1173,228 và 1332,492 keV; dùng năng lượng trung bình
    { id: "Co60", label: "Co-60 (trung bình hai vạch)", energyMeV: 1.25286 }
];

const GAMMA_ENERGY_RANGE = { min: 0.05, max: 3, step: 0.01 };

const DEFAULT_GAMMA_ENERGY_MEV =
    GAMMA_SOURCES.find((source) => source.isDefault).energyMeV;

// Năng lượng photon đang dùng. Nhiệm vụ và kiểm chứng đặt lại về Cs-137.
let gammaEnergyMeV =
    DEFAULT_GAMMA_ENERGY_MEV;

function setGammaEnergy(energyMeV) {
    if (!Number.isFinite(energyMeV)) {
        throw new Error("Năng lượng photon không hợp lệ.");
    }
    gammaEnergyMeV = energyMeV;
}

function getGammaEnergy() {
    return gammaEnergyMeV;
}

function formatGammaEnergyVi(energyMeV) {
    return energyMeV < 1
        ? `${formatVi(energyMeV * 1000, energyMeV < 0.1 ? 1 : 0)} keV`
        : `${formatVi(energyMeV, 2)} MeV`;
}

const GAMMA_SOURCE_LABEL =
    "Cs-137 (662 keV)";


// ======================================================
// LẤY HỆ SỐ SUY GIẢM μ (mm⁻¹)
// ======================================================

function getGammaMu(
    material,
    energyMeV = gammaEnergyMeV
) {

    if (
        !GAMMA_MU_DATA[material]
    ) {

        throw new Error(
            `Không có hệ số μ cho vật liệu "${material}".`
        );

    }


    return getLinearAttenuationPerMm(
        material,
        energyMeV
    );
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