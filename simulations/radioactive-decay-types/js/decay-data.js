// ======================================================
// decay-data.js
// BÀI 2 - CÁC DẠNG PHÂN RÃ PHÓNG XẠ
// CORE VERSION 1
// ======================================================


// ======================================================
// BẢNG NGUYÊN TỐ CẦN THIẾT
//
// Chỉ gồm những nguyên tố được sử dụng
// trong các ví dụ của mô phỏng.
// ======================================================

const DECAY_ELEMENTS = {

    2: {
        symbol: "He",
        vietnameseName: "Helium"
    },

    6: {
        symbol: "C",
        vietnameseName: "Carbon"
    },

    7: {
        symbol: "N",
        vietnameseName: "Nitrogen"
    },

    10: {
        symbol: "Ne",
        vietnameseName: "Neon"
    },

    11: {
        symbol: "Na",
        vietnameseName: "Sodium"
    },

    27: {
        symbol: "Co",
        vietnameseName: "Cobalt"
    },

    28: {
        symbol: "Ni",
        vietnameseName: "Nickel"
    },

    88: {
        symbol: "Ra",
        vietnameseName: "Radium"
    },

    90: {
        symbol: "Th",
        vietnameseName: "Thorium"
    },

    92: {
        symbol: "U",
        vietnameseName: "Uranium"
    }

};


// ======================================================
// CÁC DẠNG PHÂN RÃ
// ======================================================

const RADIOACTIVE_DECAY_TYPES = {

    alpha: {

        id:
            "alpha",

        label:
            "Phân rã α",

        symbol:
            "α",

        deltaA:
            -4,

        deltaZ:
            -2,

        description:
            "Hạt nhân mẹ phát ra một hạt alpha, tương ứng với hạt nhân helium-4.",

        emittedParticles:
        [
            "alpha"
        ]

    },


    betaMinus: {

        id:
            "betaMinus",

        label:
            "Phân rã β⁻",

        symbol:
            "β⁻",

        deltaA:
            0,

        deltaZ:
            1,

        description:
            "Trong hạt nhân, một neutron chuyển thành proton; đồng thời phát ra electron và phản neutrino electron.",

        emittedParticles:
        [
            "electron",
            "antineutrino"
        ]

    },


    betaPlus: {

        id:
            "betaPlus",

        label:
            "Phân rã β⁺",

        symbol:
            "β⁺",

        deltaA:
            0,

        deltaZ:
            -1,

        description:
            "Trong hạt nhân, một proton chuyển thành neutron; đồng thời phát ra positron và neutrino electron.",

        emittedParticles:
        [
            "positron",
            "neutrino"
        ]

    },


    gamma: {

        id:
            "gamma",

        label:
            "Chuyển mức γ",

        symbol:
            "γ",

        deltaA:
            0,

        deltaZ:
            0,

        description:
            "Hạt nhân ở trạng thái kích thích chuyển xuống trạng thái năng lượng thấp hơn và phát ra photon gamma.",

        emittedParticles:
        [
            "gamma"
        ]

    }

};


// ======================================================
// CÁC PHẢN ỨNG MINH HỌA
// ======================================================

const RADIOACTIVE_DECAY_EXAMPLES = [

    {

        id:
            "U238-alpha",

        type:
            "alpha",

        parent:
        {
            A: 238,
            Z: 92,
            symbol: "U",
            excited: false
        },

        daughter:
        {
            A: 234,
            Z: 90,
            symbol: "Th",
            excited: false
        },

        title:
            "U-238 phân rã α",

        note:
            "Ví dụ minh họa cho sự giảm A đi 4 và Z đi 2."

    },


    {

        id:
            "C14-betaMinus",

        type:
            "betaMinus",

        parent:
        {
            A: 14,
            Z: 6,
            symbol: "C",
            excited: false
        },

        daughter:
        {
            A: 14,
            Z: 7,
            symbol: "N",
            excited: false
        },

        title:
            "C-14 phân rã β⁻",

        note:
            "Ví dụ minh họa cho A không đổi và Z tăng 1."

    },


    {

        id:
            "Na22-betaPlus",

        type:
            "betaPlus",

        parent:
        {
            A: 22,
            Z: 11,
            symbol: "Na",
            excited: false
        },

        daughter:
        {
            A: 22,
            Z: 10,
            symbol: "Ne",
            excited: false
        },

        title:
            "Na-22 phân rã β⁺",

        note:
            "Ví dụ minh họa cho A không đổi và Z giảm 1."

    },


    {

        id:
            "Ni60-gamma",

        type:
            "gamma",

        parent:
        {
            A: 60,
            Z: 28,
            symbol: "Ni",
            excited: true
        },

        daughter:
        {
            A: 60,
            Z: 28,
            symbol: "Ni",
            excited: false
        },

        title:
            "Ni-60* chuyển mức γ",

        note:
            "Trạng thái kích thích chuyển về trạng thái năng lượng thấp hơn; A và Z không đổi."

    }

];


// ======================================================
// LẤY DẠNG PHÂN RÃ
// ======================================================

function getDecayTypeById(
    id
) {

    return (
        RADIOACTIVE_DECAY_TYPES[
            id
        ]
        ||
        null
    );
}


// ======================================================
// LẤY VÍ DỤ
// ======================================================

function getDecayExampleById(
    id
) {

    return (
        RADIOACTIVE_DECAY_EXAMPLES.find(
            example =>
                example.id ===
                id
        )
        ||
        null
    );
}


// ======================================================
// LẤY NGUYÊN TỐ THEO Z
// ======================================================

function getDecayElementByZ(
    Z
) {

    return (
        DECAY_ELEMENTS[
            Number(
                Z
            )
        ]
        ||
        null
    );
}