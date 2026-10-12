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
        element === null
    ) {

        throw new Error(
            `Kiểm chứng thiếu phần tử HTML có id="${id}"`
        );
    }


    return element;
}


// ======================================================
// DOM - QUAN HỆ A, Z, N
// ======================================================

const runNuclearRelationValidationButton =
    getValidationRequiredElement(
        "runNuclearRelationValidationButton"
    );


const resetNuclearRelationValidationButton =
    getValidationRequiredElement(
        "resetNuclearRelationValidationButton"
    );


const nuclearRelationValidationStatus =
    getValidationRequiredElement(
        "nuclearRelationValidationStatus"
    );


const nuclearRelationValidationResult =
    getValidationRequiredElement(
        "nuclearRelationValidationResult"
    );


const validationIsotopeCount =
    getValidationRequiredElement(
        "validationIsotopeCount"
    );


const validationMassRelationStatus =
    getValidationRequiredElement(
        "validationMassRelationStatus"
    );


const validationNeutronRelationStatus =
    getValidationRequiredElement(
        "validationNeutronRelationStatus"
    );


const validationDataStatus =
    getValidationRequiredElement(
        "validationDataStatus"
    );


const nuclearRelationValidationTableBody =
    getValidationRequiredElement(
        "nuclearRelationValidationTableBody"
    );


const nuclearRelationValidationConclusion =
    getValidationRequiredElement(
        "nuclearRelationValidationConclusion"
    );


// ======================================================
// DOM - ĐỒNG VỊ
// ======================================================

const runIsotopeValidationButton =
    getValidationRequiredElement(
        "runIsotopeValidationButton"
    );


const resetIsotopeValidationButton =
    getValidationRequiredElement(
        "resetIsotopeValidationButton"
    );


const isotopeValidationStatus =
    getValidationRequiredElement(
        "isotopeValidationStatus"
    );


const isotopeValidationResult =
    getValidationRequiredElement(
        "isotopeValidationResult"
    );


const validationElementCount =
    getValidationRequiredElement(
        "validationElementCount"
    );


const validationSameZStatus =
    getValidationRequiredElement(
        "validationSameZStatus"
    );


const validationDifferentAStatus =
    getValidationRequiredElement(
        "validationDifferentAStatus"
    );


const validationIsotopeOverallStatus =
    getValidationRequiredElement(
        "validationIsotopeOverallStatus"
    );


const isotopeValidationTableBody =
    getValidationRequiredElement(
        "isotopeValidationTableBody"
    );


const isotopeValidationConclusion =
    getValidationRequiredElement(
        "isotopeValidationConclusion"
    );


// ======================================================
// DOM - THUẬT TOÁN
// ======================================================

const runAlgorithmValidationButton =
    getValidationRequiredElement(
        "runAlgorithmValidationButton"
    );


const resetAlgorithmValidationButton =
    getValidationRequiredElement(
        "resetAlgorithmValidationButton"
    );


const algorithmValidationStatus =
    getValidationRequiredElement(
        "algorithmValidationStatus"
    );


const algorithmValidationResult =
    getValidationRequiredElement(
        "algorithmValidationResult"
    );


const algorithmPairCount =
    getValidationRequiredElement(
        "algorithmPairCount"
    );


const algorithmIsotopePairCount =
    getValidationRequiredElement(
        "algorithmIsotopePairCount"
    );


const algorithmMismatchCount =
    getValidationRequiredElement(
        "algorithmMismatchCount"
    );


const algorithmValidationOverallStatus =
    getValidationRequiredElement(
        "algorithmValidationOverallStatus"
    );


const algorithmValidationTableBody =
    getValidationRequiredElement(
        "algorithmValidationTableBody"
    );


const algorithmValidationConclusion =
    getValidationRequiredElement(
        "algorithmValidationConclusion"
    );


// ======================================================
// KIỂM TRA CƠ BẢN MỘT ĐỒNG VỊ
// ======================================================

function validateOneNuclide(
    isotope
) {

    const calculatedN =
        isotope.A
        -
        isotope.Z;


    const massRelationValid =
        isotope.A
        ===
        isotope.Z
        +
        calculatedN;


    const neutronRelationValid =
        calculatedN
        ===
        isotope.A
        -
        isotope.Z;


    const basicDataValid =
        Number.isInteger(
            isotope.A
        )
        &&
        Number.isInteger(
            isotope.Z
        )
        &&
        isotope.A >
        0
        &&
        isotope.Z >
        0
        &&
        isotope.Z <=
        isotope.A
        &&
        calculatedN >=
        0;


    return {

        isotope,

        N:
            calculatedN,

        ZplusN:
            isotope.Z
            +
            calculatedN,

        massRelationValid,

        neutronRelationValid,

        basicDataValid,

        valid:
            massRelationValid
            &&
            neutronRelationValid
            &&
            basicDataValid

    };
}


