// ======================================================
// HÀM LẤY PHẦN TỬ HTML AN TOÀN
// ======================================================

function getRequiredElement(id) {

    const element =
        document.getElementById(id);


    if (
        element === null
    ) {

        throw new Error(
            `Thiếu phần tử HTML có id="${id}"`
        );

    }


    return element;
}


// ======================================================
// 1. GIAO DIỆN CHUNG
// ======================================================

const radiationSelect =
    getRequiredElement(
        "radiationSelect"
    );

const materialSelect =
    getRequiredElement(
        "materialSelect"
    );

const thicknessInput =
    getRequiredElement(
        "thicknessInput"
    );

const thicknessDisplay =
    getRequiredElement(
        "thicknessDisplay"
    );

const rayCountInput =
    getRequiredElement(
        "rayCountInput"
    );

const runButton =
    getRequiredElement(
        "runButton"
    );

const resetButton =
    getRequiredElement(
        "resetButton"
    );

const advancedControls =
    getRequiredElement(
        "advancedControls"
    );

const muDisplay =
    getRequiredElement(
        "muDisplay"
    );

const probabilityDisplay =
    getRequiredElement(
        "probabilityDisplay"
    );


// ======================================================
// CANVAS CHÍNH
// ======================================================

const simulationCanvas =
    getRequiredElement(
        "simulationCanvas"
    );

const simulationContext =
    simulationCanvas.getContext(
        "2d"
    );

const statusBadge =
    getRequiredElement(
        "statusBadge"
    );


// ======================================================
// KẾT QUẢ CHUNG
// ======================================================

const emittedDisplay =
    getRequiredElement(
        "emittedDisplay"
    );

const transmittedDisplay =
    getRequiredElement(
        "transmittedDisplay"
    );

const absorbedDisplay =
    getRequiredElement(
        "absorbedDisplay"
    );

const transmissionDisplay =
    getRequiredElement(
        "transmissionDisplay"
    );


// ======================================================
// BA CHẾ ĐỘ
// ======================================================

const exploreModeButton =
    getRequiredElement(
        "exploreModeButton"
    );

const experimentModeButton =
    getRequiredElement(
        "experimentModeButton"
    );

const validationModeButton =
    getRequiredElement(
        "validationModeButton"
    );

const explorePanel =
    getRequiredElement(
        "explorePanel"
    );

const experimentPanel =
    getRequiredElement(
        "experimentPanel"
    );

const validationPanel =
    getRequiredElement(
        "validationPanel"
    );


// ======================================================
// ĐỒ THỊ CHÍNH
// ======================================================

const penetrationChartCanvas =
    getRequiredElement(
        "penetrationChart"
    );


// ======================================================
// NHIỆM VỤ 1
// ======================================================

const setupTask1Button =
    getRequiredElement(
        "setupTask1Button"
    );

const runTask1Button =
    getRequiredElement(
        "runTask1Button"
    );

const task1Status =
    getRequiredElement(
        "task1Status"
    );

const task1Result =
    getRequiredElement(
        "task1Result"
    );

const task1TableBody =
    getRequiredElement(
        "task1TableBody"
    );

const task1ChartCanvas =
    getRequiredElement(
        "task1Chart"
    );

const task1Conclusion =
    getRequiredElement(
        "task1Conclusion"
    );


// ======================================================
// NHIỆM VỤ 2
// ======================================================

const setupTask2Button =
    getRequiredElement(
        "setupTask2Button"
    );

const runTask2Button =
    getRequiredElement(
        "runTask2Button"
    );

const task2Status =
    getRequiredElement(
        "task2Status"
    );

const task2Result =
    getRequiredElement(
        "task2Result"
    );

const task2TableBody =
    getRequiredElement(
        "task2TableBody"
    );

const task2ChartCanvas =
    getRequiredElement(
        "task2Chart"
    );

const task2Conclusion =
    getRequiredElement(
        "task2Conclusion"
    );


// ======================================================
// NHIỆM VỤ 3
// ======================================================

const setupTask3Button =
    getRequiredElement(
        "setupTask3Button"
    );

const runTask3Button =
    getRequiredElement(
        "runTask3Button"
    );

const task3Status =
    getRequiredElement(
        "task3Status"
    );

const task3Result =
    getRequiredElement(
        "task3Result"
    );

const task3TableBody =
    getRequiredElement(
        "task3TableBody"
    );

const task3ChartCanvas =
    getRequiredElement(
        "task3Chart"
    );

const task3Conclusion =
    getRequiredElement(
        "task3Conclusion"
    );


// ======================================================
// KIỂM CHỨNG
// ======================================================

const validationRepeatCount =
    getRequiredElement(
        "validationRepeatCount"
    );

const runValidationButton =
    getRequiredElement(
        "runValidationButton"
    );

const validationStatus =
    getRequiredElement(
        "validationStatus"
    );

const validationRuns =
    getRequiredElement(
        "validationRuns"
    );

const validationRmse =
    getRequiredElement(
        "validationRmse"
    );

const validationMaxError =
    getRequiredElement(
        "validationMaxError"
    );

const validationResult =
    getRequiredElement(
        "validationResult"
    );

const validationTableBody =
    getRequiredElement(
        "validationTableBody"
    );

const validationChartCanvas =
    getRequiredElement(
        "validationChart"
    );

