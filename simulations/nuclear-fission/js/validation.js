// ======================================================
// DOM - KIỂM CHỨNG PHẢN ỨNG
// ======================================================

const runReactionValidationButton =
    document.getElementById(
        "runReactionValidationButton"
    );


const resetReactionValidationButton =
    document.getElementById(
        "resetReactionValidationButton"
    );


const reactionValidationStatus =
    document.getElementById(
        "reactionValidationStatus"
    );


const reactionValidationResult =
    document.getElementById(
        "reactionValidationResult"
    );


const reactionValidationCount =
    document.getElementById(
        "reactionValidationCount"
    );


const reactionValidationAStatus =
    document.getElementById(
        "reactionValidationAStatus"
    );


const reactionValidationZStatus =
    document.getElementById(
        "reactionValidationZStatus"
    );


const reactionValidationQStatus =
    document.getElementById(
        "reactionValidationQStatus"
    );


const reactionValidationTableBody =
    document.getElementById(
        "reactionValidationTableBody"
    );


const reactionValidationConclusion =
    document.getElementById(
        "reactionValidationConclusion"
    );


// ======================================================
// DOM - KIỂM CHỨNG MONTE CARLO
// ======================================================

const monteValidationPresetSelect =
    document.getElementById(
        "monteValidationPresetSelect"
    );


const monteValidationTrialsSelect =
    document.getElementById(
        "monteValidationTrialsSelect"
    );


const runMonteValidationButton =
    document.getElementById(
        "runMonteValidationButton"
    );


const repeatMonteValidationButton =
    document.getElementById(
        "repeatMonteValidationButton"
    );


const resetMonteValidationButton =
    document.getElementById(
        "resetMonteValidationButton"
    );


const monteValidationStatus =
    document.getElementById(
        "monteValidationStatus"
    );


const monteValidationResult =
    document.getElementById(
        "monteValidationResult"
    );


const monteValidationProbability =
    document.getElementById(
        "monteValidationProbability"
    );


const monteValidationExpectedR =
    document.getElementById(
        "monteValidationExpectedR"
    );


const monteValidationMeasuredR =
    document.getElementById(
        "monteValidationMeasuredR"
    );


const monteValidationDifference =
    document.getElementById(
        "monteValidationDifference"
    );


const monteValidationTrials =
    document.getElementById(
        "monteValidationTrials"
    );


const monteValidationFissions =
    document.getElementById(
        "monteValidationFissions"
    );


const monteValidationChildren =
    document.getElementById(
        "monteValidationChildren"
    );


const monteValidationAverageNu =
    document.getElementById(
        "monteValidationAverageNu"
    );


const monteValidationChartCanvas =
    document.getElementById(
        "monteValidationChart"
    );


const monteValidationConclusion =
    document.getElementById(
        "monteValidationConclusion"
    );


// ======================================================
// KIỂM TRA DOM
// ======================================================

const validationRequiredElements =
[
    runReactionValidationButton,
    resetReactionValidationButton,
    reactionValidationStatus,
    reactionValidationResult,
    reactionValidationCount,
    reactionValidationAStatus,
    reactionValidationZStatus,
    reactionValidationQStatus,
    reactionValidationTableBody,
    reactionValidationConclusion,

    monteValidationPresetSelect,
    monteValidationTrialsSelect,
    runMonteValidationButton,
    repeatMonteValidationButton,
    resetMonteValidationButton,
    monteValidationStatus,
    monteValidationResult,
    monteValidationProbability,
    monteValidationExpectedR,
    monteValidationMeasuredR,
    monteValidationDifference,
    monteValidationTrials,
    monteValidationFissions,
    monteValidationChildren,
    monteValidationAverageNu,
    monteValidationChartCanvas,
    monteValidationConclusion
];


if (
    validationRequiredElements.some(
        element =>
            element === null
    )
) {

    throw new Error(
        "Thiếu một hoặc nhiều phần tử HTML của chế độ Kiểm chứng."
    );
}