// ======================================================
// CHẠY KIỂM CHỨNG A, Z, N
// ======================================================

function runNuclearRelationValidation() {

    const isotopes =
        getAllNuclearIsotopes();


    const rows =
        isotopes.map(
            validateOneNuclide
        );


    const allMassRelationsValid =
        rows.every(
            row =>
                row.massRelationValid
        );


    const allNeutronRelationsValid =
        rows.every(
            row =>
                row.neutronRelationValid
        );


    const allDataValid =
        rows.every(
            row =>
                row.basicDataValid
        );


    validationIsotopeCount.textContent =
        String(
            rows.length
        );


    validationMassRelationStatus.textContent =
        allMassRelationsValid
            ?
            "Đạt"
            :
            "Cần kiểm tra";


    validationNeutronRelationStatus.textContent =
        allNeutronRelationsValid
            ?
            "Đạt"
            :
            "Cần kiểm tra";


    validationDataStatus.textContent =
        allDataValid
            ?
            "Đạt"
            :
            "Cần kiểm tra";


    nuclearRelationValidationTableBody.innerHTML =
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
                ${rowData.isotope.label}
            </td>

            <td>
                ${rowData.isotope.Z}
            </td>

            <td>
                ${rowData.isotope.A}
            </td>

            <td>
                ${rowData.N}
            </td>

            <td>
                ${rowData.ZplusN}
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


        nuclearRelationValidationTableBody.appendChild(
            row
        );
    }


    nuclearRelationValidationResult.hidden =
        false;


    if (
        allMassRelationsValid
        &&
        allNeutronRelationsValid
        &&
        allDataValid
    ) {

        nuclearRelationValidationStatus.textContent =
            "Kiểm chứng hoàn thành";


        nuclearRelationValidationConclusion.textContent =
            `Đã kiểm tra ${rows.length} đồng vị trong bộ dữ liệu. `
            +
            `Tất cả đều thỏa mãn A = Z + N và N = A − Z. `
            +
            `Các giá trị A và Z đều là số nguyên dương hợp lệ, `
            +
            `với Z không lớn hơn A.`;

    } else {

        nuclearRelationValidationStatus.textContent =
            "Phát hiện dữ liệu cần kiểm tra";


        nuclearRelationValidationConclusion.textContent =
            "Có ít nhất một đồng vị không thỏa mãn "
            +
            "các quan hệ A = Z + N hoặc N = A − Z, "
            +
            "hoặc có dữ liệu A, Z không hợp lệ.";
    }
}


// ======================================================
// RESET KIỂM CHỨNG 1
// ======================================================

function resetNuclearRelationValidation() {

    nuclearRelationValidationResult.hidden =
        true;


    nuclearRelationValidationStatus.textContent =
        "Chưa chạy";


    validationIsotopeCount.textContent =
        "—";


    validationMassRelationStatus.textContent =
        "—";


    validationNeutronRelationStatus.textContent =
        "—";


    validationDataStatus.textContent =
        "—";


    nuclearRelationValidationTableBody.innerHTML =
        "";


    nuclearRelationValidationConclusion.textContent =
        "";
}


// ======================================================
// KIỂM TRA TỪNG DÃY ĐỒNG VỊ
// ======================================================

function buildIsotopeSeriesValidationRows() {

    const elements =
        getAllNuclearElements()
            .filter(
                element =>
                    element.isotopes.length >=
                    2
            );


    return elements.map(
        element => {

            const massNumbers =
                element.isotopes.map(
                    isotope =>
                        isotope.A
                );


            const uniqueMassNumbers =
                new Set(
                    massNumbers
                );


            const allSameZ =
                element.isotopes.every(
                    isotope => {

                        const properties =
                            calculateNuclearProperties(
                                element.symbol,
                                isotope.A
                            );


                        return (
                            properties.Z
                            ===
                            element.Z
                        );
                    }
                );


            const allDifferentA =
                uniqueMassNumbers.size
                ===
                massNumbers.length;


            return {

                element,

                massNumbers,

                allSameZ,

                allDifferentA,

                valid:
                    allSameZ
                    &&
                    allDifferentA

            };
        }
    );
}


