// ======================================================
// DỮ LIỆU THAM CHIẾU ĐỘC LẬP
//
// Các giá trị khối lượng nguyên tử được lưu riêng
// trong file validation để kiểm tra dữ liệu chính.
//
// Nguồn tham chiếu:
// NIST Atomic Weights and Isotopic Compositions
// ======================================================

const FUSION_REFERENCE_MASSES = {

    "H-1":
        1.00782503223,

    "H-2":
        2.01410177812,

    "H-3":
        3.0160492779,

    "He-3":
        3.0160293201,

    "He-4":
        4.00260325413

};


const FUSION_REFERENCE_NEUTRON_MASS_U =
    1.00866491606;


const FUSION_REFERENCE_U_TO_MEV =
    931.49410242;


// ======================================================
// Q THAM CHIẾU
//
// Được tính độc lập từ bảng khối lượng tham chiếu.
// Không lấy trực tiếp từ calculateFusionQValueMeV().
// ======================================================

const FUSION_REFERENCE_Q_MEV = {

    "D-T-He4-n":
        17.589296787315057,

    "D-D-He3-n":
        3.268910958024331,

    "D-D-T-H1":
        4.032667219389898,

    "D-He3-He4-H1":
        18.353053048680625

};


// ======================================================
// DOM AN TOÀN
// ======================================================

function getValidationRequiredElement(
    id
) {

    const element =
        document.getElementById(
            id
        );


    if (
        element ===
        null
    ) {

        throw new Error(
            `Kiểm chứng thiếu phần tử HTML có id="${id}"`
        );
    }


    return element;
}


// ======================================================
// DOM - KIỂM CHỨNG DỮ LIỆU
// ======================================================

const runDataValidationButton =
    getValidationRequiredElement(
        "runDataValidationButton"
    );


const resetDataValidationButton =
    getValidationRequiredElement(
        "resetDataValidationButton"
    );


const dataValidationStatus =
    getValidationRequiredElement(
        "dataValidationStatus"
    );


const dataValidationResult =
    getValidationRequiredElement(
        "dataValidationResult"
    );


const validationNuclideCount =
    getValidationRequiredElement(
        "validationNuclideCount"
    );


const validationMassStatus =
    getValidationRequiredElement(
        "validationMassStatus"
    );


const validationAStatus =
    getValidationRequiredElement(
        "validationAStatus"
    );


const validationZStatus =
    getValidationRequiredElement(
        "validationZStatus"
    );


const validationMassTableBody =
    getValidationRequiredElement(
        "validationMassTableBody"
    );


const validationConservationTableBody =
    getValidationRequiredElement(
        "validationConservationTableBody"
    );


const dataValidationConclusion =
    getValidationRequiredElement(
        "dataValidationConclusion"
    );


// ======================================================
// DOM - KIỂM CHỨNG Q
// ======================================================

const runQValidationButton =
    getValidationRequiredElement(
        "runQValidationButton"
    );


const resetQValidationButton =
    getValidationRequiredElement(
        "resetQValidationButton"
    );


const qValidationStatus =
    getValidationRequiredElement(
        "qValidationStatus"
    );


const qValidationResult =
    getValidationRequiredElement(
        "qValidationResult"
    );


const qValidationReactionCount =
    getValidationRequiredElement(
        "qValidationReactionCount"
    );


const qValidationMAE =
    getValidationRequiredElement(
        "qValidationMAE"
    );


const qValidationMaxDifference =
    getValidationRequiredElement(
        "qValidationMaxDifference"
    );


const qValidationOverallStatus =
    getValidationRequiredElement(
        "qValidationOverallStatus"
    );


const qValidationTableBody =
    getValidationRequiredElement(
        "qValidationTableBody"
    );


const qValidationChartCanvas =
    getValidationRequiredElement(
        "qValidationChart"
    );


const qValidationConclusion =
    getValidationRequiredElement(
        "qValidationConclusion"
    );


// ======================================================
// TRẠNG THÁI CHART
// ======================================================

let qValidationChart =
    null;


// ======================================================
// HÀM KHỐI LƯỢNG THAM CHIẾU
// ======================================================

function getReferenceMass(
    id
) {

    const mass =
        FUSION_REFERENCE_MASSES[
            id
        ];


    if (
        mass ===
        undefined
    ) {

        throw new Error(
            `Không có khối lượng tham chiếu cho ${id}.`
        );
    }


    return mass;
}


// ======================================================
// TÍNH KHỐI LƯỢNG TRƯỚC ĐỘC LẬP
// ======================================================

function calculateReferenceInitialMassU(
    reaction
) {

    return reaction.reactants.reduce(
        (
            total,
            id
        ) => {

            return (
                total
                +
                getReferenceMass(
                    id
                )
            );
        },

        0
    );
}


