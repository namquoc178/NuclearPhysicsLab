console.log(
    "TASK3.JS - NUCLEAR STRUCTURE ISOTOPE SERIES VERSION 1"
);


// ======================================================
// DOM AN TOÀN
// ======================================================

function getTask3RequiredElement(
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
            `Nhiệm vụ 3 thiếu phần tử HTML có id="${id}"`
        );
    }


    return element;
}


// ======================================================
// DOM
// ======================================================

const task3ElementSelect =
    getTask3RequiredElement(
        "task3ElementSelect"
    );


const task3ElementName =
    getTask3RequiredElement(
        "task3ElementName"
    );


const task3ElementSymbol =
    getTask3RequiredElement(
        "task3ElementSymbol"
    );


const task3ElementZ =
    getTask3RequiredElement(
        "task3ElementZ"
    );


const task3IsotopeCount =
    getTask3RequiredElement(
        "task3IsotopeCount"
    );


const task3TableBody =
    getTask3RequiredElement(
        "task3TableBody"
    );


const task3ConstantQuantitySelect =
    getTask3RequiredElement(
        "task3ConstantQuantitySelect"
    );


const task3ChangingQuantitySelect =
    getTask3RequiredElement(
        "task3ChangingQuantitySelect"
    );


const task3DefinitionSelect =
    getTask3RequiredElement(
        "task3DefinitionSelect"
    );


const task3ConstantQuantityFeedback =
    getTask3RequiredElement(
        "task3ConstantQuantityFeedback"
    );


const task3ChangingQuantityFeedback =
    getTask3RequiredElement(
        "task3ChangingQuantityFeedback"
    );


const task3DefinitionFeedback =
    getTask3RequiredElement(
        "task3DefinitionFeedback"
    );


const task3DifferencePrompt =
    getTask3RequiredElement(
        "task3DifferencePrompt"
    );


const task3DeltaAInput =
    getTask3RequiredElement(
        "task3DeltaAInput"
    );


const task3DeltaNInput =
    getTask3RequiredElement(
        "task3DeltaNInput"
    );


const task3DeltaAFeedback =
    getTask3RequiredElement(
        "task3DeltaAFeedback"
    );


const task3DeltaNFeedback =
    getTask3RequiredElement(
        "task3DeltaNFeedback"
    );


const checkTask3Button =
    getTask3RequiredElement(
        "checkTask3Button"
    );


const resetTask3Button =
    getTask3RequiredElement(
        "resetTask3Button"
    );


const task3Status =
    getTask3RequiredElement(
        "task3Status"
    );


const task3Result =
    getTask3RequiredElement(
        "task3Result"
    );


const task3SummaryZ =
    getTask3RequiredElement(
        "task3SummaryZ"
    );


const task3MinimumN =
    getTask3RequiredElement(
        "task3MinimumN"
    );


const task3MaximumN =
    getTask3RequiredElement(
        "task3MaximumN"
    );


const task3ARange =
    getTask3RequiredElement(
        "task3ARange"
    );


const task3Solution =
    getTask3RequiredElement(
        "task3Solution"
    );


const task3Conclusion =
    getTask3RequiredElement(
        "task3Conclusion"
    );


// ======================================================
// TRẠNG THÁI
// ======================================================

let task3CurrentElement =
    null;


let task3CurrentIsotopes =
    [];


// ======================================================
// CÁC NGUYÊN TỐ PHÙ HỢP
//
// Ưu tiên nguyên tố có ít nhất 3 đồng vị,
// để học sinh quan sát được cả một dãy.
// ======================================================

function getTask3EligibleElements() {

    return getAllNuclearElements()
        .filter(
            element =>
                element.isotopes.length >=
                3
        );
}


// ======================================================
// POPULATE SELECT
// ======================================================

function populateTask3ElementSelect() {

    task3ElementSelect.innerHTML =
        "";


    const elements =
        getTask3EligibleElements();


    for (
        const element
        of
        elements
    ) {

        const option =
            document.createElement(
                "option"
            );


        option.value =
            element.symbol;


        option.textContent =
            `${element.vietnameseName} (${element.symbol})`;


        task3ElementSelect.appendChild(
            option
        );
    }
}


// ======================================================
// TẠO DỮ LIỆU ĐỒNG VỊ
// ======================================================

