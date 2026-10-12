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

const task1NuclearNotation =
    getTask1RequiredElement(
        "task1NuclearNotation"
    );


const task1NuclideName =
    getTask1RequiredElement(
        "task1NuclideName"
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


const task1ProtonInput =
    getTask1RequiredElement(
        "task1ProtonInput"
    );


const task1NeutronInput =
    getTask1RequiredElement(
        "task1NeutronInput"
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


const task1ProtonFeedback =
    getTask1RequiredElement(
        "task1ProtonFeedback"
    );


const task1NeutronFeedback =
    getTask1RequiredElement(
        "task1NeutronFeedback"
    );


const task1ConceptSelect =
    getTask1RequiredElement(
        "task1ConceptSelect"
    );


const task1ConceptFeedback =
    getTask1RequiredElement(
        "task1ConceptFeedback"
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


const task1CorrectProtons =
    getTask1RequiredElement(
        "task1CorrectProtons"
    );


const task1CorrectNeutrons =
    getTask1RequiredElement(
        "task1CorrectNeutrons"
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
// TRẠNG THÁI
// ======================================================

let task1CurrentProperties =
    null;


let task1PreviousKey =
    null;


// ======================================================
// TẬP CÂU HỎI
//
// Lấy từ chính nuclear-data.js.
// ======================================================

function getTask1QuestionPool() {

    return getAllNuclearIsotopes();
}


// ======================================================
// CLEAR FEEDBACK
// ======================================================

function clearTask1FeedbackElement(
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


function clearAllTask1Feedback() {

    const feedbackElements =
    [
        task1AFeedback,
        task1ZFeedback,
        task1NFeedback,
        task1ProtonFeedback,
        task1NeutronFeedback,
        task1ConceptFeedback
    ];


    for (
        const element
        of
        feedbackElements
    ) {

        clearTask1FeedbackElement(
            element
        );
    }
}


// ======================================================
// RESET CÂU TRẢ LỜI
// ======================================================

function resetTask1Answers() {

    task1AInput.value =
        "";


    task1ZInput.value =
        "";


    task1NInput.value =
        "";


    task1ProtonInput.value =
        "";


    task1NeutronInput.value =
        "";


    task1ConceptSelect.value =
        "";


    clearAllTask1Feedback();


    task1Result.hidden =
        true;


    task1Status.textContent =
        "Chờ học sinh thực hiện";
}


// ======================================================
// CHỌN CÂU HỎI NGẪU NHIÊN
// ======================================================

function generateTask1Question() {

    const pool =
        getTask1QuestionPool();


    if (
        pool.length ===
        0
    ) {

        throw new Error(
            "Không có đồng vị trong bộ dữ liệu."
        );
    }


    let selected =
        null;


    /*
     * Hạn chế lặp lại ngay cùng một câu.
     */

    for (
        let attempt = 0;
        attempt < 20;
        attempt++
    ) {

        const randomIndex =
            Math.floor(
                Math.random()
                *
                pool.length
            );


        const candidate =
            pool[
                randomIndex
            ];


        const key =
            `${candidate.symbol}-${candidate.A}`;


        if (
            pool.length === 1
            ||
            key !==
            task1PreviousKey
        ) {

            selected =
                candidate;


            task1PreviousKey =
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


        task1PreviousKey =
            `${selected.symbol}-${selected.A}`;
    }


    task1CurrentProperties =
        calculateNuclearProperties(
            selected.symbol,
            selected.A
        );


    updateTask1QuestionDisplay();


    resetTask1Answers();
}


// ======================================================
// HIỂN THỊ ĐỀ
// ======================================================

function updateTask1QuestionDisplay() {

    const p =
        task1CurrentProperties;


    task1NuclearNotation.innerHTML =
        p.notationHtml;


    task1NuclideName.textContent =
        `${p.vietnameseName} – ${p.label}`;
}


// ======================================================
// ĐÁNH GIÁ MỘT GIÁ TRỊ
// ======================================================

function evaluateTask1Number(
    input,
    expected,
    feedback
) {

    clearTask1FeedbackElement(
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
// ĐÁNH GIÁ CÂU KHÁI NIỆM
// ======================================================

function evaluateTask1Concept() {

    clearTask1FeedbackElement(
        task1ConceptFeedback
    );


    if (
        task1ConceptSelect.value ===
        ""
    ) {

        task1ConceptFeedback.textContent =
            "Em chưa chọn câu trả lời.";


        task1ConceptFeedback.classList.add(
            "invalid"
        );


        return false;
    }


    if (
        task1ConceptSelect.value ===
        "correct"
    ) {

        task1ConceptFeedback.textContent =
            "✓ Nhận xét phù hợp.";


        task1ConceptFeedback.classList.add(
            "correct"
        );


        return true;
    }


    task1ConceptFeedback.textContent =
        "Hãy nhớ: Z là số proton và N = A − Z.";


    task1ConceptFeedback.classList.add(
        "review"
    );


    return false;
}


// ======================================================
// HIỂN THỊ LỜI GIẢI
// ======================================================

function showTask1Solution() {

    const p =
        task1CurrentProperties;


    task1CorrectA.textContent =
        String(
            p.A
        );


    task1CorrectZ.textContent =
        String(
            p.Z
        );


    task1CorrectN.textContent =
        String(
            p.N
        );


    task1CorrectProtons.textContent =
        String(
            p.protonNumber
        );


    task1CorrectNeutrons.textContent =
        String(
            p.neutronNumber
        );


    task1Solution.innerHTML =
        `
        <p>
            Kí hiệu hạt nhân:
            <strong>${p.notationHtml}</strong>
        </p>

        <p>
            Số phía trên bên trái là số khối:
            <strong>A = ${p.A}</strong>.
        </p>

        <p>
            Số phía dưới bên trái là số proton:
            <strong>Z = ${p.Z}</strong>.
        </p>

        <p>
            Vì
            N = A − Z,
            nên:
        </p>

        <p>
            N
            =
            ${p.A}
            −
            ${p.Z}
            =
            <strong>${p.N}</strong>.
        </p>

        <p>
            Do đó hạt nhân ${p.label}
            gồm:
            <strong>${p.protonNumber} proton</strong>
            và
            <strong>${p.neutronNumber} neutron</strong>.
        </p>

        <p>
            Kiểm tra:
            ${p.protonNumber}
            +
            ${p.neutronNumber}
            =
            ${p.A}.
        </p>
        `;
}


// ======================================================
// KIỂM TRA
// ======================================================

function checkTask1() {

    if (
        !task1CurrentProperties
    ) {

        return;
    }


    const p =
        task1CurrentProperties;


    const resultA =
        evaluateTask1Number(
            task1AInput,
            p.A,
            task1AFeedback
        );


    const resultZ =
        evaluateTask1Number(
            task1ZInput,
            p.Z,
            task1ZFeedback
        );


    const resultN =
        evaluateTask1Number(
            task1NInput,
            p.N,
            task1NFeedback
        );


    const resultProton =
        evaluateTask1Number(
            task1ProtonInput,
            p.protonNumber,
            task1ProtonFeedback
        );


    const resultNeutron =
        evaluateTask1Number(
            task1NeutronInput,
            p.neutronNumber,
            task1NeutronFeedback
        );


    const resultConcept =
        evaluateTask1Concept();


    const results =
    [
        resultA,
        resultZ,
        resultN,
        resultProton,
        resultNeutron,
        resultConcept
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
        `Đã kiểm tra: ${correctCount}/6 nội dung phù hợp.`;


    if (
        correctCount ===
        6
    ) {

        task1Conclusion.textContent =
            `Em đã xác định đúng cấu tạo của ${p.label}. `
            +
            `Hạt nhân có A = ${p.A}, Z = ${p.Z}, `
            +
            `nên N = ${p.A} − ${p.Z} = ${p.N}. `
            +
            `Vì vậy hạt nhân gồm ${p.Z} proton `
            +
            `và ${p.N} neutron.`;

    } else {

        task1Conclusion.textContent =
            "Hãy đọc lại vị trí của A và Z trong kí hiệu hạt nhân. "
            +
            "Sau khi xác định A và Z, "
            +
            "số neutron được tính bằng N = A − Z.";
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
// KHỞI TẠO
// ======================================================

generateTask1Question();