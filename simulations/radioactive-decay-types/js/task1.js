console.log(
    "TASK1.JS - RADIOACTIVE DECAY DAUGHTER NUCLEUS VERSION 4"
);


// ======================================================
// DOM AN TOÀN
// ======================================================

function getTask1RequiredElement(
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
            `Nhiệm vụ 1 thiếu phần tử HTML có id="${id}"`
        );
    }


    return element;
}


// ======================================================
// DOM
// ======================================================

const task1ParentNotation =
    getTask1RequiredElement(
        "task1ParentNotation"
    );


const task1ParentName =
    getTask1RequiredElement(
        "task1ParentName"
    );


const task1DecaySymbol =
    getTask1RequiredElement(
        "task1DecaySymbol"
    );


const task1DecayName =
    getTask1RequiredElement(
        "task1DecayName"
    );


const task1RuleHint =
    getTask1RequiredElement(
        "task1RuleHint"
    );


const newTask1QuestionButton =
    getTask1RequiredElement(
        "newTask1QuestionButton"
    );


const task1AInput =
    getTask1RequiredElement(
        "task1AInput"
    );


const task1ZInput =
    getTask1RequiredElement(
        "task1ZInput"
    );


const task1NInput =
    getTask1RequiredElement(
        "task1NInput"
    );


const task1AFeedback =
    getTask1RequiredElement(
        "task1AFeedback"
    );


const task1ZFeedback =
    getTask1RequiredElement(
        "task1ZFeedback"
    );


const task1NFeedback =
    getTask1RequiredElement(
        "task1NFeedback"
    );


const task1ElementSelect =
    getTask1RequiredElement(
        "task1ElementSelect"
    );


const task1ElementFeedback =
    getTask1RequiredElement(
        "task1ElementFeedback"
    );


const task1EquationOptions =
    getTask1RequiredElement(
        "task1EquationOptions"
    );


const task1EquationFeedback =
    getTask1RequiredElement(
        "task1EquationFeedback"
    );


const checkTask1Button =
    getTask1RequiredElement(
        "checkTask1Button"
    );


const resetTask1Button =
    getTask1RequiredElement(
        "resetTask1Button"
    );


const task1Status =
    getTask1RequiredElement(
        "task1Status"
    );


const task1Result =
    getTask1RequiredElement(
        "task1Result"
    );


const task1CorrectA =
    getTask1RequiredElement(
        "task1CorrectA"
    );


const task1CorrectZ =
    getTask1RequiredElement(
        "task1CorrectZ"
    );


const task1CorrectN =
    getTask1RequiredElement(
        "task1CorrectN"
    );


const task1CorrectNuclide =
    getTask1RequiredElement(
        "task1CorrectNuclide"
    );


const task1Solution =
    getTask1RequiredElement(
        "task1Solution"
    );


const task1Conclusion =
    getTask1RequiredElement(
        "task1Conclusion"
    );


// ======================================================
// STATE
// ======================================================

let task1CurrentExample =
    null;


let task1CurrentDaughter =
    null;


let task1PreviousExampleId =
    null;


/*
 * Giá trị phương trình học sinh chọn.
 *
 * null:
 * chưa chọn.
 */

let task1SelectedEquationValue =
    null;


// ======================================================
// RANDOM QUESTION
// ======================================================

function getRandomTask1Example() {

    let pool =
        RADIOACTIVE_DECAY_EXAMPLES;


    if (
        RADIOACTIVE_DECAY_EXAMPLES.length >
        1
        &&
        task1PreviousExampleId !==
        null
    ) {

        pool =
            RADIOACTIVE_DECAY_EXAMPLES.filter(
                example =>
                    example.id !==
                    task1PreviousExampleId
            );
    }


    const randomIndex =
        Math.floor(
            Math.random()
            *
            pool.length
        );


    return pool[
        randomIndex
    ];
}


// ======================================================
// POPULATE ELEMENTS
// ======================================================

