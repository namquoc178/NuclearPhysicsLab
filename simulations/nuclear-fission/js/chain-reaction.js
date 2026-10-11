console.log(
    "CHAIN-REACTION.JS - EDUCATIONAL MONTE CARLO VERSION 1"
);


// ======================================================
// MÔ HÌNH GIÁO DỤC
// ======================================================
//
// Mỗi neutron:
// - gây phân hạch với xác suất hiệu dụng p;
// - nếu không, được xem là rời khỏi chuỗi.
//
// Mỗi sự kiện phân hạch sinh ngẫu nhiên:
// - 2 neutron với xác suất 0.5
// - 3 neutron với xác suất 0.5
//
// Số neutron trung bình:
// nu_bar = 2.5
//
// k = p * nu_bar  (hệ số nhân neutron của MÔ HÌNH)
//
// k < 1: dưới tới hạn, k = 1: tới hạn, k > 1: vượt hạn.
// k ở đây là tham số của mô hình giáo dục,
// không phải tham số của một lò phản ứng thực tế.
//
// Chuỗi bắt đầu với CHAIN_INITIAL_NEUTRONS neutron. Nếu chỉ bắt đầu
// từ 1 neutron, ngay cả khi k = 1,3 chuỗi vẫn tắt hẳn với xác suất
// khoảng 0,69 (nghiệm của q = f(q)), dễ gây hiểu nhầm.
// Với 20 neutron, xác suất tất cả cùng tắt chỉ còn khoảng 0,0006.
// ======================================================


const CHAIN_PRESETS = {

    decay: {

        label:
            "Dưới tới hạn (k < 1)",

        probability:
            0.24

    },


    balanced: {

        label:
            "Tới hạn (k = 1)",

        probability:
            0.40

    },


    growth: {

        label:
            "Vượt hạn (k > 1)",

        probability:
            0.52

    }

};


const CHAIN_AVERAGE_NEUTRONS_PER_FISSION =
    2.5;


const CHAIN_MAX_NEUTRONS =
    5000;


const CHAIN_INITIAL_NEUTRONS =
    20;


// ======================================================
// DOM
// ======================================================

const chainPresetSelect =
    document.getElementById(
        "chainPresetSelect"
    );


const chainGenerationSelect =
    document.getElementById(
        "chainGenerationSelect"
    );


const chainProbabilityDisplay =
    document.getElementById(
        "chainProbabilityDisplay"
    );


const chainReproductionDisplay =
    document.getElementById(
        "chainReproductionDisplay"
    );


const runChainButton =
    document.getElementById(
        "runChainButton"
    );


const repeatChainButton =
    document.getElementById(
        "repeatChainButton"
    );


const resetChainButton =
    document.getElementById(
        "resetChainButton"
    );


const chainStatus =
    document.getElementById(
        "chainStatus"
    );


const chainResult =
    document.getElementById(
        "chainResult"
    );


const chainActualGenerations =
    document.getElementById(
        "chainActualGenerations"
    );


const chainTotalFissions =
    document.getElementById(
        "chainTotalFissions"
    );


const chainPeakNeutrons =
    document.getElementById(
        "chainPeakNeutrons"
    );


const chainFinalNeutrons =
    document.getElementById(
        "chainFinalNeutrons"
    );


const chainCanvas =
    document.getElementById(
        "chainCanvas"
    );


const chainContext =
    chainCanvas.getContext(
        "2d"
    );


const chainChartCanvas =
    document.getElementById(
        "chainChart"
    );


const chainTableBody =
    document.getElementById(
        "chainTableBody"
    );


const chainConclusion =
    document.getElementById(
        "chainConclusion"
    );


// ======================================================
// KIỂM TRA DOM
// ======================================================

const chainRequiredElements =
[
    chainPresetSelect,
    chainGenerationSelect,
    chainProbabilityDisplay,
    chainReproductionDisplay,
    runChainButton,
    repeatChainButton,
    resetChainButton,
    chainStatus,
    chainResult,
    chainActualGenerations,
    chainTotalFissions,
    chainPeakNeutrons,
    chainFinalNeutrons,
    chainCanvas,
    chainChartCanvas,
    chainTableBody,
    chainConclusion
];


if (
    chainRequiredElements.some(
        element =>
            element === null
    )
) {

    throw new Error(
        "Thiếu một hoặc nhiều phần tử HTML của mô phỏng dây chuyền."
    );
}


// ======================================================
// TRẠNG THÁI
// ======================================================

let chainSimulationData =
    [];


let chainChart =
    null;


