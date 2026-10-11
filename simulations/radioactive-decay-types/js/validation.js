console.log(
    "VALIDATION.JS - RADIOACTIVE DECAY TYPES VERSION 2"
);


// ======================================================
// DOM AN TOÀN
// ======================================================

function getDecayValidationRequiredElement(
    id
) {

    const element =
        document.getElementById(
            id
        );


    if (
        element === null
    ) {

        throw new Error(
            `Kiểm chứng thiếu phần tử HTML có id="${id}"`
        );
    }


    return element;
}


// ======================================================
// DOM - VALIDATION 1
// ======================================================

const runDecayRuleValidationButton =
    getDecayValidationRequiredElement(
        "runDecayRuleValidationButton"
    );


const resetDecayRuleValidationButton =
    getDecayValidationRequiredElement(
        "resetDecayRuleValidationButton"
    );


const decayRuleValidationStatus =
    getDecayValidationRequiredElement(
        "decayRuleValidationStatus"
    );


const decayRuleValidationResult =
    getDecayValidationRequiredElement(
        "decayRuleValidationResult"
    );


const decayRuleTypeCount =
    getDecayValidationRequiredElement(
        "decayRuleTypeCount"
    );


const decayRuleDeltaAStatus =
    getDecayValidationRequiredElement(
        "decayRuleDeltaAStatus"
    );


const decayRuleDeltaZStatus =
    getDecayValidationRequiredElement(
        "decayRuleDeltaZStatus"
    );


const decayRuleDeltaNStatus =
    getDecayValidationRequiredElement(
        "decayRuleDeltaNStatus"
    );


const decayRuleValidationTableBody =
    getDecayValidationRequiredElement(
        "decayRuleValidationTableBody"
    );


const decayRuleValidationConclusion =
    getDecayValidationRequiredElement(
        "decayRuleValidationConclusion"
    );


// ======================================================
// DOM - VALIDATION 2
// ======================================================

const runDaughterValidationButton =
    getDecayValidationRequiredElement(
        "runDaughterValidationButton"
    );


const resetDaughterValidationButton =
    getDecayValidationRequiredElement(
        "resetDaughterValidationButton"
    );


const daughterValidationStatus =
    getDecayValidationRequiredElement(
        "daughterValidationStatus"
    );


const daughterValidationResult =
    getDecayValidationRequiredElement(
        "daughterValidationResult"
    );


const daughterExampleCount =
    getDecayValidationRequiredElement(
        "daughterExampleCount"
    );


const daughterAStatus =
    getDecayValidationRequiredElement(
        "daughterAStatus"
    );


const daughterZStatus =
    getDecayValidationRequiredElement(
        "daughterZStatus"
    );


const daughterGammaStateStatus =
    getDecayValidationRequiredElement(
        "daughterGammaStateStatus"
    );


const daughterOverallStatus =
    getDecayValidationRequiredElement(
        "daughterOverallStatus"
    );


const daughterValidationTableBody =
    getDecayValidationRequiredElement(
        "daughterValidationTableBody"
    );


const daughterValidationConclusion =
    getDecayValidationRequiredElement(
        "daughterValidationConclusion"
    );


// ======================================================
// DOM - VALIDATION 3
// ======================================================

const runIdentificationValidationButton =
    getDecayValidationRequiredElement(
        "runIdentificationValidationButton"
    );


const resetIdentificationValidationButton =
    getDecayValidationRequiredElement(
        "resetIdentificationValidationButton"
    );


const identificationValidationStatus =
    getDecayValidationRequiredElement(
        "identificationValidationStatus"
    );


const identificationValidationResult =
    getDecayValidationRequiredElement(
        "identificationValidationResult"
    );


const identificationCaseCount =
    getDecayValidationRequiredElement(
        "identificationCaseCount"
    );


const identificationCorrectCount =
    getDecayValidationRequiredElement(
        "identificationCorrectCount"
    );


const identificationMismatchCount =
    getDecayValidationRequiredElement(
        "identificationMismatchCount"
    );