function populateTask1ElementSelect() {

    task1ElementSelect.innerHTML =
        `
        <option value="">
            -- Chọn nguyên tố --
        </option>
        `;


    const entries =
        Object.entries(
            DECAY_ELEMENTS
        )
        .sort(
            (
                a,
                b
            ) =>
                Number(
                    a[0]
                )
                -
                Number(
                    b[0]
                )
        );


    for (
        const [
            Z,
            element
        ]
        of
        entries
    ) {

        const option =
            document.createElement(
                "option"
            );


        option.value =
            element.symbol;


        option.textContent =
            `${element.vietnameseName} (${element.symbol}), Z = ${Z}`;


        task1ElementSelect.appendChild(
            option
        );
    }
}


// ======================================================
// TẠO PHƯƠNG TRÌNH TỪ CÁC THÀNH PHẦN
// ======================================================

function buildTask1EquationHtml(
    parent,
    daughter,
    decayTypeId
) {

    return (
        `<span>`
        +
        `${buildDecayNuclearNotationHtml(parent)}`
        +
        `</span>`

        +

        `<span class="task1-equation-arrow">`
        +
        `→`
        +
        `</span>`

        +

        `<span>`
        +
        `${buildDecayNuclearNotationHtml(daughter)}`
        +
        `</span>`

        +

        `<span class="task1-equation-plus">`
        +
        `+`
        +
        `</span>`

        +

        `<span>`
        +
        `${getDecayEmissionNotationHtml(decayTypeId)}`
        +
        `</span>`
    );
}


// ======================================================
// TẠO CÁC PHƯƠNG ÁN NHIỄU
// ======================================================

function buildTask1EquationOptions() {

    task1EquationOptions.innerHTML =
        "";


    task1SelectedEquationValue =
        null;


    const parent =
        task1CurrentExample.parent;


    const correctDaughter =
        task1CurrentDaughter;


    const decayTypeId =
        task1CurrentExample.type;


    const decayType =
        getDecayTypeById(
            decayTypeId
        );


    const options =
    [
        {

            value:
                "correct",

            daughter:
                correctDaughter

        }
    ];


    // ==================================================
    // NHIỄU 1
    // ĐẢO CHIỀU THAY ĐỔI Z
    // ==================================================

    const wrongZ =
    parent.Z
    -
    decayType.deltaZ;


const wrongZElement =
    getDecayElementByZ(
        wrongZ
    );


/*
 * Chỉ tạo phương án đảo chiều Z
 * khi dạng phân rã thực sự làm thay đổi Z.
 *
 * Với gamma:
 * deltaZ = 0
 *
 * Nếu vẫn tạo phương án này,
 * nó sẽ trùng với đáp án đúng.
 */

if (
    decayType.deltaZ !==
    0
    &&
    wrongZElement
    &&
    wrongZ >
    0
    &&
    wrongZ <=
    correctDaughter.A
) {

    options.push(
    {

        value:
            "wrong-z",

        daughter:
        {

            A:
                correctDaughter.A,

            Z:
                wrongZ,

            symbol:
                wrongZElement.symbol,

            excited:
                false

        }

    });
}


    // ==================================================
    // NHIỄU 2
    // GIỮ NGUYÊN HẠT NHÂN
    //
    // Với gamma, phương án này chính là đáp án đúng,
    // nên không tạo nhiễu trùng.
    // ==================================================

    if (
        decayTypeId !==
        "gamma"
    ) {

        options.push(
        {

            value:
                "wrong-same",

            daughter:
            {

                A:
                    parent.A,

                Z:
                    parent.Z,

                symbol:
                    parent.symbol,

                excited:
                    false

            }

        });
    }


    // ==================================================
    // NHIỄU 3
    // ĐẢO CHIỀU THAY ĐỔI A
    //
    // Chỉ dùng khi deltaA khác 0.
    // ==================================================

    if (
        decayType.deltaA !==
        0
    ) {

        const wrongA =
            parent.A
            -
            decayType.deltaA;


        if (
            wrongA >
            0
            &&
            correctDaughter.Z <=
            wrongA
        ) {

            options.push(
            {

                value:
                    "wrong-a",

                daughter:
                {

                    A:
                        wrongA,

                    Z:
                        correctDaughter.Z,

                    symbol:
                        correctDaughter.symbol,

                    excited:
                        false

                }

            });
        }
    }


    // ==================================================
    // NHIỄU BỔ SUNG CHO BETA / GAMMA
    //
    // Vì deltaA = 0 nên cần tạo một phương án
    // có A sai nhưng vẫn hợp lệ về mặt hiển thị.
    // ==================================================

    if (
        options.length <
        4
    ) {

        const wrongAPlus =
            correctDaughter.A
            +
            1;


        options.push(
        {

            value:
                "wrong-a-plus",

            daughter:
            {

                A:
                    wrongAPlus,

                Z:
                    correctDaughter.Z,

                symbol:
                    correctDaughter.symbol,

                excited:
                    false

            }

        });
    }


    // ==================================================
    // NHIỄU BỔ SUNG THỨ HAI NẾU CẦN
    // ==================================================

    if (
        options.length <
        4
    ) {

        const wrongAMinus =
            correctDaughter.A
            -
            1;


        if (
            wrongAMinus >
            0
            &&
            correctDaughter.Z <=
            wrongAMinus
        ) {

            options.push(
            {

                value:
                    "wrong-a-minus",

                daughter:
                {

                    A:
                        wrongAMinus,

                    Z:
                        correctDaughter.Z,

                    symbol:
                        correctDaughter.symbol,

                    excited:
                        false

                }

            });
        }
    }


    /*
     * Chỉ giữ tối đa 4 phương án.
     */

    const finalOptions =
        options.slice(
            0,
            4
        );


    /*
     * Trộn thứ tự.
     */

    for (
        let i =
            finalOptions.length - 1;

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
            finalOptions[i],
            finalOptions[j]
        ]
        =
        [
            finalOptions[j],
            finalOptions[i]
        ];
    }


    const letters =
    [
        "A",
        "B",
        "C",
        "D"
    ];


    finalOptions.forEach(
        (
            optionData,
            index
        ) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "task1-equation-option";


            button.dataset.value =
                optionData.value;


            button.innerHTML =
                `
                <span class="task1-equation-option-letter">
                    ${letters[index]}
                </span>

                <span class="task1-equation-expression">

                    ${
                        buildTask1EquationHtml(
                            parent,
                            optionData.daughter,
                            decayTypeId
                        )
                    }

                </span>
                `;


            button.addEventListener(
                "click",

                () => {

                    selectTask1EquationOption(
                        button
                    );
                }
            );


            task1EquationOptions.appendChild(
                button
            );
        }
    );
}


