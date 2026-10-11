// ======================================================
// physics.js
// BÀI 10 - NHIỆT HẠCH HẠT NHÂN
// VERSION 2
// ======================================================


// ======================================================
// TỔNG A CỦA DANH SÁCH HẠT NHÂN
// ======================================================

function calculateTotalMassNumber(
    nuclideIds
) {

    let total =
        0;


    for (
        const id
        of
        nuclideIds
    ) {

        const nuclide =
            getFusionNuclideById(
                id
            );


        if (
            !nuclide
        ) {

            throw new Error(
                `Không tìm thấy hạt nhân ${id}.`
            );
        }


        total +=
            nuclide.A;
    }


    return total;
}


// ======================================================
// TỔNG Z
// ======================================================

function calculateTotalAtomicNumber(
    nuclideIds
) {

    let total =
        0;


    for (
        const id
        of
        nuclideIds
    ) {

        const nuclide =
            getFusionNuclideById(
                id
            );


        if (
            !nuclide
        ) {

            throw new Error(
                `Không tìm thấy hạt nhân ${id}.`
            );
        }


        total +=
            nuclide.Z;
    }


    return total;
}


// ======================================================
// TỔNG KHỐI LƯỢNG NGUYÊN TỬ
// ======================================================

function calculateTotalAtomicMassU(
    nuclideIds
) {

    let totalMass =
        0;


    for (
        const id
        of
        nuclideIds
    ) {

        const nuclide =
            getFusionNuclideById(
                id
            );


        if (
            !nuclide
        ) {

            throw new Error(
                `Không tìm thấy dữ liệu khối lượng của ${id}.`
            );
        }


        totalMass +=
            nuclide.atomicMassU;
    }


    return totalMass;
}


// ======================================================
// A TRƯỚC
// ======================================================

function calculateFusionInitialA(
    reaction
) {

    return calculateTotalMassNumber(
        reaction.reactants
    );
}


// ======================================================
// A SAU
// ======================================================

function calculateFusionFinalA(
    reaction
) {

    return (
        calculateTotalMassNumber(
            reaction.products
        )
        +
        reaction.emittedNeutrons
    );
}


// ======================================================
// Z TRƯỚC
// ======================================================

function calculateFusionInitialZ(
    reaction
) {

    return calculateTotalAtomicNumber(
        reaction.reactants
    );
}


// ======================================================
// Z SAU
// ======================================================

function calculateFusionFinalZ(
    reaction
) {

    /*
     * Neutron có Z = 0.
     */

    return calculateTotalAtomicNumber(
        reaction.products
    );
}


// ======================================================
// KHỐI LƯỢNG TRƯỚC
// ======================================================

function calculateFusionInitialMassU(
    reaction
) {

    return calculateTotalAtomicMassU(
        reaction.reactants
    );
}


// ======================================================
// KHỐI LƯỢNG SAU
// ======================================================

function calculateFusionFinalMassU(
    reaction
) {

    return (
        calculateTotalAtomicMassU(
            reaction.products
        )
        +
        reaction.emittedNeutrons
        *
        NEUTRON_MASS_U
    );
}


// ======================================================
// CHÊNH LỆCH KHỐI LƯỢNG
// ======================================================

function calculateFusionMassDifferenceU(
    reaction
) {

    return (
        calculateFusionInitialMassU(
            reaction
        )
        -
        calculateFusionFinalMassU(
            reaction
        )
    );
}


// ======================================================
// Q-VALUE
// ======================================================

function calculateFusionQValueMeV(
    reaction
) {

    return (
        calculateFusionMassDifferenceU(
            reaction
        )
        *
        U_TO_MEV
    );
}


// ======================================================
// TÍNH TOÀN BỘ THUỘC TÍNH PHẢN ỨNG
// ======================================================

function calculateFusionReactionProperties(
    reaction
) {

    if (
        !reaction
    ) {

        throw new Error(
            "Không có dữ liệu phản ứng nhiệt hạch."
        );
    }


    const initialA =
        calculateFusionInitialA(
            reaction
        );


    const finalA =
        calculateFusionFinalA(
            reaction
        );


    const initialZ =
        calculateFusionInitialZ(
            reaction
        );


    const finalZ =
        calculateFusionFinalZ(
            reaction
        );


    const initialMassU =
        calculateFusionInitialMassU(
            reaction
        );


    const finalMassU =
        calculateFusionFinalMassU(
            reaction
        );


    const massDifferenceU =
        initialMassU
        -
        finalMassU;


    const qValueMeV =
        massDifferenceU
        *
        U_TO_MEV;


    return {

        reactionId:
            reaction.id,

        initialA,

        finalA,

        initialZ,

        finalZ,

        massNumberConserved:
            initialA ===
            finalA,

        atomicNumberConserved:
            initialZ ===
            finalZ,

        initialMassU,

        finalMassU,

        massDifferenceU,

        qValueMeV,

        releasesEnergy:
            qValueMeV >
            0

    };
}