// ======================================================
// TRẠNG THÁI
// ======================================================

let monteValidationChart =
    null;


// ======================================================
// KIỂM CHỨNG PHẢN ỨNG
// ======================================================

function runReactionValidation() {

    const rows =
        [];


    for (
        const channel
        of
        FISSION_CHANNELS
    ) {

        const properties =
            calculateFissionChannelProperties(
                channel
            );


        /*
         * Kiểm tra Q bằng một đường tính độc lập
         * ngay trong validation.js.
         */

        const directMassDifference =
            properties.initialMassU
            -
            properties.finalMassU;


        const directQ =
            directMassDifference
            *
            U_TO_MEV;


        const qDifference =
            Math.abs(
                directQ
                -
                properties.qValueMeV
            );


        const qAlgorithmConsistent =
            qDifference <
            1e-9;


        rows.push(
            {

                channel,

                properties,

                qAlgorithmConsistent

            }
        );
    }


    const allAConserved =
        rows.every(
            row =>
                row.properties
                    .massNumberConserved
        );


    const allZConserved =
        rows.every(
            row =>
                row.properties
                    .atomicNumberConserved
        );


    const allQPositive =
        rows.every(
            row =>
                row.properties.qValueMeV >
                0
        );


    const allQConsistent =
        rows.every(
            row =>
                row.qAlgorithmConsistent
        );


    reactionValidationCount.textContent =
        String(
            rows.length
        );


    reactionValidationAStatus.textContent =
        allAConserved
            ?
            "Đạt"
            :
            "Cần kiểm tra";


    reactionValidationZStatus.textContent =
        allZConserved
            ?
            "Đạt"
            :
            "Cần kiểm tra";


    reactionValidationQStatus.textContent =
        (
            allQPositive
            &&
            allQConsistent
        )
            ?
            "Đạt"
            :
            "Cần kiểm tra";


    // ==================================================
    // BẢNG
    // ==================================================

    reactionValidationTableBody.innerHTML =
        "";


    for (
        const rowData
        of
        rows
    ) {

        const p =
            rowData.properties;


        const valid =
            p.massNumberConserved
            &&
            p.atomicNumberConserved
            &&
            p.qValueMeV >
            0
            &&
            rowData.qAlgorithmConsistent;


        const row =
            document.createElement(
                "tr"
            );


        row.innerHTML =
            `
            <td>
                ${rowData.channel.shortName}
            </td>

            <td>
                ${p.initialA}
            </td>

            <td>
                ${p.finalA}
            </td>

            <td>
                ${p.initialZ}
            </td>

            <td>
                ${p.finalZ}
            </td>

            <td>
                ${p.massDifferenceU.toFixed(6)}
            </td>

            <td>
                ${p.qValueMeV.toFixed(3)}
            </td>

            <td class="${
                valid
                    ?
                    "validation-pass"
                    :
                    "validation-review"
            }">
                ${
                    valid
                        ?
                        "✓ Đạt"
                        :
                        "Cần kiểm tra"
                }
            </td>
            `;


        reactionValidationTableBody.appendChild(
            row
        );
    }


    reactionValidationResult.hidden =
        false;


    reactionValidationStatus.textContent =
        (
            allAConserved
            &&
            allZConserved
            &&
            allQPositive
            &&
            allQConsistent
        )
            ?
            "Kiểm chứng hoàn thành"
            :
            "Phát hiện nội dung cần kiểm tra";


    if (
        allAConserved
        &&
        allZConserved
        &&
        allQPositive
        &&
        allQConsistent
    ) {

        reactionValidationConclusion.textContent =
            `Đã kiểm tra ${rows.length} kênh phân hạch minh họa. `
            +
            `Trong toàn bộ bộ dữ liệu hiện tại, tổng A và tổng Z `
            +
            `đều được bảo toàn. `
            +
            `Các giá trị Q đều dương và kết quả từ hàm tính Q `
            +
            `nhất quán với phép tính trực tiếp `
            +
            `Q = (m_trước − m_sau) × ${U_TO_MEV}.`;

    } else {

        reactionValidationConclusion.textContent =
            "Có ít nhất một kênh chưa thỏa điều kiện kiểm tra. "
            +
            "Hãy rà soát lại dữ liệu hạt nhân hoặc thuật toán.";
    }


    if (
        typeof setStatus ===
        "function"
    ) {

        setStatus(
            "Kiểm chứng phản ứng hoàn thành",
            "finished"
        );
    }
}


