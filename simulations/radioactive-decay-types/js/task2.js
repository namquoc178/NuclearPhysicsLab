console.log(
    "TASK2.JS - RADIOACTIVE DECAY IDENTIFICATION VERSION 1"
);


// ======================================================
// DOM AN TOÀN
// ======================================================

function getTask2RequiredElement(
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
            `Nhiệm vụ 2 thiếu phần tử HTML có id="${id}"`
        );
    }


    return element;
}


// ======================================================
// DOM
// ======================================================

const task2ParentNotation =
    getTask2RequiredElement(
        "task2ParentNotation"
    );


const task2ParentName =
    getTask2RequiredElement(
        "task2ParentName"
    );


const task2DaughterNotation =
    getTask2RequiredElement(
        "task2DaughterNotation"
    );


const task2DaughterName =
    getTask2RequiredElement(
        "task2DaughterName"
    );


const newTask2QuestionButton =
    getTask2RequiredElement(
        "newTask2QuestionButton"
    );


const task2DeltaAInput =
    getTask2RequiredElement(
        "task2DeltaAInput"
    );


const task2DeltaZInput =
    getTask2RequiredElement(
        "task2DeltaZInput"
    );


const task2DeltaNInput =
    getTask2RequiredElement(
        "task2DeltaNInput"
    );


const task2DeltaAFeedback =
    getTask2RequiredElement(
        "task2DeltaAFeedback"
    );


const task2DeltaZFeedback =
    getTask2RequiredElement(
        "task2DeltaZFeedback"
    );


const task2DeltaNFeedback =
    getTask2RequiredElement(
        "task2DeltaNFeedback"
    );


const task2TypeOptions =
    getTask2RequiredElement(
        "task2TypeOptions"
    );


const task2TypeFeedback =
    getTask2RequiredElement(
        "task2TypeFeedback"
    );


const task2RuleOptions =
    getTask2RequiredElement(
        "task2RuleOptions"
    );


const task2RuleFeedback =
    getTask2RequiredElement(
        "task2RuleFeedback"
    );


const checkTask2Button =
    getTask2RequiredElement(
        "checkTask2Button"
    );


const resetTask2Button =
    getTask2RequiredElement(
        "resetTask2Button"
    );


const task2Status =
    getTask2RequiredElement(
        "task2Status"
    );


const task2Result =
    getTask2RequiredElement(
        "task2Result"
    );


const task2CorrectDeltaA =
    getTask2RequiredElement(
        "task2CorrectDeltaA"
    );


const task2CorrectDeltaZ =
    getTask2RequiredElement(
        "task2CorrectDeltaZ"
    );


const task2CorrectDeltaN =
    getTask2RequiredElement(
        "task2CorrectDeltaN"
    );


const task2CorrectType =
    getTask2RequiredElement(
        "task2CorrectType"
    );


const task2Solution =
    getTask2RequiredElement(
        "task2Solution"
    );


const task2Conclusion =
    getTask2RequiredElement(
        "task2Conclusion"
    );


// ======================================================
// STATE
// ======================================================

let task2CurrentExample =
    null;


let task2PreviousExampleId =
    null;


let task2SelectedType =
    null;


let task2SelectedRule =
    null;


// ======================================================
// FORMAT DELTA
// ======================================================

