console.log(
    "TASK3.JS - FISSION CHANNEL COMPARISON VERSION 1"
);


// ======================================================
// DOM
// ======================================================

const runTask3Button =
    document.getElementById(
        "runTask3Button"
    );


const resetTask3Button =
    document.getElementById(
        "resetTask3Button"
    );


const task3Status =
    document.getElementById(
        "task3Status"
    );


const task3Result =
    document.getElementById(
        "task3Result"
    );


const task3TableBody =
    document.getElementById(
        "task3TableBody"
    );


const task3ChartCanvas =
    document.getElementById(
        "task3Chart"
    );


const task3MinimumQ =
    document.getElementById(
        "task3MinimumQ"
    );


const task3MaximumQ =
    document.getElementById(
        "task3MaximumQ"
    );


const task3QRange =
    document.getElementById(
        "task3QRange"
    );


const task3HighestQSelect =
    document.getElementById(
        "task3HighestQSelect"
    );


const task3MassRelationSelect =
    document.getElementById(
        "task3MassRelationSelect"
    );


const task3SameEnergySelect =
    document.getElementById(
        "task3SameEnergySelect"
    );


const task3ConservationSelect =
    document.getElementById(
        "task3ConservationSelect"
    );


const task3HighestQFeedback =
    document.getElementById(
        "task3HighestQFeedback"
    );


const task3MassRelationFeedback =
    document.getElementById(
        "task3MassRelationFeedback"
    );


const task3SameEnergyFeedback =
    document.getElementById(
        "task3SameEnergyFeedback"
    );


const task3ConservationFeedback =
    document.getElementById(
        "task3ConservationFeedback"
    );


const checkTask3Button =
    document.getElementById(
        "checkTask3Button"
    );


const resetTask3AnswersButton =
    document.getElementById(
        "resetTask3AnswersButton"
    );


const task3ConclusionBox =
    document.getElementById(
        "task3ConclusionBox"
    );


const task3Conclusion =
    document.getElementById(
        "task3Conclusion"
    );


// ======================================================
// KIỂM TRA DOM
// ======================================================

const task3RequiredElements =
[
    runTask3Button,
    resetTask3Button,
    task3Status,
    task3Result,
    task3TableBody,
    task3ChartCanvas,
    task3MinimumQ,
    task3MaximumQ,
    task3QRange,
    task3HighestQSelect,
    task3MassRelationSelect,
    task3SameEnergySelect,
    task3ConservationSelect,
    task3HighestQFeedback,
    task3MassRelationFeedback,
    task3SameEnergyFeedback,
    task3ConservationFeedback,
    checkTask3Button,
    resetTask3AnswersButton,
    task3ConclusionBox,
    task3Conclusion
];


if (
    task3RequiredElements.some(
        element =>
            element === null
    )
) {

    throw new Error(
        "Thiếu một hoặc nhiều phần tử HTML của Nhiệm vụ 3."
    );
}


// ======================================================
// TRẠNG THÁI
// ======================================================

let task3ChannelData =
    [];


let task3Chart =
    null;


// ======================================================
// TẠO DỮ LIỆU SO SÁNH
// ======================================================

function buildTask3ChannelData() {

    return FISSION_CHANNELS.map(
        channel => {

            const properties =
                calculateFissionChannelProperties(
                    channel
                );


            return {

                id:
                    channel.id,

                label:
                    channel.shortName,

                emittedNeutrons:
                    channel.emittedNeutrons,

                initialA:
                    properties.initialA,

                finalA:
                    properties.finalA,

                initialZ:
                    properties.initialZ,

                finalZ:
                    properties.finalZ,

                massNumberConserved:
                    properties.massNumberConserved,

                atomicNumberConserved:
                    properties.atomicNumberConserved,

                initialMassU:
                    properties.initialMassU,

                finalMassU:
                    properties.finalMassU,

                massDifferenceU:
                    properties.massDifferenceU,

                qValueMeV:
                    properties.qValueMeV

            };

        }
    );
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


function clearAllTask3Feedback() {

    const elements =
    [
        task3HighestQFeedback,
        task3MassRelationFeedback,
        task3SameEnergyFeedback,
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
    feedbackElement
) {

    clearTask3FeedbackElement(
        feedbackElement
    );


    if (
        selectedValue ===
        ""
    ) {

        feedbackElement.textContent =
            "Bạn chưa chọn câu trả lời.";


        feedbackElement.classList.add(
            "invalid"
        );


        return false;
    }


    if (
        selectedValue ===
        expectedValue
    ) {

        feedbackElement.textContent =
            "✓ Nhận xét phù hợp.";


        feedbackElement.classList.add(
            "correct"
        );


        return true;
    }


    feedbackElement.textContent =
        "Hãy đối chiếu lại bảng và đồ thị.";


    feedbackElement.classList.add(
        "review"
    );


    return false;
}


// ======================================================
// VẼ ĐỒ THỊ
// ======================================================

function createTask3Chart(
    data
) {

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
                                item.label
                        ),


                    datasets:
                    [

                        {
                            label:
                                "Q của kênh phân hạch (MeV)",

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
                                    "Kênh phân hạch minh họa"

                            }

                        }

                    }

                }

            }
        );
}


// ======================================================
// CHẠY NHIỆM VỤ 3
// ======================================================

