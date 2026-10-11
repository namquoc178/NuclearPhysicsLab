// ======================================================
// fusion-data.js
// BÀI 10 - NHIỆT HẠCH HẠT NHÂN
// VERSION 2
// ======================================================
//
// Dữ liệu khối lượng nguyên tử dùng trong mô phỏng.
//
// Các phản ứng được sử dụng như những phản ứng
// minh họa phục vụ học tập.
//
// Q-value không được nhập sẵn.
// Q được tính từ khối lượng trước và sau phản ứng.
// ======================================================


// ======================================================
// HẰNG SỐ
// ======================================================

const NEUTRON_MASS_U =
    1.00866491606;


const U_TO_MEV =
    931.49410242;


// ======================================================
// DỮ LIỆU HẠT NHÂN
// ======================================================

const FUSION_NUCLIDES = {


    "H-1": {

        id:
            "H-1",

        symbol:
            "H",

        name:
            "Hydrogen-1",

        vietnameseName:
            "Hiđrô-1",

        A:
            1,

        Z:
            1,

        atomicMassU:
            1.00782503223,

        source:
            "NIST / AME2020"

    },


    "H-2": {

        id:
            "H-2",

        symbol:
            "H",

        alternativeSymbol:
            "D",

        name:
            "Deuterium",

        vietnameseName:
            "Đơteri",

        A:
            2,

        Z:
            1,

        atomicMassU:
            2.01410177812,

        source:
            "NIST / AME2020"

    },


    "H-3": {

        id:
            "H-3",

        symbol:
            "H",

        alternativeSymbol:
            "T",

        name:
            "Tritium",

        vietnameseName:
            "Triti",

        A:
            3,

        Z:
            1,

        atomicMassU:
            3.0160492779,

        source:
            "NIST / AME2020"

    },


    "He-3": {

        id:
            "He-3",

        symbol:
            "He",

        name:
            "Helium-3",

        vietnameseName:
            "Heli-3",

        A:
            3,

        Z:
            2,

        atomicMassU:
            3.0160293201,

        source:
            "NIST / AME2020"

    },


    "He-4": {

        id:
            "He-4",

        symbol:
            "He",

        name:
            "Helium-4",

        vietnameseName:
            "Heli-4",

        A:
            4,

        Z:
            2,

        atomicMassU:
            4.00260325413,

        source:
            "NIST / AME2020"

    }

};


// ======================================================
// CÁC PHẢN ỨNG MINH HỌA
// ======================================================

const FUSION_REACTIONS = [


    {

        id:
            "D-T-He4-n",

        name:
            "D + T → He-4 + n",

        shortName:
            "D + T",

        reactants:
        [
            "H-2",
            "H-3"
        ],

        products:
        [
            "He-4"
        ],

        emittedNeutrons:
            1,

        description:
            "Đơteri và triti kết hợp tạo heli-4 và một neutron."

    },


    {

        id:
            "D-D-He3-n",

        name:
            "D + D → He-3 + n",

        shortName:
            "D + D → He-3 + n",

        reactants:
        [
            "H-2",
            "H-2"
        ],

        products:
        [
            "He-3"
        ],

        emittedNeutrons:
            1,

        description:
            "Hai hạt nhân đơteri phản ứng tạo heli-3 và một neutron."

    },


    {

        id:
            "D-D-T-H1",

        name:
            "D + D → T + H-1",

        shortName:
            "D + D → T + H-1",

        reactants:
        [
            "H-2",
            "H-2"
        ],

        products:
        [
            "H-3",
            "H-1"
        ],

        emittedNeutrons:
            0,

        description:
            "Hai hạt nhân đơteri phản ứng tạo triti và hiđrô-1."

    },


    {

        id:
            "D-He3-He4-H1",

        name:
            "D + He-3 → He-4 + H-1",

        shortName:
            "D + He-3",

        reactants:
        [
            "H-2",
            "He-3"
        ],

        products:
        [
            "He-4",
            "H-1"
        ],

        emittedNeutrons:
            0,

        description:
            "Đơteri và heli-3 phản ứng tạo heli-4 và hiđrô-1."

    }

];


// ======================================================
// TÌM HẠT NHÂN
// ======================================================

function getFusionNuclideById(
    id
) {

    return (
        FUSION_NUCLIDES[
            id
        ]
        ||
        null
    );
}


// ======================================================
// TÌM PHẢN ỨNG
// ======================================================

function getFusionReactionById(
    id
) {

    return (
        FUSION_REACTIONS.find(
            reaction =>
                reaction.id ===
                id
        )
        ||
        null
    );
}