const identificationOverallStatus =
    getDecayValidationRequiredElement(
        "identificationOverallStatus"
    );


const identificationValidationTableBody =
    getDecayValidationRequiredElement(
        "identificationValidationTableBody"
    );


const identificationValidationConclusion =
    getDecayValidationRequiredElement(
        "identificationValidationConclusion"
    );


// ======================================================
// DOM - VALIDATION 4
// ======================================================

const runChainValidationButton =
    getDecayValidationRequiredElement(
        "runChainValidationButton"
    );


const resetChainValidationButton =
    getDecayValidationRequiredElement(
        "resetChainValidationButton"
    );


const chainValidationStatus =
    getDecayValidationRequiredElement(
        "chainValidationStatus"
    );


const chainValidationResult =
    getDecayValidationRequiredElement(
        "chainValidationResult"
    );


const chainValidationChainCount =
    getDecayValidationRequiredElement(
        "chainValidationChainCount"
    );


const chainValidationStepCount =
    getDecayValidationRequiredElement(
        "chainValidationStepCount"
    );


const chainValidationMismatchCount =
    getDecayValidationRequiredElement(
        "chainValidationMismatchCount"
    );


const chainValidationOverallStatus =
    getDecayValidationRequiredElement(
        "chainValidationOverallStatus"
    );


const chainValidationTableBody =
    getDecayValidationRequiredElement(
        "chainValidationTableBody"
    );


const chainValidationConclusion =
    getDecayValidationRequiredElement(
        "chainValidationConclusion"
    );


// ======================================================
// FORMAT
// ======================================================

function formatDecayValidationSigned(
    value
) {

    if (
        value >
        0
    ) {

        return `+${value}`;
    }


    return String(
        value
    );
}


// ======================================================
// KÍ HIỆU HẠT NHÂN NGẮN
// ======================================================

function buildValidationNuclideHtml(
    nucleus
) {

    return buildDecayNuclearNotationHtml(
        nucleus
    );
}


// ======================================================
// ======================================================
// VALIDATION 1
// QUY TẮC ΔA ΔZ ΔN
// ======================================================
// ======================================================

function getIndependentReferenceDecayRules() {

    /*
     * Bộ quy tắc độc lập dùng cho phần kiểm chứng.
     * Không đọc deltaA/deltaZ từ RADIOACTIVE_DECAY_TYPES.
     */

    return {

        alpha:
        {
            symbol:
                "α",

            deltaA:
                -4,

            deltaZ:
                -2,

            deltaN:
                -2
        },


        betaMinus:
        {
            symbol:
                "β⁻",

            deltaA:
                0,

            deltaZ:
                1,

            deltaN:
                -1
        },


        betaPlus:
        {
            symbol:
                "β⁺",

            deltaA:
                0,

            deltaZ:
                -1,

            deltaN:
                1
        },


        gamma:
        {
            symbol:
                "γ",

            deltaA:
                0,

            deltaZ:
                0,

            deltaN:
                0
        }

    };
}


// ======================================================
// CHẠY VALIDATION 1
// ======================================================

