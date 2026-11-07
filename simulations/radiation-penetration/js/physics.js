// physics.js
// Mô hình giáo dục về khả năng đâm xuyên của bức xạ, phụ thuộc năng lượng.
//
// Nguồn và năng lượng (RADIATION_SOURCES bên dưới):
//  - α và β: tính từ độ dư khối lượng trong NUBASE2020 (Kondev và cộng sự,
//    Chinese Physics C 45, 030001, 2021), ghi rõ cạnh từng nguồn.
//  - γ: năng lượng vạch chuẩn của IAEA ("Update of X ray and gamma ray decay
//    data standards for detector calibration", nds.iaea.org/xgamma_standards).
//
// α: tầm xa trong không khí theo quy tắc Geiger R_kk (cm) = 0,318·E^1,5
//    (E tính bằng MeV, dùng cho 4–8 MeV), rồi đổi sang vật liệu theo quy tắc
//    Bragg–Kleeman R = 3,2·10⁻⁴·√A_hd/ρ·R_kk. α không suy giảm theo hàm mũ.
// β: μ/ρ ≈ 17·E_max^(−1,14) cm²/g và tầm xa cực đại theo Katz–Penfold
//    R (g/cm²) = 0,412·E^(1,265 − 0,0954·ln E), dùng cho 0,01–2,5 MeV.
// γ: μ = (μ/ρ)·ρ, μ/ρ nội suy từ bảng NIST (assets/shared/gamma-mu-data.js).
//
// Khối lượng riêng: giấy ≈ 0,8; nhôm 2,699; chì 11,35 g/cm³.

const RP_DENSITY = {
    paper: 0.8,
    aluminum: 2.699,
    lead: 11.35
};

// √A hiệu dụng trong quy tắc Bragg–Kleeman. Với hợp chất:
// 1/√A_hd = Σ wᵢ/√Aᵢ (wᵢ là phần khối lượng). Giấy coi là cellulose C6H10O5:
// w(H) = 0,0622; w(C) = 0,4445; w(O) = 0,4934.
const RP_SQRT_A_EFF = {
    paper: 1 / (0.0622 / Math.sqrt(1.008) + 0.4445 / Math.sqrt(12.011) + 0.4934 / Math.sqrt(15.999)),
    aluminum: Math.sqrt(26.982),
    lead: Math.sqrt(207.2)
};

// Động năng hạt α: E_α ≈ (Q − E_mức)·(A − 4)/A, với A là số khối hạt nhân mẹ.
// Q tính từ độ dư khối lượng NUBASE2020 (Δ của He-4 là 2424,916 keV).
// Năng lượng cực đại của β⁻: E_max = Q_β⁻ = Δ(mẹ) − Δ(con).
const RADIATION_SOURCES = {

    alpha: [
        // Q = 4870,7 keV (Ra-226 → Rn-222), về trạng thái cơ bản
        { id: "Ra226", label: "Ra-226", energyMeV: 4.784 },
        // Q = 5407,5 keV (Po-210 → Pb-206)
        { id: "Po210", label: "Po-210", energyMeV: 5.304 },
        // Q = 5637,8 keV (Am-241 → Np-237), vạch chính về mức 59,54 keV
        { id: "Am241", label: "Am-241", energyMeV: 5.486, isDefault: true },
        // Q = 7833,5 keV (Po-214 → Pb-210)
        { id: "Po214", label: "Po-214", energyMeV: 7.687 }
    ],

    beta: [
        // Q_β⁻: C-14 156,476 keV; Sr-90 546,0 keV; P-32 1710,66 keV; Y-90 2275,6 keV
        { id: "C14", label: "C-14", energyMeV: 0.156 },
        { id: "Sr90", label: "Sr-90", energyMeV: 0.546 },
        { id: "P32", label: "P-32", energyMeV: 1.711 },
        { id: "Y90", label: "Y-90 (con của Sr-90)", energyMeV: 2.276, isDefault: true }
    ],

    gamma: [
        { id: "Am241", label: "Am-241", energyMeV: 0.0595409 },
        { id: "Ba133", label: "Ba-133", energyMeV: 0.3560129 },
        { id: "Cs137", label: "Cs-137", energyMeV: 0.661657, isDefault: true },
        // Hai vạch 1173,228 và 1332,492 keV; dùng năng lượng trung bình
        { id: "Co60", label: "Co-60 (trung bình hai vạch)", energyMeV: 1.25286 }
    ]
};

