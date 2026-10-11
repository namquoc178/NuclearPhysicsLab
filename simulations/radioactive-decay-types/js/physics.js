// ======================================================
// physics.js
// BÀI 2 - CÁC DẠNG PHÂN RÃ PHÓNG XẠ
// CORE VERSION 1
// ======================================================


// ======================================================
// KIỂM TRA A, Z
// ======================================================

function validateDecayNucleus(
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

            valid:
                false,

            message:
                "A và Z phải là số nguyên."

        };
    }


    if (
        massNumber <=
        0
    ) {

        return {

            valid:
                false,

            message:
                "A phải lớn hơn 0."

        };
    }


    if (
        atomicNumber <=
        0
    ) {

        return {

            valid:
                false,

            message:
                "Z phải lớn hơn 0."

        };
    }


    if (
        atomicNumber >
        massNumber
    ) {

        return {

            valid:
                false,

            message:
                "Z không thể lớn hơn A."

        };
    }


    return {

        valid:
            true,

        message:
            "Dữ liệu hợp lệ."

    };
}


// ======================================================
// TÍNH SỐ NEUTRON
// ======================================================

function calculateDecayNeutronNumber(
    A,
    Z
) {

    const validation =
        validateDecayNucleus(
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
// TÍNH HẠT NHÂN CON TỪ QUY TẮC PHÂN RÃ
// ======================================================

function calculateDaughterNucleus(
    parent,
    decayTypeId
) {

    if (
        !parent
    ) {

        throw new Error(
            "Thiếu dữ liệu hạt nhân mẹ."
        );
    }


    const decayType =
        getDecayTypeById(
            decayTypeId
        );


    if (
        !decayType
    ) {

        throw new Error(
            `Không tìm thấy dạng phân rã ${decayTypeId}.`
        );
    }


    const validation =
        validateDecayNucleus(
            parent.A,
            parent.Z
        );


    if (
        !validation.valid
    ) {

        throw new Error(
            validation.message
        );
    }


    const daughterA =
        parent.A
        +
        decayType.deltaA;


    const daughterZ =
        parent.Z
        +
        decayType.deltaZ;


    const daughterValidation =
        validateDecayNucleus(
            daughterA,
            daughterZ
        );


    if (
        !daughterValidation.valid
    ) {

        throw new Error(
            "Quy tắc phân rã tạo ra hạt nhân con không hợp lệ."
        );
    }


    const daughterElement =
        getDecayElementByZ(
            daughterZ
        );


    return {

        A:
            daughterA,

        Z:
            daughterZ,

        N:
            daughterA
            -
            daughterZ,

        symbol:
            daughterElement
                ?
                daughterElement.symbol
                :
                "?",

        vietnameseName:
            daughterElement
                ?
                daughterElement.vietnameseName
                :
                "Chưa có trong dữ liệu",

        excited:
            false

    };
}


// ======================================================
// BIẾN ĐỔI SỐ PROTON / NEUTRON
// ======================================================

function calculateDecayCompositionChange(
    parent,
    decayTypeId
) {

    const daughter =
        calculateDaughterNucleus(
            parent,
            decayTypeId
        );


    const parentN =
        calculateDecayNeutronNumber(
            parent.A,
            parent.Z
        );


    return {

        parentProtons:
            parent.Z,

        parentNeutrons:
            parentN,

        daughterProtons:
            daughter.Z,

        daughterNeutrons:
            daughter.N,

        deltaProtons:
            daughter.Z
            -
            parent.Z,

        deltaNeutrons:
            daughter.N
            -
            parentN

    };
}


// ======================================================
// KIỂM TRA A VÀ Z THEO DẠNG PHÂN RÃ
// ======================================================

function validateDecayTransformation(
    parent,
    daughter,
    decayTypeId
) {

    const decayType =
        getDecayTypeById(
            decayTypeId
        );


    if (
        !decayType
    ) {

        throw new Error(
            "Không tìm thấy dạng phân rã."
        );
    }


    const expectedA =
        parent.A
        +
        decayType.deltaA;


    const expectedZ =
        parent.Z
        +
        decayType.deltaZ;


    return {

        expectedA,

        actualA:
            daughter.A,

        expectedZ,

        actualZ:
            daughter.Z,

        massNumberRuleValid:
            daughter.A ===
            expectedA,

        atomicNumberRuleValid:
            daughter.Z ===
            expectedZ,

        valid:
            daughter.A ===
            expectedA
            &&
            daughter.Z ===
            expectedZ

    };
}


// ======================================================
// KÍ HIỆU HẠT NHÂN
// ======================================================

function buildDecayNuclearNotationHtml(
    nucleus
) {

    const star =
        nucleus.excited
            ?
            "<sup>*</sup>"
            :
            "";


    return (
        `<sup>${nucleus.A}</sup>`
        +
        `<sub>${nucleus.Z}</sub>`
        +
        `${nucleus.symbol}`
        +
        star
    );
}


// ======================================================
// KÍ HIỆU HẠT PHÁT RA
// ======================================================

function getDecayEmissionNotationHtml(
    decayTypeId
) {

    switch (
        decayTypeId
    ) {

        case "alpha":

            return (
                `<sup>4</sup>`
                +
                `<sub>2</sub>He`
            );


        case "betaMinus":

            return (
                `e<sup>−</sup> + `
                +
                `ν̅<sub>e</sub>`
            );


        case "betaPlus":

            return (
                `e<sup>+</sup> + `
                +
                `ν<sub>e</sub>`
            );


        case "gamma":

            return "γ";


        default:

            return "?";
    }
}


// ======================================================
// TẠO PHƯƠNG TRÌNH PHÂN RÃ HTML
// ======================================================

function buildDecayEquationHtml(
    parent,
    decayTypeId
) {

    const daughter =
        calculateDaughterNucleus(
            parent,
            decayTypeId
        );


    const parentHtml =
        buildDecayNuclearNotationHtml(
            parent
        );


    const daughterHtml =
        buildDecayNuclearNotationHtml(
            daughter
        );


    const emissionHtml =
        getDecayEmissionNotationHtml(
            decayTypeId
        );


    return (
        `${parentHtml}`
        +
        ` → `
        +
        `${daughterHtml}`
        +
        ` + `
        +
        `${emissionHtml}`
    );
}


// ======================================================
// THUỘC TÍNH TOÀN BỘ MỘT VÍ DỤ
// ======================================================

function calculateDecayExampleProperties(
    example
) {

    if (
        !example
    ) {

        throw new Error(
            "Thiếu ví dụ phân rã."
        );
    }


    const decayType =
        getDecayTypeById(
            example.type
        );


    const calculatedDaughter =
        calculateDaughterNucleus(
            example.parent,
            example.type
        );


    const validation =
        validateDecayTransformation(
            example.parent,
            example.daughter,
            example.type
        );


    const composition =
        calculateDecayCompositionChange(
            example.parent,
            example.type
        );


    return {

        exampleId:
            example.id,

        decayType,

        parent:
            example.parent,

        daughter:
            example.daughter,

        calculatedDaughter,

        parentNeutrons:
            example.parent.A
            -
            example.parent.Z,

        daughterNeutrons:
            example.daughter.A
            -
            example.daughter.Z,

        deltaA:
            example.daughter.A
            -
            example.parent.A,

        deltaZ:
            example.daughter.Z
            -
            example.parent.Z,

        composition,

        transformationValid:
            validation.valid,

        equationHtml:
            buildDecayEquationHtml(
                example.parent,
                example.type
            )

    };
}