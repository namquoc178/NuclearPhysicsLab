console.log(
    "TASK2.JS - NUCLEAR FUSION Q VALUE VERSION 1"
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

const task2ReactionSelect =
    getTask2RequiredElement(
        "task2ReactionSelect"
    );


const task2ReactionEquation =
    getTask2RequiredElement(
        "task2ReactionEquation"
    );


const task2MassDataGrid =
    getTask2RequiredElement(
        "task2MassDataGrid"
    );


const task2InitialMassExpression =
    getTask2RequiredElement(
        "task2InitialMassExpression"
    );


const task2FinalMassExpression =
    getTask2RequiredElement(
        "task2FinalMassExpression"
    );


const task2InitialMassInput =
    getTask2RequiredElement(
        "task2InitialMassInput"
    );


const task2FinalMassInput =
    getTask2RequiredElement(
        "task2FinalMassInput"
    );


const task2MassDifferenceInput =
    getTask2RequiredElement(
        "task2MassDifferenceInput"
    );


const task2QInput =
    getTask2RequiredElement(
        "task2QInput"
    );


const task2InitialMassFeedback =
    getTask2RequiredElement(
        "task2InitialMassFeedback"
    );


const task2FinalMassFeedback =
    getTask2RequiredElement(
        "task2FinalMassFeedback"
    );


const task2MassDifferenceFeedback =
    getTask2RequiredElement(
        "task2MassDifferenceFeedback"
    );


const task2QFeedback =
    getTask2RequiredElement(
        "task2QFeedback"
    );


const task2MassRelationSelect =
    getTask2RequiredElement(
        "task2MassRelationSelect"
    );


const task2EnergyMeaningSelect =
    getTask2RequiredElement(
        "task2EnergyMeaningSelect"
    );


const task2MassRelationFeedback =
    getTask2RequiredElement(
        "task2MassRelationFeedback"
    );


const task2EnergyMeaningFeedback =
    getTask2RequiredElement(
        "task2EnergyMeaningFeedback"
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


const task2CorrectInitialMass =
    getTask2RequiredElement(
        "task2CorrectInitialMass"
    );


const task2CorrectFinalMass =
    getTask2RequiredElement(
        "task2CorrectFinalMass"
    );


const task2CorrectMassDifference =
    getTask2RequiredElement(
        "task2CorrectMassDifference"
    );


const task2CorrectQ =
    getTask2RequiredElement(
        "task2CorrectQ"
    );


const task2InitialMassBar =
    getTask2RequiredElement(
        "task2InitialMassBar"
    );


const task2FinalMassBar =
    getTask2RequiredElement(
        "task2FinalMassBar"
    );


const task2InitialMassBarLabel =
    getTask2RequiredElement(
        "task2InitialMassBarLabel"
    );


const task2FinalMassBarLabel =
    getTask2RequiredElement(
        "task2FinalMassBarLabel"
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
// PHẢN ỨNG HIỆN TẠI
// ======================================================

let task2CurrentReaction =
    null;


let task2CurrentProperties =
    null;


// ======================================================
// KÝ HIỆU HẠT NHÂN HTML
// ======================================================

function getTask2NuclideHtml(
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
// NHÃN KHỐI LƯỢNG
// ======================================================

function getTask2MassLabel(
    id
) {

    if (
        id ===
        "H-1"
    ) {

        return "m(H-1)";
    }


    if (
        id ===
        "H-2"
    ) {

        return "m(D)";
    }


    if (
        id ===
        "H-3"
    ) {

        return "m(T)";
    }


    if (
        id ===
        "He-3"
    ) {

        return "m(He-3)";
    }


    if (
        id ===
        "He-4"
    ) {

        return "m(He-4)";
    }


    return `m(${id})`;
}


// ======================================================
// PHƯƠNG TRÌNH
// ======================================================

function updateTask2ReactionEquation() {

    const reactantParts =
        task2CurrentReaction.reactants.map(
            id =>
                `<span>${getTask2NuclideHtml(id)}</span>`
        );


    const productParts =
        task2CurrentReaction.products.map(
            id =>
                `<span>${getTask2NuclideHtml(id)}</span>`
        );


    if (
        task2CurrentReaction.emittedNeutrons >
        0
    ) {

        const count =
            task2CurrentReaction.emittedNeutrons;


        const neutronHtml =
            count ===
            1

            ?
            "<sup>1</sup><sub>0</sub>n"

            :
            `${count}<sup>1</sup><sub>0</sub>n`;


        productParts.push(
            `<span>${neutronHtml}</span>`
        );
    }


    task2ReactionEquation.innerHTML =
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
// DANH SÁCH HẠT CẦN HIỂN THỊ KHỐI LƯỢNG
// ======================================================

function getTask2UniqueNuclides() {

    const ids =
    [
        ...task2CurrentReaction.reactants,
        ...task2CurrentReaction.products
    ];


    return Array.from(
        new Set(
            ids
        )
    );
}


// ======================================================
// HIỂN THỊ DỮ LIỆU KHỐI LƯỢNG
// ======================================================

function updateTask2MassData() {

    task2MassDataGrid.innerHTML =
        "";


    const uniqueIds =
        getTask2UniqueNuclides();


    for (
        const id
        of
        uniqueIds
    ) {

        const nuclide =
            getFusionNuclideById(
                id
            );


        const box =
            document.createElement(
                "div"
            );


        box.className =
            "task2-data-box";


        box.innerHTML =
            `
            <span>
                ${getTask2MassLabel(id)}
            </span>

            <strong>
                ${nuclide.atomicMassU} u
            </strong>
            `;


        task2MassDataGrid.appendChild(
            box
        );
    }


    if (
        task2CurrentReaction.emittedNeutrons >
        0
    ) {

        const neutronBox =
            document.createElement(
                "div"
            );


        neutronBox.className =
            "task2-data-box";


        neutronBox.innerHTML =
            `
            <span>
                m(n)
            </span>

            <strong>
                ${NEUTRON_MASS_U} u
            </strong>
            `;


        task2MassDataGrid.appendChild(
            neutronBox
        );
    }
}


// ======================================================
// BIỂU THỨC KHỐI LƯỢNG
// ======================================================

function buildTask2MassExpression(
    nuclideIds,
    emittedNeutrons
) {

    const terms =
        nuclideIds.map(
            id => {

                const nuclide =
                    getFusionNuclideById(
                        id
                    );


                return String(
                    nuclide.atomicMassU
                );
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

            terms.push(
                String(
                    NEUTRON_MASS_U
                )
            );

        } else {

            terms.push(
                `${emittedNeutrons} × ${NEUTRON_MASS_U}`
            );
        }
    }


    return (
        terms.join(
            " + "
        )
        +
        " ="
    );
}


// ======================================================
// CẬP NHẬT BIỂU THỨC
// ======================================================

function updateTask2Expressions() {

    task2InitialMassExpression.textContent =
        buildTask2MassExpression(
            task2CurrentReaction.reactants,
            0
        );


    task2FinalMassExpression.textContent =
        buildTask2MassExpression(
            task2CurrentReaction.products,
            task2CurrentReaction.emittedNeutrons
        );
}


// ======================================================
// CHUYỂN DẤU PHẨY THẬP PHÂN
// ======================================================

function parseTask2Number(
    value
) {

    const normalized =
        value
            .trim()
            .replace(
                ",",
                "."
            );


    if (
        normalized ===
        ""
    ) {

        return NaN;
    }


    return Number(
        normalized
    );
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
        task2InitialMassFeedback,
        task2FinalMassFeedback,
        task2MassDifferenceFeedback,
        task2QFeedback,
        task2MassRelationFeedback,
        task2EnergyMeaningFeedback
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
// ĐÁNH GIÁ SỐ
// ======================================================

function evaluateTask2Number(
    input,
    expected,
    tolerance,
    feedback
) {

    clearTask2FeedbackElement(
        feedback
    );


    const value =
        parseTask2Number(
            input.value
        );


    if (
        !Number.isFinite(
            value
        )
    ) {

        feedback.textContent =
            "Chưa có giá trị hợp lệ.";


        feedback.classList.add(
            "invalid"
        );


        return false;
    }


    const difference =
        Math.abs(
            value
            -
            expected
        );


    if (
        difference <=
        tolerance
    ) {

        feedback.textContent =
            "✓ Kết quả phù hợp.";


        feedback.classList.add(
            "correct"
        );


        return true;
    }


    feedback.textContent =
        "Cần kiểm tra lại phép tính hoặc cách làm tròn.";


    feedback.classList.add(
        "review"
    );


    return false;
}


// ======================================================
// ĐÁNH GIÁ LỰA CHỌN
// ======================================================

function evaluateTask2Choice(
    value,
    expected,
    feedback
) {

    clearTask2FeedbackElement(
        feedback
    );


    if (
        value ===
        ""
    ) {

        feedback.textContent =
            "Bạn chưa chọn câu trả lời.";


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
            "✓ Nhận xét phù hợp.";


        feedback.classList.add(
            "correct"
        );


        return true;
    }


    feedback.textContent =
        "Hãy đối chiếu lại kết quả khối lượng và Q.";


    feedback.classList.add(
        "review"
    );


    return false;
}


// ======================================================
// THANH SO SÁNH KHỐI LƯỢNG
// ======================================================

function updateTask2MassBars() {

    const p =
        task2CurrentProperties;


    task2InitialMassBar.style.width =
        "100%";


    const ratio =
        p.finalMassU
        /
        p.initialMassU;


    task2FinalMassBar.style.width =
        `${Math.max(
            0,
            Math.min(
                100,
                ratio * 100
            )
        )}%`;


    task2InitialMassBarLabel.textContent =
        `${p.initialMassU.toFixed(9)} u`;


    task2FinalMassBarLabel.textContent =
        `${p.finalMassU.toFixed(9)} u`;
}


// ======================================================
// HIỂN THỊ LỜI GIẢI
// ======================================================

function showTask2Solution() {

    const p =
        task2CurrentProperties;


    task2CorrectInitialMass.textContent =
        `${p.initialMassU.toFixed(9)} u`;


    task2CorrectFinalMass.textContent =
        `${p.finalMassU.toFixed(9)} u`;


    task2CorrectMassDifference.textContent =
        `${p.massDifferenceU.toFixed(9)} u`;


    task2CorrectQ.textContent =
        `${p.qValueMeV.toFixed(3)} MeV`;


    updateTask2MassBars();


    const initialExpression =
        buildTask2MassExpression(
            task2CurrentReaction.reactants,
            0
        )
        .replace(
            " =",
            ""
        );


    const finalExpression =
        buildTask2MassExpression(
            task2CurrentReaction.products,
            task2CurrentReaction.emittedNeutrons
        )
        .replace(
            " =",
            ""
        );


    task2Solution.innerHTML =
        `
        <p>
            <strong>Phản ứng:</strong>
            ${task2CurrentReaction.name}
        </p>

        <p>
            <strong>Bước 1. Khối lượng trước phản ứng:</strong>
        </p>

        <p>
            m<sub>trước</sub>
            =
            ${initialExpression}
            =
            ${p.initialMassU.toFixed(11)} u.
        </p>


        <p>
            <strong>Bước 2. Khối lượng sau phản ứng:</strong>
        </p>

        <p>
            m<sub>sau</sub>
            =
            ${finalExpression}
            =
            ${p.finalMassU.toFixed(11)} u.
        </p>


        <p>
            <strong>Bước 3. Chênh lệch khối lượng:</strong>
        </p>

        <p>
            Δm
            =
            m<sub>trước</sub>
            −
            m<sub>sau</sub>
        </p>

        <p>
            =
            ${p.initialMassU.toFixed(11)}
            −
            ${p.finalMassU.toFixed(11)}
            =
            ${p.massDifferenceU.toFixed(11)} u.
        </p>


        <p>
            <strong>Bước 4. Năng lượng phản ứng:</strong>
        </p>

        <p>
            Q
            =
            Δm × 931.49410242
        </p>

        <p>
            =
            ${p.massDifferenceU.toFixed(11)}
            ×
            ${U_TO_MEV}
            ≈
            ${p.qValueMeV.toFixed(3)} MeV.
        </p>
        `;
}


// ======================================================
// KIỂM TRA NHIỆM VỤ
// ======================================================

function checkTask2() {

    const p =
        task2CurrentProperties;


    /*
     * Cho phép học sinh làm tròn hợp lý.
     */

    const result1 =
        evaluateTask2Number(
            task2InitialMassInput,
            p.initialMassU,
            0.0005,
            task2InitialMassFeedback
        );


    const result2 =
        evaluateTask2Number(
            task2FinalMassInput,
            p.finalMassU,
            0.0005,
            task2FinalMassFeedback
        );


    const result3 =
        evaluateTask2Number(
            task2MassDifferenceInput,
            p.massDifferenceU,
            0.0005,
            task2MassDifferenceFeedback
        );


    const result4 =
        evaluateTask2Number(
            task2QInput,
            p.qValueMeV,
            0.05,
            task2QFeedback
        );


    const result5 =
        evaluateTask2Choice(
            task2MassRelationSelect.value,
            "correct",
            task2MassRelationFeedback
        );


    const result6 =
        evaluateTask2Choice(
            task2EnergyMeaningSelect.value,
            "correct",
            task2EnergyMeaningFeedback
        );


    const correctCount =
        [
            result1,
            result2,
            result3,
            result4,
            result5,
            result6
        ].filter(
            value =>
                value
        ).length;


    showTask2Solution();


    task2Result.hidden =
        false;


    task2Status.textContent =
        `Đã kiểm tra: ${correctCount}/6 nội dung phù hợp.`;


    if (
        correctCount ===
        6
    ) {

        task2Conclusion.textContent =
            `Các kết quả đều phù hợp. `
            +
            `Với phản ứng ${task2CurrentReaction.name}, `
            +
            `khối lượng sau phản ứng nhỏ hơn khối lượng trước `
            +
            `một lượng khoảng ${p.massDifferenceU.toFixed(6)} u. `
            +
            `Chênh lệch đó tương ứng với `
            +
            `Q ≈ ${p.qValueMeV.toFixed(3)} MeV. `
            +
            `Vì Q > 0 nên phản ứng giải phóng năng lượng.`;

    } else {

        task2Conclusion.textContent =
            "Hãy kiểm tra lại từng bước tính. "
            +
            "Cần cộng đầy đủ khối lượng của tất cả sản phẩm, "
            +
            "sau đó tính Δm = m_trước − m_sau "
            +
            "và Q = Δm × 931.49410242.";
    }


    if (
        typeof setStatus ===
        "function"
    ) {

        setStatus(
            "Đã kiểm tra Nhiệm vụ 2",
            "finished"
        );
    }
}


// ======================================================
// RESET CÂU TRẢ LỜI
// ======================================================

function resetTask2Answers() {

    task2InitialMassInput.value =
        "";


    task2FinalMassInput.value =
        "";


    task2MassDifferenceInput.value =
        "";


    task2QInput.value =
        "";


    task2MassRelationSelect.value =
        "";


    task2EnergyMeaningSelect.value =
        "";


    clearAllTask2Feedback();


    task2Result.hidden =
        true;


    task2InitialMassBar.style.width =
        "0%";


    task2FinalMassBar.style.width =
        "0%";


    task2InitialMassBarLabel.textContent =
        "—";


    task2FinalMassBarLabel.textContent =
        "—";


    task2Status.textContent =
        "Chờ học sinh thực hiện";
}


// ======================================================
// CHỌN PHẢN ỨNG
// ======================================================

function selectTask2Reaction(
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
            `Không tìm thấy phản ứng ${reactionId} trong Nhiệm vụ 2.`
        );
    }


    task2CurrentReaction =
        reaction;


    task2CurrentProperties =
        calculateFusionReactionProperties(
            reaction
        );


    updateTask2ReactionEquation();


    updateTask2MassData();


    updateTask2Expressions();


    resetTask2Answers();
}


// ======================================================
// EVENT
// ======================================================

task2ReactionSelect.addEventListener(
    "change",

    () => {

        selectTask2Reaction(
            task2ReactionSelect.value
        );
    }
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

selectTask2Reaction(
    task2ReactionSelect.value
);