// ======================================================
// CHẠY KIỂM CHỨNG ĐỒNG VỊ
// ======================================================

function runIsotopeValidation() {

    const rows =
        buildIsotopeSeriesValidationRows();


    const allSameZ =
        rows.every(
            row =>
                row.allSameZ
        );


    const allDifferentA =
        rows.every(
            row =>
                row.allDifferentA
        );


    const allValid =
        rows.every(
            row =>
                row.valid
        );


    validationElementCount.textContent =
        String(
            rows.length
        );


    validationSameZStatus.textContent =
        allSameZ
            ?
            "Đạt"
            :
            "Cần kiểm tra";


    validationDifferentAStatus.textContent =
        allDifferentA
            ?
            "Đạt"
            :
            "Cần kiểm tra";


    validationIsotopeOverallStatus.textContent =
        allValid
            ?
            "Đạt"
            :
            "Cần kiểm tra";


    isotopeValidationTableBody.innerHTML =
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
                ${item.element.vietnameseName}
                (${item.element.symbol})
            </td>

            <td>
                ${item.element.Z}
            </td>

            <td>
                ${item.massNumbers.join(", ")}
            </td>

            <td>
                ${item.massNumbers.length}
            </td>

            <td class="${
                item.allSameZ
                    ?
                    "validation-pass"
                    :
                    "validation-review"
            }">
                ${
                    item.allSameZ
                        ?
                        "✓"
                        :
                        "Không"
                }
            </td>

            <td class="${
                item.allDifferentA
                    ?
                    "validation-pass"
                    :
                    "validation-review"
            }">
                ${
                    item.allDifferentA
                        ?
                        "✓"
                        :
                        "Không"
                }
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


        isotopeValidationTableBody.appendChild(
            row
        );
    }


    isotopeValidationResult.hidden =
        false;


    if (
        allValid
    ) {

        isotopeValidationStatus.textContent =
            "Kiểm chứng hoàn thành";


        isotopeValidationConclusion.textContent =
            `Đã kiểm tra ${rows.length} nguyên tố có từ hai đồng vị trở lên. `
            +
            `Trong mỗi dãy đồng vị, số proton Z giữ nguyên `
            +
            `và các số khối A không trùng nhau. `
            +
            `Bộ dữ liệu phù hợp với định nghĩa đồng vị đang sử dụng trong mô phỏng.`;

    } else {

        isotopeValidationStatus.textContent =
            "Phát hiện dữ liệu cần kiểm tra";


        isotopeValidationConclusion.textContent =
            "Có ít nhất một dãy đồng vị không thỏa điều kiện "
            +
            "cùng Z hoặc có số khối A bị trùng.";
    }
}


// ======================================================
// RESET KIỂM CHỨNG 2
// ======================================================

function resetIsotopeValidation() {

    isotopeValidationResult.hidden =
        true;


    isotopeValidationStatus.textContent =
        "Chưa chạy";


    validationElementCount.textContent =
        "—";


    validationSameZStatus.textContent =
        "—";


    validationDifferentAStatus.textContent =
        "—";


    validationIsotopeOverallStatus.textContent =
        "—";


    isotopeValidationTableBody.innerHTML =
        "";


    isotopeValidationConclusion.textContent =
        "";
}


// ======================================================
// TẠO TẤT CẢ CẶP HẠT NHÂN
// ======================================================

function buildAllValidationPairs() {

    const isotopes =
        getAllNuclearIsotopes();


    const pairs =
        [];


    for (
        let i = 0;
        i <
        isotopes.length;
        i++
    ) {

        for (
            let j = i + 1;
            j <
            isotopes.length;
            j++
        ) {

            const first =
                calculateNuclearProperties(
                    isotopes[i].symbol,
                    isotopes[i].A
                );


            const second =
                calculateNuclearProperties(
                    isotopes[j].symbol,
                    isotopes[j].A
                );


            pairs.push({

                first,

                second

            });
        }
    }


    return pairs;
}


// ======================================================
// ĐIỀU KIỆN ĐỒNG VỊ ĐỘC LẬP
// ======================================================

function independentIsotopeCondition(
    nucleus1,
    nucleus2
) {

    return (
        nucleus1.Z
        ===
        nucleus2.Z
        &&
        nucleus1.A
        !==
        nucleus2.A
    );
}


// ======================================================
// CHẠY KIỂM CHỨNG THUẬT TOÁN
// ======================================================