// ======================================================
// TÍNH KHỐI LƯỢNG SAU ĐỘC LẬP
// ======================================================

function calculateReferenceFinalMassU(
    reaction
) {

    const productMass =
        reaction.products.reduce(
            (
                total,
                id
            ) => {

                return (
                    total
                    +
                    getReferenceMass(
                        id
                    )
                );
            },

            0
        );


    return (
        productMass
        +
        reaction.emittedNeutrons
        *
        FUSION_REFERENCE_NEUTRON_MASS_U
    );
}


// ======================================================
// TÍNH Q ĐỘC LẬP
// ======================================================

function calculateReferenceQMeV(
    reaction
) {

    const initialMass =
        calculateReferenceInitialMassU(
            reaction
        );


    const finalMass =
        calculateReferenceFinalMassU(
            reaction
        );


    return (
        initialMass
        -
        finalMass
    )
    *
    FUSION_REFERENCE_U_TO_MEV;
}


// ======================================================
// KIỂM CHỨNG DỮ LIỆU KHỐI LƯỢNG
// ======================================================

function buildMassValidationRows() {

    const rows =
        [];


    for (
        const id
        of
        Object.keys(
            FUSION_REFERENCE_MASSES
        )
    ) {

        const projectNuclide =
            getFusionNuclideById(
                id
            );


        if (
            !projectNuclide
        ) {

            rows.push(
                {

                    id,

                    projectMass:
                        NaN,

                    referenceMass:
                        FUSION_REFERENCE_MASSES[
                            id
                        ],

                    difference:
                        Infinity,

                    valid:
                        false

                }
            );


            continue;
        }


        const projectMass =
            projectNuclide.atomicMassU;


        const referenceMass =
            FUSION_REFERENCE_MASSES[
                id
            ];


        const difference =
            Math.abs(
                projectMass
                -
                referenceMass
            );


        rows.push(
            {

                id,

                projectMass,

                referenceMass,

                difference,

                valid:
                    difference <
                    1e-10

            }
        );
    }


    return rows;
}


// ======================================================
// KIỂM CHỨNG BẢO TOÀN
// ======================================================

function buildConservationValidationRows() {

    return FUSION_REACTIONS.map(
        reaction => {

            const p =
                calculateFusionReactionProperties(
                    reaction
                );


            return {

                reaction,

                initialA:
                    p.initialA,

                finalA:
                    p.finalA,

                initialZ:
                    p.initialZ,

                finalZ:
                    p.finalZ,

                valid:
                    p.massNumberConserved
                    &&
                    p.atomicNumberConserved

            };
        }
    );
}


// ======================================================
// CHẠY KIỂM CHỨNG DỮ LIỆU
// ======================================================

function runDataValidation() {

    const massRows =
        buildMassValidationRows();


    const conservationRows =
        buildConservationValidationRows();


    const allMassesValid =
        massRows.every(
            row =>
                row.valid
        );


    const allAValid =
        conservationRows.every(
            row =>
                row.initialA ===
                row.finalA
        );


    const allZValid =
        conservationRows.every(
            row =>
                row.initialZ ===
                row.finalZ
        );


    validationNuclideCount.textContent =
        String(
            massRows.length
        );


    validationMassStatus.textContent =
        allMassesValid
            ?
            "Đạt"
            :
            "Cần kiểm tra";


    validationAStatus.textContent =
        allAValid
            ?
            "Đạt"
            :
            "Cần kiểm tra";


    validationZStatus.textContent =
        allZValid
            ?
            "Đạt"
            :
            "Cần kiểm tra";


    // ==================================================
    // BẢNG KHỐI LƯỢNG
    // ==================================================

    validationMassTableBody.innerHTML =
        "";


    for (
        const rowData
        of
        massRows
    ) {

        const row =
            document.createElement(
                "tr"
            );


        row.innerHTML =
            `
            <td>
                ${rowData.id}
            </td>

            <td>
                ${
                    Number.isFinite(
                        rowData.projectMass
                    )
                        ?
                        rowData.projectMass.toFixed(11)
                        :
                        "Không có"
                }
            </td>

            <td>
                ${rowData.referenceMass.toFixed(11)}
            </td>

            <td>
                ${
                    Number.isFinite(
                        rowData.difference
                    )
                        ?
                        rowData.difference.toExponential(2)
                        :
                        "—"
                }
            </td>

            <td class="${
                rowData.valid
                    ?
                    "validation-pass"
                    :
                    "validation-review"
            }">
                ${
                    rowData.valid
                        ?
                        "✓ Đạt"
                        :
                        "Cần kiểm tra"
                }
            </td>
            `;


        validationMassTableBody.appendChild(
            row
        );
    }


    // ==================================================
    // BẢNG BẢO TOÀN
    // ==================================================

    validationConservationTableBody.innerHTML =
        "";


    for (
        const item
        of
        conservationRows
    ) {

        const row =
            document.createElement(
                "tr"
            );


        row.innerHTML =
            `
            <td>
                ${item.reaction.name}
            </td>

            <td>
                ${item.initialA}
            </td>

            <td>
                ${item.finalA}
            </td>

            <td>
                ${item.initialZ}
            </td>

            <td>
                ${item.finalZ}
            </td>

            <td class="${
                item.valid
                    ?
                    "validation-pass"
                    :
                    "validation-review"
            }">
                ${
                    item.valid
                        ?
                        "✓ Đạt"
                        :
                        "Cần kiểm tra"
                }
            </td>
            `;


        validationConservationTableBody.appendChild(
            row
        );
    }


    dataValidationResult.hidden =
        false;


    if (
        allMassesValid
        &&
        allAValid
        &&
        allZValid
    ) {

        dataValidationStatus.textContent =
            "Kiểm chứng hoàn thành";


        dataValidationConclusion.textContent =
            `Đã đối chiếu ${massRows.length} đồng vị `
            +
            `và kiểm tra ${conservationRows.length} phản ứng. `
            +
            `Các khối lượng trong bộ dữ liệu hiện tại `
            +
            `khớp với bảng tham chiếu đã mã hóa, `
            +
            `đồng thời cả tổng A và tổng Z `
            +
            `đều được bảo toàn trong bốn phản ứng.`;

    } else {

        dataValidationStatus.textContent =
            "Phát hiện nội dung cần kiểm tra";


        dataValidationConclusion.textContent =
            "Có ít nhất một dữ liệu hoặc phản ứng "
            +
            "không vượt qua bước kiểm chứng. "
            +
            "Cần kiểm tra lại fusion-data.js hoặc physics.js.";
    }


    if (
        typeof setStatus ===
        "function"
    ) {

        setStatus(
            "Kiểm chứng dữ liệu hoàn thành",
            "finished"
        );
    }
}