const validationConclusion =
    getRequiredElement(
        "validationConclusion"
    );


// ======================================================
// 2. BIẾN TRẠNG THÁI
// ======================================================

let currentMode =
    "explore";

let penetrationChart =
    null;

let task1Chart =
    null;

let task2Chart =
    null;

let task3Chart =
    null;

let validationChart =
    null;

let lastExperimentalPoint =
    null;

let currentResults =
    [];

let task1Ready =
    false;

let task2Ready =
    false;

let task3Ready =
    false;

let validationIsRunning =
    false;


// ======================================================
// 3. ĐỌC THAM SỐ
// ======================================================

function readParameters() {

    return {

        radiationType:
            radiationSelect.value,

        material:
            materialSelect.value,

        thicknessMm:
            parseFloat(
                thicknessInput.value
            ),

        totalRays:
            parseInt(
                rayCountInput.value,
                10
            )

    };
}


// ======================================================
// 4. KIỂM TRA THAM SỐ
// ======================================================

function validateParameters(
    parameters
) {

    if (
        !Number.isFinite(
            parameters.thicknessMm
        )
        ||
        parameters.thicknessMm <= 0
    ) {

        alert(
            "Độ dày lớp chắn phải lớn hơn 0."
        );

        return false;
    }


    if (
        !Number.isFinite(
            parameters.totalRays
        )
        ||
        parameters.totalRays < 20
        ||
        parameters.totalRays > 500
    ) {

        alert(
            "Số tia đại diện phải nằm trong khoảng từ 20 đến 500."
        );

        return false;
    }


    return true;
}


// ======================================================
// 5. CẬP NHẬT HIỂN THỊ
// ======================================================

function updateThicknessLabel() {

    thicknessDisplay.textContent =
        `${parseFloat(
            thicknessInput.value
        ).toFixed(1)} mm`;
}


function updateAdvancedInfo() {

    const parameters =
        readParameters();


    const probability =
        calculateTransmissionFor(
            parameters.radiationType,
            parameters.material,
            parameters.thicknessMm
        );


    if (
        parameters.radiationType === "alpha"
    ) {

        // α không suy giảm theo hàm mũ: hiển thị tầm xa thay cho μ.
        muDisplay.textContent =
            `không dùng μ · tầm xa R ≈ ${(
                getAlphaRangeMm(
                    parameters.material
                ) * 1000
            ).toFixed(0)} µm`;

    } else {

        const mu =
            getEffectiveMu(
                parameters.radiationType,
                parameters.material
            );


        muDisplay.textContent =
            `${mu.toFixed(3)} mm⁻¹`;

    }


    probabilityDisplay.textContent =
        `${(
            probability *
            100
        ).toFixed(2)} %`;
}


// ======================================================
// 6. TRẠNG THÁI
// ======================================================

function setStatus(
    text,
    state
) {

    statusBadge.textContent =
        text;


    statusBadge.classList.remove(
        "ready",
        "running",
        "finished"
    );


    statusBadge.classList.add(
        state
    );
}


// ======================================================
// 7. KẾT QUẢ CHUNG
// ======================================================

function clearResults() {

    emittedDisplay.textContent =
        "0";

    transmittedDisplay.textContent =
        "0";

    absorbedDisplay.textContent =
        "0";

    transmissionDisplay.textContent =
        "0.0%";
}


function updateResults(
    totalRays,
    transmitted
) {

    const absorbed =
        totalRays -
        transmitted;


    const transmissionPercent =
        totalRays > 0

            ?

            transmitted /
            totalRays *
            100

            :

            0;


    emittedDisplay.textContent =
        String(totalRays);


    transmittedDisplay.textContent =
        String(transmitted);


    absorbedDisplay.textContent =
        String(absorbed);


    transmissionDisplay.textContent =
        `${transmissionPercent.toFixed(1)}%`;
}


// ======================================================
// 8. NHÃN
// ======================================================

function getRadiationLabel(type) {

    if (
        type === "alpha"
    ) {

        return "α";
    }


    if (
        type === "beta"
    ) {

        return "β";
    }


    return "γ";
}


function getMaterialLabel(material) {

    if (
        material === "paper"
    ) {

        return "Giấy";
    }


    if (
        material === "aluminum"
    ) {

        return "Nhôm";
    }


    return "Chì";
}


// ======================================================
// 9. VẼ KHUNG THÍ NGHIỆM
// ======================================================

