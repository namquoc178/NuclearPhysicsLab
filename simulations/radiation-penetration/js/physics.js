// physics.js
// Mô hình giáo dục về khả năng đâm xuyên của bức xạ.
// Nguồn giả định: α ~5 MeV (ví dụ Am-241), β từ Sr-90/Y-90
// (E_max = 2,28 MeV), γ 662 keV từ Cs-137.
// Khối lượng riêng: giấy ≈ 0,8; nhôm 2,699; chì 11,35 g/cm³.

// α không có μ: xem ALPHA_RANGE_MM và calculateTransmissionFor() bên dưới.
// (Phiên bản trước dùng μ_α = 3,2 mm⁻¹ cho giấy, nên một tờ giấy 0,1 mm
// vẫn cho khoảng 73 % hạt α đi qua, trái với kết luận trong SGK.)
//
// β: hệ số hấp thụ khối theo công thức thực nghiệm
//    μ/ρ ≈ 17·E_max^(−1,14) cm²/g ≈ 6,64 cm²/g với E_max = 2,28 MeV,
//    nhân với ρ của từng vật liệu. Vì vậy mỗi mm chì chắn β tốt hơn
//    mỗi mm nhôm khoảng 4,2 lần (đúng tỉ số khối lượng riêng).
// γ: μ = (μ/ρ)·ρ theo bảng NIST ở 662 keV (giống bài Suy giảm γ).
const EFFECTIVE_MU = {
    beta: {
        paper: 0.531,
        aluminum: 1.79,
        lead: 7.54
    },

    gamma: {
        paper: 0.0069,
        aluminum: 0.0201,
        lead: 0.126
    }
};


// ======================================================
// TẦM XA CỰC ĐẠI CỦA HẠT β (mm)
//
// Công thức Katz–Penfold: R (g/cm²) = 0,412·E^(1,265 − 0,0954·ln E)
// với E = 2,28 MeV cho R ≈ 1,10 g/cm². Chia cho ρ:
// giấy ≈ 13,7 mm, nhôm ≈ 4,06 mm, chì ≈ 0,96 mm.
// Dày hơn tầm xa này thì không còn hạt β nào đi qua.
// ======================================================

const BETA_MAX_RANGE_MM = {
    paper: 13.7,
    aluminum: 4.06,
    lead: 0.96
};


// ======================================================
// TẦM XA CỦA HẠT α (mm)
//
// Hạt α là hạt nặng mang điện: nó mất năng lượng gần như
// liên tục và dừng lại sau một quãng đường xác định (tầm xa R),
// KHÔNG suy giảm theo hàm mũ như photon γ.
//
// Ước lượng cho α ~5 MeV theo quy tắc Bragg–Kleeman
// (R_vật liệu ≈ 3,2·10⁻⁴·√A_hd/ρ·R_không khí, R_không khí ≈ 3,5 cm):
// giấy (ρ ≈ 0,8 g/cm³) ≈ 45 µm, nhôm ≈ 22 µm, chì ≈ 14 µm.
// Vì độ dày nhỏ nhất của thanh trượt là 0,1 mm, mọi lớp chắn
// trong bài đều chặn hoàn toàn α, đúng với kết luận trong SGK.
// ======================================================

const ALPHA_RANGE_MM = {
    paper: 0.045,
    aluminum: 0.022,
    lead: 0.014
};


function getAlphaRangeMm(
    material
) {

    const range =
        ALPHA_RANGE_MM[
            material
        ];


    if (
        !Number.isFinite(
            range
        )
    ) {

        throw new Error(
            "Không tìm thấy tầm xa của hạt α cho vật liệu đã chọn."
        );

    }


    return range;

}


// ======================================================
// XÁC SUẤT TRUYỀN QUA THEO LOẠI BỨC XẠ
//
// α: P = 1 nếu x < R, P = 0 nếu x ≥ R (mô hình tầm xa)
// β: P = exp(-μx) khi x < R_max, P = 0 khi x ≥ R_max
// γ: P = exp(-μx) (chùm hẹp)
// ======================================================

function calculateTransmissionFor(
    radiationType,
    material,
    thicknessMm
) {

    if (
        radiationType === "alpha"
    ) {

        return (
            thicknessMm <
            getAlphaRangeMm(
                material
            )
        )
            ? 1
            : 0;

    }


    if (
        radiationType === "beta"
        &&
        thicknessMm >= BETA_MAX_RANGE_MM[material]
    ) {

        return 0;

    }


    return calculateTransmissionProbability(
        getEffectiveMu(
            radiationType,
            material
        ),
        thicknessMm
    );

}


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