console.log(
    "TASK2.JS - NUCLEAR STRUCTURE ISOTOPE RECOGNITION VERSION 1"
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

const task2Notation1 =
    getTask2RequiredElement(
        "task2Notation1"
    );


const task2Notation2 =
    getTask2RequiredElement(
        "task2Notation2"
    );


const task2Name1 =
    getTask2RequiredElement(
        "task2Name1"
    );


const task2Name2 =
    getTask2RequiredElement(
        "task2Name2"
    );


const newTask2QuestionButton =
    getTask2RequiredElement(
        "newTask2QuestionButton"
    );


const task2Z1Input =
    getTask2RequiredElement(
        "task2Z1Input"
    );


const task2A1Input =
    getTask2RequiredElement(
        "task2A1Input"
    );


const task2N1Input =
    getTask2RequiredElement(
        "task2N1Input"
    );


const task2Z2Input =
    getTask2RequiredElement(
        "task2Z2Input"
    );


const task2A2Input =
    getTask2RequiredElement(
        "task2A2Input"
    );


const task2N2Input =
    getTask2RequiredElement(
        "task2N2Input"
    );


const task2Z1Feedback =
    getTask2RequiredElement(
        "task2Z1Feedback"
    );


const task2A1Feedback =
    getTask2RequiredElement(
        "task2A1Feedback"
    );


const task2N1Feedback =
    getTask2RequiredElement(
        "task2N1Feedback"
    );


const task2Z2Feedback =
    getTask2RequiredElement(
        "task2Z2Feedback"
    );


const task2A2Feedback =
    getTask2RequiredElement(
        "task2A2Feedback"
    );


const task2N2Feedback =
    getTask2RequiredElement(
        "task2N2Feedback"
    );


const task2IsotopeSelect =
    getTask2RequiredElement(
        "task2IsotopeSelect"
    );


const task2ReasonSelect =
    getTask2RequiredElement(
        "task2ReasonSelect"
    );


const task2NeutronDifferenceInput =
    getTask2RequiredElement(
        "task2NeutronDifferenceInput"
    );


const task2IsotopeFeedback =
    getTask2RequiredElement(
        "task2IsotopeFeedback"
    );


const task2ReasonFeedback =
    getTask2RequiredElement(
        "task2ReasonFeedback"
    );


const task2NeutronDifferenceFeedback =
    getTask2RequiredElement(
        "task2NeutronDifferenceFeedback"
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


const task2CorrectZ =
    getTask2RequiredElement(
        "task2CorrectZ"
    );


const task2CorrectA =
    getTask2RequiredElement(
        "task2CorrectA"
    );


const task2CorrectN =
    getTask2RequiredElement(
        "task2CorrectN"
    );


const task2CorrectIsotope =
    getTask2RequiredElement(
        "task2CorrectIsotope"
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
// TRẠNG THÁI
// ======================================================

let task2Nucleus1 =
    null;


let task2Nucleus2 =
    null;


let task2Comparison =
    null;


let task2PreviousPairKey =
    null;


// ======================================================
// TẠO TẤT CẢ CẶP CÓ THỂ
//
// Có cả:
// - cặp đồng vị
// - cặp không phải đồng vị
// ======================================================

function buildTask2PairPool() {

    const isotopes =
        getAllNuclearIsotopes();


    const pairs =
        [];


    for (
        let i = 0;
        i < isotopes.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < isotopes.length;
            j++
        ) {

            const first =
                isotopes[i];


            const second =
                isotopes[j];


            const firstProperties =
                calculateNuclearProperties(
                    first.symbol,
                    first.A
                );


            const secondProperties =
                calculateNuclearProperties(
                    second.symbol,
                    second.A
                );


            const comparison =
                compareNuclei(
                    firstProperties,
                    secondProperties
                );


            pairs.push({

                first:
                    firstProperties,

                second:
                    secondProperties,

                comparison

            });
        }
    }


    return pairs;
}


// ======================================================
// CHỌN CẶP CÂN BẰNG
//
// 50% khả năng là đồng vị,
// 50% không phải đồng vị.
// ======================================================

function generateTask2Question() {

    const allPairs =
        buildTask2PairPool();


    const isotopePairs =
        allPairs.filter(
            pair =>
                pair.comparison.areIsotopes
        );


    const nonIsotopePairs =
        allPairs.filter(
            pair =>
                !pair.comparison.areIsotopes
                &&
                !pair.comparison.areSameNuclide
        );


    const wantIsotopePair =
        Math.random() <
        0.5;


    const pool =
        wantIsotopePair
            ?
            isotopePairs
            :
            nonIsotopePairs;


    if (
        pool.length ===
        0
    ) {

        throw new Error(
            "Không đủ dữ liệu để tạo Nhiệm vụ 2."
        );
    }


    let selected =
        null;


    for (
        let attempt = 0;
        attempt < 30;
        attempt++
    ) {

        const candidate =
            pool[
                Math.floor(
                    Math.random()
                    *
                    pool.length
                )
            ];


        const key =
            `${candidate.first.label}|${candidate.second.label}`;


        if (
            pool.length === 1
            ||
            key !==
            task2PreviousPairKey
        ) {

            selected =
                candidate;


            task2PreviousPairKey =
                key;


            break;
        }
    }


    if (
        selected ===
        null
    ) {

        selected =
            pool[0];
    }


    task2Nucleus1 =
        selected.first;


    task2Nucleus2 =
        selected.second;


    task2Comparison =
        selected.comparison;


    updateTask2QuestionDisplay();


    resetTask2Answers();
}


// ======================================================
// HIỂN THỊ ĐỀ
// ======================================================

function updateTask2QuestionDisplay() {

    task2Notation1.innerHTML =
        task2Nucleus1.notationHtml;


    task2Notation2.innerHTML =
        task2Nucleus2.notationHtml;


    task2Name1.textContent =
        `${task2Nucleus1.vietnameseName} – ${task2Nucleus1.label}`;


    task2Name2.textContent =
        `${task2Nucleus2.vietnameseName} – ${task2Nucleus2.label}`;
}


// ======================================================
// CLEAR FEEDBACK
// ======================================================

function clearTask2FeedbackElement(
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


function clearAllTask2Feedback() {

    const elements =
    [
        task2Z1Feedback,
        task2A1Feedback,
        task2N1Feedback,
        task2Z2Feedback,
        task2A2Feedback,
        task2N2Feedback,
        task2IsotopeFeedback,
        task2ReasonFeedback,
        task2NeutronDifferenceFeedback
    ];


    for (
        const element
        of
        elements
    ) {

        clearTask2FeedbackElement(
            element
        );
    }
}


// ======================================================
// RESET ANSWERS
// ======================================================

function resetTask2Answers() {

    task2Z1Input.value =
        "";


    task2A1Input.value =
        "";


    task2N1Input.value =
        "";


    task2Z2Input.value =
        "";


    task2A2Input.value =
        "";


    task2N2Input.value =
        "";


    task2IsotopeSelect.value =
        "";


    task2ReasonSelect.value =
        "";


    task2NeutronDifferenceInput.value =
        "";


    clearAllTask2Feedback();


    task2Result.hidden =
        true;


    task2Status.textContent =
        "Chờ học sinh thực hiện";
}


// ======================================================
// ĐÁNH GIÁ SỐ
// ======================================================

function evaluateTask2Number(
    input,
    expected,
    feedback
) {

    clearTask2FeedbackElement(
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


    const value =
        Number(
            input.value
        );


    if (
        !Number.isFinite(
            value
        )
    ) {

        feedback.textContent =
            "Giá trị chưa hợp lệ.";


        feedback.classList.add(
            "invalid"
        );


        return false;
    }


    if (
        value ===
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
        "Hãy kiểm tra lại kí hiệu hạt nhân.";


    feedback.classList.add(
        "review"
    );


    return false;
}


// ======================================================
// ĐÁNH GIÁ ĐỒNG VỊ
// ======================================================

function evaluateTask2IsotopeChoice() {

    clearTask2FeedbackElement(
        task2IsotopeFeedback
    );


    if (
        task2IsotopeSelect.value ===
        ""
    ) {

        task2IsotopeFeedback.textContent =
            "Em chưa chọn câu trả lời.";


        task2IsotopeFeedback.classList.add(
            "invalid"
        );


        return false;
    }


    const expected =
        task2Comparison.areIsotopes
            ?
            "yes"
            :
            "no";


    if (
        task2IsotopeSelect.value ===
        expected
    ) {

        task2IsotopeFeedback.textContent =
            "✓ Nhận định phù hợp.";


        task2IsotopeFeedback.classList.add(
            "correct"
        );


        return true;
    }


    task2IsotopeFeedback.textContent =
        "Hãy so sánh Z và A của hai hạt nhân.";


    task2IsotopeFeedback.classList.add(
        "review"
    );


    return false;
}


// ======================================================
// ĐÁNH GIÁ LÍ DO
// ======================================================

function getExpectedTask2Reason() {

    if (
        task2Comparison.areIsotopes
    ) {

        return "same-z-different-a";
    }


    if (
        task2Nucleus1.Z !==
        task2Nucleus2.Z
    ) {

        return "different-z";
    }


    if (
        task2Nucleus1.Z ===
        task2Nucleus2.Z
        &&
        task2Nucleus1.A ===
        task2Nucleus2.A
    ) {

        return "same-z-same-a";
    }


    return "";
}


function evaluateTask2Reason() {

    clearTask2FeedbackElement(
        task2ReasonFeedback
    );


    if (
        task2ReasonSelect.value ===
        ""
    ) {

        task2ReasonFeedback.textContent =
            "Em chưa chọn lời giải thích.";


        task2ReasonFeedback.classList.add(
            "invalid"
        );


        return false;
    }


    if (
        task2ReasonSelect.value ===
        getExpectedTask2Reason()
    ) {

        task2ReasonFeedback.textContent =
            "✓ Giải thích phù hợp.";


        task2ReasonFeedback.classList.add(
            "correct"
        );


        return true;
    }


    task2ReasonFeedback.textContent =
        "Hãy đối chiếu lại Z và A của hai hạt nhân.";


    task2ReasonFeedback.classList.add(
        "review"
    );


    return false;
}


// ======================================================
// ĐÁNH GIÁ ĐỘ CHÊNH NEUTRON
// ======================================================

function evaluateTask2NeutronDifference() {

    const expected =
        Math.abs(
            task2Nucleus2.N
            -
            task2Nucleus1.N
        );


    return evaluateTask2Number(
        task2NeutronDifferenceInput,
        expected,
        task2NeutronDifferenceFeedback
    );
}


// ======================================================
// HIỂN THỊ LỜI GIẢI
// ======================================================

function showTask2Solution() {

    const first =
        task2Nucleus1;


    const second =
        task2Nucleus2;


    const isotopeText =
        task2Comparison.areIsotopes
            ?
            "Có"
            :
            "Không";


    task2CorrectZ.textContent =
        `${first.Z} / ${second.Z}`;


    task2CorrectA.textContent =
        `${first.A} / ${second.A}`;


    task2CorrectN.textContent =
        `${first.N} / ${second.N}`;


    task2CorrectIsotope.textContent =
        isotopeText;


    let conclusionHtml =
        "";


    if (
        task2Comparison.areIsotopes
    ) {

        conclusionHtml =
            `
            <p>
                Hai hạt nhân có:
            </p>

            <p>
                Z₁ = ${first.Z},
                Z₂ = ${second.Z}
                nên
                <strong>Z₁ = Z₂</strong>.
            </p>

            <p>
                Nhưng:
                A₁ = ${first.A},
                A₂ = ${second.A}
                nên
                <strong>A₁ ≠ A₂</strong>.
            </p>

            <p>
                Vì vậy
                <strong>${first.label}</strong>
                và
                <strong>${second.label}</strong>
                là hai đồng vị của cùng nguyên tố
                ${first.vietnameseName}.
            </p>
            `;

    } else {

        conclusionHtml =
            `
            <p>
                Hai hạt nhân có:
            </p>

            <p>
                Z₁ = ${first.Z},
                Z₂ = ${second.Z}.
            </p>

            <p>
                Vì
                <strong>Z₁ ≠ Z₂</strong>,
                chúng thuộc hai nguyên tố khác nhau,
                nên không phải là đồng vị của nhau.
            </p>
            `;
    }


    task2Solution.innerHTML =
        `
        <p>
            <strong>Hạt nhân 1:</strong>
            ${first.notationHtml}
        </p>

        <p>
            N₁ = A₁ − Z₁
            =
            ${first.A}
            −
            ${first.Z}
            =
            <strong>${first.N}</strong>.
        </p>

        <p>
            <strong>Hạt nhân 2:</strong>
            ${second.notationHtml}
        </p>

        <p>
            N₂ = A₂ − Z₂
            =
            ${second.A}
            −
            ${second.Z}
            =
            <strong>${second.N}</strong>.
        </p>

        <p>
            Độ chênh số neutron:
        </p>

        <p>
            |N₂ − N₁|
            =
            |${second.N} − ${first.N}|
            =
            <strong>${Math.abs(
                second.N - first.N
            )}</strong>.
        </p>

        ${conclusionHtml}
        `;
}


// ======================================================
// KIỂM TRA
// ======================================================

function checkTask2() {

    if (
        !task2Nucleus1
        ||
        !task2Nucleus2
    ) {

        return;
    }


    const results =
    [

        evaluateTask2Number(
            task2Z1Input,
            task2Nucleus1.Z,
            task2Z1Feedback
        ),

        evaluateTask2Number(
            task2A1Input,
            task2Nucleus1.A,
            task2A1Feedback
        ),

        evaluateTask2Number(
            task2N1Input,
            task2Nucleus1.N,
            task2N1Feedback
        ),

        evaluateTask2Number(
            task2Z2Input,
            task2Nucleus2.Z,
            task2Z2Feedback
        ),

        evaluateTask2Number(
            task2A2Input,
            task2Nucleus2.A,
            task2A2Feedback
        ),

        evaluateTask2Number(
            task2N2Input,
            task2Nucleus2.N,
            task2N2Feedback
        ),

        evaluateTask2IsotopeChoice(),

        evaluateTask2Reason(),

        evaluateTask2NeutronDifference()

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
        `Đã kiểm tra: ${correctCount}/9 nội dung phù hợp.`;


    if (
        correctCount ===
        9
    ) {

        if (
            task2Comparison.areIsotopes
        ) {

            task2Conclusion.textContent =
                `${task2Nucleus1.label} và ${task2Nucleus2.label} `
                +
                `có cùng Z = ${task2Nucleus1.Z} nhưng khác A, `
                +
                `nên chúng là hai đồng vị của cùng một nguyên tố.`;

        } else {

            task2Conclusion.textContent =
                `${task2Nucleus1.label} và ${task2Nucleus2.label} `
                +
                `có số proton Z khác nhau, `
                +
                `nên thuộc hai nguyên tố khác nhau `
                +
                `và không phải là đồng vị của nhau.`;
        }

    } else {

        task2Conclusion.textContent =
            "Hãy kiểm tra lại Z trước tiên. "
            +
            "Hai đồng vị phải thuộc cùng một nguyên tố, "
            +
            "nghĩa là có cùng Z; "
            +
            "sau đó kiểm tra xem A có khác nhau hay không.";
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
// KHỞI TẠO
// ======================================================

generateTask2Question();