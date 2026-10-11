console.log(
    "TASK3.JS - NUCLEAR FUSION COMPARISON VERSION 1"
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

const runTask3Button =
    getTask3RequiredElement(
        "runTask3Button"
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


const task3TableBody =
    getTask3RequiredElement(
        "task3TableBody"
    );


const task3ChartCanvas =
    getTask3RequiredElement(
        "task3Chart"
    );


const task3MinimumQ =
    getTask3RequiredElement(
        "task3MinimumQ"
    );


const task3MaximumQ =
    getTask3RequiredElement(
        "task3MaximumQ"
    );


const task3QRange =
    getTask3RequiredElement(
        "task3QRange"
    );


const task3HighestQSelect =
    getTask3RequiredElement(
        "task3HighestQSelect"
    );


const task3DDComparisonSelect =
    getTask3RequiredElement(
        "task3DDComparisonSelect"
    );


const task3MassQRelationSelect =
    getTask3RequiredElement(
        "task3MassQRelationSelect"
    );


const task3ConservationSelect =
    getTask3RequiredElement(
        "task3ConservationSelect"
    );


const task3HighestQFeedback =
    getTask3RequiredElement(
        "task3HighestQFeedback"
    );


const task3DDComparisonFeedback =
    getTask3RequiredElement(
        "task3DDComparisonFeedback"
    );


const task3MassQRelationFeedback =
    getTask3RequiredElement(
        "task3MassQRelationFeedback"
    );


const task3ConservationFeedback =
    getTask3RequiredElement(
        "task3ConservationFeedback"
    );


const checkTask3Button =
    getTask3RequiredElement(
        "checkTask3Button"
    );


const resetTask3AnswersButton =
    getTask3RequiredElement(
        "resetTask3AnswersButton"
    );


const task3ConclusionBox =
    getTask3RequiredElement(
        "task3ConclusionBox"
    );


const task3Conclusion =
    getTask3RequiredElement(
        "task3Conclusion"
    );


// ======================================================
// TRẠNG THÁI
// ======================================================

let task3ReactionData =
    [];


let task3Chart =
    null;


// ======================================================
// TẠO DỮ LIỆU
// ======================================================

function buildTask3ReactionData() {

    return FUSION_REACTIONS.map(
        reaction => {

            const p =
                calculateFusionReactionProperties(
                    reaction
                );


            return {

                id:
                    reaction.id,

                name:
                    reaction.name,

                shortName:
                    reaction.shortName,

                initialA:
                    p.initialA,

                finalA:
                    p.finalA,

                initialZ:
                    p.initialZ,

                finalZ:
                    p.finalZ,

                initialMassU:
                    p.initialMassU,

                finalMassU:
                    p.finalMassU,

                massDifferenceU:
                    p.massDifferenceU,

                qValueMeV:
                    p.qValueMeV,

                massNumberConserved:
                    p.massNumberConserved,

                atomicNumberConserved:
                    p.atomicNumberConserved

            };

        }
    );
}


// ======================================================
// FEEDBACK
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


function clearAllTask3Feedback() {

    const elements =
    [
        task3HighestQFeedback,
        task3DDComparisonFeedback,
        task3MassQRelationFeedback,
        task3ConservationFeedback
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
// ĐÁNH GIÁ LỰA CHỌN
// ======================================================

function evaluateTask3Choice(
    selectedValue,
    expectedValue,
    feedback
) {

    clearTask3FeedbackElement(
        feedback
    );


    if (
        selectedValue ===
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
        "Hãy đối chiếu lại bảng và đồ thị.";


    feedback.classList.add(
        "review"
    );


    return false;
}


// ======================================================
// TẠO BẢNG
// ======================================================

function createTask3Table(
    data
) {

    task3TableBody.innerHTML =
        "";


    for (
        const item
        of
        data
    ) {

        const row =
            document.createElement(
                "tr"
            );


        row.innerHTML =
            `
            <td>
                ${item.name}
            </td>

            <td>
                ${item.initialA} / ${item.finalA}
            </td>

            <td>
                ${item.initialZ} / ${item.finalZ}
            </td>

            <td>
                ${item.initialMassU.toFixed(9)}
            </td>

            <td>
                ${item.finalMassU.toFixed(9)}
            </td>

            <td>
                ${item.massDifferenceU.toFixed(6)}
            </td>

            <td>
                ${item.qValueMeV.toFixed(3)}
            </td>
            `;


        task3TableBody.appendChild(
            row
        );
    }
}


// ======================================================
// TẠO ĐỒ THỊ
// ======================================================

function createTask3Chart(
    data
) {

    if (
        typeof Chart ===
        "undefined"
    ) {

        throw new Error(
            "Chart.js chưa được tải."
        );
    }


    if (
        task3Chart !==
        null
    ) {

        task3Chart.destroy();
    }


    task3Chart =
        new Chart(
            task3ChartCanvas.getContext(
                "2d"
            ),

            {

                type:
                    "bar",


                data:
                {

                    labels:
                        data.map(
                            item =>
                                item.name
                        ),


                    datasets:
                    [

                        {

                            label:
                                "Q (MeV)",

                            data:
                                data.map(
                                    item =>
                                        item.qValueMeV
                                ),

                            borderWidth:
                                1

                        }

                    ]

                },


                options:
                {

                    responsive:
                        true,


                    maintainAspectRatio:
                        false,


                    animation:
                        false,


                    plugins:
                    {

                        tooltip:
                        {

                            callbacks:
                            {

                                label:
                                    function(
                                        context
                                    ) {

                                        return (
                                            `Q = `
                                            +
                                            `${Number(context.raw).toFixed(3)} MeV`
                                        );
                                    }

                            }

                        }

                    },


                    scales:
                    {

                        y:
                        {

                            beginAtZero:
                                true,


                            title:
                            {

                                display:
                                    true,

                                text:
                                    "Q (MeV)"

                            }

                        },


                        x:
                        {

                            title:
                            {

                                display:
                                    true,

                                text:
                                    "Phản ứng nhiệt hạch"

                            }

                        }

                    }

                }

            }
        );
}


// ======================================================
// CHẠY NHIỆM VỤ
// ======================================================

function runTask3() {

    task3ReactionData =
        buildTask3ReactionData();


    if (
        task3ReactionData.length ===
        0
    ) {

        task3Status.textContent =
            "Không có dữ liệu phản ứng.";


        return;
    }


    createTask3Table(
        task3ReactionData
    );


    createTask3Chart(
        task3ReactionData
    );


    const minimum =
        task3ReactionData.reduce(
            (
                best,
                current
            ) => {

                return (
                    current.qValueMeV <
                    best.qValueMeV
                )
                    ?
                    current
                    :
                    best;
            }
        );


    const maximum =
        task3ReactionData.reduce(
            (
                best,
                current
            ) => {

                return (
                    current.qValueMeV >
                    best.qValueMeV
                )
                    ?
                    current
                    :
                    best;
            }
        );


    const range =
        maximum.qValueMeV
        -
        minimum.qValueMeV;


    task3MinimumQ.textContent =
        `${minimum.qValueMeV.toFixed(3)} MeV`;


    task3MaximumQ.textContent =
        `${maximum.qValueMeV.toFixed(3)} MeV`;


    task3QRange.textContent =
        `${range.toFixed(3)} MeV`;


    task3Result.hidden =
        false;


    task3ConclusionBox.hidden =
        true;


    task3Status.textContent =
        "Đã tính xong bốn phản ứng. Hãy quan sát bảng và đồ thị.";


    if (
        typeof setStatus ===
        "function"
    ) {

        setStatus(
            "Nhiệm vụ 3 đã sẵn sàng",
            "ready"
        );
    }
}


// ======================================================
// KIỂM TRA PHÂN TÍCH
// ======================================================

function checkTask3Answers() {

    if (
        task3ReactionData.length ===
        0
    ) {

        task3Status.textContent =
            "Hãy nhấn “So sánh các phản ứng” trước.";


        return;
    }


    const maximum =
        task3ReactionData.reduce(
            (
                best,
                current
            ) => {

                return (
                    current.qValueMeV >
                    best.qValueMeV
                )
                    ?
                    current
                    :
                    best;
            }
        );


    const result1 =
        evaluateTask3Choice(
            task3HighestQSelect.value,
            maximum.id,
            task3HighestQFeedback
        );


    const result2 =
        evaluateTask3Choice(
            task3DDComparisonSelect.value,
            "correct",
            task3DDComparisonFeedback
        );


    const result3 =
        evaluateTask3Choice(
            task3MassQRelationSelect.value,
            "correct",
            task3MassQRelationFeedback
        );


    const result4 =
        evaluateTask3Choice(
            task3ConservationSelect.value,
            "correct",
            task3ConservationFeedback
        );


    const correctCount =
        [
            result1,
            result2,
            result3,
            result4
        ].filter(
            value =>
                value
        ).length;


    task3Status.textContent =
        `Đã kiểm tra: ${correctCount}/4 nhận xét phù hợp.`;


    const ddHe3 =
        task3ReactionData.find(
            item =>
                item.id ===
                "D-D-He3-n"
        );


    const ddT =
        task3ReactionData.find(
            item =>
                item.id ===
                "D-D-T-H1"
        );


    task3ConclusionBox.hidden =
        false;


    task3Conclusion.textContent =
        `Trong bốn phản ứng đang khảo sát, `
        +
        `${maximum.name} có Q lớn nhất, khoảng `
        +
        `${maximum.qValueMeV.toFixed(3)} MeV. `
        +
        `Hai nhánh D + D có cùng khối lượng ban đầu `
        +
        `nhưng Q lần lượt khoảng `
        +
        `${ddHe3.qValueMeV.toFixed(3)} MeV và `
        +
        `${ddT.qValueMeV.toFixed(3)} MeV, `
        +
        `do các sản phẩm có tổng khối lượng khác nhau. `
        +
        `Trong toàn bộ bốn phản ứng, tổng A và tổng Z vẫn được bảo toàn.`;


    if (
        typeof setStatus ===
        "function"
    ) {

        setStatus(
            "Đã kiểm tra Nhiệm vụ 3",
            "finished"
        );
    }
}


// ======================================================
// RESET CÂU HỎI
// ======================================================

function resetTask3Answers() {

    task3HighestQSelect.value =
        "";


    task3DDComparisonSelect.value =
        "";


    task3MassQRelationSelect.value =
        "";


    task3ConservationSelect.value =
        "";


    clearAllTask3Feedback();


    task3ConclusionBox.hidden =
        true;


    if (
        task3ReactionData.length >
        0
    ) {

        task3Status.textContent =
            "Đã xóa câu trả lời. Hãy quan sát lại bảng và đồ thị.";

    } else {

        task3Status.textContent =
            "Chưa thực hiện";
    }
}


// ======================================================
// RESET TOÀN BỘ
// ======================================================

function resetTask3() {

    task3ReactionData =
        [];


    task3Result.hidden =
        true;


    task3TableBody.innerHTML =
        "";


    task3MinimumQ.textContent =
        "—";


    task3MaximumQ.textContent =
        "—";


    task3QRange.textContent =
        "—";


    task3HighestQSelect.value =
        "";


    task3DDComparisonSelect.value =
        "";


    task3MassQRelationSelect.value =
        "";


    task3ConservationSelect.value =
        "";


    clearAllTask3Feedback();


    task3ConclusionBox.hidden =
        true;


    task3Conclusion.textContent =
        "";


    task3Status.textContent =
        "Chưa thực hiện";


    if (
        task3Chart !==
        null
    ) {

        task3Chart.destroy();


        task3Chart =
            null;
    }
}


// ======================================================
// EVENT
// ======================================================

runTask3Button.addEventListener(
    "click",
    runTask3
);


resetTask3Button.addEventListener(
    "click",
    resetTask3
);


checkTask3Button.addEventListener(
    "click",
    checkTask3Answers
);


resetTask3AnswersButton.addEventListener(
    "click",
    resetTask3Answers
);


// ======================================================
// KHỞI TẠO
// ======================================================

resetTask3();