function runDecayRuleValidation() {

    const reference =
        getIndependentReferenceDecayRules();


    const typeIds =
    [
        "alpha",
        "betaMinus",
        "betaPlus",
        "gamma"
    ];


    const rows =
        typeIds.map(
            typeId => {

                const model =
                    getDecayTypeById(
                        typeId
                    );


                const standard =
                    reference[
                        typeId
                    ];


                const modelDeltaN =
                    model.deltaA
                    -
                    model.deltaZ;


                const deltaAValid =
                    model.deltaA
                    ===
                    standard.deltaA;


                const deltaZValid =
                    model.deltaZ
                    ===
                    standard.deltaZ;


                const deltaNValid =
                    modelDeltaN
                    ===
                    standard.deltaN;


                return {

                    typeId,

                    model,

                    standard,

                    modelDeltaN,

                    deltaAValid,

                    deltaZValid,

                    deltaNValid,

                    valid:
                        deltaAValid
                        &&
                        deltaZValid
                        &&
                        deltaNValid

                };
            }
        );


    const allDeltaAValid =
        rows.every(
            row =>
                row.deltaAValid
        );


    const allDeltaZValid =
        rows.every(
            row =>
                row.deltaZValid
        );


    const allDeltaNValid =
        rows.every(
            row =>
                row.deltaNValid
        );


    const allValid =
        rows.every(
            row =>
                row.valid
        );


    decayRuleTypeCount.textContent =
        String(
            rows.length
        );


    decayRuleDeltaAStatus.textContent =
        allDeltaAValid
            ?
            "Đạt"
            :
            "Cần kiểm tra";


    decayRuleDeltaZStatus.textContent =
        allDeltaZValid
            ?
            "Đạt"
            :
            "Cần kiểm tra";


    decayRuleDeltaNStatus.textContent =
        allDeltaNValid
            ?
            "Đạt"
            :
            "Cần kiểm tra";


    decayRuleValidationTableBody.innerHTML =
        "";


    for (
        const rowData
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
                ${rowData.standard.symbol}
            </td>

            <td>
                ${formatDecayValidationSigned(
                    rowData.model.deltaA
                )}
            </td>

            <td>
                ${formatDecayValidationSigned(
                    rowData.model.deltaZ
                )}
            </td>

            <td>
                ${formatDecayValidationSigned(
                    rowData.modelDeltaN
                )}
            </td>

            <td>
                ΔA =
                ${formatDecayValidationSigned(
                    rowData.standard.deltaA
                )};
                ΔZ =
                ${formatDecayValidationSigned(
                    rowData.standard.deltaZ
                )};
                ΔN =
                ${formatDecayValidationSigned(
                    rowData.standard.deltaN
                )}
            </td>

            <td class="${
                rowData.valid
                    ?
                    "decay-validation-pass"
                    :
                    "decay-validation-review"
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


        decayRuleValidationTableBody.appendChild(
            row
        );
    }


    decayRuleValidationResult.hidden =
        false;


    if (
        allValid
    ) {

        decayRuleValidationStatus.textContent =
            "Kiểm chứng hoàn thành";


        decayRuleValidationConclusion.textContent =
            "Cả bốn dạng α, β⁻, β⁺ và γ đều có "
            +
            "quy tắc biến đổi A, Z và N nhất quán "
            +
            "với bộ quy tắc tham chiếu của mô hình.";

    } else {

        decayRuleValidationStatus.textContent =
            "Phát hiện sai lệch";


        decayRuleValidationConclusion.textContent =
            "Có ít nhất một quy tắc ΔA, ΔZ hoặc ΔN "
            +
            "không trùng với giá trị tham chiếu.";
    }
}


// ======================================================
// RESET 1
// ======================================================

function resetDecayRuleValidation() {

    decayRuleValidationResult.hidden =
        true;


    decayRuleValidationStatus.textContent =
        "Chưa chạy";


    decayRuleTypeCount.textContent =
        "—";


    decayRuleDeltaAStatus.textContent =
        "—";


    decayRuleDeltaZStatus.textContent =
        "—";


    decayRuleDeltaNStatus.textContent =
        "—";


    decayRuleValidationTableBody.innerHTML =
        "";


    decayRuleValidationConclusion.textContent =
        "";
}


// ======================================================
// ======================================================
// VALIDATION 2
// HẠT NHÂN CON
// ======================================================
// ======================================================