// ======================================================
// RESET KIỂM CHỨNG PHẢN ỨNG
// ======================================================

function resetReactionValidation() {

    reactionValidationResult.hidden =
        true;


    reactionValidationStatus.textContent =
        "Chưa chạy";


    reactionValidationCount.textContent =
        "—";


    reactionValidationAStatus.textContent =
        "—";


    reactionValidationZStatus.textContent =
        "—";


    reactionValidationQStatus.textContent =
        "—";


    reactionValidationTableBody.innerHTML =
        "";


    reactionValidationConclusion.textContent =
        "";
}


// ======================================================
// MỘT PHÉP THỬ MONTE CARLO
//
// Trả về số neutron con do một neutron ban đầu tạo ra.
// ======================================================

function sampleMonteValidationChildren(
    probability
) {

    if (
        Math.random() >=
        probability
    ) {

        return {

            fission:
                false,

            children:
                0

        };
    }


    const children =
        Math.random() <
        0.5

        ?
        2

        :
        3;


    return {

        fission:
            true,

        children

    };
}


// ======================================================
// CHẠY NHIỀU PHÉP THỬ
// ======================================================

function runMonteValidationExperiment(
    probability,
    trials
) {

    let fissions =
        0;


    let totalChildren =
        0;


    for (
        let index = 0;
        index < trials;
        index++
    ) {

        const sample =
            sampleMonteValidationChildren(
                probability
            );


        if (
            sample.fission
        ) {

            fissions++;
        }


        totalChildren +=
            sample.children;
    }


    const measuredR =
        totalChildren /
        trials;


    const averageNu =
        fissions >
        0
            ?
            totalChildren /
            fissions
            :
            0;


    return {

        fissions,

        totalChildren,

        measuredR,

        averageNu

    };
}


// ======================================================
// VẼ BIỂU ĐỒ KIỂM CHỨNG MONTE CARLO
// ======================================================

function createMonteValidationChart(
    expectedR,
    measuredR
) {

    if (
        monteValidationChart !==
        null
    ) {

        monteValidationChart.destroy();
    }


    monteValidationChart =
        new Chart(
            monteValidationChartCanvas.getContext(
                "2d"
            ),

            {

                type:
                    "bar",


                data:
                {

                    labels:
                    [
                        "k lí thuyết",
                        "k Monte Carlo"
                    ],


                    datasets:
                    [

                        {
                            label:
                                "Số neutron con trung bình trên một neutron",

                            data:
                            [
                                expectedR,
                                measuredR
                            ],

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
                                    "k"

                            }

                        }

                    }

                }

            }
        );
}


// ======================================================
// CHẠY KIỂM CHỨNG MONTE CARLO
// ======================================================