// ======================================================
// RESET DỮ LIỆU
// ======================================================

function resetDataValidation() {

    dataValidationResult.hidden =
        true;


    dataValidationStatus.textContent =
        "Chưa chạy";


    validationNuclideCount.textContent =
        "—";


    validationMassStatus.textContent =
        "—";


    validationAStatus.textContent =
        "—";


    validationZStatus.textContent =
        "—";


    validationMassTableBody.innerHTML =
        "";


    validationConservationTableBody.innerHTML =
        "";


    dataValidationConclusion.textContent =
        "";
}


// ======================================================
// TẠO DỮ LIỆU KIỂM CHỨNG Q
// ======================================================

function buildQValidationRows() {

    return FUSION_REACTIONS.map(
        reaction => {

            const project =
                calculateFusionReactionProperties(
                    reaction
                );


            const referenceQCalculated =
                calculateReferenceQMeV(
                    reaction
                );


            const storedReferenceQ =
                FUSION_REFERENCE_Q_MEV[
                    reaction.id
                ];


            /*
             * So sánh cả hai đường tính độc lập.
             */

            const referenceDifference =
                Math.abs(
                    referenceQCalculated
                    -
                    storedReferenceQ
                );


            if (
                referenceDifference >
                1e-9
            ) {

                console.warn(
                    "Q tham chiếu không nhất quán:",
                    reaction.id,
                    referenceQCalculated,
                    storedReferenceQ
                );
            }


            const difference =
                Math.abs(
                    project.qValueMeV
                    -
                    referenceQCalculated
                );


            return {

                reaction,

                massDifferenceU:
                    project.massDifferenceU,

                projectQ:
                    project.qValueMeV,

                referenceQ:
                    referenceQCalculated,

                difference,

                valid:
                    difference <
                    0.001

            };
        }
    );
}


// ======================================================
// TẠO BIỂU ĐỒ Q
// ======================================================

function createQValidationChart(
    rows
) {

    if (
        typeof Chart ===
        "undefined"
    ) {

        throw new Error(
            "Chart.js chưa được tải."
        );
    }


    if (
        qValidationChart !==
        null
    ) {

        qValidationChart.destroy();
    }


    qValidationChart =
        new Chart(
            qValidationChartCanvas.getContext(
                "2d"
            ),

            {

                type:
                    "bar",


                data:
                {

                    labels:
                        rows.map(
                            item =>
                                item.reaction.shortName
                        ),


                    datasets:
                    [

                        {

                            label:
                                "Q chương trình",

                            data:
                                rows.map(
                                    item =>
                                        item.projectQ
                                ),

                            borderWidth:
                                1

                        },


                        {

                            label:
                                "Q tham chiếu",

                            data:
                                rows.map(
                                    item =>
                                        item.referenceQ
                                ),

                            borderWidth:
                                1

                        }

                    ]

                },


                options:
                {

                    responsive:
                        true,


                    maintainAspectRatio:
                        false,


                    animation:
                        false,


                    scales:
                    {

                        y:
                        {

                            beginAtZero:
                                true,

                            title:
                            {

                                display:
                                    true,

                                text:
                                    "Q (MeV)"

                            }

                        }

                    },


                    plugins:
                    {

                        tooltip:
                        {

                            callbacks:
                            {

                                label:
                                    function(
                                        context
                                    ) {

                                        return (
                                            `${context.dataset.label}: `
                                            +
                                            `${Number(context.raw).toFixed(6)} MeV`
                                        );
                                    }

                            }

                        }

                    }

                }

            }
        );
}