function buildTask3IsotopeData(
    element
) {

    return element.isotopes
        .map(
            isotope =>
                calculateNuclearProperties(
                    element.symbol,
                    isotope.A
                )
        )
        .sort(
            (
                a,
                b
            ) =>
                a.A - b.A
        );
}


// ======================================================
// NHÃN TRẠNG THÁI
// ======================================================

function getTask3CategoryLabel(
    category
) {

    if (
        category ===
        "stable"
    ) {

        return "Bền";
    }


    if (
        category ===
        "radioactive"
    ) {

        return "Phóng xạ";
    }


    return "—";
}


// ======================================================
// TẠO BẢNG
// ======================================================

function buildTask3Table() {

    task3TableBody.innerHTML =
        "";


    task3CurrentIsotopes.forEach(
        (
            isotope,
            index
        ) => {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML =
                `
                <td>
                    ${isotope.notationHtml}
                    <br>
                    <small>${isotope.label}</small>
                </td>

                <td>
                    ${isotope.A}
                </td>

                <td>
                    <input
                        type="number"
                        class="task3-z-input"
                        data-index="${index}"
                        placeholder="Z"
                    >
                </td>

                <td>
                    <input
                        type="number"
                        class="task3-n-input"
                        data-index="${index}"
                        placeholder="N"
                    >
                </td>

                <td>
                    ${getTask3CategoryLabel(
                        isotope.category
                    )}
                </td>

                <td>
                    <span
                        class="task3-row-feedback"
                        data-index="${index}"
                    >
                    </span>
                </td>
                `;


            task3TableBody.appendChild(
                row
            );
        }
    );
}


// ======================================================
// CẬP NHẬT THÔNG TIN
// ======================================================

function updateTask3ElementInformation() {

    task3ElementName.textContent =
        task3CurrentElement.vietnameseName;


    task3ElementSymbol.textContent =
        task3CurrentElement.symbol;


    task3ElementZ.textContent =
        String(
            task3CurrentElement.Z
        );


    task3IsotopeCount.textContent =
        String(
            task3CurrentIsotopes.length
        );


    const first =
        task3CurrentIsotopes[0];


    const last =
        task3CurrentIsotopes[
            task3CurrentIsotopes.length - 1
        ];


    task3DifferencePrompt.innerHTML =
        `So sánh `
        +
        `<strong>${first.label}</strong> `
        +
        `và `
        +
        `<strong>${last.label}</strong>.`;
}


// ======================================================
// CLEAR FEEDBACK
// ======================================================

function clearTask3FeedbackElement(
    element
) {

    element.textContent =
        "";


    element.classList.remove(
        "correct",
        "review",
        "invalid"
    );
}


function clearTask3GeneralFeedback() {

    const elements =
    [
        task3ConstantQuantityFeedback,
        task3ChangingQuantityFeedback,
        task3DefinitionFeedback,
        task3DeltaAFeedback,
        task3DeltaNFeedback
    ];


    for (
        const element
        of
        elements
    ) {

        clearTask3FeedbackElement(
            element
        );
    }
}


// ======================================================
// RESET ANSWERS
// ======================================================

function resetTask3Answers() {

    const zInputs =
        document.querySelectorAll(
            ".task3-z-input"
        );


    const nInputs =
        document.querySelectorAll(
            ".task3-n-input"
        );


    const rowFeedbacks =
        document.querySelectorAll(
            ".task3-row-feedback"
        );


    zInputs.forEach(
        input => {

            input.value =
                "";
        }
    );


    nInputs.forEach(
        input => {

            input.value =
                "";
        }
    );


    rowFeedbacks.forEach(
        feedback => {

            feedback.textContent =
                "";


            feedback.classList.remove(
                "correct",
                "review"
            );
        }
    );


    task3ConstantQuantitySelect.value =
        "";


    task3ChangingQuantitySelect.value =
        "";


    task3DefinitionSelect.value =
        "";


    task3DeltaAInput.value =
        "";


    task3DeltaNInput.value =
        "";


    clearTask3GeneralFeedback();


    task3Result.hidden =
        true;


    task3Status.textContent =
        "Chờ học sinh thực hiện";
}


// ======================================================
// CHỌN NGUYÊN TỐ
// ======================================================

function selectTask3Element(
    symbol
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


    task3CurrentElement =
        element;


    task3CurrentIsotopes =
        buildTask3IsotopeData(
            element
        );


    updateTask3ElementInformation();


    buildTask3Table();


    resetTask3Answers();
}


