// ======================================================
// physics.js
// BÀI 9 - PHÂN HẠCH HẠT NHÂN
// ======================================================


// ======================================================
// TỔNG SỐ KHỐI TRƯỚC PHẢN ỨNG
// ======================================================

function calculateInitialMassNumber(
    channel
) {

    const target =
        getFissionNuclideById(
            channel.target
        );


    if (
        !target
    ) {

        throw new Error(
            "Không tìm thấy hạt nhân bia."
        );
    }


    return (
        target.A
        +
        channel.incidentNeutrons
    );
}


// ======================================================
// TỔNG ĐIỆN TÍCH TRƯỚC PHẢN ỨNG
// ======================================================

function calculateInitialAtomicNumber(
    channel
) {

    const target =
        getFissionNuclideById(
            channel.target
        );


    if (
        !target
    ) {

        throw new Error(
            "Không tìm thấy hạt nhân bia."
        );
    }


    /*
     * Neutron có Z = 0.
     */

    return target.Z;
}


// ======================================================
// TỔNG SỐ KHỐI SAU PHẢN ỨNG
// ======================================================

function calculateFinalMassNumber(
    channel
) {

    let totalA =
        channel.emittedNeutrons;


    for (
        const fragmentId
        of
        channel.fragments
    ) {

        const fragment =
            getFissionNuclideById(
                fragmentId
            );


        if (
            !fragment
        ) {

            throw new Error(
                `Không tìm thấy mảnh phân hạch ${fragmentId}.`
            );
        }


        totalA +=
            fragment.A;
    }


    return totalA;
}


// ======================================================
// TỔNG ĐIỆN TÍCH SAU PHẢN ỨNG
// ======================================================

function calculateFinalAtomicNumber(
    channel
) {

    let totalZ =
        0;


    for (
        const fragmentId
        of
        channel.fragments
    ) {

        const fragment =
            getFissionNuclideById(
                fragmentId
            );


        if (
            !fragment
        ) {

            throw new Error(
                `Không tìm thấy mảnh phân hạch ${fragmentId}.`
            );
        }


        totalZ +=
            fragment.Z;
    }


    /*
     * Neutron phát ra có Z = 0.
     */

    return totalZ;
}


// ======================================================
// KIỂM TRA BẢO TOÀN A
// ======================================================

function isMassNumberConserved(
    channel
) {

    return (
        calculateInitialMassNumber(
            channel
        )
        ===
        calculateFinalMassNumber(
            channel
        )
    );
}


// ======================================================
// KIỂM TRA BẢO TOÀN Z
// ======================================================

function isAtomicNumberConserved(
    channel
) {

    return (
        calculateInitialAtomicNumber(
            channel
        )
        ===
        calculateFinalAtomicNumber(
            channel
        )
    );
}


// ======================================================
// KHỐI LƯỢNG TRƯỚC PHẢN ỨNG
// ======================================================

function calculateInitialMassU(
    channel
) {

    const target =
        getFissionNuclideById(
            channel.target
        );


    if (
        !target
    ) {

        throw new Error(
            "Không tìm thấy dữ liệu hạt nhân bia."
        );
    }


    return (
        target.atomicMassU
        +
        channel.incidentNeutrons
        *
        NEUTRON_MASS_U
    );
}


// ======================================================
// KHỐI LƯỢNG SAU PHẢN ỨNG
// ======================================================

function calculateFinalMassU(
    channel
) {

    let finalMass =
        channel.emittedNeutrons
        *
        NEUTRON_MASS_U;


    for (
        const fragmentId
        of
        channel.fragments
    ) {

        const fragment =
            getFissionNuclideById(
                fragmentId
            );


        if (
            !fragment
        ) {

            throw new Error(
                `Không tìm thấy dữ liệu ${fragmentId}.`
            );
        }


        finalMass +=
            fragment.atomicMassU;
    }


    return finalMass;
}


// ======================================================
// ĐỘ HỤT KHỐI PHẢN ỨNG
// ======================================================

function calculateFissionMassDifferenceU(
    channel
) {

    return (
        calculateInitialMassU(
            channel
        )
        -
        calculateFinalMassU(
            channel
        )
    );
}


// ======================================================
// Q-VALUE
//
// Q = (m_trước - m_sau)c²
// ======================================================

function calculateFissionQValueMeV(
    channel
) {

    const massDifference =
        calculateFissionMassDifferenceU(
            channel
        );


    return (
        massDifference
        *
        U_TO_MEV
    );
}


// ======================================================
// TÍNH TOÀN BỘ KẾT QUẢ
// ======================================================

function calculateFissionChannelProperties(
    channel
) {

    if (
        !channel
    ) {

        throw new Error(
            "Không có dữ liệu kênh phân hạch."
        );
    }


    const initialA =
        calculateInitialMassNumber(
            channel
        );


    const finalA =
        calculateFinalMassNumber(
            channel
        );


    const initialZ =
        calculateInitialAtomicNumber(
            channel
        );


    const finalZ =
        calculateFinalAtomicNumber(
            channel
        );


    const initialMassU =
        calculateInitialMassU(
            channel
        );


    const finalMassU =
        calculateFinalMassU(
            channel
        );


    const massDifferenceU =
        initialMassU -
        finalMassU;


    const qValueMeV =
        massDifferenceU
        *
        U_TO_MEV;


    return {

        channelId:
            channel.id,

        initialA,

        finalA,

        initialZ,

        finalZ,

        massNumberConserved:
            initialA === finalA,

        atomicNumberConserved:
            initialZ === finalZ,

        initialMassU,

        finalMassU,

        massDifferenceU,

        qValueMeV

    };
}