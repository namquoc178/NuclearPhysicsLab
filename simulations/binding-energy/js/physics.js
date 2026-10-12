// ======================================================
// physics.js
// BÀI 8 - NĂNG LƯỢNG LIÊN KẾT HẠT NHÂN
// ======================================================


// ======================================================
// SỐ NEUTRON
// ======================================================

function calculateNeutronNumber(
    A,
    Z
) {

    return A - Z;
}


// ======================================================
// TỔNG KHỐI LƯỢNG CÁC NUCLEON TỰ DO
//
// Vì dữ liệu là khối lượng nguyên tử,
// ta dùng khối lượng nguyên tử hydrogen:
//
// Z*mH + N*mn
// ======================================================

function calculateFreeNucleonMassU(
    A,
    Z
) {

    const N =
        calculateNeutronNumber(
            A,
            Z
        );


    return (
        Z *
        HYDROGEN_ATOM_MASS_U

        +

        N *
        NEUTRON_MASS_U
    );
}


// ======================================================
// ĐỘ HỤT KHỐI
//
// Δm = Z*mH + N*mn - M_atom
// ======================================================

function calculateMassDefectU(
    A,
    Z,
    atomicMassU
) {

    const freeMass =
        calculateFreeNucleonMassU(
            A,
            Z
        );


    return (
        freeMass -
        atomicMassU
    );
}


// ======================================================
// NĂNG LƯỢNG LIÊN KẾT
//
// Eₗₖ = Δm·c²
//
// Với:
// 1 u·c² = U_TO_MEV (MeV), xem assets/shared/constants.js
// ======================================================

function calculateBindingEnergyMeV(
    A,
    Z,
    atomicMassU
) {

    const massDefect =
        calculateMassDefectU(
            A,
            Z,
            atomicMassU
        );


    return (
        massDefect *
        U_TO_MEV
    );
}


// ======================================================
// NĂNG LƯỢNG LIÊN KẾT RIÊNG
//
// Eb/A
// ======================================================

function calculateBindingEnergyPerNucleonMeV(
    A,
    Z,
    atomicMassU
) {

    const bindingEnergy =
        calculateBindingEnergyMeV(
            A,
            Z,
            atomicMassU
        );


    return (
        bindingEnergy /
        A
    );
}


// ======================================================
// TÍNH TOÀN BỘ ĐẠI LƯỢNG CHO MỘT HẠT NHÂN
// ======================================================

function calculateNuclideProperties(
    nuclide
) {

    if (
        !nuclide
    ) {

        throw new Error(
            "Không có dữ liệu hạt nhân."
        );
    }


    const neutronNumber =
        calculateNeutronNumber(
            nuclide.A,
            nuclide.Z
        );


    const freeNucleonMassU =
        calculateFreeNucleonMassU(
            nuclide.A,
            nuclide.Z
        );


    const massDefectU =
        calculateMassDefectU(
            nuclide.A,
            nuclide.Z,
            nuclide.atomicMassU
        );


    const bindingEnergyMeV =
        calculateBindingEnergyMeV(
            nuclide.A,
            nuclide.Z,
            nuclide.atomicMassU
        );


    const bindingEnergyPerNucleonMeV =
        bindingEnergyMeV /
        nuclide.A;


    return {

        ...nuclide,

        N:
            neutronNumber,

        freeNucleonMassU,

        massDefectU,

        bindingEnergyMeV,

        bindingEnergyPerNucleonMeV

    };
}