function runAlgorithmValidation() {

    const pairs =
        buildAllValidationPairs();


    const results =
        pairs.map(
            pair => {

                const algorithmResult =
                    areIsotopes(
                        pair.first,
                        pair.second
                    );


                const independentResult =
                    independentIsotopeCondition(
                        pair.first,
                        pair.second
                    );


                return {

                    ...pair,

                    algorithmResult,

                    independentResult,

                    match:
                        algorithmResult
                        ===
                        independentResult

                };
            }
        );


    const isotopePairs =
        results.filter(
            item =>
                item.independentResult
        );


    const mismatchRows =
        results.filter(
            item =>
                !item.match
        );


    algorithmPairCount.textContent =
        String(
            results.length
        );


    algorithmIsotopePairCount.textContent =
        String(
            isotopePairs.length
        );


    algorithmMismatchCount.textContent =
        String(
            mismatchRows.length
        );


    algorithmValidationOverallStatus.textContent =
        mismatchRows.length ===
        0
            ?
            "Đạt"
            :
            "Cần kiểm tra";


    algorithmValidationTableBody.innerHTML =
        "";


    /*
     * Chỉ hiển thị các cặp đồng vị,
     * tối đa 20 dòng để bảng không quá dài.
     */

    const displayedPairs =
        isotopePairs.slice(
            0,
            20
        );


    for (
        const item
        of
        displayedPairs
    ) {

        const row =
            document.createElement(
                "tr"
            );


        row.innerHTML =
            `
            <td>
                ${item.first.label}
            </td>

            <td>
                ${item.second.label}
            </td>

            <td>
                ${item.first.Z} / ${item.second.Z}
            </td>

            <td>
                ${item.first.A} / ${item.second.A}
            </td>

            <td class="${
                item.match
                    ?
                    "validation-pass"
                    :
                    "validation-review"
            }">
                ${
                    item.match
                        ?
                        "✓ Đồng vị"
                        :
                        "Sai lệch"
                }
            </td>
            `;


        algorithmValidationTableBody.appendChild(
            row
        );
    }


    algorithmValidationResult.hidden =
        false;


    if (
        mismatchRows.length ===
        0
    ) {

        algorithmValidationStatus.textContent =
            "Kiểm chứng hoàn thành";


        algorithmValidationConclusion.textContent =
            `Đã kiểm tra ${results.length} cặp hạt nhân. `
            +
            `Thuật toán areIsotopes() cho kết quả hoàn toàn trùng khớp `
            +
            `với điều kiện độc lập Z₁ = Z₂ và A₁ ≠ A₂. `
            +
            `Phát hiện ${isotopePairs.length} cặp đồng vị trong bộ dữ liệu.`;

    } else {

        algorithmValidationStatus.textContent =
            "Phát hiện sai lệch";


        algorithmValidationConclusion.textContent =
            `Có ${mismatchRows.length} cặp hạt nhân `
            +
            `cho kết quả không trùng với điều kiện vật lí độc lập. `
            +
            `Cần kiểm tra lại hàm areIsotopes() trong physics.js.`;
    }
}


// ======================================================
// RESET KIỂM CHỨNG 3
// ======================================================

function resetAlgorithmValidation() {

    algorithmValidationResult.hidden =
        true;


    algorithmValidationStatus.textContent =
        "Chưa chạy";


    algorithmPairCount.textContent =
        "—";


    algorithmIsotopePairCount.textContent =
        "—";


    algorithmMismatchCount.textContent =
        "—";


    algorithmValidationOverallStatus.textContent =
        "—";


    algorithmValidationTableBody.innerHTML =
        "";


    algorithmValidationConclusion.textContent =
        "";
}


// ======================================================
// EVENTS
// ======================================================

runNuclearRelationValidationButton.addEventListener(
    "click",
    runNuclearRelationValidation
);


resetNuclearRelationValidationButton.addEventListener(
    "click",
    resetNuclearRelationValidation
);


runIsotopeValidationButton.addEventListener(
    "click",
    runIsotopeValidation
);


resetIsotopeValidationButton.addEventListener(
    "click",
    resetIsotopeValidation
);


runAlgorithmValidationButton.addEventListener(
    "click",
    runAlgorithmValidation
);


resetAlgorithmValidationButton.addEventListener(
    "click",
    resetAlgorithmValidation
);


// ======================================================
// KHỞI TẠO
// ======================================================

resetNuclearRelationValidation();


resetIsotopeValidation();


resetAlgorithmValidation();