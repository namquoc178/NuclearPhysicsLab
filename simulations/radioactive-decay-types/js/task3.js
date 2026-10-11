console.log(
    "TASK3.JS - RADIOACTIVE DECAY CHAIN VERSION 1"
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

const task3InitialNotation =
    getTask3RequiredElement(
        "task3InitialNotation"
    );


const task3ChainName =
    getTask3RequiredElement(
        "task3ChainName"
    );


const task3DecaySequence =
    getTask3RequiredElement(
        "task3DecaySequence"
    );


const newTask3QuestionButton =
    getTask3RequiredElement(
        "newTask3QuestionButton"
    );


const task3StepTableBody =
    getTask3RequiredElement(
        "task3StepTableBody"
    );


const task3TotalDeltaAInput =
    getTask3RequiredElement(
        "task3TotalDeltaAInput"
    );


const task3TotalDeltaZInput =
    getTask3RequiredElement(
        "task3TotalDeltaZInput"
    );


const task3TotalDeltaAFeedback =
    getTask3RequiredElement(
        "task3TotalDeltaAFeedback"
    );


const task3TotalDeltaZFeedback =
    getTask3RequiredElement(
        "task3TotalDeltaZFeedback"
    );


const task3EquationOptions =
    getTask3RequiredElement(
        "task3EquationOptions"
    );


const task3EquationFeedback =
    getTask3RequiredElement(
        "task3EquationFeedback"
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


const task3InitialResult =
    getTask3RequiredElement(
        "task3InitialResult"
    );


const task3FinalResult =
    getTask3RequiredElement(
        "task3FinalResult"
    );


const task3CorrectDeltaA =
    getTask3RequiredElement(
        "task3CorrectDeltaA"
    );


const task3CorrectDeltaZ =
    getTask3RequiredElement(
        "task3CorrectDeltaZ"
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
// DỮ LIỆU CÁC CHUỖI
//
// Các chuỗi này chỉ phục vụ nhiệm vụ tổng hợp.
// Không thay đổi lõi dữ liệu của phần Khám phá.
// ======================================================

const TASK3_DECAY_CHAINS =
[

    // --------------------------------------------------
    // U-238 -> Th-234 -> Pa-234 -> U-234
    // --------------------------------------------------

    {

        id:
            "uranium238-series",

        name:
            "Một đoạn chuỗi phân rã của U-238",

        nuclei:
        [

            {
                A: 238,
                Z: 92,
                symbol: "U",
                excited: false
            },

            {
                A: 234,
                Z: 90,
                symbol: "Th",
                excited: false
            },

            {
                A: 234,
                Z: 91,
                symbol: "Pa",
                excited: false
            },

            {
                A: 234,
                Z: 92,
                symbol: "U",
                excited: false
            }

        ],

        decayTypes:
        [
            "alpha",
            "betaMinus",
            "betaMinus"
        ]

    },


    // --------------------------------------------------
    // Th-232 -> Ra-228 -> Ac-228 -> Th-228
    // --------------------------------------------------

    {

        id:
            "thorium232-series",

        name:
            "Một đoạn chuỗi phân rã của Th-232",

        nuclei:
        [

            {
                A: 232,
                Z: 90,
                symbol: "Th",
                excited: false
            },

            {
                A: 228,
                Z: 88,
                symbol: "Ra",
                excited: false
            },

            {
                A: 228,
                Z: 89,
                symbol: "Ac",
                excited: false
            },

            {
                A: 228,
                Z: 90,
                symbol: "Th",
                excited: false
            }

        ],

        decayTypes:
        [
            "alpha",
            "betaMinus",
            "betaMinus"
        ]

    },


    // --------------------------------------------------
    // Co-60 -> Ni-60* -> Ni-60
    // --------------------------------------------------

    {

        id:
            "cobalt60-series",

        name:
            "Biến đổi Co-60 và chuyển mức γ",

        nuclei:
        [

            {
                A: 60,
                Z: 27,
                symbol: "Co",
                excited: false
            },

            {
                A: 60,
                Z: 28,
                symbol: "Ni",
                excited: true
            },

            {
                A: 60,
                Z: 28,
                symbol: "Ni",
                excited: false
            }

        ],

        decayTypes:
        [
            "betaMinus",
            "gamma"
        ]

    },


    // --------------------------------------------------
    // Na-22 -> Ne-22* -> Ne-22
    // --------------------------------------------------

    {

        id:
            "sodium22-series",

        name:
            "Biến đổi Na-22 và chuyển mức γ",

        nuclei:
        [

            {
                A: 22,
                Z: 11,
                symbol: "Na",
                excited: false
            },

            {
                A: 22,
                Z: 10,
                symbol: "Ne",
                excited: true
            },

            {
                A: 22,
                Z: 10,
                symbol: "Ne",
                excited: false
            }

        ],

        decayTypes:
        [
            "betaPlus",
            "gamma"
        ]

    }

];


// ======================================================
// STATE
// ======================================================

let task3CurrentChain =
    null;


let task3PreviousChainId =
    null;


let task3SelectedEquation =
    null;


// ======================================================
// FORMAT
// ======================================================

function formatTask3Delta(
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
// KÍ HIỆU LOẠI PHÂN RÃ
// ======================================================

function getTask3DecaySymbol(
    type
) {

    const decayType =
        getDecayTypeById(
            type
        );


    return decayType
        ?
        decayType.symbol
        :
        "?";
}


// ======================================================
// RANDOM CHAIN
// ======================================================

function getRandomTask3Chain() {

    let pool =
        TASK3_DECAY_CHAINS;


    if (
        TASK3_DECAY_CHAINS.length >
        1
        &&
        task3PreviousChainId !==
        null
    ) {

        pool =
            TASK3_DECAY_CHAINS.filter(
                chain =>
                    chain.id !==
                    task3PreviousChainId
            );
    }


    const index =
        Math.floor(
            Math.random()
            *
            pool.length
        );


    return pool[index];
}


// ======================================================
// TẠO BẢNG NHẬP
// ======================================================

function buildTask3StepTable() {

    task3StepTableBody.innerHTML =
        "";


    task3CurrentChain.decayTypes.forEach(
        (
            decayType,
            index
        ) => {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML =
                `
                <td>
                    ${index + 1}
                </td>

                <td>
                    <span class="task3-step-symbol">
                        ${getTask3DecaySymbol(decayType)}
                    </span>
                </td>

                <td>
                    <input
                        type="number"
                        class="task3-step-a"
                        data-index="${index}"
                        placeholder="A"
                    >
                </td>

                <td>
                    <input
                        type="number"
                        class="task3-step-z"
                        data-index="${index}"
                        placeholder="Z"
                    >
                </td>

                <td>
                    <input
                        type="number"
                        class="task3-step-n"
                        data-index="${index}"
                        placeholder="N"
                    >
                </td>

                <td>
                    <span
                        class="task3-step-feedback"
                        data-index="${index}"
                    >
                    </span>
                </td>
                `;


            task3StepTableBody.appendChild(
                row
            );
        }
    );
}


// ======================================================
// TẠO MỘT BƯỚC PHƯƠNG TRÌNH
// ======================================================

function buildTask3ChainStepHtml(
    parent,
    daughter,
    decayType,
    stepNumber
) {

    return (
        `<div class="task3-chain-step">`

        +

        `<span class="task3-step-number">`
        +
        `Bước ${stepNumber}:`
        +
        `</span>`

        +

        `<span>`
        +
        `${buildDecayNuclearNotationHtml(parent)}`
        +
        `</span>`

        +

        `<span>→</span>`

        +

        `<span>`
        +
        `${buildDecayNuclearNotationHtml(daughter)}`
        +
        `</span>`

        +

        `<span>+</span>`

        +

        `<span>`
        +
        `${getDecayEmissionNotationHtml(decayType)}`
        +
        `</span>`

        +

        `</div>`
    );
}


// ======================================================
// TẠO HTML TOÀN CHUỖI
// ======================================================

function buildTask3FullChainHtml(
    chain
) {

    let html =
        "";


    for (
        let i = 0;
        i <
        chain.decayTypes.length;
        i++
    ) {

        html +=
            buildTask3ChainStepHtml(
                chain.nuclei[i],
                chain.nuclei[i + 1],
                chain.decayTypes[i],
                i + 1
            );
    }


    return html;
}


// ======================================================
// COPY CHAIN
// ======================================================

function cloneTask3Chain(
    chain
) {

    return JSON.parse(
        JSON.stringify(
            chain
        )
    );
}


// ======================================================
// TẠO ĐÁP ÁN NHIỄU
// ======================================================

function buildTask3WrongChain(
    mode
) {

    const wrong =
        cloneTask3Chain(
            task3CurrentChain
        );


    if (
        mode ===
        "wrong-a"
    ) {

        /*
         * Làm sai số khối của hạt nhân
         * sau bước đầu.
         */

        wrong.nuclei[1].A +=
            1;

    } else if (
        mode ===
        "wrong-z"
    ) {

        /*
         * Làm sai Z của hạt nhân
         * sau bước đầu.
         */

        wrong.nuclei[1].Z +=
            1;

    } else if (
        mode ===
        "wrong-final"
    ) {

        /*
         * Làm sai hạt nhân cuối.
         */

        const lastIndex =
            wrong.nuclei.length - 1;


        wrong.nuclei[lastIndex].A +=
            1;
    }


    return wrong;
}


// ======================================================
// BUILD EQUATION CARDS
// ======================================================

function buildTask3EquationOptions() {

    task3EquationOptions.innerHTML =
        "";


    task3SelectedEquation =
        null;


    const choices =
    [

        {
            value:
                "correct",

            chain:
                task3CurrentChain
        },

        {
            value:
                "wrong-a",

            chain:
                buildTask3WrongChain(
                    "wrong-a"
                )
        },

        {
            value:
                "wrong-z",

            chain:
                buildTask3WrongChain(
                    "wrong-z"
                )
        },

        {
            value:
                "wrong-final",

            chain:
                buildTask3WrongChain(
                    "wrong-final"
                )
        }

    ];


    // Fisher-Yates shuffle

    for (
        let i =
            choices.length - 1;

        i >
        0;

        i--
    ) {

        const j =
            Math.floor(
                Math.random()
                *
                (
                    i + 1
                )
            );


        [
            choices[i],
            choices[j]
        ]
        =
        [
            choices[j],
            choices[i]
        ];
    }


    const letters =
    [
        "A",
        "B",
        "C",
        "D"
    ];


    choices.forEach(
        (
            choice,
            index
        ) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "task3-equation-option";


            button.dataset.value =
                choice.value;


            button.innerHTML =
                `
                <span class="task3-equation-letter">
                    ${letters[index]}
                </span>

                <span class="task3-chain-expression">

                    ${
                        buildTask3FullChainHtml(
                            choice.chain
                        )
                    }

                </span>
                `;


            button.addEventListener(
                "click",

                () => {

                    selectTask3Equation(
                        button
                    );
                }
            );


            task3EquationOptions.appendChild(
                button
            );
        }
    );
}


// ======================================================
// CHỌN EQUATION
// ======================================================

function selectTask3Equation(
    selectedButton
) {

    const buttons =
        task3EquationOptions.querySelectorAll(
            ".task3-equation-option"
        );


    buttons.forEach(
        button => {

            button.classList.remove(
                "selected",
                "correct-answer",
                "wrong-answer"
            );
        }
    );


    selectedButton.classList.add(
        "selected"
    );


    task3SelectedEquation =
        selectedButton.dataset.value;


    clearTask3Feedback(
        task3EquationFeedback
    );
}


// ======================================================
// DISPLAY QUESTION
// ======================================================

function updateTask3QuestionDisplay() {

    const initial =
        task3CurrentChain.nuclei[0];


    task3InitialNotation.innerHTML =
        buildDecayNuclearNotationHtml(
            initial
        );


    task3ChainName.textContent =
        task3CurrentChain.name;


    task3DecaySequence.innerHTML =
        task3CurrentChain.decayTypes
            .map(
                type =>
                    getTask3DecaySymbol(
                        type
                    )
            )
            .join(
                " &nbsp;→&nbsp; "
            );


    buildTask3StepTable();


    buildTask3EquationOptions();
}


// ======================================================
// CLEAR FEEDBACK
// ======================================================

function clearTask3Feedback(
    feedback
) {

    feedback.textContent =
        "";


    feedback.classList.remove(
        "correct",
        "review",
        "invalid"
    );
}


// ======================================================
// RESET ANSWERS
// ======================================================

function resetTask3Answers() {

    document
        .querySelectorAll(
            ".task3-step-a, .task3-step-z, .task3-step-n"
        )
        .forEach(
            input => {

                input.value =
                    "";
            }
        );


    document
        .querySelectorAll(
            ".task3-step-feedback"
        )
        .forEach(
            feedback => {

                feedback.textContent =
                    "";


                feedback.classList.remove(
                    "correct",
                    "review"
                );
            }
        );


    task3TotalDeltaAInput.value =
        "";


    task3TotalDeltaZInput.value =
        "";


    clearTask3Feedback(
        task3TotalDeltaAFeedback
    );


    clearTask3Feedback(
        task3TotalDeltaZFeedback
    );


    clearTask3Feedback(
        task3EquationFeedback
    );


    task3SelectedEquation =
        null;


    task3EquationOptions
        .querySelectorAll(
            ".task3-equation-option"
        )
        .forEach(
            button => {

                button.classList.remove(
                    "selected",
                    "correct-answer",
                    "wrong-answer"
                );
            }
        );


    task3Result.hidden =
        true;


    task3Status.textContent =
        "Chờ học sinh thực hiện";
}


// ======================================================
// NEW QUESTION
// ======================================================

function generateTask3Question() {

    task3CurrentChain =
        getRandomTask3Chain();


    task3PreviousChainId =
        task3CurrentChain.id;


    updateTask3QuestionDisplay();


    resetTask3Answers();
}


// ======================================================
// CHECK STEP TABLE
// ======================================================

function checkTask3Steps() {

    const aInputs =
        document.querySelectorAll(
            ".task3-step-a"
        );


    const zInputs =
        document.querySelectorAll(
            ".task3-step-z"
        );


    const nInputs =
        document.querySelectorAll(
            ".task3-step-n"
        );


    const feedbacks =
        document.querySelectorAll(
            ".task3-step-feedback"
        );


    let correct =
        0;


    let total =
        0;


    task3CurrentChain.decayTypes.forEach(
        (
            decayType,
            index
        ) => {

            /*
             * nucleus[index + 1]
             * chính là hạt nhân được tạo thành
             * sau bước index.
             */

            const expected =
                task3CurrentChain.nuclei[
                    index + 1
                ];


            const expectedN =
                expected.A
                -
                expected.Z;


            const aCorrect =
                aInputs[index].value.trim() !==
                ""
                &&
                Number(
                    aInputs[index].value
                )
                ===
                expected.A;


            const zCorrect =
                zInputs[index].value.trim() !==
                ""
                &&
                Number(
                    zInputs[index].value
                )
                ===
                expected.Z;


            const nCorrect =
                nInputs[index].value.trim() !==
                ""
                &&
                Number(
                    nInputs[index].value
                )
                ===
                expectedN;


            total +=
                3;


            if (
                aCorrect
            ) {

                correct++;
            }


            if (
                zCorrect
            ) {

                correct++;
            }


            if (
                nCorrect
            ) {

                correct++;
            }


            feedbacks[index]
                .classList.remove(
                    "correct",
                    "review"
                );


            if (
                aCorrect
                &&
                zCorrect
                &&
                nCorrect
            ) {

                feedbacks[index].textContent =
                    "✓ Đúng";


                feedbacks[index]
                    .classList.add(
                        "correct"
                    );

            } else {

                feedbacks[index].textContent =
                    "Kiểm tra lại";


                feedbacks[index]
                    .classList.add(
                        "review"
                    );
            }
        }
    );


    return {

        correct,

        total

    };
}


// ======================================================
// TOTAL DELTA
// ======================================================

function getTask3TotalDelta() {

    const first =
        task3CurrentChain.nuclei[0];


    const last =
        task3CurrentChain.nuclei[
            task3CurrentChain.nuclei.length - 1
        ];


    return {

        deltaA:
            last.A
            -
            first.A,

        deltaZ:
            last.Z
            -
            first.Z

    };
}


// ======================================================
// CHECK NUMBER
// ======================================================

function evaluateTask3Number(
    input,
    expected,
    feedback
) {

    clearTask3Feedback(
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
        "Hãy kiểm tra lại.";


    feedback.classList.add(
        "review"
    );


    return false;
}


// ======================================================
// CHECK EQUATION CARD
// ======================================================

function evaluateTask3Equation() {

    clearTask3Feedback(
        task3EquationFeedback
    );


    const buttons =
        task3EquationOptions.querySelectorAll(
            ".task3-equation-option"
        );


    buttons.forEach(
        button => {

            button.classList.remove(
                "correct-answer",
                "wrong-answer"
            );
        }
    );


    if (
        task3SelectedEquation ===
        null
    ) {

        task3EquationFeedback.textContent =
            "Bạn chưa chọn chuỗi phương trình.";


        task3EquationFeedback.classList.add(
            "invalid"
        );


        return false;
    }


    let selectedButton =
        null;


    let correctButton =
        null;


    buttons.forEach(
        button => {

            if (
                button.dataset.value ===
                task3SelectedEquation
            ) {

                selectedButton =
                    button;
            }


            if (
                button.dataset.value ===
                "correct"
            ) {

                correctButton =
                    button;
            }
        }
    );


    if (
        task3SelectedEquation ===
        "correct"
    ) {

        selectedButton?.classList.add(
            "correct-answer"
        );


        task3EquationFeedback.textContent =
            "✓ Chuỗi phương trình chính xác.";


        task3EquationFeedback.classList.add(
            "correct"
        );


        return true;
    }


    selectedButton?.classList.add(
        "wrong-answer"
    );


    correctButton?.classList.add(
        "correct-answer"
    );


    task3EquationFeedback.textContent =
        "Chưa đúng. Phương án viền xanh là chuỗi phù hợp.";


    task3EquationFeedback.classList.add(
        "review"
    );


    return false;
}


// ======================================================
// SOLUTION
// ======================================================

function showTask3Solution() {

    const first =
        task3CurrentChain.nuclei[0];


    const last =
        task3CurrentChain.nuclei[
            task3CurrentChain.nuclei.length - 1
        ];


    const totalDelta =
        getTask3TotalDelta();


    task3InitialResult.innerHTML =
        buildDecayNuclearNotationHtml(
            first
        );


    task3FinalResult.innerHTML =
        buildDecayNuclearNotationHtml(
            last
        );


    task3CorrectDeltaA.textContent =
        formatTask3Delta(
            totalDelta.deltaA
        );


    task3CorrectDeltaZ.textContent =
        formatTask3Delta(
            totalDelta.deltaZ
        );


    let solutionHtml =
        "";


    task3CurrentChain.decayTypes.forEach(
        (
            decayType,
            index
        ) => {

            const parent =
                task3CurrentChain.nuclei[
                    index
                ];


            const daughter =
                task3CurrentChain.nuclei[
                    index + 1
                ];


            const parentN =
                parent.A
                -
                parent.Z;


            const daughterN =
                daughter.A
                -
                daughter.Z;


            const deltaA =
                daughter.A
                -
                parent.A;


            const deltaZ =
                daughter.Z
                -
                parent.Z;


            solutionHtml +=
                `
                <div class="task3-solution-step">

                    <strong>
                        Bước ${index + 1}:
                        ${getTask3DecaySymbol(decayType)}
                    </strong>

                    <div class="task3-chain-expression">

                        ${
                            buildTask3ChainStepHtml(
                                parent,
                                daughter,
                                decayType,
                                index + 1
                            )
                        }

                    </div>

                    <p>
                        ΔA =
                        ${formatTask3Delta(deltaA)},
                        ΔZ =
                        ${formatTask3Delta(deltaZ)}.
                    </p>

                    <p>
                        Hạt nhân mới:
                        A = ${daughter.A},
                        Z = ${daughter.Z},
                        N =
                        ${daughter.A} − ${daughter.Z}
                        =
                        <strong>${daughterN}</strong>.
                    </p>

                </div>
                `;
        }
    );


    solutionHtml +=
        `
        <div class="task3-solution-step">

            <strong>
                Toàn bộ chuỗi
            </strong>

            <p>
                ΔA<sub>tổng</sub>
                =
                ${last.A}
                −
                ${first.A}
                =
                <strong>
                    ${formatTask3Delta(totalDelta.deltaA)}
                </strong>.
            </p>

            <p>
                ΔZ<sub>tổng</sub>
                =
                ${last.Z}
                −
                ${first.Z}
                =
                <strong>
                    ${formatTask3Delta(totalDelta.deltaZ)}
                </strong>.
            </p>

        </div>
        `;


    task3Solution.innerHTML =
        solutionHtml;


    task3Conclusion.textContent =
        `Sau ${task3CurrentChain.decayTypes.length} bước biến đổi, `
        +
        `${first.symbol}-${first.A} trở thành `
        +
        `${last.symbol}-${last.A}. `
        +
        `Sự thay đổi tổng cộng là ΔA = `
        +
        `${formatTask3Delta(totalDelta.deltaA)} và ΔZ = `
        +
        `${formatTask3Delta(totalDelta.deltaZ)}.`;
}


// ======================================================
// CHECK TASK
// ======================================================

function checkTask3() {

    if (
        !task3CurrentChain
    ) {

        return;
    }


    const stepResult =
        checkTask3Steps();


    const totalDelta =
        getTask3TotalDelta();


    const deltaAResult =
        evaluateTask3Number(
            task3TotalDeltaAInput,
            totalDelta.deltaA,
            task3TotalDeltaAFeedback
        );


    const deltaZResult =
        evaluateTask3Number(
            task3TotalDeltaZInput,
            totalDelta.deltaZ,
            task3TotalDeltaZFeedback
        );


    const equationResult =
        evaluateTask3Equation();


    let correctCount =
        stepResult.correct;


    let totalCount =
        stepResult.total;


    totalCount +=
        3;


    if (
        deltaAResult
    ) {

        correctCount++;
    }


    if (
        deltaZResult
    ) {

        correctCount++;
    }


    if (
        equationResult
    ) {

        correctCount++;
    }


    showTask3Solution();


    task3Result.hidden =
        false;


    task3Status.textContent =
        `Đã kiểm tra: ${correctCount}/${totalCount} nội dung đúng.`;


    if (
        correctCount ===
        totalCount
    ) {

        task3Conclusion.textContent +=
            " Bạn đã phân tích chính xác toàn bộ chuỗi biến đổi.";

    } else {

        task3Conclusion.textContent +=
            " Hãy kiểm tra từng bước theo thứ tự, vì kết quả của bước trước là hạt nhân mẹ của bước tiếp theo.";
    }
}


// ======================================================
// EVENTS
// ======================================================

newTask3QuestionButton.addEventListener(
    "click",
    generateTask3Question
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
// INITIALIZE
// ======================================================

generateTask3Question();