// ======================================================
// CHỌN MỘT PHƯƠNG TRÌNH
// ======================================================

function selectTask1EquationOption(
    selectedButton
) {

    const buttons =
        task1EquationOptions.querySelectorAll(
            ".task1-equation-option"
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


    task1SelectedEquationValue =
        selectedButton.dataset.value;


    clearTask1Feedback(
        task1EquationFeedback
    );
}


// ======================================================
// HINT
// ======================================================

function buildTask1RuleHint(
    type
) {

    switch (
        type
    ) {

        case "alpha":

            return (
                "Phân rã α: "
                +
                "A giảm 4 và Z giảm 2."
            );


        case "betaMinus":

            return (
                "Phân rã β⁻: "
                +
                "A không đổi và Z tăng 1."
            );


        case "betaPlus":

            return (
                "Phân rã β⁺: "
                +
                "A không đổi và Z giảm 1."
            );


        case "gamma":

            return (
                "Chuyển mức γ: "
                +
                "A và Z đều không đổi."
            );


        default:

            return "";
    }
}


// ======================================================
// DISPLAY QUESTION
// ======================================================

function updateTask1QuestionDisplay() {

    const decayType =
        getDecayTypeById(
            task1CurrentExample.type
        );


    task1ParentNotation.innerHTML =
        buildDecayNuclearNotationHtml(
            task1CurrentExample.parent
        );


    task1ParentName.textContent =
        task1CurrentExample.title;


    task1DecaySymbol.textContent =
        decayType.symbol;


    task1DecayName.textContent =
        decayType.label;


    task1RuleHint.textContent =
        buildTask1RuleHint(
            task1CurrentExample.type
        );


    buildTask1EquationOptions();
}


// ======================================================
// CLEAR FEEDBACK
// ======================================================

function clearTask1Feedback(
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
// RESET PHƯƠNG TRÌNH
// ======================================================

function resetTask1EquationSelection() {

    task1SelectedEquationValue =
        null;


    const buttons =
        task1EquationOptions.querySelectorAll(
            ".task1-equation-option"
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
}


// ======================================================
// RESET ANSWERS
// ======================================================

function resetTask1Answers() {

    task1AInput.value =
        "";


    task1ZInput.value =
        "";


    task1NInput.value =
        "";


    task1ElementSelect.value =
        "";


    resetTask1EquationSelection();


    [
        task1AFeedback,
        task1ZFeedback,
        task1NFeedback,
        task1ElementFeedback,
        task1EquationFeedback
    ].forEach(
        clearTask1Feedback
    );


    task1Result.hidden =
        true;


    task1Status.textContent =
        "Chờ học sinh thực hiện";
}


// ======================================================
// NEW QUESTION
// ======================================================

function generateTask1Question() {

    task1CurrentExample =
        getRandomTask1Example();


    task1PreviousExampleId =
        task1CurrentExample.id;


    task1CurrentDaughter =
        calculateDaughterNucleus(
            task1CurrentExample.parent,
            task1CurrentExample.type
        );


    updateTask1QuestionDisplay();


    resetTask1Answers();
}


// ======================================================
// CHECK NUMBER
// ======================================================

function evaluateTask1Number(
    input,
    expected,
    feedback
) {

    clearTask1Feedback(
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
// CHECK ELEMENT
// ======================================================

function evaluateTask1Element() {

    clearTask1Feedback(
        task1ElementFeedback
    );


    if (
        task1ElementSelect.value ===
        ""
    ) {

        task1ElementFeedback.textContent =
            "Em chưa chọn nguyên tố.";


        task1ElementFeedback.classList.add(
            "invalid"
        );


        return false;
    }


    if (
        task1ElementSelect.value ===
        task1CurrentDaughter.symbol
    ) {

        task1ElementFeedback.textContent =
            "✓ Đúng nguyên tố.";


        task1ElementFeedback.classList.add(
            "correct"
        );


        return true;
    }


    task1ElementFeedback.textContent =
        "Hãy dùng Z để xác định lại nguyên tố.";


    task1ElementFeedback.classList.add(
        "review"
    );


    return false;
}


// ======================================================
// CHECK EQUATION
// ======================================================

function evaluateTask1Equation() {

    clearTask1Feedback(
        task1EquationFeedback
    );


    const buttons =
        task1EquationOptions.querySelectorAll(
            ".task1-equation-option"
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
        task1SelectedEquationValue ===
        null
    ) {

        task1EquationFeedback.textContent =
            "Em chưa chọn phương trình.";


        task1EquationFeedback.classList.add(
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
                task1SelectedEquationValue
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
        task1SelectedEquationValue ===
        "correct"
    ) {

        if (
            selectedButton
        ) {

            selectedButton.classList.add(
                "correct-answer"
            );
        }


        task1EquationFeedback.textContent =
            "✓ Phương trình phù hợp.";


        task1EquationFeedback.classList.add(
            "correct"
        );


        return true;
    }


    if (
        selectedButton
    ) {

        selectedButton.classList.add(
            "wrong-answer"
        );
    }


    /*
     * Sau khi kiểm tra, đánh dấu luôn
     * phương án đúng để học sinh đối chiếu.
     */

    if (
        correctButton
    ) {

        correctButton.classList.add(
            "correct-answer"
        );
    }


    task1EquationFeedback.textContent =
        "Chưa đúng. Phương án viền xanh là phương trình phù hợp.";


    task1EquationFeedback.classList.add(
        "review"
    );


    return false;
}


// ======================================================
// LỜI GIẢI
// ======================================================

function showTask1Solution() {

    const parent =
        task1CurrentExample.parent;


    const daughter =
        task1CurrentDaughter;


    const type =
        task1CurrentExample.type;


    const decayType =
        getDecayTypeById(
            type
        );


    task1CorrectA.textContent =
        String(
            daughter.A
        );


    task1CorrectZ.textContent =
        String(
            daughter.Z
        );


    task1CorrectN.textContent =
        String(
            daughter.N
        );


    task1CorrectNuclide.innerHTML =
        buildDecayNuclearNotationHtml(
            daughter
        );


    let ruleText =
        "";


    switch (
        type
    ) {

        case "alpha":

            ruleText =
                `
                <p>
                    Với phân rã α:
                </p>

                <p>
                    A<sub>con</sub>
                    =
                    ${parent.A} − 4
                    =
                    <strong>${daughter.A}</strong>.
                </p>

                <p>
                    Z<sub>con</sub>
                    =
                    ${parent.Z} − 2
                    =
                    <strong>${daughter.Z}</strong>.
                </p>
                `;

            break;


        case "betaMinus":

            ruleText =
                `
                <p>
                    Với phân rã β⁻:
                </p>

                <p>
                    A<sub>con</sub>
                    =
                    ${parent.A}
                    =
                    <strong>${daughter.A}</strong>.
                </p>

                <p>
                    Z<sub>con</sub>
                    =
                    ${parent.Z} + 1
                    =
                    <strong>${daughter.Z}</strong>.
                </p>
                `;

            break;


        case "betaPlus":

            ruleText =
                `
                <p>
                    Với phân rã β⁺:
                </p>

                <p>
                    A<sub>con</sub>
                    =
                    ${parent.A}
                    =
                    <strong>${daughter.A}</strong>.
                </p>

                <p>
                    Z<sub>con</sub>
                    =
                    ${parent.Z} − 1
                    =
                    <strong>${daughter.Z}</strong>.
                </p>
                `;

            break;


        case "gamma":

            ruleText =
                `
                <p>
                    Với chuyển mức γ:
                </p>

                <p>
                    A<sub>con</sub>
                    =
                    ${parent.A}
                    =
                    <strong>${daughter.A}</strong>.
                </p>

                <p>
                    Z<sub>con</sub>
                    =
                    ${parent.Z}
                    =
                    <strong>${daughter.Z}</strong>.
                </p>
                `;

            break;
    }


    task1Solution.innerHTML =
        `
        ${ruleText}

        <p>
            Số neutron:
        </p>

        <p>
            N<sub>con</sub>
            =
            A<sub>con</sub>
            −
            Z<sub>con</sub>
            =
            ${daughter.A}
            −
            ${daughter.Z}
            =
            <strong>${daughter.N}</strong>.
        </p>

        <p>
            Z = ${daughter.Z}
            ứng với nguyên tố
            <strong>
                ${daughter.vietnameseName}
                (${daughter.symbol})
            </strong>.
        </p>

        <p>
            Phương trình:
        </p>

        <div class="task1-equation-expression">

            ${
                buildTask1EquationHtml(
                    parent,
                    daughter,
                    type
                )
            }

        </div>
        `;


    task1Conclusion.textContent =
        `${decayType.label}: từ quy tắc biến đổi A và Z, `
        +
        `ta xác định được hạt nhân con là `
        +
        `${daughter.symbol}-${daughter.A}.`;
}


// ======================================================
// CHECK TASK
// ======================================================

function checkTask1() {

    if (
        !task1CurrentExample
        ||
        !task1CurrentDaughter
    ) {

        return;
    }


    const results =
    [
        evaluateTask1Number(
            task1AInput,
            task1CurrentDaughter.A,
            task1AFeedback
        ),

        evaluateTask1Number(
            task1ZInput,
            task1CurrentDaughter.Z,
            task1ZFeedback
        ),

        evaluateTask1Number(
            task1NInput,
            task1CurrentDaughter.N,
            task1NFeedback
        ),

        evaluateTask1Element(),

        evaluateTask1Equation()
    ];


    const correctCount =
        results.filter(
            result =>
                result
        ).length;


    showTask1Solution();


    task1Result.hidden =
        false;


    task1Status.textContent =
        `Đã kiểm tra: ${correctCount}/5 nội dung đúng.`;


    if (
        correctCount ===
        5
    ) {

        task1Conclusion.textContent +=
            " Em đã xác định chính xác toàn bộ hạt nhân con.";

    } else {

        task1Conclusion.textContent +=
            " Hãy đối chiếu lại quy tắc biến đổi trước khi làm câu tiếp theo.";
    }
}


// ======================================================
// EVENTS
// ======================================================

newTask1QuestionButton.addEventListener(
    "click",
    generateTask1Question
);


checkTask1Button.addEventListener(
    "click",
    checkTask1
);


resetTask1Button.addEventListener(
    "click",
    resetTask1Answers
);


// ======================================================
// INITIALIZE
// ======================================================

populateTask1ElementSelect();


generateTask1Question();