function drawStaticScene() {

    const ctx =
        simulationContext;


    const width =
        simulationCanvas.width;


    const height =
        simulationCanvas.height;


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


    const sourceX =
        90;

    const sourceY =
        height / 2;

    const shieldX =
        width * 0.48;

    const shieldWidth =
        95;

    const detectorX =
        width - 105;


    // Nguồn

    ctx.fillStyle =
        "#1f2937";


    ctx.beginPath();


    ctx.arc(
        sourceX,
        sourceY,
        28,
        0,
        Math.PI * 2
    );


    ctx.fill();


    ctx.fillStyle =
        "#ffffff";


    ctx.font =
        "bold 22px Arial";


    ctx.textAlign =
        "center";


    ctx.fillText(
        getRadiationLabel(
            radiationSelect.value
        ),
        sourceX,
        sourceY + 8
    );


    ctx.fillStyle =
        "#475569";


    ctx.font =
        "16px Arial";


    ctx.fillText(
        "Nguồn",
        sourceX,
        sourceY + 58
    );


    // Lớp chắn

    ctx.fillStyle =
        "#cbd5e1";


    ctx.fillRect(
        shieldX,
        70,
        shieldWidth,
        height - 140
    );


    ctx.strokeStyle =
        "#64748b";


    ctx.lineWidth =
        2;


    ctx.strokeRect(
        shieldX,
        70,
        shieldWidth,
        height - 140
    );


    ctx.fillStyle =
        "#334155";


    ctx.font =
        "bold 16px Arial";


    ctx.fillText(
        getMaterialLabel(
            materialSelect.value
        ),
        shieldX +
        shieldWidth / 2,
        48
    );


    ctx.font =
        "14px Arial";


    ctx.fillText(
        `${parseFloat(
            thicknessInput.value
        ).toFixed(1)} mm`,
        shieldX +
        shieldWidth / 2,
        height - 42
    );


    // Đầu dò

    ctx.strokeStyle =
        "#16a34a";


    ctx.lineWidth =
        5;


    ctx.strokeRect(
        detectorX - 25,
        95,
        50,
        height - 190
    );


    ctx.fillStyle =
        "#15803d";


    ctx.font =
        "bold 16px Arial";


    ctx.fillText(
        "Đầu dò",
        detectorX,
        70
    );
}


// ======================================================
// 10. ANIMATION
// ======================================================

function buildAnimatedRays(
    results
) {

    const width =
        simulationCanvas.width;


    const height =
        simulationCanvas.height;


    const sourceX =
        118;

    const shieldX =
        width * 0.48;

    const shieldWidth =
        95;

    const detectorX =
        width - 130;


    return results.map(
        (
            result,
            index
        ) => {

            const laneCount =
                18;


            const lane =
                index %
                laneCount;


            const y =
                105 +
                lane *
                (
                    (
                        height -
                        210
                    )
                    /
                    Math.max(
                        1,
                        laneCount - 1
                    )
                );


            const delay =
                (
                    index %
                    30
                )
                *
                0.012;


            let endX;


            if (
                result.transmitted
            ) {

                endX =
                    detectorX;

            } else {

                // α dừng ngay ở mặt trước lớp chắn (tầm xa chỉ vài chục µm).
                const fractionInsideShield =
                    radiationSelect.value === "alpha"
                        ? 0.02 + result.randomValue * 0.04
                        : 0.15 + result.randomValue * 0.75;


                endX =
                    shieldX +
                    shieldWidth *
                    fractionInsideShield;
            }


            return {

                y,

                startX:
                    sourceX,

                endX,

                transmitted:
                    result.transmitted,

                delay,

                progress:
                    0

            };
        }
    );
}


function animateResults(
    results,
    onComplete
) {

    stopRadiationAnimation();


    radiationRays =
        buildAnimatedRays(
            results
        );


    simulationRunning =
        true;


    const startTime =
        performance.now();


    const duration =
        1450;


    function frame(now) {

        drawStaticScene();


        const elapsed =
            now -
            startTime;


        let allFinished =
            true;


        for (
            const ray
            of
            radiationRays
        ) {

            const localProgress =
                Math.max(
                    0,

                    Math.min(
                        1,

                        elapsed /
                        duration
                        -
                        ray.delay
                    )
                );


            if (
                localProgress < 1
            ) {

                allFinished =
                    false;
            }


            const x =
                ray.startX +
                (
                    ray.endX -
                    ray.startX
                )
                *
                localProgress;


            simulationContext.beginPath();


            simulationContext.arc(
                x,
                ray.y,
                4,
                0,
                Math.PI * 2
            );


            simulationContext.fillStyle =
                "#2563eb";


            simulationContext.fill();


            if (
                localProgress >= 1
            ) {

                simulationContext.beginPath();


                simulationContext.arc(
                    ray.endX,
                    ray.y,
                    5.5,
                    0,
                    Math.PI * 2
                );


                simulationContext.fillStyle =
                    ray.transmitted
                        ?
                        "#16a34a"
                        :
                        "#dc2626";


                simulationContext.fill();
            }
        }


        if (
            !allFinished
        ) {

            animationFrameId =
                requestAnimationFrame(
                    frame
                );

        } else {

            animationFrameId =
                null;


            simulationRunning =
                false;


            onComplete();
        }
    }


    animationFrameId =
        requestAnimationFrame(
            frame
        );
}


// ======================================================
// 11. ĐỒ THỊ KHÁM PHÁ
// ======================================================

function generateTheoryCurve(
    radiationType,
    material
) {

    const data =
        [];


    if (
        radiationType === "alpha"
    ) {

        // Đường bậc thang: truyền qua hoàn toàn khi x < R, bị chặn khi x ≥ R.
        const range =
            getAlphaRangeMm(
                material
            );


        data.push(
            { x: 0, y: 1 },
            { x: range, y: 1 },
            { x: range, y: 0 },
            { x: 10, y: 0 }
        );


        return data;
    }


    for (
        let thickness = 0;
        thickness <= 10.0001;
        thickness += 0.2
    ) {

        data.push(
            {

                x:
                    Number(
                        thickness.toFixed(2)
                    ),

                y:
                    calculateTransmissionFor(
                        radiationType,
                        material,
                        thickness
                    )

            }
        );
    }


    return data;
}