// Khoảng năng lượng của thanh trượt "Tự chọn năng lượng" (MeV),
// nằm trong miền dùng được của từng công thức.
const RADIATION_ENERGY_RANGE = {
    alpha: { min: 4, max: 8, step: 0.05 },
    beta: { min: 0.1, max: 2.5, step: 0.01 },
    gamma: { min: 0.05, max: 3, step: 0.01 }
};

function getDefaultRadiationSource(radiationType) {
    return RADIATION_SOURCES[radiationType].find((source) => source.isDefault);
}

// Năng lượng đang dùng của mỗi loại bức xạ. Các nhiệm vụ và phần kiểm chứng
// luôn dùng nguồn mặc định (useDefaultRadiationEnergies).
const radiationEnergyMeV = {};

function useDefaultRadiationEnergies() {
    for (const type of Object.keys(RADIATION_SOURCES)) {
        radiationEnergyMeV[type] = getDefaultRadiationSource(type).energyMeV;
    }
}

useDefaultRadiationEnergies();

function setRadiationEnergy(radiationType, energyMeV) {
    const range = RADIATION_ENERGY_RANGE[radiationType];
    if (!range || !Number.isFinite(energyMeV)) {
        throw new Error("Năng lượng bức xạ không hợp lệ.");
    }
    radiationEnergyMeV[radiationType] = Math.min(range.max, Math.max(range.min, energyMeV));
}

function getRadiationEnergy(radiationType) {
    return radiationEnergyMeV[radiationType];
}


// ======================================================
// TẦM XA CỦA HẠT α (mm)
// ======================================================

function getAlphaRangeInAirCm(energyMeV) {
    return 0.318 * Math.pow(energyMeV, 1.5);
}

function getAlphaRangeMm(material, energyMeV = radiationEnergyMeV.alpha) {
    if (!(material in RP_DENSITY)) {
        throw new Error("Không tìm thấy tầm xa của hạt α cho vật liệu đã chọn.");
    }
    const rangeCm = 3.2e-4 * RP_SQRT_A_EFF[material] / RP_DENSITY[material]
        * getAlphaRangeInAirCm(energyMeV);
    return rangeCm * 10;
}


// ======================================================
// HẠT β: TẦM XA CỰC ĐẠI (mm) VÀ HỆ SỐ HẤP THỤ
// ======================================================

function getBetaRangeGPerCm2(energyMeV) {
    return 0.412 * Math.pow(energyMeV, 1.265 - 0.0954 * Math.log(energyMeV));
}

function getBetaMaxRangeMm(material, energyMeV = radiationEnergyMeV.beta) {
    return getBetaRangeGPerCm2(energyMeV) / RP_DENSITY[material] * 10;
}

function getBetaMassAbsorption(energyMeV) {
    return 17 * Math.pow(energyMeV, -1.14);
}


// ======================================================
// XÁC SUẤT TRUYỀN QUA THEO LOẠI BỨC XẠ
//
// α: P = 1 nếu x < R, P = 0 nếu x ≥ R (mô hình tầm xa)
// β: P = exp(-μx) khi x < R_max, P = 0 khi x ≥ R_max
// γ: P = exp(-μx) (chùm hẹp)
// ======================================================

function calculateTransmissionFor(radiationType, material, thicknessMm) {
    if (radiationType === "alpha") {
        return thicknessMm < getAlphaRangeMm(material) ? 1 : 0;
    }
    if (radiationType === "beta" && thicknessMm >= getBetaMaxRangeMm(material)) {
        return 0;
    }
    return calculateTransmissionProbability(
        getEffectiveMu(radiationType, material),
        thicknessMm
    );
}


// ======================================================
// HỆ SỐ SUY GIẢM HIỆU DỤNG μ (mm⁻¹)
// ======================================================

function getEffectiveMu(radiationType, material, energyMeV = radiationEnergyMeV[radiationType]) {
    if (!(material in RP_DENSITY)) {
        throw new Error("Không tìm thấy hệ số tương tác hiệu dụng cho lựa chọn hiện tại.");
    }
    if (radiationType === "beta") {
        return getBetaMassAbsorption(energyMeV) * RP_DENSITY[material] / 10;
    }
    if (radiationType === "gamma") {
        return getLinearAttenuationPerMm(material, energyMeV);
    }
    throw new Error("Không tìm thấy hệ số tương tác hiệu dụng cho lựa chọn hiện tại.");
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
// SỐ TIA TRUYỀN QUA KÌ VỌNG
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