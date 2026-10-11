console.log(
    "TASK1.JS - NUCLEAR FUSION CONSERVATION VERSION 1"
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

const task1ReactionSelect =
    getTask1RequiredElement(
        "task1ReactionSelect"
    );


const task1ReactionEquation =
    getTask1RequiredElement(
        "task1ReactionEquation"
    );


const task1InitialAExpression =
    getTask1RequiredElement(
        "task1InitialAExpression"
    );


const task1FinalAExpression =
    getTask1RequiredElement(
        "task1FinalAExpression"
    );


const task1InitialZExpression =
    getTask1RequiredElement(
        "task1InitialZExpression"
    );


const task1FinalZExpression =
    getTask1RequiredElement(
        "task1FinalZExpression"
    );


const task1InitialAInput =
    getTask1RequiredElement(
        "task1InitialAInput"
    );


const task1FinalAInput =
    getTask1RequiredElement(
        "task1FinalAInput"
    );


const task1InitialZInput =
    getTask1RequiredElement(
        "task1InitialZInput"
    );


const task1FinalZInput =
    getTask1RequiredElement(
        "task1FinalZInput"
    );


const task1InitialAFeedback =
    getTask1RequiredElement(
        "task1InitialAFeedback"
    );


const task1FinalAFeedback =
    getTask1RequiredElement(
        "task1FinalAFeedback"
    );


const task1InitialZFeedback =
    getTask1RequiredElement(
        "task1InitialZFeedback"
    );


const task1FinalZFeedback =
    getTask1RequiredElement(
        "task1FinalZFeedback"
    );


const task1ConservationSelect =
    getTask1RequiredElement(
        "task1ConservationSelect"
    );


const task1MeaningSelect =
    getTask1RequiredElement(
        "task1MeaningSelect"
    );


const task1ConservationFeedback =
    getTask1RequiredElement(
        "task1ConservationFeedback"
    );


const task1MeaningFeedback =
    getTask1RequiredElement(
        "task1MeaningFeedback"
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


const task1CorrectInitialA =
    getTask1RequiredElement(
        "task1CorrectInitialA"
    );


const task1CorrectFinalA =
    getTask1RequiredElement(
        "task1CorrectFinalA"
    );


const task1CorrectInitialZ =
    getTask1RequiredElement(
        "task1CorrectInitialZ"
    );


const task1CorrectFinalZ =
    getTask1RequiredElement(
        "task1CorrectFinalZ"
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
// PHẢN ỨNG HIỆN TẠI
// ======================================================

let task1CurrentReaction =
    null;


let task1CurrentProperties =
    null;


// ======================================================
// KÍ HIỆU HẠT NHÂN HTML
// ======================================================

function getTask1NuclideHtml(
    id
) {

    const nuclide =
        getFusionNuclideById(
            id
        );


    if (
        !nuclide
    ) {

        return id;
    }


    return (
        `<sup>${nuclide.A}</sup>`
        +
        `<sub>${nuclide.Z}</sub>`
        +
        `${nuclide.symbol}`
    );
}


// ======================================================
// TẠO PHƯƠNG TRÌNH
// ======================================================

function updateTask1ReactionEquation() {

    const reactantParts =
        task1CurrentReaction.reactants.map(
            id =>
                `<span>${getTask1NuclideHtml(id)}</span>`
        );


    const productParts =
        task1CurrentReaction.products.map(
            id =>
                `<span>${getTask1NuclideHtml(id)}</span>`
        );


    if (
        task1CurrentReaction.emittedNeutrons >
        0
    ) {

        const number =
            task1CurrentReaction.emittedNeutrons;


        const neutron =
            number ===
            1

            ?
            "<sup>1</sup><sub>0</sub>n"

            :
            `${number}<sup>1</sup><sub>0</sub>n`;


        productParts.push(
            `<span>${neutron}</span>`
        );
    }


    task1ReactionEquation.innerHTML =
        reactantParts.join(
            "<span>+</span>"
        )
        +
        "<span>→</span>"
        +
        productParts.join(
            "<span>+</span>"
        );
}


// ======================================================
// BIỂU THỨC A
// ======================================================

function buildTask1AExpression(
    nuclideIds,
    emittedNeutrons
) {

    const values =
        nuclideIds.map(
            id => {

                const nuclide =
                    getFusionNuclideById(
                        id
                    );


                return nuclide.A;
            }
        );


    if (
        emittedNeutrons >
        0
    ) {

        if (
            emittedNeutrons ===
            1
        ) {

            values.push(
                1
            );

        } else {

            values.push(
                `${emittedNeutrons} × 1`
            );
        }
    }


    return (
        values.join(
            " + "
        )
        +
        " ="
    );
}


// ======================================================
// BIỂU THỨC Z
// ======================================================

function buildTask1ZExpression(
    nuclideIds,
    emittedNeutrons
) {

    const values =
        nuclideIds.map(
            id => {

                const nuclide =
                    getFusionNuclideById(
                        id
                    );


                return nuclide.Z;
            }
        );


    if (
        emittedNeutrons >
        0
    ) {

        if (
            emittedNeutrons ===
            1
        ) {

            values.push(
                0
            );

        } else {

            values.push(
                `${emittedNeutrons} × 0`
            );
        }
    }


    return (
        values.join(
            " + "
        )
        +
        " ="
    );
}


// ======================================================
// CẬP NHẬT BIỂU THỨC
// ======================================================

function updateTask1Expressions() {

    task1InitialAExpression.textContent =
        buildTask1AExpression(
            task1CurrentReaction.reactants,
            0
        );


    task1FinalAExpression.textContent =
        buildTask1AExpression(
            task1CurrentReaction.products,
            task1CurrentReaction.emittedNeutrons
        );


    task1InitialZExpression.textContent =
        buildTask1ZExpression(
            task1CurrentReaction.reactants,
            0
        );


    task1FinalZExpression.textContent =
        buildTask1ZExpression(
            task1CurrentReaction.products,
            task1CurrentReaction.emittedNeutrons
        );
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

    const elements =
    [
        task1InitialAFeedback,
        task1FinalAFeedback,
        task1InitialZFeedback,
        task1FinalZFeedback,
        task1ConservationFeedback,
        task1MeaningFeedback
    ];


    for (
        const element
        of
        elements
    ) {

        clearTask1FeedbackElement(
            element
        );
    }
}


// ======================================================
// ĐÁNH GIÁ SỐ
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
            "✓ Kết quả phù hợp.";


        feedback.classList.add(
            "correct"
        );


        return true;
    }


    feedback.textContent =
        "Hãy kiểm tra lại phép cộng.";


    feedback.classList.add(
        "review"
    );


    return false;
}


// ======================================================
// ĐÁNH GIÁ LỰA CHỌN
// ======================================================

function evaluateTask1Choice(
    selectedValue,
    expectedValue,
    feedback
) {

    clearTask1FeedbackElement(
        feedback
    );


    if (
        selectedValue ===
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
        selectedValue ===
        expectedValue
    ) {

        feedback.textContent =
            "✓ Nhận xét phù hợp.";


        feedback.classList.add(
            "correct"
        );


        return true;
    }


    feedback.textContent =
        "Hãy đối chiếu lại A và Z của các hạt.";


    feedback.classList.add(
        "review"
    );


    return false;
}


// ======================================================
// HIỂN THỊ KẾT QUẢ ĐÚNG
// ======================================================

function showTask1Solution() {

    const p =
        task1CurrentProperties;


    task1CorrectInitialA.textContent =
        String(
            p.initialA
        );


    task1CorrectFinalA.textContent =
        String(
            p.finalA
        );


    task1CorrectInitialZ.textContent =
        String(
            p.initialZ
        );


    task1CorrectFinalZ.textContent =
        String(
            p.finalZ
        );


    const initialAExpression =
        buildTask1AExpression(
            task1CurrentReaction.reactants,
            0
        )
        .replace(
            " =",
            ""
        );


    const finalAExpression =
        buildTask1AExpression(
            task1CurrentReaction.products,
            task1CurrentReaction.emittedNeutrons
        )
        .replace(
            " =",
            ""
        );


    const initialZExpression =
        buildTask1ZExpression(
            task1CurrentReaction.reactants,
            0
        )
        .replace(
            " =",
            ""
        );


    const finalZExpression =
        buildTask1ZExpression(
            task1CurrentReaction.products,
            task1CurrentReaction.emittedNeutrons
        )
        .replace(
            " =",
            ""
        );


    task1Solution.innerHTML =
        `
        <p>
            <strong>Phản ứng:</strong>
            ${task1CurrentReaction.name}
        </p>

        <p>
            <strong>Số nucleon trước phản ứng:</strong>
        </p>

        <p>
            A<sub>trước</sub>
            =
            ${initialAExpression}
            =
            ${p.initialA}.
        </p>

        <p>
            <strong>Số nucleon sau phản ứng:</strong>
        </p>

        <p>
            A<sub>sau</sub>
            =
            ${finalAExpression}
            =
            ${p.finalA}.
        </p>

        <p>
            Vì
            ${p.initialA}
            =
            ${p.finalA},
            tổng số nucleon A được bảo toàn.
        </p>

        <p>
            <strong>Điện tích trước phản ứng:</strong>
        </p>

        <p>
            Z<sub>trước</sub>
            =
            ${initialZExpression}
            =
            ${p.initialZ}.
        </p>

        <p>
            <strong>Điện tích sau phản ứng:</strong>
        </p>

        <p>
            Z<sub>sau</sub>
            =
            ${finalZExpression}
            =
            ${p.finalZ}.
        </p>

        <p>
            Vì
            ${p.initialZ}
            =
            ${p.finalZ},
            tổng điện tích Z được bảo toàn.
        </p>
        `;
}


// ======================================================
// KIỂM TRA NHIỆM VỤ
// ======================================================

function checkTask1() {

    const p =
        task1CurrentProperties;


    const result1 =
        evaluateTask1Number(
            task1InitialAInput,
            p.initialA,
            task1InitialAFeedback
        );


    const result2 =
        evaluateTask1Number(
            task1FinalAInput,
            p.finalA,
            task1FinalAFeedback
        );


    const result3 =
        evaluateTask1Number(
            task1InitialZInput,
            p.initialZ,
            task1InitialZFeedback
        );


    const result4 =
        evaluateTask1Number(
            task1FinalZInput,
            p.finalZ,
            task1FinalZFeedback
        );


    const result5 =
        evaluateTask1Choice(
            task1ConservationSelect.value,
            "both",
            task1ConservationFeedback
        );


    const result6 =
        evaluateTask1Choice(
            task1MeaningSelect.value,
            "correct",
            task1MeaningFeedback
        );


    const results =
    [
        result1,
        result2,
        result3,
        result4,
        result5,
        result6
    ];


    const correctCount =
        results.filter(
            value =>
                value
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
            `Các kết quả đều phù hợp. `
            +
            `Trong phản ứng ${task1CurrentReaction.name}, `
            +
            `tổng số nucleon A và tổng điện tích Z đều được bảo toàn. `
            +
            `Các nucleon không biến mất mà được tổ chức lại `
            +
            `trong các sản phẩm của phản ứng.`;

    } else {

        task1Conclusion.textContent =
            "Hãy đối chiếu lại các phép tính. "
            +
            "Khi kiểm tra một phản ứng hạt nhân, "
            +
            "cần cộng số khối A và số điện tích Z "
            +
            "của tất cả các hạt ở mỗi phía.";
    }


    if (
        typeof setStatus ===
        "function"
    ) {

        setStatus(
            "Đã kiểm tra Nhiệm vụ 1",
            "finished"
        );
    }
}


// ======================================================
// RESET CÂU TRẢ LỜI
// ======================================================

function resetTask1Answers() {

    task1InitialAInput.value =
        "";


    task1FinalAInput.value =
        "";


    task1InitialZInput.value =
        "";


    task1FinalZInput.value =
        "";


    task1ConservationSelect.value =
        "";


    task1MeaningSelect.value =
        "";


    clearAllTask1Feedback();


    task1Result.hidden =
        true;


    task1Status.textContent =
        "Chờ học sinh thực hiện";
}


// ======================================================
// CHỌN PHẢN ỨNG
// ======================================================

function selectTask1Reaction(
    reactionId
) {

    const reaction =
        getFusionReactionById(
            reactionId
        );


    if (
        !reaction
    ) {

        throw new Error(
            `Không tìm thấy phản ứng ${reactionId} trong Nhiệm vụ 1.`
        );
    }


    task1CurrentReaction =
        reaction;


    task1CurrentProperties =
        calculateFusionReactionProperties(
            reaction
        );


    updateTask1ReactionEquation();


    updateTask1Expressions();


    resetTask1Answers();
}


// ======================================================
// EVENT
// ======================================================

task1ReactionSelect.addEventListener(
    "change",

    () => {

        selectTask1Reaction(
            task1ReactionSelect.value
        );
    }
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

selectTask1Reaction(
    task1ReactionSelect.value
);