function runTask3() {

    task3ChannelData =
        buildTask3ChannelData();


    if (
        task3ChannelData.length ===
        0
    ) {

        alert(
            "Không có dữ liệu kênh phân hạch."
        );


        return;
    }


    // --------------------------------------------------
    // BẢNG
    // --------------------------------------------------

    task3TableBody.innerHTML =
        "";


    for (
        const item
        of
        task3ChannelData
    ) {

        const row =
            document.createElement(
                "tr"
            );


        row.innerHTML =
            `
            <td>
                ${item.label}
            </td>

            <td>
                ${item.emittedNeutrons}
            </td>

            <td>
                ${item.initialA} / ${item.finalA}
            </td>

            <td>
                ${item.initialZ} / ${item.finalZ}
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


    // --------------------------------------------------
    // TÌM MIN / MAX
    // --------------------------------------------------

    const minimum =
        task3ChannelData.reduce(
            (
                best,
                current
            ) =>
                current.qValueMeV <
                best.qValueMeV
                    ?
                    current
                    :
                    best
        );


    const maximum =
        task3ChannelData.reduce(
            (
                best,
                current
            ) =>
                current.qValueMeV >
                best.qValueMeV
                    ?
                    current
                    :
                    best
        );


    const qRange =
        maximum.qValueMeV -
        minimum.qValueMeV;


    task3MinimumQ.textContent =
        `${minimum.qValueMeV.toFixed(3)} MeV`;


    task3MaximumQ.textContent =
        `${maximum.qValueMeV.toFixed(3)} MeV`;


    task3QRange.textContent =
        `${qRange.toFixed(3)} MeV`;


    // --------------------------------------------------
    // ĐỒ THỊ
    // --------------------------------------------------

    createTask3Chart(
        task3ChannelData
    );


    // --------------------------------------------------
    // HIỂN THỊ
    // --------------------------------------------------

    task3Result.hidden =
        false;


    task3ConclusionBox.hidden =
        true;


    task3Status.textContent =
        "Đã tính xong ba kênh. Hãy so sánh bảng và đồ thị.";


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
// KIỂM TRA CÂU HỎI
// ======================================================

function checkTask3Answers() {

    if (
        task3ChannelData.length ===
        0
    ) {

        alert(
            "Hãy nhấn “So sánh các kênh” trước."
        );


        return;
    }


    const maximum =
        task3ChannelData.reduce(
            (
                best,
                current
            ) =>
                current.qValueMeV >
                best.qValueMeV
                    ?
                    current
                    :
                    best
        );


    const result1 =
        evaluateTask3Choice(
            task3HighestQSelect.value,
            maximum.id,
            task3HighestQFeedback
        );


    const result2 =
        evaluateTask3Choice(
            task3MassRelationSelect.value,
            "correct",
            task3MassRelationFeedback
        );


    const result3 =
        evaluateTask3Choice(
            task3SameEnergySelect.value,
            "no",
            task3SameEnergyFeedback
        );


    const result4 =
        evaluateTask3Choice(
            task3ConservationSelect.value,
            "both",
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


    const minimum =
        task3ChannelData.reduce(
            (
                best,
                current
            ) =>
                current.qValueMeV <
                best.qValueMeV
                    ?
                    current
                    :
                    best
        );


    task3Status.textContent =
        `Đã kiểm tra: ${correctCount}/4 nhận xét phù hợp.`;


    task3ConclusionBox.hidden =
        false;


    task3Conclusion.textContent =
        `Trong ba kênh minh họa, ${maximum.label} có Q lớn nhất `
        +
        `với khoảng ${maximum.qValueMeV.toFixed(3)} MeV, `
        +
        `trong khi ${minimum.label} có Q khoảng `
        +
        `${minimum.qValueMeV.toFixed(3)} MeV. `
        +
        `Các kênh đều bảo toàn tổng A và tổng Z, `
        +
        `nhưng do khối lượng của các tổ hợp sản phẩm khác nhau `
        +
        `nên Δm và Q không giống nhau. `
        +
        `Vì vậy không nên coi một giá trị Q duy nhất là kết quả `
        +
        `của mọi cách phân chia hạt nhân trong mô hình này.`;


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
// RESET CÂU TRẢ LỜI
// ======================================================

function resetTask3Answers() {

    task3HighestQSelect.value =
        "";


    task3MassRelationSelect.value =
        "";


    task3SameEnergySelect.value =
        "";


    task3ConservationSelect.value =
        "";


    clearAllTask3Feedback();


    task3ConclusionBox.hidden =
        true;


    if (
        task3ChannelData.length >
        0
    ) {

        task3Status.textContent =
            "Đã xóa câu trả lời. Hãy quan sát lại bảng và đồ thị.";
    }
}


// ======================================================
// RESET TOÀN BỘ NHIỆM VỤ 3
// ======================================================

function resetTask3() {

    task3ChannelData =
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


    task3Status.textContent =
        "Chưa thực hiện";


    task3HighestQSelect.value =
        "";


    task3MassRelationSelect.value =
        "";


    task3SameEnergySelect.value =
        "";


    task3ConservationSelect.value =
        "";


    clearAllTask3Feedback();


    task3ConclusionBox.hidden =
        true;


    task3Conclusion.textContent =
        "";


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