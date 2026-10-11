// ======================================================
// fission-data.js
// BÀI 9 - PHÂN HẠCH HẠT NHÂN
// VERSION 4 - MULTIPLE ILLUSTRATIVE CHANNELS
// ======================================================
//
// Dữ liệu khối lượng nguyên tử dùng cho mô phỏng.
//
// Nguồn tham chiếu:
// - NIST Atomic Weights and Isotopic Compositions
// - AME2020 Atomic Mass Evaluation
//
// Các kênh dưới đây được sử dụng như những
// KÊNH MINH HỌA để khảo sát bảo toàn và Q-value.
//
// Không nên hiểu đây là danh sách đầy đủ
// hay thứ tự xác suất/yield của phân hạch U-235.
// ======================================================


// ======================================================
// HẰNG SỐ
// ======================================================

// Khối lượng neutron: CODATA 2022.
// 1 u·c² = 931,49410242 MeV: CODATA 2018 (giá trị AME2020 dùng).
const NEUTRON_MASS_U =
    1.00866491606;


const U_TO_MEV =
    931.49410242;


// ======================================================
// DỮ LIỆU HẠT NHÂN
// ======================================================

const FISSION_NUCLIDES = {

    // --------------------------------------------------
    // HẠT NHÂN BAN ĐẦU
    // --------------------------------------------------

    "U-235": {

        id:
            "U-235",

        symbol:
            "U",

        elementName:
            "Uranium",

        vietnameseName:
            "Uranium",

        A:
            235,

        Z:
            92,

        atomicMassU:
            235.0439301,

        source:
            "NIST / AME2020"

    },


    // --------------------------------------------------
    // KÊNH 1
    // Ba-141 + Kr-92 + 3n
    // --------------------------------------------------

    "Ba-141": {

        id:
            "Ba-141",

        symbol:
            "Ba",

        elementName:
            "Barium",

        vietnameseName:
            "Barium",

        A:
            141,

        Z:
            56,

        atomicMassU:
            140.9144033,

        source:
            "NIST / AME2020"

    },


    "Kr-92": {

        id:
            "Kr-92",

        symbol:
            "Kr",

        elementName:
            "Krypton",

        vietnameseName:
            "Krypton",

        A:
            92,

        Z:
            36,

        atomicMassU:
            91.9261731,

        source:
            "NIST / AME2020"

    },


    // --------------------------------------------------
    // KÊNH 2
    // Xe-140 + Sr-94 + 2n
    // --------------------------------------------------

    "Xe-140": {

        id:
            "Xe-140",

        symbol:
            "Xe",

        elementName:
            "Xenon",

        vietnameseName:
            "Xenon",

        A:
            140,

        Z:
            54,

        atomicMassU:
            139.9216458,

        source:
            "NIST"

    },


    "Sr-94": {

        id:
            "Sr-94",

        symbol:
            "Sr",

        elementName:
            "Strontium",

        vietnameseName:
            "Strontium",

        A:
            94,

        Z:
            38,

        atomicMassU:
            93.9153556,

        source:
            "NIST"

    },


    // --------------------------------------------------
    // KÊNH 3
    // Cs-144 + Rb-89 + 3n
    // --------------------------------------------------

    "Cs-144": {

        id:
            "Cs-144",

        symbol:
            "Cs",

        elementName:
            "Cesium",

        vietnameseName:
            "Caesium",

        A:
            144,

        Z:
            55,

        atomicMassU:
            143.932076,

        source:
            "NIST"

    },


    "Rb-89": {

        id:
            "Rb-89",

        symbol:
            "Rb",

        elementName:
            "Rubidium",

        vietnameseName:
            "Rubidium",

        A:
            89,

        Z:
            37,

        atomicMassU:
            88.9122783,

        source:
            "NIST"

    }

};


// ======================================================
// CÁC KÊNH PHÂN HẠCH MINH HỌA
// ======================================================

const FISSION_CHANNELS = [

    {

        id:
            "U235-Ba141-Kr92-3n",

        shortName:
            "Ba-141 + Kr-92 + 3n",

        name:
            "Kênh Ba-141 + Kr-92",

        target:
            "U-235",

        incidentNeutrons:
            1,

        fragments:
        [
            "Ba-141",
            "Kr-92"
        ],

        emittedNeutrons:
            3,

        description:
            "Kênh minh họa tạo Ba-141, Kr-92 và ba neutron.",

        sourceNote:
            "Khối lượng nguyên tử từ NIST/AME2020."

    },


    {

        id:
            "U235-Xe140-Sr94-2n",

        shortName:
            "Xe-140 + Sr-94 + 2n",

        name:
            "Kênh Xe-140 + Sr-94",

        target:
            "U-235",

        incidentNeutrons:
            1,

        fragments:
        [
            "Xe-140",
            "Sr-94"
        ],

        emittedNeutrons:
            2,

        description:
            "Kênh minh họa tạo Xe-140, Sr-94 và hai neutron.",

        sourceNote:
            "Khối lượng nguyên tử từ NIST."

    },


    {

        id:
            "U235-Cs144-Rb89-3n",

        shortName:
            "Cs-144 + Rb-89 + 3n",

        name:
            "Kênh Cs-144 + Rb-89",

        target:
            "U-235",

        incidentNeutrons:
            1,

        fragments:
        [
            "Cs-144",
            "Rb-89"
        ],

        emittedNeutrons:
            3,

        description:
            "Kênh minh họa tạo Cs-144, Rb-89 và ba neutron.",

        sourceNote:
            "Khối lượng nguyên tử từ NIST."

    }

];


// ======================================================
// TÌM HẠT NHÂN
// ======================================================

function getFissionNuclideById(
    id
) {

    return (
        FISSION_NUCLIDES[
            id
        ]
        ||
        null
    );
}


// ======================================================
// TÌM KÊNH PHÂN HẠCH
// ======================================================

function getFissionChannelById(
    id
) {

    return (
        FISSION_CHANNELS.find(
            channel =>
                channel.id ===
                id
        )
        ||
        null
    );
}