// ======================================================
// LẤY PRESET
// ======================================================

function getCurrentChainPreset() {

    const preset =
        CHAIN_PRESETS[
            chainPresetSelect.value
        ];


    if (
        !preset
    ) {

        throw new Error(
            "Không tìm thấy chế độ mô phỏng dây chuyền."
        );
    }


    return preset;
}


// ======================================================
// CẬP NHẬT THAM SỐ
// ======================================================

function updateChainParameterDisplay() {

    const preset =
        getCurrentChainPreset();


    const reproduction =
        preset.probability
        *
        CHAIN_AVERAGE_NEUTRONS_PER_FISSION;


    chainProbabilityDisplay.textContent =
        preset.probability.toFixed(
            2
        );


    chainReproductionDisplay.textContent =
        reproduction.toFixed(
            2
        );
}


// ======================================================
// SỐ NEUTRON SINH RA TỪ MỘT PHÂN HẠCH
// ======================================================

function sampleNeutronsFromFission() {

    return (
        Math.random() <
        0.5

        ?
        2

        :
        3
    );
}


// ======================================================
// MÔ PHỎNG MỘT LẦN
// ======================================================

function simulateChainReaction(
    probability,
    maximumGenerations
) {

    const data =
        [];


    let activeNeutrons =
        CHAIN_INITIAL_NEUTRONS;


    let totalFissions =
        0;


    let capped =
        false;


    /*
     * Thế hệ 0 chứa neutron khởi đầu.
     */

    data.push(
        {

            generation:
                0,

            incomingNeutrons:
                CHAIN_INITIAL_NEUTRONS,

            fissions:
                0,

            lostNeutrons:
                0,

            nextNeutrons:
                CHAIN_INITIAL_NEUTRONS

        }
    );


    for (
        let generation = 1;
        generation <= maximumGenerations;
        generation++
    ) {

        if (
            activeNeutrons <=
            0
        ) {

            break;
        }


        let fissions =
            0;


        let lostNeutrons =
            0;


        let nextNeutrons =
            0;


        for (
            let neutronIndex = 0;
            neutronIndex < activeNeutrons;
            neutronIndex++
        ) {

            if (
                Math.random() <
                probability
            ) {

                fissions++;


                nextNeutrons +=
                    sampleNeutronsFromFission();

            } else {

                lostNeutrons++;
            }


            if (
                nextNeutrons >=
                CHAIN_MAX_NEUTRONS
            ) {

                nextNeutrons =
                    CHAIN_MAX_NEUTRONS;


                capped =
                    true;


                // Các neutron chưa xét của thế hệ này không được mô phỏng
                // tiếp; ghi nhận chúng là không gây phân hạch để bảng số liệu
                // luôn thỏa: phân hạch + không phân hạch = neutron đầu thế hệ.
                lostNeutrons +=
                    activeNeutrons -
                    (neutronIndex + 1);


                break;
            }
        }


        totalFissions +=
            fissions;


        data.push(
            {

                generation,

                incomingNeutrons:
                    activeNeutrons,

                fissions,

                lostNeutrons,

                nextNeutrons

            }
        );


        activeNeutrons =
            nextNeutrons;


        if (
            capped
        ) {

            break;
        }
    }


    return {

        data,

        totalFissions,

        capped

    };
}


// ======================================================
// VẼ MÔ HÌNH CÁC THẾ HỆ
// ======================================================