// ======================================================
// KIỂM TRA MỖI DÒNG
// ======================================================

function checkTask3Rows() {

    const zInputs =
        document.querySelectorAll(
            ".task3-z-input"
        );


    const nInputs =
        document.querySelectorAll(
            ".task3-n-input"
        );


    const feedbacks =
        document.querySelectorAll(
            ".task3-row-feedback"
        );


    let correctItems =
        0;


    let totalItems =
        0;


    task3CurrentIsotopes.forEach(
        (
            isotope,
            index
        ) => {

            const zValue =
                Number(
                    zInputs[index].value
                );


            const nValue =
                Number(
                    nInputs[index].value
                );


            const zCorrect =
                zInputs[index].value.trim() !==
                ""
                &&
                zValue ===
                isotope.Z;


            const nCorrect =
                nInputs[index].value.trim() !==
                ""
                &&
                nValue ===
                isotope.N;


            totalItems +=
                2;


            if (
                zCorrect
            ) {

                correctItems++;
            }


            if (
                nCorrect
            ) {

                correctItems++;
            }


            feedbacks[index].classList.remove(
                "correct",
                "review"
            );


            if (
                zCorrect
                &&
                nCorrect
            ) {

                feedbacks[index].textContent =
                    "✓ Đúng";


                feedbacks[index].classList.add(
                    "correct"
                );

            } else {

                feedbacks[index].textContent =
                    "Kiểm tra lại";


                feedbacks[index].classList.add(
                    "review"
                );
            }
        }
    );


    return {

        correctItems,

        totalItems

    };
}


// ======================================================
// KIỂM TRA SELECT
// ======================================================

function evaluateTask3Choice(
    select,
    expected,
    feedback
) {

    clearTask3FeedbackElement(
        feedback
    );


    if (
        select.value ===
        ""
    ) {

        feedback.textContent =
            "Em chưa chọn câu trả lời.";


        feedback.classList.add(
            "invalid"
        );


        return false;
    }


    if (
        select.value ===
        expected
    ) {

        feedback.textContent =
            "✓ Nhận xét phù hợp.";


        feedback.classList.add(
            "correct"
        );


        return true;
    }


    feedback.textContent =
        "Hãy quan sát lại bảng đồng vị.";


    feedback.classList.add(
        "review"
    );


    return false;
}


// ======================================================
// KIỂM TRA NUMBER
// ======================================================

function evaluateTask3Number(
    input,
    expected,
    feedback
) {

    clearTask3FeedbackElement(
        feedback
    );


    if (
        input.value.trim() ===
        ""
    ) {

        feedback.textContent =
            "Chưa nhập kết quả.";


        feedback.classList.add(
            "invalid"
        );


        return false;
    }


    if (
        Number(
            input.value
        )
        ===
        expected
    ) {

        feedback.textContent =
            "✓ Chính xác.";


        feedback.classList.add(
            "correct"
        );


        return true;
    }


    feedback.textContent =
        "Hãy tính lại.";


    feedback.classList.add(
        "review"
    );


    return false;
}


// ======================================================
// HIỂN THỊ LỜI GIẢI
// ======================================================

function showTask3Solution() {

    const first =
        task3CurrentIsotopes[0];


    const last =
        task3CurrentIsotopes[
            task3CurrentIsotopes.length - 1
        ];


    const neutronValues =
        task3CurrentIsotopes.map(
            isotope =>
                isotope.N
        );


    const minimumN =
        Math.min(
            ...neutronValues
        );


    const maximumN =
        Math.max(
            ...neutronValues
        );


    const deltaA =
        Math.abs(
            last.A -
            first.A
        );


    const deltaN =
        Math.abs(
            last.N -
            first.N
        );


    task3SummaryZ.textContent =
        String(
            task3CurrentElement.Z
        );


    task3MinimumN.textContent =
        String(
            minimumN
        );


    task3MaximumN.textContent =
        String(
            maximumN
        );


    task3ARange.textContent =
        String(
            deltaA
        );


    const rowsHtml =
        task3CurrentIsotopes
            .map(
                isotope =>
                    `
                    <p>
                        ${isotope.notationHtml}:
                        Z = ${isotope.Z},
                        N = ${isotope.A} − ${isotope.Z}
                        = <strong>${isotope.N}</strong>.
                    </p>
                    `
            )
            .join(
                ""
            );


    task3Solution.innerHTML =
        `
        ${rowsHtml}

        <p>
            Trong toàn bộ dãy:
            <strong>Z = ${task3CurrentElement.Z}</strong>
            không thay đổi.
        </p>

        <p>
            Khi A thay đổi,
            vì Z không đổi nên N cũng thay đổi.
        </p>

        <p>
            So sánh ${first.label}
            và ${last.label}:
        </p>

        <p>
            |ΔA|
            =
            |${last.A} − ${first.A}|
            =
            <strong>${deltaA}</strong>.
        </p>

        <p>
            |ΔN|
            =
            |${last.N} − ${first.N}|
            =
            <strong>${deltaN}</strong>.
        </p>

        <p>
            Do Z không đổi nên:
            <strong>|ΔA| = |ΔN|</strong>
            trong phép so sánh này.
        </p>
        `;
}