function runDaughterValidation() {

    const rows =
        RADIOACTIVE_DECAY_EXAMPLES.map(
            example => {

                const calculated =
                    calculateDaughterNucleus(
                        example.parent,
                        example.type
                    );


                const aValid =
                    calculated.A
                    ===
                    example.daughter.A;


                const zValid =
                    calculated.Z
                    ===
                    example.daughter.Z;


                const symbolValid =
                    calculated.symbol
                    ===
                    example.daughter.symbol;


                /*
                 * Với chuyển mức gamma, chỉ kiểm tra A và Z
                 * là chưa đủ. Hạt nhân mẹ phải ở trạng thái
                 * kích thích và hạt nhân con phải ở trạng thái
                 * năng lượng thấp hơn.
                 *
                 * Các dạng alpha, beta-minus và beta-plus
                 * không dùng điều kiện này trong mô hình hiện tại.
                 */

                const gammaStateValid =
                    example.type !==
                    "gamma"
                    ||
                    (
                        example.parent.excited
                        ===
                        true
                        &&
                        example.daughter.excited
                        !==
                        true
                        &&
                        calculated.excited
                        !==
                        true
                    );


                return {

                    example,

                    calculated,

                    aValid,

                    zValid,

                    symbolValid,

                    gammaStateValid,

                    valid:
                        aValid
                        &&
                        zValid
                        &&
                        symbolValid
                        &&
                        gammaStateValid

                };
            }
        );


    const allAValid =
        rows.every(
            row =>
                row.aValid
        );


    const allZValid =
        rows.every(
            row =>
                row.zValid
        );


    const gammaRows =
        rows.filter(
            row =>
                row.example.type
                ===
                "gamma"
        );


    const allGammaStatesValid =
        gammaRows.length >
        0
        &&
        gammaRows.every(
            row =>
                row.gammaStateValid
        );


    const allValid =
        rows.every(
            row =>
                row.valid
        );


    daughterExampleCount.textContent =
        String(
            rows.length
        );


    daughterAStatus.textContent =
        allAValid
            ?
            "Đạt"
            :
            "Cần kiểm tra";


    daughterZStatus.textContent =
        allZValid
            ?
            "Đạt"
            :
            "Cần kiểm tra";


    daughterGammaStateStatus.textContent =
        allGammaStatesValid
            ?
            "Đạt"
            :
            "Cần kiểm tra";


    daughterOverallStatus.textContent =
        allValid
            ?
            "Đạt"
            :
            "Cần kiểm tra";


    daughterValidationTableBody.innerHTML =
        "";


    for (
        const item
        of
        rows
    ) {

        const type =
            getDecayTypeById(
                item.example.type
            );


        const gammaStateText =
            item.example.type ===
            "gamma"
                ?
                (
                    item.gammaStateValid
                        ?
                        "✓ Kích thích → thấp hơn"
                        :
                        "Sai trạng thái"
                )
                :
                "—";


        const row =
            document.createElement(
                "tr"
            );


        row.innerHTML =
            `
            <td>
                ${type.symbol}
            </td>

            <td>
                ${buildValidationNuclideHtml(
                    item.example.parent
                )}
            </td>

            <td>
                ${buildValidationNuclideHtml(
                    item.example.daughter
                )}
            </td>

            <td>
                ${buildValidationNuclideHtml(
                    item.calculated
                )}
            </td>

            <td class="${
                item.aValid
                    ?
                    "decay-validation-pass"
                    :
                    "decay-validation-review"
            }">

                ${
                    item.aValid
                        ?
                        "✓"
                        :
                        "Sai"
                }

            </td>

            <td class="${
                item.zValid
                    ?
                    "decay-validation-pass"
                    :
                    "decay-validation-review"
            }">

                ${
                    item.zValid
                        ?
                        "✓"
                        :
                        "Sai"
                }

            </td>

            <td class="${
                item.gammaStateValid
                    ?
                    "decay-validation-pass"
                    :
                    "decay-validation-review"
            }">

                ${gammaStateText}

            </td>

            <td class="${
                item.valid
                    ?
                    "decay-validation-pass"
                    :
                    "decay-validation-review"
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


        daughterValidationTableBody.appendChild(
            row
        );
    }


    daughterValidationResult.hidden =
        false;


    if (
        allValid
    ) {

        daughterValidationStatus.textContent =
            "Kiểm chứng hoàn thành";


        daughterValidationConclusion.textContent =
            `Đã kiểm tra ${rows.length} ví dụ. `
            +
            "Hạt nhân con do thuật toán tính được trùng khớp "
            +
            "với dữ liệu về A, Z và kí hiệu nguyên tố; "
            +
            "trường hợp gamma cũng thỏa điều kiện hạt nhân mẹ "
            +
            "ở trạng thái kích thích và hạt nhân con ở trạng thái năng lượng thấp hơn.";

    } else {

        daughterValidationStatus.textContent =
            "Phát hiện sai lệch";


        daughterValidationConclusion.textContent =
            "Có ít nhất một ví dụ mà hạt nhân con hoặc trạng thái gamma "
            +
            "không trùng với dữ liệu và quy tắc của mô hình.";
    }
}


// ======================================================
// RESET 2
// ======================================================

function resetDaughterValidation() {

    daughterValidationResult.hidden =
        true;


    daughterValidationStatus.textContent =
        "Chưa chạy";


    daughterExampleCount.textContent =
        "—";


    daughterAStatus.textContent =
        "—";


    daughterZStatus.textContent =
        "—";


    daughterGammaStateStatus.textContent =
        "—";


    daughterOverallStatus.textContent =
        "—";


    daughterValidationTableBody.innerHTML =
        "";


    daughterValidationConclusion.textContent =
        "";
}


// ======================================================
// ======================================================
// VALIDATION 3
// NHẬN DIỆN LOẠI PHÂN RÃ
// ======================================================
// ======================================================

function identifyDecayTypeIndependently(
    deltaA,
    deltaZ
) {

    if (
        deltaA ===
        -4
        &&
        deltaZ ===
        -2
    ) {

        return "alpha";
    }


    if (
        deltaA ===
        0
        &&
        deltaZ ===
        1
    ) {

        return "betaMinus";
    }


    if (
        deltaA ===
        0
        &&
        deltaZ ===
        -1
    ) {

        return "betaPlus";
    }


    if (
        deltaA ===
        0
        &&
        deltaZ ===
        0
    ) {

        return "gamma";
    }


    return "unknown";
}


// ======================================================
// CHẠY VALIDATION 3
// ======================================================

function runIdentificationValidation() {

    const rows =
        RADIOACTIVE_DECAY_EXAMPLES.map(
            example => {

                const deltaA =
                    example.daughter.A
                    -
                    example.parent.A;


                const deltaZ =
                    example.daughter.Z
                    -
                    example.parent.Z;


                const identifiedType =
                    identifyDecayTypeIndependently(
                        deltaA,
                        deltaZ
                    );


                const valid =
                    identifiedType
                    ===
                    example.type;


                return {

                    example,

                    deltaA,

                    deltaZ,

                    identifiedType,

                    valid

                };
            }
        );


    const correctCount =
        rows.filter(
            row =>
                row.valid
        ).length;


    const mismatchCount =
        rows.length
        -
        correctCount;


    identificationCaseCount.textContent =
        String(
            rows.length
        );


    identificationCorrectCount.textContent =
        String(
            correctCount
        );


    identificationMismatchCount.textContent =
        String(
            mismatchCount
        );


    identificationOverallStatus.textContent =
        mismatchCount ===
        0
            ?
            "Đạt"
            :
            "Cần kiểm tra";


    identificationValidationTableBody.innerHTML =
        "";


    for (
        const item
        of
        rows
    ) {

        const storedType =
            getDecayTypeById(
                item.example.type
            );


        const identifiedType =
            getDecayTypeById(
                item.identifiedType
            );


        const row =
            document.createElement(
                "tr"
            );


        row.innerHTML =
            `
            <td>
                ${buildValidationNuclideHtml(
                    item.example.parent
                )}
            </td>

            <td>
                ${buildValidationNuclideHtml(
                    item.example.daughter
                )}
            </td>

            <td>
                ${formatDecayValidationSigned(
                    item.deltaA
                )}
            </td>

            <td>
                ${formatDecayValidationSigned(
                    item.deltaZ
                )}
            </td>

            <td>
                ${storedType
                    ?
                    storedType.symbol
                    :
                    "?"
                }
            </td>

            <td>
                ${identifiedType
                    ?
                    identifiedType.symbol
                    :
                    "Không nhận diện"
                }
            </td>

            <td class="${
                item.valid
                    ?
                    "decay-validation-pass"
                    :
                    "decay-validation-review"
            }">

                ${
                    item.valid
                        ?
                        "✓ Đạt"
                        :
                        "Sai lệch"
                }

            </td>
            `;


        identificationValidationTableBody.appendChild(
            row
        );
    }


    identificationValidationResult.hidden =
        false;


    if (
        mismatchCount ===
        0
    ) {

        identificationValidationStatus.textContent =
            "Kiểm chứng hoàn thành";


        identificationValidationConclusion.textContent =
            `Cả ${rows.length} trường hợp đều được nhận diện đúng `
            +
            "chỉ từ cặp giá trị ΔA và ΔZ.";

    } else {

        identificationValidationStatus.textContent =
            "Phát hiện sai lệch";


        identificationValidationConclusion.textContent =
            `Có ${mismatchCount} trường hợp nhận diện `
            +
            "không trùng với dữ liệu phân rã.";
    }
}


// ======================================================
// RESET 3
// ======================================================

function resetIdentificationValidation() {

    identificationValidationResult.hidden =
        true;


    identificationValidationStatus.textContent =
        "Chưa chạy";


    identificationCaseCount.textContent =
        "—";


    identificationCorrectCount.textContent =
        "—";


    identificationMismatchCount.textContent =
        "—";


    identificationOverallStatus.textContent =
        "—";


    identificationValidationTableBody.innerHTML =
        "";


    identificationValidationConclusion.textContent =
        "";
}


// ======================================================
// ======================================================
// VALIDATION 4
// CHUỖI PHÂN RÃ
// ======================================================
// ======================================================

function independentlyCalculateDaughter(
    parent,
    decayType
) {

    let deltaA =
        0;


    let deltaZ =
        0;


    switch (
        decayType
    ) {

        case "alpha":

            deltaA =
                -4;

            deltaZ =
                -2;

            break;


        case "betaMinus":

            deltaA =
                0;

            deltaZ =
                1;

            break;


        case "betaPlus":

            deltaA =
                0;

            deltaZ =
                -1;

            break;


        case "gamma":

            deltaA =
                0;

            deltaZ =
                0;

            break;


        default:

            return null;
    }


    return {

        A:
            parent.A
            +
            deltaA,

        Z:
            parent.Z
            +
            deltaZ

    };
}


// ======================================================
// CHẠY VALIDATION 4
// ======================================================

function runChainValidation() {

    const rows =
        [];


    for (
        const chain
        of
        TASK3_DECAY_CHAINS
    ) {

        for (
            let i = 0;
            i <
            chain.decayTypes.length;
            i++
        ) {

            const parent =
                chain.nuclei[i];


            const storedDaughter =
                chain.nuclei[
                    i + 1
                ];


            const decayType =
                chain.decayTypes[i];


            const expected =
                independentlyCalculateDaughter(
                    parent,
                    decayType
                );


            const aValid =
                expected
                &&
                expected.A
                ===
                storedDaughter.A;


            const zValid =
                expected
                &&
                expected.Z
                ===
                storedDaughter.Z;


            const symbolElement =
                getDecayElementByZ(
                    storedDaughter.Z
                );


            /*
             * Một số nguyên tố như Pa, Ac
             * chỉ xuất hiện trong Task 3
             * và không có trong DECAY_ELEMENTS.
             *
             * Vì vậy chỉ kiểm tra symbol
             * nếu bảng nguyên tố có dữ liệu.
             */

            const symbolValid =
                symbolElement
                    ?
                    symbolElement.symbol
                    ===
                    storedDaughter.symbol
                    :
                    true;


            const valid =
                Boolean(
                    aValid
                    &&
                    zValid
                    &&
                    symbolValid
                );


            rows.push(
            {

                chain,

                step:
                    i + 1,

                parent,

                storedDaughter,

                decayType,

                expected,

                valid

            });
        }
    }


    const mismatchRows =
        rows.filter(
            row =>
                !row.valid
        );


    chainValidationChainCount.textContent =
        String(
            TASK3_DECAY_CHAINS.length
        );


    chainValidationStepCount.textContent =
        String(
            rows.length
        );


    chainValidationMismatchCount.textContent =
        String(
            mismatchRows.length
        );


    chainValidationOverallStatus.textContent =
        mismatchRows.length ===
        0
            ?
            "Đạt"
            :
            "Cần kiểm tra";


    chainValidationTableBody.innerHTML =
        "";


    for (
        const item
        of
        rows
    ) {

        const type =
            getDecayTypeById(
                item.decayType
            );


        const expectedNucleus =
        {

            A:
                item.expected.A,

            Z:
                item.expected.Z,

            symbol:
                item.storedDaughter.symbol,

            excited:
                item.storedDaughter.excited
                ===
                true

        };


        const row =
            document.createElement(
                "tr"
            );


        row.innerHTML =
            `
            <td>
                ${item.chain.name}
            </td>

            <td>
                ${item.step}
            </td>

            <td>
                ${type
                    ?
                    type.symbol
                    :
                    "?"
                }
            </td>

            <td>
                ${buildValidationNuclideHtml(
                    item.parent
                )}
            </td>

            <td>
                ${buildValidationNuclideHtml(
                    expectedNucleus
                )}
            </td>

            <td>
                ${buildValidationNuclideHtml(
                    item.storedDaughter
                )}
            </td>

            <td class="${
                item.valid
                    ?
                    "decay-validation-pass"
                    :
                    "decay-validation-review"
            }">

                ${
                    item.valid
                        ?
                        "✓ Đạt"
                        :
                        "Sai lệch"
                }

            </td>
            `;


        chainValidationTableBody.appendChild(
            row
        );
    }


    chainValidationResult.hidden =
        false;


    if (
        mismatchRows.length ===
        0
    ) {

        chainValidationStatus.textContent =
            "Kiểm chứng hoàn thành";


        chainValidationConclusion.textContent =
            `Đã kiểm tra ${rows.length} bước thuộc `
            +
            `${TASK3_DECAY_CHAINS.length} chuỗi biến đổi. `
            +
            "Tất cả các hạt nhân trung gian và hạt nhân cuối "
            +
            "đều nhất quán với quy tắc của từng dạng phân rã.";

    } else {

        chainValidationStatus.textContent =
            "Phát hiện sai lệch";


        chainValidationConclusion.textContent =
            `Phát hiện ${mismatchRows.length} bước `
            +
            "không phù hợp với quy tắc biến đổi.";
    }
}


// ======================================================
// RESET 4
// ======================================================

function resetChainValidation() {

    chainValidationResult.hidden =
        true;


    chainValidationStatus.textContent =
        "Chưa chạy";


    chainValidationChainCount.textContent =
        "—";


    chainValidationStepCount.textContent =
        "—";


    chainValidationMismatchCount.textContent =
        "—";


    chainValidationOverallStatus.textContent =
        "—";


    chainValidationTableBody.innerHTML =
        "";


    chainValidationConclusion.textContent =
        "";
}


// ======================================================
// EVENTS
// ======================================================

runDecayRuleValidationButton.addEventListener(
    "click",
    runDecayRuleValidation
);


resetDecayRuleValidationButton.addEventListener(
    "click",
    resetDecayRuleValidation
);


runDaughterValidationButton.addEventListener(
    "click",
    runDaughterValidation
);


resetDaughterValidationButton.addEventListener(
    "click",
    resetDaughterValidation
);


runIdentificationValidationButton.addEventListener(
    "click",
    runIdentificationValidation
);


resetIdentificationValidationButton.addEventListener(
    "click",
    resetIdentificationValidation
);


runChainValidationButton.addEventListener(
    "click",
    runChainValidation
);


resetChainValidationButton.addEventListener(
    "click",
    resetChainValidation
);


// ======================================================
// INITIALIZE
// ======================================================

resetDecayRuleValidation();


resetDaughterValidation();


resetIdentificationValidation();


resetChainValidation();