// physics.js
// Mô hình giáo dục về khả năng đâm xuyên của bức xạ.
// Các hệ số dưới đây là hệ số hiệu dụng dùng để tạo hành vi định tính,
// KHÔNG phải dữ liệu thực nghiệm tuyệt đối cho mọi năng lượng bức xạ.

// α không có μ: xem ALPHA_RANGE_MM và calculateTransmissionFor() bên dưới.
// (Phiên bản trước dùng μ_α = 3,2 mm⁻¹ cho giấy, nên một tờ giấy 0,1 mm
// vẫn cho khoảng 73 % hạt α đi qua, trái với kết luận trong SGK.)
const EFFECTIVE_MU = {
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
// β, γ: P = exp(-μx) (mô hình hiệu dụng)
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