function runMonteValidation() {

    const preset =
        CHAIN_PRESETS[
            monteValidationPresetSelect.value
        ];


    if (
        !preset
    ) {

        throw new Error(
            "Không tìm thấy chế độ Monte Carlo."
        );
    }


    const trials =
        Number(
            monteValidationTrialsSelect.value
        );


    const probability =
        preset.probability;


    const expectedR =
        probability
        *
        CHAIN_AVERAGE_NEUTRONS_PER_FISSION;


    const result =
        runMonteValidationExperiment(
            probability,
            trials
        );


    const difference =
        Math.abs(
            result.measuredR
            -
            expectedR
        );


    monteValidationProbability.textContent =
        probability.toFixed(
            2
        );


    monteValidationExpectedR.textContent =
        expectedR.toFixed(
            4
        );


    monteValidationMeasuredR.textContent =
        result.measuredR.toFixed(
            4
        );


    monteValidationDifference.textContent =
        difference.toFixed(
            4
        );


    monteValidationTrials.textContent =
        trials.toLocaleString(
            "vi-VN"
        );


    monteValidationFissions.textContent =
        result.fissions.toLocaleString(
            "vi-VN"
        );


    monteValidationChildren.textContent =
        result.totalChildren.toLocaleString(
            "vi-VN"
        );


    monteValidationAverageNu.textContent =
        result.averageNu.toFixed(
            4
        );


    createMonteValidationChart(
        expectedR,
        result.measuredR
    );


    monteValidationResult.hidden =
        false;


    /*
     * Ngưỡng này chỉ dùng để đưa phản hồi sư phạm.
     * Với 10 000 phép thử, sai lệch thường nhỏ hơn khá nhiều.
     */

    const tolerance =
        0.05;


    if (
        difference <=
        tolerance
    ) {

        monteValidationStatus.textContent =
            "Kết quả phù hợp với kì vọng của mô hình";


        monteValidationConclusion.textContent =
            `Với p = ${probability.toFixed(2)}, `
            +
            `mô hình dự đoán k = 2,5p = `
            +
            `${expectedR.toFixed(4)}. `
            +
            `Sau ${trials.toLocaleString("vi-VN")} phép thử độc lập, `
            +
            `Monte Carlo cho R ≈ ${result.measuredR.toFixed(4)}, `
            +
            `sai lệch ${difference.toFixed(4)}. `
            +
            `Kết quả phù hợp với kì vọng thống kê của mô hình. `
            +
            `Nếu chạy lại, giá trị sẽ thay đổi một ít do tính ngẫu nhiên.`;

    } else {

        monteValidationStatus.textContent =
            "Sai lệch lớn hơn ngưỡng phản hồi";


        monteValidationConclusion.textContent =
            `Lần chạy này cho sai lệch ${difference.toFixed(4)} `
            +
            `so với R lí thuyết = ${expectedR.toFixed(4)}. `
            +
            `Do đây là mô phỏng ngẫu nhiên, có thể chạy lại `
            +
            `hoặc tăng số phép thử để quan sát sự hội tụ của giá trị trung bình.`;
    }


    if (
        typeof setStatus ===
        "function"
    ) {

        setStatus(
            "Kiểm chứng Monte Carlo hoàn thành",
            "finished"
        );
    }
}


// ======================================================
// RESET MONTE CARLO
// ======================================================

function resetMonteValidation() {

    monteValidationResult.hidden =
        true;


    monteValidationStatus.textContent =
        "Chưa chạy";


    monteValidationProbability.textContent =
        "—";


    monteValidationExpectedR.textContent =
        "—";


    monteValidationMeasuredR.textContent =
        "—";


    monteValidationDifference.textContent =
        "—";


    monteValidationTrials.textContent =
        "—";


    monteValidationFissions.textContent =
        "—";


    monteValidationChildren.textContent =
        "—";


    monteValidationAverageNu.textContent =
        "—";


    monteValidationConclusion.textContent =
        "";


    if (
        monteValidationChart !==
        null
    ) {

        monteValidationChart.destroy();


        monteValidationChart =
            null;
    }
}


// ======================================================
// EVENT
// ======================================================

runReactionValidationButton.addEventListener(
    "click",
    runReactionValidation
);


resetReactionValidationButton.addEventListener(
    "click",
    resetReactionValidation
);


runMonteValidationButton.addEventListener(
    "click",
    runMonteValidation
);


repeatMonteValidationButton.addEventListener(
    "click",
    runMonteValidation
);


resetMonteValidationButton.addEventListener(
    "click",
    resetMonteValidation
);


monteValidationPresetSelect.addEventListener(
    "change",
    resetMonteValidation
);


monteValidationTrialsSelect.addEventListener(
    "change",
    resetMonteValidation
);


// ======================================================
// KHỞI TẠO
// ======================================================

resetReactionValidation();


resetMonteValidation();