function drawChainVisualization(
    data
) {

    const ctx =
        chainContext;


    const width =
        chainCanvas.width;


    const height =
        chainCanvas.height;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    ctx.fillStyle =
        "#f8fbff";


    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    if (
        data.length ===
        0
    ) {

        return;
    }


    const leftPadding =
        55;


    const rightPadding =
        45;


    const usableWidth =
        width
        -
        leftPadding
        -
        rightPadding;


    const stepX =
        data.length >
        1

        ?
        usableWidth /
        (
            data.length - 1
        )

        :
        usableWidth;


    const centerY =
        height /
        2;


    /*
     * Đường nối giữa các thế hệ.
     */

    ctx.strokeStyle =
        "#cbd5e1";


    ctx.lineWidth =
        2;


    for (
        let index = 0;
        index < data.length - 1;
        index++
    ) {

        const x1 =
            leftPadding
            +
            index *
            stepX;


        const x2 =
            leftPadding
            +
            (
                index + 1
            )
            *
            stepX;


        ctx.beginPath();


        ctx.moveTo(
            x1,
            centerY
        );


        ctx.lineTo(
            x2,
            centerY
        );


        ctx.stroke();
    }


    data.forEach(
        (
            item,
            index
        ) => {

            const x =
                leftPadding
                +
                index *
                stepX;


            const count =
                index === 0
                    ?
                    1
                    :
                    item.nextNeutrons;


            const displayedPoints =
                Math.min(
                    count,
                    12
                );


            const spacing =
                18;


            const totalHeight =
                (
                    displayedPoints - 1
                )
                *
                spacing;


            for (
                let point = 0;
                point < displayedPoints;
                point++
            ) {

                const y =
                    centerY
                    -
                    totalHeight /
                    2
                    +
                    point *
                    spacing;


                ctx.beginPath();


                ctx.arc(
                    x,
                    y,
                    6,
                    0,
                    Math.PI *
                    2
                );


                ctx.fillStyle =
                    "#2563eb";


                ctx.fill();
            }


            ctx.textAlign =
                "center";


            ctx.font =
                "12px Arial";


            ctx.fillStyle =
                "#475569";


            ctx.fillText(
                `G${item.generation}`,
                x,
                height - 34
            );


            ctx.font =
                "bold 12px Arial";


            ctx.fillStyle =
                "#0f172a";


            ctx.fillText(
                `N=${count}`,
                x,
                height - 16
            );


            if (
                count >
                displayedPoints
            ) {

                ctx.font =
                    "11px Arial";


                ctx.fillStyle =
                    "#64748b";


                ctx.fillText(
                    `(${displayedPoints} điểm minh họa)`,
                    x,
                    22
                );
            }

        }
    );
}


// ======================================================
// ĐỒ THỊ
// ======================================================

function createChainChart(
    data
) {

    if (
        chainChart !==
        null
    ) {

        chainChart.destroy();
    }


    chainChart =
        new Chart(
            chainChartCanvas.getContext(
                "2d"
            ),

            {

                type:
                    "line",


                data:
                {

                    labels:
                        data.map(
                            item =>
                                `G${item.generation}`
                        ),


                    datasets:
                    [

                        {
                            label:
                                "Số neutron",

                            data:
                                data.map(
                                    (
                                        item,
                                        index
                                    ) =>
                                        index === 0
                                            ?
                                            1
                                            :
                                            item.nextNeutrons
                                ),

                            borderWidth:
                                2,

                            pointRadius:
                                5,

                            pointHoverRadius:
                                7,

                            tension:
                                0
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
                                    "Số neutron"

                            }

                        },


                        x:
                        {

                            title:
                            {

                                display:
                                    true,

                                text:
                                    "Thế hệ"

                            }

                        }

                    }

                }

            }
        );
}


// ======================================================
// TẠO BẢNG
// ======================================================

function createChainTable(
    data
) {

    chainTableBody.innerHTML =
        "";


    for (
        const item
        of
        data
    ) {

        if (
            item.generation ===
            0
        ) {

            continue;
        }


        const row =
            document.createElement(
                "tr"
            );


        row.innerHTML =
            `
            <td>
                ${item.generation}
            </td>

            <td>
                ${item.incomingNeutrons}
            </td>

            <td>
                ${item.fissions}
            </td>

            <td>
                ${item.lostNeutrons}
            </td>

            <td>
                ${item.nextNeutrons}
            </td>
            `;


        chainTableBody.appendChild(
            row
        );
    }
}


// ======================================================
// KẾT LUẬN
// ======================================================