function createOrUpdateChart() {

    const parameters =
        readParameters();


    const theoryData =
        generateTheoryCurve(
            parameters.radiationType,
            parameters.material
        );


    const experimentalData =
        lastExperimentalPoint
            ?
            [lastExperimentalPoint]
            :
            [];


    if (
        penetrationChart !== null
    ) {

        penetrationChart.destroy();
    }


    penetrationChart =
        new Chart(
            penetrationChartCanvas
                .getContext(
                    "2d"
                ),

            {

                type:
                    "line",


                data:
                {

                    datasets:
                    [

                        {
                            label:
                                "Lí thuyết P = e^(-μx)",

                            data:
                                theoryData,

                            borderWidth:
                                3,

                            pointRadius:
                                0,

                            showLine:
                                true
                        },


                        {
                            label:
                                "Kết quả mô phỏng hiện tại",

                            data:
                                experimentalData,

                            borderWidth:
                                0,

                            pointRadius:
                                6,

                            showLine:
                                false
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

                    parsing:
                        false,


                    scales:
                    {

                        x:
                        {

                            type:
                                "linear",

                            min:
                                0,

                            max:
                                10,

                            title:
                            {

                                display:
                                    true,

                                text:
                                    "Độ dày lớp chắn x (mm)"

                            }

                        },


                        y:
                        {

                            min:
                                0,

                            max:
                                1,

                            title:
                            {

                                display:
                                    true,

                                text:
                                    "Tỉ lệ truyền qua I/I₀"

                            }

                        }

                    }

                }

            }
        );
}


// ======================================================
// 12. MÔ PHỎNG KHÁM PHÁ
// ======================================================

function runSimulation() {

    const parameters =
        readParameters();


    if (
        !validateParameters(
            parameters
        )
    ) {

        return;
    }


    stopRadiationAnimation();


    runButton.disabled =
        true;


    setStatus(
        "Đang mô phỏng...",
        "running"
    );


    const probability =
        calculateTransmissionFor(
            parameters.radiationType,
            parameters.material,
            parameters.thicknessMm
        );


    currentResults =
        buildRayResults(
            parameters.totalRays,
            probability
        );


    const transmitted =
        countTransmitted(
            currentResults
        );


    updateResults(
        parameters.totalRays,
        transmitted
    );


    lastExperimentalPoint =
    {

        x:
            parameters.thicknessMm,

        y:
            transmitted /
            parameters.totalRays

    };


    createOrUpdateChart();


    animateResults(
        currentResults,

        () => {

            setStatus(
                "Hoàn thành",
                "finished"
            );


            runButton.disabled =
                false;
        }
    );
}


// ======================================================
// 13. ĐẶT LẠI
// ======================================================

function resetSimulation() {

    stopRadiationAnimation();


    radiationSelect.value =
        "gamma";


    materialSelect.value =
        "aluminum";


    thicknessInput.value =
        "2.0";


    rayCountInput.value =
        "100";


    currentResults =
        [];


    lastExperimentalPoint =
        null;


    updateThicknessLabel();

    updateAdvancedInfo();

    clearResults();

    drawStaticScene();

    createOrUpdateChart();


    runButton.disabled =
        false;


    setStatus(
        "Sẵn sàng",
        "ready"
    );
}


// ======================================================
// 14. NHIỆM VỤ 1
// ======================================================

function resetTask1Display() {

    task1Ready =
        false;


    task1Result.hidden =
        true;


    task1TableBody.innerHTML =
        "";


    task1Conclusion.textContent =
        "";


    runTask1Button.disabled =
        true;


    if (
        task1Chart !== null
    ) {

        task1Chart.destroy();

        task1Chart =
            null;
    }
}


function setupTask1() {

    stopRadiationAnimation();

    resetTask1Display();


    radiationSelect.value =
        "alpha";

    materialSelect.value =
        "aluminum";

    thicknessInput.value =
        "1.0";

    rayCountInput.value =
        "200";


    updateThicknessLabel();

    updateAdvancedInfo();

    drawStaticScene();


    lastExperimentalPoint =
        null;


    createOrUpdateChart();


    task1Ready =
        true;


    runTask1Button.disabled =
        false;


    task1Status.textContent =
        "Đã thiết lập: Nhôm 1.0 mm, 200 tia cho mỗi loại bức xạ.";


    setStatus(
        "Nhiệm vụ 1 đã sẵn sàng",
        "ready"
    );
}


function runTask1Trial(
    radiationType
) {

    const material =
        "aluminum";

    const thicknessMm =
        1.0;

    const totalRays =
        200;


    const theoreticalProbability =
        calculateTransmissionFor(
            radiationType,
            material,
            thicknessMm
        );


    const results =
        buildRayResults(
            totalRays,
            theoreticalProbability
        );


    const transmitted =
        countTransmitted(
            results
        );


    return {

        label:
            getRadiationLabel(
                radiationType
            ),

        totalRays,

        transmitted,

        simulatedRatio:
            transmitted /
            totalRays,

        theoreticalRatio:
            theoreticalProbability

    };
}


function createTask1Chart(
    results
) {

    if (
        task1Chart !== null
    ) {

        task1Chart.destroy();
    }


    task1Chart =
        new Chart(
            task1ChartCanvas
                .getContext(
                    "2d"
                ),

            {

                type:
                    "bar",


                data:
                {

                    labels:
                        results.map(
                            item =>
                                item.label
                        ),


                    datasets:
                    [

                        {
                            label:
                                "Kết quả mô phỏng",

                            data:
                                results.map(
                                    item =>
                                        item.simulatedRatio *
                                        100
                                )
                        },


                        {
                            label:
                                "Giá trị lí thuyết",

                            data:
                                results.map(
                                    item =>
                                        item.theoreticalRatio *
                                        100
                                )
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

                            min:
                                0,

                            max:
                                100,

                            title:
                            {

                                display:
                                    true,

                                text:
                                    "Tỉ lệ truyền qua (%)"

                            }

                        }

                    }

                }

            }
        );
}


function runTask1() {

    if (
        !task1Ready
    ) {

        alert(
            "Hãy nhấn “Thiết lập nhiệm vụ” trước."
        );

        return;
    }


    runTask1Button.disabled =
        true;


    task1Status.textContent =
        "Đang thực hiện phép so sánh...";


    const types =
    [
        "alpha",
        "beta",
        "gamma"
    ];


    const results =
        types.map(
            type =>
                runTask1Trial(
                    type
                )
        );


    task1TableBody.innerHTML =
        "";


    for (
        const result
        of
        results
    ) {

        const row =
            document.createElement(
                "tr"
            );


        row.innerHTML =
            `
            <td>${result.label}</td>
            <td>${result.totalRays}</td>
            <td>${result.transmitted}</td>
            <td>${(result.simulatedRatio * 100).toFixed(1)} %</td>
            <td>${(result.theoreticalRatio * 100).toFixed(1)} %</td>
            `;


        task1TableBody.appendChild(
            row
        );
    }


    createTask1Chart(
        results
    );


    task1Result.hidden =
        false;


    task1Status.textContent =
        "Hoàn thành";


    task1Conclusion.textContent =
        "Với lớp nhôm 1 mm, α bị chặn hoàn toàn (tầm xa của α trong nhôm chỉ khoảng 0,02 mm), β truyền qua một phần và γ truyền qua nhiều nhất.";


    runTask1Button.disabled =
        false;
}


// ======================================================
// 15. NHIỆM VỤ 2
// ======================================================

function resetTask2Display() {

    task2Ready =
        false;


    task2Result.hidden =
        true;


    task2TableBody.innerHTML =
        "";


    task2Conclusion.textContent =
        "";


    runTask2Button.disabled =
        true;


    if (
        task2Chart !== null
    ) {

        task2Chart.destroy();

        task2Chart =
            null;
    }
}


function setupTask2() {

    stopRadiationAnimation();

    resetTask2Display();


    radiationSelect.value =
        "gamma";

    materialSelect.value =
        "lead";

    thicknessInput.value =
        "2.0";

    rayCountInput.value =
        "500";


    updateThicknessLabel();

    updateAdvancedInfo();

    drawStaticScene();


    lastExperimentalPoint =
        null;


    createOrUpdateChart();


    task2Ready =
        true;


    runTask2Button.disabled =
        false;


    task2Status.textContent =
        "Đã thiết lập: bức xạ γ, lớp chắn chì, 500 tia mỗi lần.";
}


function runTask2Trial(
    thicknessMm
) {

    const mu =
        getEffectiveMu(
            "gamma",
            "lead"
        );


    const theoreticalProbability =
        calculateTransmissionProbability(
            mu,
            thicknessMm
        );


    const totalRays =
        500;


    const results =
        buildRayResults(
            totalRays,
            theoreticalProbability
        );


    const transmitted =
        countTransmitted(
            results
        );


    return {

        thicknessMm,

        totalRays,

        transmitted,

        simulatedRatio:
            transmitted /
            totalRays,

        theoreticalRatio:
            theoreticalProbability

    };
}


function createTask2Chart(
    results
) {

    if (
        task2Chart !== null
    ) {

        task2Chart.destroy();
    }


    const simulatedData =
        results.map(
            result => ({

                x:
                    result.thicknessMm,

                y:
                    result.simulatedRatio

            })
        );


    const theoryData =
        generateTheoryCurve(
            "gamma",
            "lead"
        );


    task2Chart =
        new Chart(
            task2ChartCanvas
                .getContext(
                    "2d"
                ),

            {

                type:
                    "line",


                data:
                {

                    datasets:
                    [

                        {
                            label:
                                "Mô phỏng Monte Carlo",

                            data:
                                simulatedData,

                            borderWidth:
                                2,

                            pointRadius:
                                6,

                            showLine:
                                true
                        },


                        {
                            label:
                                "Lí thuyết I/I₀ = e^(-μx)",

                            data:
                                theoryData,

                            borderWidth:
                                3,

                            pointRadius:
                                0,

                            showLine:
                                true,

                            borderDash:
                                [8, 4]
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

                    parsing:
                        false,


                    scales:
                    {

                        x:
                        {

                            type:
                                "linear",

                            min:
                                0,

                            max:
                                10

                        },


                        y:
                        {

                            min:
                                0,

                            max:
                                1

                        }

                    }

                }

            }
        );
}


function runTask2() {

    if (
        !task2Ready
    ) {

        alert(
            "Hãy nhấn “Thiết lập nhiệm vụ” trước."
        );

        return;
    }


    const thicknessValues =
    [
        0,
        2,
        4,
        6,
        8,
        10
    ];


    const results =
        thicknessValues.map(
            value =>
                runTask2Trial(
                    value
                )
        );


    task2TableBody.innerHTML =
        "";


    for (
        const result
        of
        results
    ) {

        const row =
            document.createElement(
                "tr"
            );


        row.innerHTML =
            `
            <td>${result.thicknessMm.toFixed(1)}</td>
            <td>${result.totalRays}</td>
            <td>${result.transmitted}</td>
            <td>${result.simulatedRatio.toFixed(3)}</td>
            <td>${result.theoreticalRatio.toFixed(3)}</td>
            `;


        task2TableBody.appendChild(
            row
        );
    }


    createTask2Chart(
        results
    );


    task2Result.hidden =
        false;


    task2Status.textContent =
        "Hoàn thành";


    task2Conclusion.textContent =
        "Khi độ dày lớp chắn tăng, tỉ lệ truyền qua giảm theo xu hướng hàm mũ.";


    runTask2Button.disabled =
        false;
}


// ======================================================
// 16. NHIỆM VỤ 3
// ======================================================

function resetTask3Display() {

    task3Ready =
        false;


    task3Result.hidden =
        true;


    task3TableBody.innerHTML =
        "";


    task3Conclusion.textContent =
        "";


    runTask3Button.disabled =
        true;


    if (
        task3Chart !== null
    ) {

        task3Chart.destroy();

        task3Chart =
            null;
    }
}


function setupTask3() {

    stopRadiationAnimation();

    resetTask3Display();


    radiationSelect.value =
        "gamma";

    materialSelect.value =
        "paper";

    thicknessInput.value =
        "5.0";

    rayCountInput.value =
        "500";


    updateThicknessLabel();

    updateAdvancedInfo();

    drawStaticScene();


    lastExperimentalPoint =
        null;


    createOrUpdateChart();


    task3Ready =
        true;


    runTask3Button.disabled =
        false;


    task3Status.textContent =
        "Đã thiết lập: γ, độ dày 5,0 mm, 500 tia mỗi vật liệu.";
}


function runTask3Trial(
    material
) {

    const mu =
        getEffectiveMu(
            "gamma",
            material
        );


    const theoreticalProbability =
        calculateTransmissionProbability(
            mu,
            5
        );


    const totalRays =
        500;


    const results =
        buildRayResults(
            totalRays,
            theoreticalProbability
        );


    const transmitted =
        countTransmitted(
            results
        );


    return {

        materialLabel:
            getMaterialLabel(
                material
            ),

        totalRays,

        transmitted,

        simulatedRatio:
            transmitted /
            totalRays,

        theoreticalRatio:
            theoreticalProbability

    };
}


function createTask3Chart(
    results
) {

    if (
        task3Chart !== null
    ) {

        task3Chart.destroy();
    }


    task3Chart =
        new Chart(
            task3ChartCanvas
                .getContext(
                    "2d"
                ),

            {

                type:
                    "bar",


                data:
                {

                    labels:
                        results.map(
                            result =>
                                result.materialLabel
                        ),


                    datasets:
                    [

                        {
                            label:
                                "Mô phỏng Monte Carlo",

                            data:
                                results.map(
                                    result =>
                                        result.simulatedRatio *
                                        100
                                )
                        },


                        {
                            label:
                                "Lí thuyết",

                            data:
                                results.map(
                                    result =>
                                        result.theoreticalRatio *
                                        100
                                )
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

                            min:
                                0,

                            max:
                                100

                        }

                    }

                }

            }
        );
}


function runTask3() {

    if (
        !task3Ready
    ) {

        alert(
            "Hãy nhấn “Thiết lập nhiệm vụ” trước."
        );

        return;
    }


    const materials =
    [
        "paper",
        "aluminum",
        "lead"
    ];


    const results =
        materials.map(
            material =>
                runTask3Trial(
                    material
                )
        );


    task3TableBody.innerHTML =
        "";


    for (
        const result
        of
        results
    ) {

        const row =
            document.createElement(
                "tr"
            );


        row.innerHTML =
            `
            <td>${result.materialLabel}</td>
            <td>${result.totalRays}</td>
            <td>${result.transmitted}</td>
            <td>${result.simulatedRatio.toFixed(3)}</td>
            <td>${result.theoreticalRatio.toFixed(3)}</td>
            `;


        task3TableBody.appendChild(
            row
        );
    }


    createTask3Chart(
        results
    );


    task3Result.hidden =
        false;


    task3Status.textContent =
        "Hoàn thành";


    task3Conclusion.textContent =
        "Với cùng điều kiện của mô hình, vật liệu khác nhau cho mức suy giảm bức xạ khác nhau.";


    runTask3Button.disabled =
        false;
}


// ======================================================
// 17. KIỂM CHỨNG
// ======================================================

function resetValidationDisplay() {

    validationStatus.textContent =
        "Chưa chạy";


    validationRuns.textContent =
        "0";


    validationRmse.textContent =
        "—";


    validationMaxError.textContent =
        "—";


    validationResult.hidden =
        true;


    validationTableBody.innerHTML =
        "";


    validationConclusion.textContent =
        "";


    if (
        validationChart !== null
    ) {

        validationChart.destroy();

        validationChart =
            null;
    }
}


// ======================================================
// MỘT PHÉP LẶP Ở MỘT ĐỘ DÀY
// ======================================================

function runValidationSingleTrial(
    thicknessMm
) {

    const mu =
        getEffectiveMu(
            "gamma",
            "lead"
        );


    const probability =
        calculateTransmissionProbability(
            mu,
            thicknessMm
        );


    const totalRays =
        500;


    const results =
        buildRayResults(
            totalRays,
            probability
        );


    const transmitted =
        countTransmitted(
            results
        );


    return (
        transmitted /
        totalRays
    );
}


// ======================================================
// KIỂM CHỨNG TẠI MỘT ĐỘ DÀY
// ======================================================

async function validateAtThickness(
    thicknessMm,
    repeatCount
) {

    let sum =
        0;


    for (
        let run = 0;
        run < repeatCount;
        run++
    ) {

        sum +=
            runValidationSingleTrial(
                thicknessMm
            );


        if (
            (run + 1) %
            20 === 0
        ) {

            await new Promise(
                resolve =>
                    setTimeout(
                        resolve,
                        0
                    )
            );
        }
    }


    return (
        sum /
        repeatCount
    );
}


// ======================================================
// RMSE
// ======================================================

function calculateValidationStatistics(
    data
) {

    let sumSquaredError =
        0;


    let maxError =
        0;


    for (
        const point
        of
        data
    ) {

        const error =
            Math.abs(
                point.average -
                point.theory
            );


        sumSquaredError +=
            error *
            error;


        if (
            error >
            maxError
        ) {

            maxError =
                error;
        }
    }


    const rmse =
        Math.sqrt(
            sumSquaredError /
            data.length
        );


    return {

        rmse,

        maxError

    };
}


// ======================================================
// ĐỒ THỊ KIỂM CHỨNG
// ======================================================

function createValidationChart(
    validationData
) {

    if (
        validationChart !== null
    ) {

        validationChart.destroy();
    }


    const monteCarloData =
        validationData.map(
            point => ({

                x:
                    point.thickness,

                y:
                    point.average

            })
        );


    const theoryData =
        generateTheoryCurve(
            "gamma",
            "lead"
        );


    validationChart =
        new Chart(
            validationChartCanvas
                .getContext(
                    "2d"
                ),

            {

                type:
                    "line",


                data:
                {

                    datasets:
                    [

                        {
                            label:
                                "Trung bình Monte Carlo",

                            data:
                                monteCarloData,

                            borderWidth:
                                3,

                            pointRadius:
                                6,

                            showLine:
                                true
                        },


                        {
                            label:
                                "Lí thuyết I/I₀ = e^(-μx)",

                            data:
                                theoryData,

                            borderWidth:
                                3,

                            pointRadius:
                                0,

                            showLine:
                                true,

                            borderDash:
                                [8, 4]
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

                    parsing:
                        false,


                    scales:
                    {

                        x:
                        {

                            type:
                                "linear",

                            min:
                                0,

                            max:
                                10,

                            title:
                            {

                                display:
                                    true,

                                text:
                                    "Độ dày lớp chì x (mm)"

                            }

                        },


                        y:
                        {

                            min:
                                0,

                            max:
                                1,

                            title:
                            {

                                display:
                                    true,

                                text:
                                    "Tỉ lệ truyền qua I/I₀"

                            }

                        }

                    }

                }

            }
        );
}


// ======================================================
// CHẠY KIỂM CHỨNG
// ======================================================

async function runValidation() {

    if (
        validationIsRunning
    ) {

        return;
    }


    const repeatCount =
        parseInt(
            validationRepeatCount.value,
            10
        );


    if (
        !Number.isFinite(
            repeatCount
        )
        ||
        repeatCount <= 0
    ) {

        alert(
            "Số lần lặp không hợp lệ."
        );

        return;
    }


    validationIsRunning =
        true;


    runValidationButton.disabled =
        true;


    validationStatus.textContent =
        "Đang tính...";


    validationRuns.textContent =
        `0 / ${repeatCount}`;


    validationRmse.textContent =
        "—";


    validationMaxError.textContent =
        "—";


    validationResult.hidden =
        true;


    validationTableBody.innerHTML =
        "";


    const thicknessValues =
    [
        0,
        2,
        4,
        6,
        8,
        10
    ];


    const validationData =
        [];


    const mu =
        getEffectiveMu(
            "gamma",
            "lead"
        );


    try {

        for (
            let index = 0;
            index < thicknessValues.length;
            index++
        ) {

            const thickness =
                thicknessValues[index];


            validationStatus.textContent =
                `Đang kiểm chứng x = ${thickness} mm...`;


            const average =
                await validateAtThickness(
                    thickness,
                    repeatCount
                );


            const theory =
                calculateTransmissionProbability(
                    mu,
                    thickness
                );


            validationData.push(
                {

                    thickness,

                    average,

                    theory,

                    error:
                        Math.abs(
                            average -
                            theory
                        )

                }
            );


            validationRuns.textContent =
                `${repeatCount} × ${index + 1}/${thicknessValues.length}`;


            await new Promise(
                resolve =>
                    setTimeout(
                        resolve,
                        0
                    )
            );
        }


        const statistics =
            calculateValidationStatistics(
                validationData
            );


        validationTableBody.innerHTML =
            "";


        for (
            const point
            of
            validationData
        ) {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML =
                `
                <td>
                    ${point.thickness.toFixed(1)}
                </td>

                <td>
                    ${point.theory.toFixed(4)}
                </td>

                <td>
                    ${point.average.toFixed(4)}
                </td>

                <td>
                    ${point.error.toFixed(4)}
                </td>
                `;


            validationTableBody
                .appendChild(
                    row
                );
        }


        createValidationChart(
            validationData
        );


        validationResult.hidden =
            false;


        validationStatus.textContent =
            "Hoàn thành";


        validationRuns.textContent =
            String(
                repeatCount
            );


        validationRmse.textContent =
            statistics.rmse.toFixed(4);


        validationMaxError.textContent =
            statistics.maxError.toFixed(4);


        validationConclusion.textContent =
            "Khi lặp lại mô phỏng nhiều lần và lấy giá trị trung bình, "
            +
            "các điểm Monte Carlo tiến gần đường lí thuyết I/I₀ = e^(-μx). "
            +
            "Sai số còn lại phản ánh dao động thống kê của mô phỏng với số tia hữu hạn. "
            +
            "Nếu tăng số lần lặp hoặc số tia trong mỗi lần mô phỏng, sai lệch trung bình có xu hướng giảm.";


        setStatus(
            "Kiểm chứng hoàn thành",
            "finished"
        );

    } finally {

        validationIsRunning =
            false;


        runValidationButton.disabled =
            false;
    }
}


// ======================================================
// 18. CHUYỂN CHẾ ĐỘ
// ======================================================

function setMode(mode) {

    stopRadiationAnimation();


    currentMode =
        mode;


    exploreModeButton
        .classList
        .remove(
            "active"
        );


    experimentModeButton
        .classList
        .remove(
            "active"
        );


    validationModeButton
        .classList
        .remove(
            "active"
        );


    explorePanel
        .classList
        .remove(
            "active"
        );


    experimentPanel
        .classList
        .remove(
            "active"
        );


    validationPanel
        .classList
        .remove(
            "active"
        );


    advancedControls.style.display =
        "none";


    if (
        mode === "explore"
    ) {

        exploreModeButton
            .classList
            .add(
                "active"
            );


        explorePanel
            .classList
            .add(
                "active"
            );


        setStatus(
            "Sẵn sàng khám phá",
            "ready"
        );
    }


    if (
        mode === "experiment"
    ) {

        experimentModeButton
            .classList
            .add(
                "active"
            );


        experimentPanel
            .classList
            .add(
                "active"
            );


        setStatus(
            "Chọn một nhiệm vụ thí nghiệm",
            "ready"
        );
    }


    if (
        mode === "validation"
    ) {

        validationModeButton
            .classList
            .add(
                "active"
            );


        validationPanel
            .classList
            .add(
                "active"
            );


        advancedControls.style.display =
            "block";


        radiationSelect.value =
            "gamma";


        materialSelect.value =
            "lead";


        thicknessInput.value =
            "2.0";


        rayCountInput.value =
            "500";


        updateThicknessLabel();

        updateAdvancedInfo();

        drawStaticScene();

        createOrUpdateChart();


        setStatus(
            "Sẵn sàng kiểm chứng",
            "ready"
        );
    }


    updateAdvancedInfo();
}


// ======================================================
// 19. EVENT LISTENER
// ======================================================

radiationSelect.addEventListener(
    "change",
    () => {

        lastExperimentalPoint =
            null;

        drawStaticScene();

        updateAdvancedInfo();

        createOrUpdateChart();
    }
);


materialSelect.addEventListener(
    "change",
    () => {

        lastExperimentalPoint =
            null;

        drawStaticScene();

        updateAdvancedInfo();

        createOrUpdateChart();
    }
);


thicknessInput.addEventListener(
    "input",
    () => {

        updateThicknessLabel();

        drawStaticScene();

        updateAdvancedInfo();
    }
);


rayCountInput.addEventListener(
    "change",
    clearResults
);


runButton.addEventListener(
    "click",
    runSimulation
);


resetButton.addEventListener(
    "click",
    resetSimulation
);


exploreModeButton.addEventListener(
    "click",
    () =>
        setMode(
            "explore"
        )
);


experimentModeButton.addEventListener(
    "click",
    () =>
        setMode(
            "experiment"
        )
);


validationModeButton.addEventListener(
    "click",
    () =>
        setMode(
            "validation"
        )
);


setupTask1Button.addEventListener(
    "click",
    setupTask1
);


runTask1Button.addEventListener(
    "click",
    runTask1
);


setupTask2Button.addEventListener(
    "click",
    setupTask2
);


runTask2Button.addEventListener(
    "click",
    runTask2
);


setupTask3Button.addEventListener(
    "click",
    setupTask3
);


runTask3Button.addEventListener(
    "click",
    runTask3
);


runValidationButton.addEventListener(
    "click",
    runValidation
);


// ======================================================
// 20. KHỞI TẠO
// ======================================================

updateThicknessLabel();


updateAdvancedInfo();


clearResults();


drawStaticScene();


createOrUpdateChart();


resetTask1Display();


resetTask2Display();


resetTask3Display();


resetValidationDisplay();


setMode(
    "explore"
);