// ======================================================
// CHECK TASK
// ======================================================

function checkTask3() {

    if (
        task3CurrentIsotopes.length ===
        0
    ) {

        return;
    }


    const rowResult =
        checkTask3Rows();


    const resultConstant =
        evaluateTask3Choice(
            task3ConstantQuantitySelect,
            "z",
            task3ConstantQuantityFeedback
        );


    const resultChanging =
        evaluateTask3Choice(
            task3ChangingQuantitySelect,
            "correct",
            task3ChangingQuantityFeedback
        );


    const resultDefinition =
        evaluateTask3Choice(
            task3DefinitionSelect,
            "correct",
            task3DefinitionFeedback
        );


    const first =
        task3CurrentIsotopes[0];


    const last =
        task3CurrentIsotopes[
            task3CurrentIsotopes.length - 1
        ];


    const deltaA =
        Math.abs(
            last.A -
            first.A
        );


    const deltaN =
        Math.abs(
            last.N -
            first.N
        );


    const resultDeltaA =
        evaluateTask3Number(
            task3DeltaAInput,
            deltaA,
            task3DeltaAFeedback
        );


    const resultDeltaN =
        evaluateTask3Number(
            task3DeltaNInput,
            deltaN,
            task3DeltaNFeedback
        );


    const additionalResults =
    [
        resultConstant,
        resultChanging,
        resultDefinition,
        resultDeltaA,
        resultDeltaN
    ];


    const additionalCorrect =
        additionalResults.filter(
            value =>
                value
        ).length;


    const correctCount =
        rowResult.correctItems
        +
        additionalCorrect;


    const totalCount =
        rowResult.totalItems
        +
        additionalResults.length;


    showTask3Solution();


    task3Result.hidden =
        false;


    task3Status.textContent =
        `Đã kiểm tra: ${correctCount}/${totalCount} nội dung phù hợp.`;


    if (
        correctCount ===
        totalCount
    ) {

        task3Conclusion.textContent =
            `Trong dãy đồng vị của ${task3CurrentElement.vietnameseName}, `
            +
            `mọi hạt nhân đều có cùng Z = ${task3CurrentElement.Z}. `
            +
            `Số neutron N thay đổi nên số khối A cũng thay đổi. `
            +
            `Đó chính là đặc điểm cơ bản của các đồng vị của cùng một nguyên tố.`;

    } else {

        task3Conclusion.textContent =
            "Hãy chú ý rằng các đồng vị của cùng một nguyên tố "
            +
            "phải có cùng số proton Z. "
            +
            "Sự khác nhau nằm ở số neutron N, "
            +
            "vì vậy số khối A cũng khác nhau.";
    }
}


// ======================================================
// EVENTS
// ======================================================

task3ElementSelect.addEventListener(
    "change",

    () => {

        selectTask3Element(
            task3ElementSelect.value
        );
    }
);


checkTask3Button.addEventListener(
    "click",
    checkTask3
);


resetTask3Button.addEventListener(
    "click",
    resetTask3Answers
);


// ======================================================
// KHỞI TẠO
// ======================================================

populateTask3ElementSelect();


if (
    task3ElementSelect.options.length >
    0
) {

    task3ElementSelect.value =
        "C";


    if (
        task3ElementSelect.value !==
        "C"
    ) {

        task3ElementSelect.selectedIndex =
            0;
    }


    selectTask3Element(
        task3ElementSelect.value
    );
}