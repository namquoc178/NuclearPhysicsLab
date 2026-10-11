// ======================================================
// physics.js
// BÀI 1 - CẤU TẠO HẠT NHÂN VÀ ĐỒNG VỊ
// CORE VERSION 1
// ======================================================


// ======================================================
// KIỂM TRA A, Z
// ======================================================

function validateNuclearNumbers(
    A,
    Z
) {

    const massNumber =
        Number(
            A
        );


    const atomicNumber =
        Number(
            Z
        );


    if (
        !Number.isInteger(
            massNumber
        )
        ||
        !Number.isInteger(
            atomicNumber
        )
    ) {

        return {

            valid: false,

            message:
                "A và Z phải là số nguyên."

        };
    }


    if (
        massNumber <=
        0
    ) {

        return {

            valid: false,

            message:
                "Số khối A phải lớn hơn 0."

        };
    }


    if (
        atomicNumber <
        0
    ) {

        return {

            valid: false,

            message:
                "Số proton Z không thể âm."

        };
    }


    if (
        atomicNumber >
        massNumber
    ) {

        return {

            valid: false,

            message:
                "Z không thể lớn hơn A."

        };
    }


    return {

        valid: true,

        message:
            "Dữ liệu hợp lệ."

    };
}


// ======================================================
// SỐ PROTON
// ======================================================

function calculateProtonNumber(
    Z
) {

    const result =
        validateNuclearNumbers(
            Math.max(
                Number(Z),
                1
            ),
            Number(Z)
        );


    if (
        !Number.isInteger(
            Number(Z)
        )
        ||
        Number(Z) <
        0
    ) {

        throw new Error(
            "Z phải là số nguyên không âm."
        );
    }


    return Number(
        Z
    );
}


// ======================================================
// SỐ NEUTRON
//
// N = A - Z
// ======================================================

function calculateNeutronNumber(
    A,
    Z
) {

    const validation =
        validateNuclearNumbers(
            A,
            Z
        );


    if (
        !validation.valid
    ) {

        throw new Error(
            validation.message
        );
    }


    return (
        Number(
            A
        )
        -
        Number(
            Z
        )
    );
}


// ======================================================
// SỐ NUCLEON
// ======================================================

function calculateNucleonNumber(
    protonNumber,
    neutronNumber
) {

    const protons =
        Number(
            protonNumber
        );


    const neutrons =
        Number(
            neutronNumber
        );


    if (
        !Number.isInteger(
            protons
        )
        ||
        !Number.isInteger(
            neutrons
        )
        ||
        protons <
        0
        ||
        neutrons <
        0
    ) {

        throw new Error(
            "Số proton và neutron phải là các số nguyên không âm."
        );
    }


    return (
        protons
        +
        neutrons
    );
}


// ======================================================
// TẠO KÝ HIỆU HẠT NHÂN DẠNG TEXT
// ======================================================

function buildNuclearNotationText(
    symbol,
    A,
    Z
) {

    return (
        `${symbol}-${A} `
        +
        `(A=${A}, Z=${Z})`
    );
}


// ======================================================
// TẠO KÝ HIỆU HẠT NHÂN DẠNG HTML
//
// Ví dụ:
// 12
//   C
// 6
// ======================================================

function buildNuclearNotationHtml(
    symbol,
    A,
    Z
) {

    return (
        `<sup>${A}</sup>`
        +
        `<sub>${Z}</sub>`
        +
        `${symbol}`
    );
}


// ======================================================
// KIỂM TRA HAI HẠT NHÂN CÓ PHẢI ĐỒNG VỊ KHÔNG
//
// Đồng vị:
// cùng Z nhưng khác A.
// ======================================================

function areIsotopes(
    nucleus1,
    nucleus2
) {

    if (
        !nucleus1
        ||
        !nucleus2
    ) {

        return false;
    }


    const A1 =
        Number(
            nucleus1.A
        );


    const Z1 =
        Number(
            nucleus1.Z
        );


    const A2 =
        Number(
            nucleus2.A
        );


    const Z2 =
        Number(
            nucleus2.Z
        );


    return (
        Z1 ===
        Z2
        &&
        A1 !==
        A2
    );
}


// ======================================================
// KIỂM TRA CÙNG HẠT NHÂN
// ======================================================

function areSameNuclide(
    nucleus1,
    nucleus2
) {

    if (
        !nucleus1
        ||
        !nucleus2
    ) {

        return false;
    }


    return (
        Number(
            nucleus1.A
        )
        ===
        Number(
            nucleus2.A
        )
        &&
        Number(
            nucleus1.Z
        )
        ===
        Number(
            nucleus2.Z
        )
    );
}


// ======================================================
// TÍNH THUỘC TÍNH MỘT HẠT NHÂN
// ======================================================

function calculateNuclearProperties(
    symbol,
    A
) {

    const element =
        getNuclearElementBySymbol(
            symbol
        );


    if (
        !element
    ) {

        throw new Error(
            `Không tìm thấy nguyên tố ${symbol}.`
        );
    }


    const isotope =
        getNuclearIsotope(
            symbol,
            A
        );


    if (
        !isotope
    ) {

        throw new Error(
            `Không tìm thấy đồng vị ${symbol}-${A} trong bộ dữ liệu.`
        );
    }


    const Z =
        element.Z;


    const N =
        calculateNeutronNumber(
            isotope.A,
            Z
        );


    return {

        symbol:
            element.symbol,

        elementName:
            element.name,

        vietnameseName:
            element.vietnameseName,

        A:
            isotope.A,

        Z,

        N,

        protonNumber:
            Z,

        neutronNumber:
            N,

        nucleonNumber:
            isotope.A,

        label:
            isotope.label,

        commonName:
            isotope.commonName
            ||
            "",

        category:
            isotope.category,

        notationText:
            buildNuclearNotationText(
                element.symbol,
                isotope.A,
                Z
            ),

        notationHtml:
            buildNuclearNotationHtml(
                element.symbol,
                isotope.A,
                Z
            )

    };
}


// ======================================================
// SO SÁNH HAI ĐỒNG VỊ
// ======================================================

function compareNuclei(
    nucleus1,
    nucleus2
) {

    if (
        !nucleus1
        ||
        !nucleus2
    ) {

        throw new Error(
            "Cần cung cấp đủ hai hạt nhân."
        );
    }


    const sameZ =
        Number(
            nucleus1.Z
        )
        ===
        Number(
            nucleus2.Z
        );


    const sameA =
        Number(
            nucleus1.A
        )
        ===
        Number(
            nucleus2.A
        );


    return {

        sameAtomicNumber:
            sameZ,

        sameMassNumber:
            sameA,

        areIsotopes:
            sameZ
            &&
            !sameA,

        areSameNuclide:
            sameZ
            &&
            sameA,

        neutronDifference:
            (
                Number(
                    nucleus2.A
                )
                -
                Number(
                    nucleus2.Z
                )
            )
            -
            (
                Number(
                    nucleus1.A
                )
                -
                Number(
                    nucleus1.Z
                )
            )

    };
}