function buildChainConclusion(
    preset,
    result
) {

    const data =
        result.data;


    const finalItem =
        data[
            data.length - 1
        ];


    const finalNeutrons =
        finalItem.generation === 0
            ?
            1
            :
            finalItem.nextNeutrons;


    const reproduction =
        preset.probability
        *
        CHAIN_AVERAGE_NEUTRONS_PER_FISSION;


    if (
        result.capped
    ) {

        return (
            `Trong lần chạy ngẫu nhiên này, số neutron tăng nhanh `
            +
            `và mô phỏng đã dừng ở giới hạn an toàn của chương trình. `
            +
            `Hệ số nhân neutron của mô hình là k = `
            +
            `${reproduction.toFixed(2)}. `
            +
            `Kết quả chỉ minh họa một quá trình phân nhánh Monte Carlo.`
        );
    }


    if (
        finalNeutrons ===
        0
    ) {

        return (
            `Chuỗi đã tắt sau `
            +
            `${data.length - 1} thế hệ. `
            +
            `Do quá trình có tính ngẫu nhiên, ngay cả cùng một bộ tham số `
            +
            `các lần chạy khác nhau vẫn có thể cho số thế hệ khác nhau. `
            +
            `Hệ số nhân neutron của mô hình là k = `
            +
            `${reproduction.toFixed(2)}.`
        );
    }


    if (
        reproduction <
        1
    ) {

        return (
            `Mô hình có k = ${reproduction.toFixed(2)} < 1 (dưới tới hạn), `
            +
            `nên về trung bình chuỗi có xu hướng giảm. `
            +
            `Tuy nhiên một lần Monte Carlo riêng lẻ vẫn có thể dao động ngẫu nhiên.`
        );
    }


    if (
        Math.abs(
            reproduction - 1
        ) <
        0.05
    ) {

        return (
            `Mô hình có k ≈ ${reproduction.toFixed(2)} (tới hạn). `
            +
            `Vì vậy số neutron có thể dao động mạnh giữa các thế hệ `
            +
            `và giữa các lần chạy khác nhau.`
        );
    }


    return (
        `Mô hình có k = ${reproduction.toFixed(2)} > 1 (vượt hạn), `
        +
        `nên về trung bình số neutron có xu hướng tăng qua các thế hệ. `
        +
        `Kết quả cụ thể vẫn thay đổi do tính ngẫu nhiên của Monte Carlo.`
    );
}


// ======================================================
// CHẠY MÔ PHỎNG
// ======================================================

function runChainReaction() {

    const preset =
        getCurrentChainPreset();


    const maximumGenerations =
        Number(
            chainGenerationSelect.value
        );


    const result =
        simulateChainReaction(
            preset.probability,
            maximumGenerations
        );


    chainSimulationData =
        result.data;


    const neutronCounts =
        result.data.map(
            (
                item,
                index
            ) =>
                index === 0
                    ?
                    1
                    :
                    item.nextNeutrons
        );


    const peakNeutrons =
        Math.max(
            ...neutronCounts
        );


    const finalItem =
        result.data[
            result.data.length - 1
        ];


    const finalNeutrons =
        finalItem.generation === 0
            ?
            1
            :
            finalItem.nextNeutrons;


    chainActualGenerations.textContent =
        String(
            result.data.length - 1
        );


    chainTotalFissions.textContent =
        String(
            result.totalFissions
        );


    chainPeakNeutrons.textContent =
        String(
            peakNeutrons
        );


    chainFinalNeutrons.textContent =
        String(
            finalNeutrons
        );


    drawChainVisualization(
        result.data
    );


    createChainChart(
        result.data
    );


    createChainTable(
        result.data
    );


    chainConclusion.textContent =
        buildChainConclusion(
            preset,
            result
        );


    chainResult.hidden =
        false;


    chainStatus.textContent =
        result.capped
            ?
            "Đã dừng ở giới hạn mô phỏng"
            :
            "Mô phỏng hoàn thành";


    if (
        typeof setStatus ===
        "function"
    ) {

        setStatus(
            "Mô phỏng dây chuyền hoàn thành",
            "finished"
        );
    }
}


// ======================================================
// RESET
// ======================================================

function resetChainReaction() {

    chainSimulationData =
        [];


    chainResult.hidden =
        true;


    chainActualGenerations.textContent =
        "—";


    chainTotalFissions.textContent =
        "—";


    chainPeakNeutrons.textContent =
        "—";


    chainFinalNeutrons.textContent =
        "—";


    chainTableBody.innerHTML =
        "";


    chainConclusion.textContent =
        "";


    chainStatus.textContent =
        "Chưa chạy";


    if (
        chainChart !==
        null
    ) {

        chainChart.destroy();


        chainChart =
            null;
    }


    chainContext.clearRect(
        0,
        0,
        chainCanvas.width,
        chainCanvas.height
    );


    chainContext.fillStyle =
        "#f8fbff";


    chainContext.fillRect(
        0,
        0,
        chainCanvas.width,
        chainCanvas.height
    );
}


// ======================================================
// EVENT
// ======================================================

chainPresetSelect.addEventListener(
    "change",

    () => {

        updateChainParameterDisplay();


        resetChainReaction();
    }
);


chainGenerationSelect.addEventListener(
    "change",
    resetChainReaction
);


runChainButton.addEventListener(
    "click",
    runChainReaction
);


repeatChainButton.addEventListener(
    "click",
    runChainReaction
);


resetChainButton.addEventListener(
    "click",
    resetChainReaction
);


// ======================================================
// KHỞI TẠO
// ======================================================

updateChainParameterDisplay();


resetChainReaction();