function formatTask2Delta(
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
// RANDOM QUESTION
// ======================================================

function getRandomTask2Example() {

    let pool =
        RADIOACTIVE_DECAY_EXAMPLES;


    if (
        RADIOACTIVE_DECAY_EXAMPLES.length >
        1
        &&
        task2PreviousExampleId !==
        null
    ) {

        pool =
            RADIOACTIVE_DECAY_EXAMPLES.filter(
                example =>
                    example.id !==
                    task2PreviousExampleId
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
// TÊN HẠT NHÂN
// ======================================================

function getTask2NuclideName(
    nucleus
) {

    const element =
        getDecayElementByZ(
            nucleus.Z
        );


    if (
        !element
    ) {

        return `${nucleus.symbol}-${nucleus.A}`;
    }


    return (
        `${element.vietnameseName} `
        +
        `(${nucleus.symbol}-${nucleus.A})`
    );
}


// ======================================================
// TYPE OPTIONS
// ======================================================

function buildTask2TypeOptions() {

    task2TypeOptions.innerHTML =
        "";


    task2SelectedType =
        null;


    const types =
    [
        {
            id:
                "alpha",

            symbol:
                "α",

            label:
                "Phân rã alpha",

            description:
                "A giảm 4, Z giảm 2"
        },

        {
            id:
                "betaMinus",

            symbol:
                "β⁻",

            label:
                "Phân rã beta trừ",

            description:
                "A không đổi, Z tăng 1"
        },

        {
            id:
                "betaPlus",

            symbol:
                "β⁺",

            label:
                "Phân rã beta cộng",

            description:
                "A không đổi, Z giảm 1"
        },

        {
            id:
                "gamma",

            symbol:
                "γ",

            label:
                "Chuyển mức gamma",

            description:
                "A và Z không đổi"
        }
    ];


    for (
        const type
        of
        types
    ) {

        const button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


        button.className =
            "task2-type-option";


        button.dataset.value =
            type.id;


        button.innerHTML =
            `
            <span class="task2-type-symbol">
                ${type.symbol}
            </span>

            <span class="task2-type-text">

                <strong>
                    ${type.label}
                </strong>

                <span>
                    ${type.description}
                </span>

            </span>
            `;


        button.addEventListener(
            "click",

            () => {

                selectTask2TypeOption(
                    button
                );
            }
        );


        task2TypeOptions.appendChild(
            button
        );
    }
}


// ======================================================
// CHỌN TYPE
// ======================================================

function selectTask2TypeOption(
    selectedButton
) {

    const buttons =
        task2TypeOptions.querySelectorAll(
            ".task2-type-option"
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


    task2SelectedType =
        selectedButton.dataset.value;


    clearTask2Feedback(
        task2TypeFeedback
    );
}


// ======================================================
// RULE DATA
// ======================================================

function getTask2RuleData() {

    return [
        {

            value:
                "alpha",

            html:
                `
                ΔA = −4
                &nbsp;&nbsp;&nbsp;
                ΔZ = −2
                &nbsp;&nbsp;&nbsp;
                ΔN = −2
                `

        },

        {

            value:
                "betaMinus",

            html:
                `
                ΔA = 0
                &nbsp;&nbsp;&nbsp;
                ΔZ = +1
                &nbsp;&nbsp;&nbsp;
                ΔN = −1
                `

        },

        {

            value:
                "betaPlus",

            html:
                `
                ΔA = 0
                &nbsp;&nbsp;&nbsp;
                ΔZ = −1
                &nbsp;&nbsp;&nbsp;
                ΔN = +1
                `

        },

        {

            value:
                "gamma",

            html:
                `
                ΔA = 0
                &nbsp;&nbsp;&nbsp;
                ΔZ = 0
                &nbsp;&nbsp;&nbsp;
                ΔN = 0
                `

        }

    ];
}


// ======================================================
// RULE OPTIONS
// ======================================================

function buildTask2RuleOptions() {

    task2RuleOptions.innerHTML =
        "";


    task2SelectedRule =
        null;


    const rules =
        getTask2RuleData();


    /*
     * Trộn thứ tự.
     */

    for (
        let i =
            rules.length - 1;

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
            rules[i],
            rules[j]
        ]
        =
        [
            rules[j],
            rules[i]
        ];
    }


    const letters =
    [
        "A",
        "B",
        "C",
        "D"
    ];


    rules.forEach(
        (
            rule,
            index
        ) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "task2-rule-option";


            button.dataset.value =
                rule.value;


            button.innerHTML =
                `
                <span class="task2-rule-letter">
                    ${letters[index]}
                </span>

                <span class="task2-rule-expression">
                    ${rule.html}
                </span>
                `;


            button.addEventListener(
                "click",

                () => {

                    selectTask2RuleOption(
                        button
                    );
                }
            );


            task2RuleOptions.appendChild(
                button
            );
        }
    );
}


// ======================================================
// CHỌN RULE
// ======================================================

function selectTask2RuleOption(
    selectedButton
) {

    const buttons =
        task2RuleOptions.querySelectorAll(
            ".task2-rule-option"
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


    task2SelectedRule =
        selectedButton.dataset.value;


    clearTask2Feedback(
        task2RuleFeedback
    );
}


// ======================================================
// DISPLAY QUESTION
// ======================================================

function updateTask2QuestionDisplay() {

    const parent =
        task2CurrentExample.parent;


    const daughter =
        task2CurrentExample.daughter;


    task2ParentNotation.innerHTML =
        buildDecayNuclearNotationHtml(
            parent
        );


    task2DaughterNotation.innerHTML =
        buildDecayNuclearNotationHtml(
            daughter
        );


    task2ParentName.textContent =
        getTask2NuclideName(
            parent
        );


    task2DaughterName.textContent =
        getTask2NuclideName(
            daughter
        );


    buildTask2TypeOptions();


    buildTask2RuleOptions();
}


// ======================================================
// CLEAR FEEDBACK
// ======================================================

function clearTask2Feedback(
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
// RESET SELECTIONS
// ======================================================

function resetTask2Selections() {

    task2SelectedType =
        null;


    task2SelectedRule =
        null;


    const buttons =
        document.querySelectorAll(
            ".task2-type-option, .task2-rule-option"
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

function resetTask2Answers() {

    task2DeltaAInput.value =
        "";


    task2DeltaZInput.value =
        "";


    task2DeltaNInput.value =
        "";


    resetTask2Selections();


    [
        task2DeltaAFeedback,
        task2DeltaZFeedback,
        task2DeltaNFeedback,
        task2TypeFeedback,
        task2RuleFeedback
    ].forEach(
        clearTask2Feedback
    );


    task2Result.hidden =
        true;


    task2Status.textContent =
        "Chờ học sinh thực hiện";
}


// ======================================================
// NEW QUESTION
// ======================================================

function generateTask2Question() {

    task2CurrentExample =
        getRandomTask2Example();


    task2PreviousExampleId =
        task2CurrentExample.id;


    updateTask2QuestionDisplay();


    resetTask2Answers();
}


// ======================================================
// EXPECTED VALUES
// ======================================================

function getTask2ExpectedValues() {

    const parent =
        task2CurrentExample.parent;


    const daughter =
        task2CurrentExample.daughter;


    const parentN =
        parent.A
        -
        parent.Z;


    const daughterN =
        daughter.A
        -
        daughter.Z;


    return {

        deltaA:
            daughter.A
            -
            parent.A,

        deltaZ:
            daughter.Z
            -
            parent.Z,

        deltaN:
            daughterN
            -
            parentN

    };
}


// ======================================================
// CHECK NUMBER
// ======================================================

function evaluateTask2Number(
    input,
    expected,
    feedback
) {

    clearTask2Feedback(
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
        "Hãy kiểm tra lại phép tính.";


    feedback.classList.add(
        "review"
    );


    return false;
}


// ======================================================
// CHECK CARD OPTION
// ======================================================

function evaluateTask2CardChoice(
    container,
    selectedValue,
    expectedValue,
    feedback
) {

    clearTask2Feedback(
        feedback
    );


    const buttons =
        container.querySelectorAll(
            "button"
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
        selectedValue ===
        null
    ) {

        feedback.textContent =
            "Bạn chưa chọn phương án.";


        feedback.classList.add(
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
                selectedValue
            ) {

                selectedButton =
                    button;
            }


            if (
                button.dataset.value ===
                expectedValue
            ) {

                correctButton =
                    button;
            }
        }
    );


    if (
        selectedValue ===
        expectedValue
    ) {

        if (
            selectedButton
        ) {

            selectedButton.classList.add(
                "correct-answer"
            );
        }


        feedback.textContent =
            "✓ Chính xác.";


        feedback.classList.add(
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


    if (
        correctButton
    ) {

        correctButton.classList.add(
            "correct-answer"
        );
    }


    feedback.textContent =
        "Chưa đúng. Phương án viền xanh là đáp án phù hợp.";


    feedback.classList.add(
        "review"
    );


    return false;
}


// ======================================================
// SOLUTION
// ======================================================

function showTask2Solution() {

    const parent =
        task2CurrentExample.parent;


    const daughter =
        task2CurrentExample.daughter;


    const type =
        getDecayTypeById(
            task2CurrentExample.type
        );


    const values =
        getTask2ExpectedValues();


    const parentN =
        parent.A
        -
        parent.Z;


    const daughterN =
        daughter.A
        -
        daughter.Z;


    task2CorrectDeltaA.textContent =
        formatTask2Delta(
            values.deltaA
        );


    task2CorrectDeltaZ.textContent =
        formatTask2Delta(
            values.deltaZ
        );


    task2CorrectDeltaN.textContent =
        formatTask2Delta(
            values.deltaN
        );


    task2CorrectType.textContent =
        type.symbol;


    task2Solution.innerHTML =
        `
        <p>
            Số khối:
        </p>

        <p>
            ΔA
            =
            ${daughter.A}
            −
            ${parent.A}
            =
            <strong>${formatTask2Delta(values.deltaA)}</strong>.
        </p>

        <p>
            Số proton:
        </p>

        <p>
            ΔZ
            =
            ${daughter.Z}
            −
            ${parent.Z}
            =
            <strong>${formatTask2Delta(values.deltaZ)}</strong>.
        </p>

        <p>
            Số neutron của hạt nhân mẹ:
        </p>

        <p>
            N<sub>mẹ</sub>
            =
            ${parent.A}
            −
            ${parent.Z}
            =
            ${parentN}.
        </p>

        <p>
            Số neutron của hạt nhân con:
        </p>

        <p>
            N<sub>con</sub>
            =
            ${daughter.A}
            −
            ${daughter.Z}
            =
            ${daughterN}.
        </p>

        <p>
            Vì vậy:
        </p>

        <p>
            ΔN
            =
            ${daughterN}
            −
            ${parentN}
            =
            <strong>${formatTask2Delta(values.deltaN)}</strong>.
        </p>

        <p>
            Bộ giá trị
            <strong>
                (
                ΔA = ${formatTask2Delta(values.deltaA)},
                ΔZ = ${formatTask2Delta(values.deltaZ)}
                )
            </strong>
            tương ứng với
            <strong>${type.label}</strong>.
        </p>

        <div class="task1-equation-expression">

            ${
                buildTask1EquationHtml(
                    parent,
                    daughter,
                    task2CurrentExample.type
                )
            }

        </div>
        `;


    task2Conclusion.textContent =
        `Từ ΔA = ${formatTask2Delta(values.deltaA)} `
        +
        `và ΔZ = ${formatTask2Delta(values.deltaZ)}, `
        +
        `ta nhận diện được đây là ${type.label}.`;
}


// ======================================================
// CHECK TASK
// ======================================================

function checkTask2() {

    if (
        !task2CurrentExample
    ) {

        return;
    }


    const expected =
        getTask2ExpectedValues();


    const results =
    [
        evaluateTask2Number(
            task2DeltaAInput,
            expected.deltaA,
            task2DeltaAFeedback
        ),

        evaluateTask2Number(
            task2DeltaZInput,
            expected.deltaZ,
            task2DeltaZFeedback
        ),

        evaluateTask2Number(
            task2DeltaNInput,
            expected.deltaN,
            task2DeltaNFeedback
        ),

        evaluateTask2CardChoice(
            task2TypeOptions,
            task2SelectedType,
            task2CurrentExample.type,
            task2TypeFeedback
        ),

        evaluateTask2CardChoice(
            task2RuleOptions,
            task2SelectedRule,
            task2CurrentExample.type,
            task2RuleFeedback
        )
    ];


    const correctCount =
        results.filter(
            result =>
                result
        ).length;


    showTask2Solution();


    task2Result.hidden =
        false;


    task2Status.textContent =
        `Đã kiểm tra: ${correctCount}/5 nội dung đúng.`;


    if (
        correctCount ===
        5
    ) {

        task2Conclusion.textContent +=
            " Bạn đã nhận diện chính xác dạng phân rã.";

    } else {

        task2Conclusion.textContent +=
            " Hãy đối chiếu ΔA và ΔZ với bảng quy tắc bốn dạng phân rã.";
    }
}


// ======================================================
// EVENTS
// ======================================================

newTask2QuestionButton.addEventListener(
    "click",
    generateTask2Question
);


checkTask2Button.addEventListener(
    "click",
    checkTask2
);


resetTask2Button.addEventListener(
    "click",
    resetTask2Answers
);


// ======================================================
// INITIALIZE
// ======================================================

generateTask2Question();