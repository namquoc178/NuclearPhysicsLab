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
    },

    // Các nguyên tố dùng cho ví dụ bắt electron
    3: {
        symbol: "Li",
        vietnameseName: "Lithium"
    },

    4: {
        symbol: "Be",
        vietnameseName: "Beryllium"
    },

    25: {
        symbol: "Mn",
        vietnameseName: "Manganese"
    },

    26: {
        symbol: "Fe",
        vietnameseName: "Sắt"
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

// ======================================================
// BẮT ELECTRON (EC)
//
// Để riêng khỏi RADIOACTIVE_DECAY_EXAMPLES: các nhiệm vụ và phần
// kiểm chứng nhận dạng phân rã chỉ từ ΔA, ΔZ, mà bắt electron có
// cùng ΔA = 0, ΔZ = −1 với β⁺. Bắt electron chỉ xuất hiện ở chế độ
// Khám phá.
//
// qKeV: năng lượng phân rã Q_EC = (M mẹ − M con)·c², tính từ độ dư
// khối lượng nguyên tử trong NUBASE2020 (Kondev và cộng sự,
// Chinese Physics C 45, 030001, 2021):
//   Be-7 15769,00 keV; Li-7 14907,105 keV  → Q = 861,90 keV
//   Fe-55 −57481,4 keV; Mn-55 −57712,54 keV → Q = 231,14 keV
//   Na-22 −5181,39 keV; Ne-22 −8024,716 keV → Q = 2843,33 keV
// Phân rã β⁺ chỉ xảy ra được khi Q_EC > 2mₑc² ≈ 1022 keV.
// ======================================================

const RADIOACTIVE_DECAY_TYPES_EXTRA = {

    electronCapture: {

        id:
            "electronCapture",

        label:
            "Bắt electron",

        symbol:
            "EC",

        deltaA:
            0,

        deltaZ:
            -1,

        description:
            "Hạt nhân bắt một electron ở lớp vỏ trong cùng của nguyên tử; một proton kết hợp với electron đó thành neutron và phát ra neutrino electron.",

        emittedParticles:
            [
                "neutrino"
            ]
    }
};


Object.assign(
    RADIOACTIVE_DECAY_TYPES,
    RADIOACTIVE_DECAY_TYPES_EXTRA
);


const ELECTRON_CAPTURE_EXAMPLES = [

    {
        id:
            "Be7-electronCapture",

        type:
            "electronCapture",

        parent:
            { A: 7, Z: 4, symbol: "Be", excited: false },

        daughter:
            { A: 7, Z: 3, symbol: "Li", excited: false },

        title:
            "Be-7 bắt electron",

        qKeV:
            861.90,

        note:
            "Be-7 chỉ phân rã bằng bắt electron: Q = 0,862 MeV nhỏ hơn 2mₑc² ≈ 1,022 MeV nên không thể phát positron."
    },

    {
        id:
            "Fe55-electronCapture",

        type:
            "electronCapture",

        parent:
            { A: 55, Z: 26, symbol: "Fe", excited: false },

        daughter:
            { A: 55, Z: 25, symbol: "Mn", excited: false },

        title:
            "Fe-55 bắt electron",

        qKeV:
            231.14,

        note:
            "Fe-55 cũng chỉ phân rã bằng bắt electron: Q = 0,231 MeV, nhỏ hơn nhiều so với 1,022 MeV."
    }
];


// Q_EC của Na-22 dùng để so sánh: đủ lớn nên Na-22 chủ yếu phân rã β⁺.
const NA22_Q_EC_KEV =
    2843.33;


function getAllDecayExamples() {

    return RADIOACTIVE_DECAY_EXAMPLES.concat(
        ELECTRON_CAPTURE_EXAMPLES
    );
}


function getDecayExampleById(
    id
) {

    return (
        getAllDecayExamples().find(
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