// ======================================================
// CHẠY KIỂM CHỨNG Q
// ======================================================

function runQValidation() {

    const rows =
        buildQValidationRows();


    const differences =
        rows.map(
            row =>
                row.difference
        );


    const mae =
        differences.reduce(
            (
                total,
                value
            ) =>
                total
                +
                value,

            0
        )
        /
        differences.length;


    const maxDifference =
        Math.max(
            ...differences
        );


    const allValid =
        rows.every(
            row =>
                row.valid
        );


    qValidationReactionCount.textContent =
        String(
            rows.length
        );


    qValidationMAE.textContent =
        `${mae.toExponential(3)} MeV`;


    qValidationMaxDifference.textContent =
        `${maxDifference.toExponential(3)} MeV`;


    qValidationOverallStatus.textContent =
        allValid
            ?
            "Đạt"
            :
            "Cần kiểm tra";


    // ==================================================
    // BẢNG
    // ==================================================

    qValidationTableBody.innerHTML =
        "";


    for (
        const item
        of
        rows
    ) {

        const row =
            document.createElement(
                "tr"
            );


        row.innerHTML =
            `
            <td>
                ${item.reaction.name}
            </td>

            <td>
                ${item.massDifferenceU.toFixed(9)}
            </td>

            <td>
                ${item.projectQ.toFixed(6)}
            </td>

            <td>
                ${item.referenceQ.toFixed(6)}
            </td>

            <td>
                ${item.difference.toExponential(3)}
            </td>

            <td class="${
                item.valid
                    ?
                    "validation-pass"
                    :
                    "validation-review"
            }">
                ${
                    item.valid
                        ?
                        "✓ Đạt"
                        :
                        "Cần kiểm tra"
                }
            </td>
            `;


        qValidationTableBody.appendChild(
            row
        );
    }


    createQValidationChart(
        rows
    );


    qValidationResult.hidden =
        false;


    if (
        allValid
    ) {

        qValidationStatus.textContent =
            "Kiểm chứng hoàn thành";


        qValidationConclusion.textContent =
            `Đã đối chiếu ${rows.length} phản ứng. `
            +
            `Các giá trị Q do chương trình tính `
            +
            `phù hợp với phép tính độc lập từ bộ khối lượng tham chiếu. `
            +
            `Sai lệch lớn nhất là `
            +
            `${maxDifference.toExponential(3)} MeV.`;

    } else {

        qValidationStatus.textContent =
            "Phát hiện sai lệch";


        qValidationConclusion.textContent =
            "Có ít nhất một phản ứng cho sai lệch "
            +
            "lớn hơn ngưỡng 0,001 MeV. "
            +
            "Cần kiểm tra lại dữ liệu hoặc thuật toán tính Q.";
    }


    if (
        typeof setStatus ===
        "function"
    ) {

        setStatus(
            "Kiểm chứng Q hoàn thành",
            "finished"
        );
    }
}


// ======================================================
// RESET Q
// ======================================================

function resetQValidation() {

    qValidationResult.hidden =
        true;


    qValidationStatus.textContent =
        "Chưa chạy";


    qValidationReactionCount.textContent =
        "—";


    qValidationMAE.textContent =
        "—";


    qValidationMaxDifference.textContent =
        "—";


    qValidationOverallStatus.textContent =
        "—";


    qValidationTableBody.innerHTML =
        "";


    qValidationConclusion.textContent =
        "";


    if (
        qValidationChart !==
        null
    ) {

        qValidationChart.destroy();


        qValidationChart =
            null;
    }
}


// ======================================================
// EVENT
// ======================================================

runDataValidationButton.addEventListener(
    "click",
    runDataValidation
);


resetDataValidationButton.addEventListener(
    "click",
    resetDataValidation
);


runQValidationButton.addEventListener(
    "click",
    runQValidation
);


resetQValidationButton.addEventListener(
    "click",
    resetQValidation
);


// ======================================================
// KHỞI TẠO
// ======================================================

resetDataValidation();


resetQValidation();