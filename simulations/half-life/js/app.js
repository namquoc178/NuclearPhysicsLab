console.log("APP.JS - STUDENT READY VERSION 6");

function getRequiredElement(id) {
    const element = document.getElementById(id);

    if (element === null) {
        throw new Error(`Thiếu phần tử HTML có id="${id}"`);
    }

    return element;
}

// ======================================================
// 1. PHẦN TỬ GIAO DIỆN
// ======================================================

const inputN0 = getRequiredElement("inputN0");
const inputHalfLife = getRequiredElement("inputHalfLife");
const inputDt = getRequiredElement("inputDt");

const startButton = getRequiredElement("startButton");
const pauseButton = getRequiredElement("pauseButton");
const resetButton = getRequiredElement("resetButton");
const exportCsvButton = getRequiredElement("exportCsvButton");

const timeDisplay = getRequiredElement("timeDisplay");
const remainingDisplay = getRequiredElement("remainingDisplay");
const ratioDisplay = getRequiredElement("ratioDisplay");
const lambdaDisplay = getRequiredElement("lambdaDisplay");

const nucleiCanvas = getRequiredElement("nucleiCanvas");
const nucleiContext = nucleiCanvas.getContext("2d");

const dataTableBody = getRequiredElement("dataTableBody");
const dataTablePanel = getRequiredElement("dataTablePanel");

const exploreModeButton = getRequiredElement("exploreModeButton");
const experimentModeButton = getRequiredElement("experimentModeButton");
const validationModeButton = getRequiredElement("validationModeButton");

const explorePanel = getRequiredElement("explorePanel");
const experimentPanel = getRequiredElement("experimentPanel");
const validationPanel = getRequiredElement("validationPanel");

const dtControlGroup = getRequiredElement("dtControlGroup");
const lambdaDataBox = getRequiredElement("lambdaDataBox");

const simulationStatusPanel = getRequiredElement("simulationStatusPanel");
const simulationStatusText = getRequiredElement("simulationStatusText");
const simulationStatusDot = getRequiredElement("simulationStatusDot");

// Nhiệm vụ 1
const loadExperiment1Button = getRequiredElement("loadExperiment1Button");
const predictionInput = getRequiredElement("predictionInput");
const experiment1Status = getRequiredElement("experiment1Status");
const experiment1Result = getRequiredElement("experiment1Result");
const experiment1PredictionDisplay = getRequiredElement("experiment1PredictionDisplay");
const experiment1ObservedDisplay = getRequiredElement("experiment1ObservedDisplay");
const experiment1TheoryDisplay = getRequiredElement("experiment1TheoryDisplay");
const experiment1DifferenceDisplay = getRequiredElement("experiment1DifferenceDisplay");
const experiment1Message = getRequiredElement("experiment1Message");

// Nhiệm vụ 2
const loadExperiment2Button = getRequiredElement("loadExperiment2Button");
const runExperiment2Button = getRequiredElement("runExperiment2Button");
const experiment2Status = getRequiredElement("experiment2Status");
const experiment2Result = getRequiredElement("experiment2Result");
const experiment2TableBody = getRequiredElement("experiment2TableBody");
const experiment2AverageDisplay = getRequiredElement("experiment2AverageDisplay");
const experiment2TheoryDisplay = getRequiredElement("experiment2TheoryDisplay");
const experiment2Message = getRequiredElement("experiment2Message");

// Nhiệm vụ 3
const loadExperiment3Button = getRequiredElement("loadExperiment3Button");
const runExperiment3Button = getRequiredElement("runExperiment3Button");
const experiment3Status = getRequiredElement("experiment3Status");
const experiment3Result = getRequiredElement("experiment3Result");
const experiment3TableBody = getRequiredElement("experiment3TableBody");
const experiment3ChartCanvas = getRequiredElement("experiment3Chart");
const experiment3Message = getRequiredElement("experiment3Message");

// Kiểm chứng
const repeatCountSelect = getRequiredElement("repeatCount");
const runValidationButton = getRequiredElement("runValidationButton");
const validationStatus = getRequiredElement("validationStatus");
const validationRuns = getRequiredElement("validationRuns");
const validationError = getRequiredElement("validationError");

// ======================================================
// 2. TRẠNG THÁI CHƯƠNG TRÌNH
// ======================================================

let timerId = null;
let simulationHasStarted = false;
const realTimeInterval = 100;

let experimentalData = [];
let theoreticalData = [];
let averageMonteCarloData = [];

let decayChart = null;
let experiment3Chart = null;

let validationIsRunning = false;
let currentMode = "explore";
let activeExperiment = 0;

let experiment1Prediction = null;
let experiment1InProgress = false;

let experiment2Ready = false;
let experiment2Results = [];

let experiment3Ready = false;
let experiment3Results = [];

// ======================================================
// TRẠNG THÁI GIAO DIỆN CHÍNH
// ======================================================

function setSimulationStatus(text, state = "ready") {
    simulationStatusText.textContent = text;
    simulationStatusPanel.classList.remove(
        "ready",
        "running",
        "paused",
        "finished"
    );
    simulationStatusPanel.classList.add(state);
}

function setControlState(state) {
    if (state === "running") {
        startButton.disabled = true;
        startButton.textContent = "▶ Đang chạy";
        pauseButton.disabled = false;
        return;
    }

    if (state === "paused") {
        startButton.disabled = false;
        startButton.textContent = "▶ Tiếp tục";
        pauseButton.disabled = true;
        return;
    }

    if (state === "finished") {
        startButton.disabled = false;
        startButton.textContent = "▶ Chạy lại";
        pauseButton.disabled = true;
        return;
    }

    startButton.disabled = false;
    startButton.textContent = "▶ Bắt đầu";
    pauseButton.disabled = true;
}

function setTaskOnlyControlState() {
    startButton.disabled = true;
    startButton.textContent = "▶ Dùng nút trong nhiệm vụ";
    pauseButton.disabled = true;
}

// ======================================================
// 3. ĐỌC VÀ KIỂM TRA THAM SỐ
// ======================================================

function readInputs() {
    currentN0 = parseInt(inputN0.value, 10);

    currentHalfLife = parseFloat(
        String(inputHalfLife.value).replace(",", ".")
    );

    currentDt = parseFloat(
        String(inputDt.value).replace(",", ".")
    );
}

function validateInputs() {
    if (!Number.isFinite(currentN0) || currentN0 <= 0) {
        alert("Số hạt ban đầu N₀ phải lớn hơn 0.");
        return false;
    }

    if (currentN0 > 10000) {
        alert("Phiên bản hiện tại giới hạn N₀ không quá 10000.");
        return false;
    }

    if (!Number.isFinite(currentHalfLife) || currentHalfLife <= 0) {
        alert("Chu kỳ bán rã T₁/₂ phải lớn hơn 0.");
        return false;
    }

    if (!Number.isFinite(currentDt) || currentDt <= 0) {
        alert("Bước thời gian Δt phải lớn hơn 0.");
        return false;
    }

    if (currentDt > currentHalfLife) {
        alert("Bước thời gian Δt phải nhỏ hơn hoặc bằng T₁/₂.");
        return false;
    }

    return true;
}

// ======================================================
// 4. HIỂN THỊ MÔ PHỎNG CHÍNH
// ======================================================

function updateDisplay() {
    const lambda = calculateLambda(currentHalfLife);

    timeDisplay.textContent =
        `${currentTime.toFixed(2)} s`;

    remainingDisplay.textContent =
        String(currentRemaining);

    ratioDisplay.textContent =
        (currentRemaining / currentN0).toFixed(3);

    lambdaDisplay.textContent =
        `${lambda.toFixed(4)} s⁻¹`;
}

function drawNuclei() {
    nucleiContext.clearRect(
        0,
        0,
        nucleiCanvas.width,
        nucleiCanvas.height
    );

    const total = nuclei.length;

    if (total === 0) {
        return;
    }

    const columns = Math.ceil(
        Math.sqrt(
            total *
            nucleiCanvas.width /
            nucleiCanvas.height
        )
    );

    const rows =
        Math.ceil(total / columns);

    const cellWidth =
        nucleiCanvas.width / columns;

    const cellHeight =
        nucleiCanvas.height / rows;

    const radius =
        Math.max(
            1.5,
            Math.min(
                cellWidth,
                cellHeight
            ) * 0.28
        );

    for (let i = 0; i < total; i++) {
        const column =
            i % columns;

        const row =
            Math.floor(i / columns);

        const x =
            column * cellWidth +
            cellWidth / 2;

        const y =
            row * cellHeight +
            cellHeight / 2;

        nucleiContext.beginPath();

        nucleiContext.arc(
            x,
            y,
            radius,
            0,
            Math.PI * 2
        );

        nucleiContext.fillStyle =
            nuclei[i] === 1
                ? "#2563eb"
                : "#d1d5db";

        nucleiContext.fill();
    }
}

function generateTheoreticalData() {
    theoreticalData = [];

    const lambda =
        calculateLambda(currentHalfLife);

    const maxTime =
        currentHalfLife * 5;

    const numberOfPoints =
        250;

    const step =
        maxTime / numberOfPoints;

    for (
        let i = 0;
        i <= numberOfPoints;
        i++
    ) {
        const time =
            i * step;

        theoreticalData.push({
            x: time,
            y: calculateTheoreticalN(
                currentN0,
                lambda,
                time
            )
        });
    }
}

// ======================================================
// 5. PLUGIN MỐC CHU KỲ BÁN RÃ
// ======================================================

const halfLifeMarkerPlugin = {
    id: "halfLifeMarkers",

    afterDraw(
        chart,
        args,
        pluginOptions
    ) {
        const chartArea =
            chart.chartArea;

        const xScale =
            chart.scales.x;

        if (
            !chartArea ||
            !xScale
        ) {
            return;
        }

        const configuredHalfLife =
            Number(
                pluginOptions?.halfLife
            );

        const halfLife =
            Number.isFinite(
                configuredHalfLife
            ) &&
            configuredHalfLife > 0

                ? configuredHalfLife
                : currentHalfLife;

        const values = [
            halfLife,
            2 * halfLife,
            3 * halfLife
        ];

        const labels = [
            "T₁/₂",
            "2T₁/₂",
            "3T₁/₂"
        ];

        const chartContext =
            chart.ctx;

        chartContext.save();

        chartContext.strokeStyle =
            "rgba(80, 80, 80, 0.45)";

        chartContext.fillStyle =
            "#444";

        chartContext.lineWidth =
            1;

        chartContext.setLineDash(
            [6, 6]
        );

        chartContext.font =
            "12px Arial";

        for (
            let i = 0;
            i < values.length;
            i++
        ) {
            const x =
                xScale.getPixelForValue(
                    values[i]
                );

            if (
                x < chartArea.left ||
                x > chartArea.right
            ) {
                continue;
            }

            chartContext.beginPath();

            chartContext.moveTo(
                x,
                chartArea.top
            );

            chartContext.lineTo(
                x,
                chartArea.bottom
            );

            chartContext.stroke();

            chartContext.fillText(
                labels[i],
                x + 5,
                chartArea.top + 15
            );
        }

        chartContext.restore();
    }
};

// ======================================================
// 6. ĐỒ THỊ CHÍNH
// ======================================================

function createChart() {
    const chartCanvas =
        getRequiredElement(
            "decayChart"
        );

    const chartContext =
        chartCanvas.getContext(
            "2d"
        );

    if (decayChart !== null) {
        decayChart.destroy();
    }

    decayChart = new Chart(
        chartContext,
        {
            type: "line",

            data: {
                datasets: [
                    {
                        label:
                            "Kết quả mô phỏng",

                        data:
                            experimentalData,

                        borderWidth:
                            2,

                        pointRadius:
                            2,

                        showLine:
                            true
                    },

                    {
                        label:
                            "Giá trị lý thuyết",

                        data:
                            theoreticalData,

                        borderWidth:
                            2,

                        pointRadius:
                            0,

                        showLine:
                            true
                    },

                    {
                        label:
                            "Trung bình nhiều lần mô phỏng",

                        data:
                            averageMonteCarloData,

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

            plugins: [
                halfLifeMarkerPlugin
            ],

            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false,
                parsing: false,

                scales: {
                    x: {
                        type: "linear",
                        min: 0,
                        max:
                            currentHalfLife * 5,

                        title: {
                            display: true,
                            text:
                                "Thời gian t (s)"
                        }
                    },

                    y: {
                        min: 0,
                        max:
                            currentN0,

                        title: {
                            display: true,
                            text:
                                "Số hạt chưa phân rã N"
                        }
                    }
                },

                plugins: {
                    legend: {
                        display: true
                    },

                    halfLifeMarkers: {
                        halfLife:
                            currentHalfLife
                    }
                }
            }
        }
    );

    updateChartModeVisibility();
}

function updateChartModeVisibility() {
    if (decayChart === null) {
        return;
    }

    decayChart
        .data
        .datasets[2]
        .hidden =
        currentMode !== "validation";

    decayChart.update("none");
}

function updateChart() {
    if (decayChart === null) {
        return;
    }

    decayChart
        .data
        .datasets[0]
        .data =
        experimentalData;

    decayChart
        .data
        .datasets[2]
        .data =
        averageMonteCarloData;

    decayChart.update("none");
}

// ======================================================
// 7. BẢNG DỮ LIỆU CHÍNH
// ======================================================

function updateDataTable() {
    dataTableBody.innerHTML = "";

    const lambda =
        calculateLambda(
            currentHalfLife
        );

    const maxRows = 15;

    const startIndex =
        Math.max(
            0,
            experimentalData.length -
            maxRows
        );

    for (
        let i = startIndex;
        i < experimentalData.length;
        i++
    ) {
        const point =
            experimentalData[i];

        const theoreticalN =
            calculateTheoreticalN(
                currentN0,
                lambda,
                point.x
            );

        const ratio =
            point.y /
            currentN0;

        const row =
            document.createElement(
                "tr"
            );

        row.innerHTML = `
            <td>${point.x.toFixed(2)}</td>
            <td>${point.y}</td>
            <td>${theoreticalN.toFixed(2)}</td>
            <td>${ratio.toFixed(3)}</td>
        `;

        dataTableBody.appendChild(
            row
        );
    }
}

function lockInputs() {
    inputN0.disabled = true;
    inputHalfLife.disabled = true;
    inputDt.disabled = true;
}

function unlockInputs() {
    inputN0.disabled = false;
    inputHalfLife.disabled = false;
    inputDt.disabled = false;
}

function resetValidationDisplay() {
    validationStatus.textContent =
        "Chưa chạy";

    validationRuns.textContent =
        "0";

    validationError.textContent =
        "—";
}

function prepareNewSimulation() {
    readInputs();

    if (!validateInputs()) {
        return false;
    }

    currentTime = 0;
    currentRemaining =
        currentN0;

    createNuclei(
        currentN0
    );

    experimentalData = [
        {
            x: 0,
            y: currentN0
        }
    ];

    averageMonteCarloData = [];

    resetValidationDisplay();
    generateTheoreticalData();
    updateDisplay();
    drawNuclei();
    createChart();
    updateDataTable();

    return true;
}

// ======================================================
// 8. NHIỆM VỤ 1
// ======================================================

function resetExperiment1Display() {
    experiment1InProgress =
        false;

    experiment1Prediction =
        null;

    experiment1Result.hidden =
        true;

    experiment1PredictionDisplay
        .textContent =
        "—";

    experiment1ObservedDisplay
        .textContent =
        "—";

    experiment1TheoryDisplay
        .textContent =
        "—";

    experiment1DifferenceDisplay
        .textContent =
        "—";

    experiment1Message.textContent =
        "";
}

function setupExperiment1() {
    stopTimer();

    simulationRunning = false;
    simulationHasStarted = false;
    experiment1InProgress = false;

    activeExperiment = 1;

    experiment2Ready = false;
    runExperiment2Button.disabled = true;

    experiment3Ready = false;
    runExperiment3Button.disabled = true;

    unlockInputs();

    inputN0.value = 1000;
    inputHalfLife.value = 10;
    inputDt.value = 0.1;

    predictionInput.value = "";

    resetExperiment1Display();

    experiment1Status.textContent =
        "Đã thiết lập. Hãy nhập dự đoán và nhấn Bắt đầu.";

    prepareNewSimulation();

    setSimulationStatus(
        "Nhiệm vụ 1 đã sẵn sàng.",
        "ready"
    );

    setControlState(
        "ready"
    );
}

function finishExperiment1() {
    stopTimer();

    simulationRunning = false;
    simulationHasStarted = false;
    experiment1InProgress = false;

    const theoreticalValue =
        currentN0 / 2;

    const absoluteDifference =
        Math.abs(
            currentRemaining -
            theoreticalValue
        );

    const percentDifference =
        theoreticalValue > 0
            ?
            (
                absoluteDifference /
                theoreticalValue
            ) * 100
            :
            0;

    experiment1PredictionDisplay
        .textContent =
        String(
            experiment1Prediction
        );

    experiment1ObservedDisplay
        .textContent =
        String(
            currentRemaining
        );

    experiment1TheoryDisplay
        .textContent =
        theoreticalValue.toFixed(0);

    experiment1DifferenceDisplay
        .textContent =
        `${absoluteDifference.toFixed(0)} hạt`;

    experiment1Result.hidden =
        false;

    experiment1Status.textContent =
        "Hoàn thành";

    setSimulationStatus(
        "Nhiệm vụ 1 đã hoàn thành tại một chu kỳ bán rã.",
        "finished"
    );

    setControlState(
        "finished"
    );

    experiment1Message.textContent =
        `Sau một chu kỳ bán rã, giá trị lý thuyết kỳ vọng là ${theoreticalValue.toFixed(0)} hạt. ` +
        `Kết quả của một lần mô phỏng có thể khác giá trị này vì thời điểm phân rã của từng hạt nhân có tính ngẫu nhiên. ` +
        `Trong lần này, sai khác tương đối là ${percentDifference.toFixed(1)}%.`;
}

// ======================================================
// 9. MÔ PHỎNG CHÍNH THEO THỜI GIAN
// ======================================================

function runOneStep() {
    const lambda =
        calculateLambda(
            currentHalfLife
        );

    let stepDt =
        currentDt;

    if (
        currentMode ===
            "experiment" &&
        activeExperiment === 1 &&
        experiment1InProgress
    ) {
        const remainingTime =
            currentHalfLife -
            currentTime;

        if (
            remainingTime <= 0
        ) {
            finishExperiment1();
            return;
        }

        stepDt =
            Math.min(
                stepDt,
                remainingTime
            );
    }

    currentRemaining =
        performDecayStep(
            lambda,
            stepDt
        );

    currentTime +=
        stepDt;

    if (
        currentMode === "experiment" &&
        activeExperiment === 1 &&
        experiment1InProgress &&
        Math.abs(
            currentTime -
            currentHalfLife
        ) < 1e-9
    ) {
        currentTime =
            currentHalfLife;
    }

    experimentalData.push({
        x:
            currentTime,

        y:
            currentRemaining
    });

    updateDisplay();
    drawNuclei();
    updateChart();
    updateDataTable();

    if (
        currentMode === "experiment" &&
        activeExperiment === 1 &&
        experiment1InProgress &&
        currentTime >=
            currentHalfLife
    ) {
        finishExperiment1();
        return;
    }

    if (
        currentRemaining === 0
    ) {
        stopTimer();

        simulationRunning =
            false;

        simulationHasStarted =
            false;

        setSimulationStatus(
            "Mô phỏng kết thúc: không còn hạt chưa phân rã.",
            "finished"
        );

        setControlState(
            "finished"
        );
    }
}

function startTimer() {
    if (
        timerId !== null
    ) {
        return;
    }

    timerId =
        setInterval(
            runOneStep,
            realTimeInterval
        );
}

function stopTimer() {
    if (
        timerId !== null
    ) {
        clearInterval(
            timerId
        );

        timerId =
            null;
    }
}

// ======================================================
// 10. MÔ PHỎNG CỤC BỘ DÙNG CHO NHIỆM VỤ 2, 3
// ======================================================

function simulateOneHalfLifeTrial(
    N0,
    halfLife,
    dt
) {
    const lambda =
        calculateLambda(
            halfLife
        );

    const localNuclei =
        new Uint8Array(
            N0
        );

    localNuclei.fill(1);

    let localTime = 0;
    let remaining = N0;

    const epsilon =
        1e-12;

    while (
        localTime <
        halfLife -
        epsilon
    ) {
        const stepDt =
            Math.min(
                dt,
                halfLife -
                localTime
            );

        const probability =
            calculateDecayProbability(
                lambda,
                stepDt
            );

        remaining = 0;

        for (
            let i = 0;
            i < localNuclei.length;
            i++
        ) {
            if (
                localNuclei[i] === 1
            ) {
                if (
                    Math.random() <
                    probability
                ) {
                    localNuclei[i] = 0;
                } else {
                    remaining++;
                }
            }
        }

        localTime +=
            stepDt;
    }

    return remaining;
}

function simulateDecayCurve(
    N0,
    halfLife,
    dt
) {
    const lambda =
        calculateLambda(
            halfLife
        );

    const localNuclei =
        new Uint8Array(
            N0
        );

    localNuclei.fill(1);

    let time = 0;
    let remaining = N0;

    const maxTime =
        5 * halfLife;

    const epsilon =
        1e-12;

    const data = [
        {
            x: 0,
            y: 1
        }
    ];

    while (
        time <
        maxTime -
        epsilon
    ) {
        const stepDt =
            Math.min(
                dt,
                maxTime -
                time
            );

        const probability =
            calculateDecayProbability(
                lambda,
                stepDt
            );

        remaining = 0;

        for (
            let i = 0;
            i < localNuclei.length;
            i++
        ) {
            if (
                localNuclei[i] === 1
            ) {
                if (
                    Math.random() <
                    probability
                ) {
                    localNuclei[i] = 0;
                } else {
                    remaining++;
                }
            }
        }

        time +=
            stepDt;

        if (
            Math.abs(
                time -
                maxTime
            ) < 1e-9
        ) {
            time =
                maxTime;
        }

        data.push({
            x:
                time,

            y:
                remaining /
                N0
        });
    }

    return data;
}

function generateNormalizedTheoryCurve(
    halfLife
) {
    const lambda =
        calculateLambda(
            halfLife
        );

    const maxTime =
        5 * halfLife;

    const numberOfPoints =
        250;

    const step =
        maxTime /
        numberOfPoints;

    const data = [];

    for (
        let i = 0;
        i <= numberOfPoints;
        i++
    ) {
        const time =
            i * step;

        data.push({
            x:
                time,

            y:
                Math.exp(
                    -lambda *
                    time
                )
        });
    }

    return data;
}

// ======================================================
// 11. NHIỆM VỤ 2
// ======================================================

function resetExperiment2Display() {
    experiment2Ready = false;
    experiment2Results = [];

    experiment2Result.hidden =
        true;

    experiment2TableBody.innerHTML =
        "";

    experiment2AverageDisplay
        .textContent =
        "—";

    experiment2TheoryDisplay
        .textContent =
        "—";

    experiment2Message
        .textContent =
        "";

    runExperiment2Button.disabled =
        true;
}

function setupExperiment2() {
    stopTimer();

    simulationRunning =
        false;

    simulationHasStarted =
        false;

    experiment1InProgress =
        false;

    activeExperiment =
        2;

    experiment3Ready =
        false;

    runExperiment3Button.disabled =
        true;

    unlockInputs();

    inputN0.value =
        100;

    inputHalfLife.value =
        10;

    inputDt.value =
        0.1;

    resetExperiment2Display();

    prepareNewSimulation();

    experiment2Ready =
        true;

    runExperiment2Button.disabled =
        false;

    experiment2Status.textContent =
        "Đã thiết lập. Nhấn “Chạy 5 lần thí nghiệm”.";

    setSimulationStatus(
        "Nhiệm vụ 2 đã sẵn sàng. Hãy dùng nút “Chạy 5 lần thí nghiệm”.",
        "ready"
    );

    setTaskOnlyControlState();
}

function runExperiment2() {
    if (
        !experiment2Ready
    ) {
        alert(
            "Hãy thiết lập Nhiệm vụ 2 trước."
        );

        return;
    }

    stopTimer();

    simulationRunning =
        false;

    const N0 = 100;
    const halfLife = 10;
    const dt = 0.1;
    const numberOfTrials = 5;

    experiment2Results = [];

    experiment2TableBody.innerHTML =
        "";

    experiment2Status.textContent =
        "Đang thực hiện 5 lần thí nghiệm...";

    for (
        let trial = 1;
        trial <= numberOfTrials;
        trial++
    ) {
        const result =
            simulateOneHalfLifeTrial(
                N0,
                halfLife,
                dt
            );

        experiment2Results.push(
            result
        );

        const difference =
            result -
            N0 / 2;

        let differenceText =
            "";

        if (
            difference === 0
        ) {
            differenceText =
                "Bằng giá trị lý thuyết";
        } else if (
            difference > 0
        ) {
            differenceText =
                `+${difference} hạt`;
        } else {
            differenceText =
                `${difference} hạt`;
        }

        const row =
            document.createElement(
                "tr"
            );

        row.innerHTML = `
            <td>${trial}</td>
            <td>${result}</td>
            <td>${differenceText}</td>
        `;

        experiment2TableBody
            .appendChild(
                row
            );
    }

    const average =
        experiment2Results.reduce(
            (
                sum,
                value
            ) =>
                sum + value,
            0
        ) /
        numberOfTrials;

    const theoreticalValue =
        N0 / 2;

    experiment2AverageDisplay
        .textContent =
        average.toFixed(1);

    experiment2TheoryDisplay
        .textContent =
        theoreticalValue.toFixed(0);

    experiment2Result.hidden =
        false;

    experiment2Status.textContent =
        "Hoàn thành";

    setSimulationStatus(
        "Nhiệm vụ 2 đã hoàn thành 5 lần lặp.",
        "finished"
    );

    setTaskOnlyControlState();

    experiment2Message.textContent =
        `Năm lần thí nghiệm được thực hiện với cùng N₀ và T₁/₂ nhưng kết quả không nhất thiết giống nhau. ` +
        `Các giá trị dao động quanh giá trị lý thuyết ${theoreticalValue.toFixed(0)} hạt.`;
}

// ======================================================
// 12. NHIỆM VỤ 3
// ======================================================

function resetExperiment3Display() {
    experiment3Ready = false;
    experiment3Results = [];

    experiment3Result.hidden =
        true;

    experiment3TableBody.innerHTML =
        "";

    experiment3Message.textContent =
        "";

    runExperiment3Button.disabled =
        true;

    if (
        experiment3Chart !== null
    ) {
        experiment3Chart.destroy();
        experiment3Chart = null;
    }
}

function setupExperiment3() {
    stopTimer();

    simulationRunning =
        false;

    simulationHasStarted =
        false;

    experiment1InProgress =
        false;

    activeExperiment =
        3;

    experiment2Ready =
        false;

    runExperiment2Button.disabled =
        true;

    unlockInputs();

    inputN0.value =
        20;

    inputHalfLife.value =
        10;

    inputDt.value =
        0.1;

    resetExperiment3Display();

    prepareNewSimulation();

    experiment3Ready =
        true;

    runExperiment3Button.disabled =
        false;

    experiment3Status.textContent =
        "Đã thiết lập. Nhấn “Chạy so sánh”.";

    setSimulationStatus(
        "Nhiệm vụ 3 đã sẵn sàng. Hãy dùng nút “Chạy so sánh”.",
        "ready"
    );

    setTaskOnlyControlState();
}

function calculateMeanAbsoluteRelativeDeviation(
    values,
    theoreticalValue
) {
    if (
        !Number.isFinite(
            theoreticalValue
        ) ||
        theoreticalValue <= 0 ||
        values.length === 0
    ) {
        return NaN;
    }

    let totalRelativeDeviation =
        0;

    for (
        const value
        of
        values
    ) {
        totalRelativeDeviation +=
            Math.abs(
                value -
                theoreticalValue
            ) /
            theoreticalValue;
    }

    return (
        totalRelativeDeviation /
        values.length
    ) * 100;
}

function createExperiment3Chart(
    curve20,
    curve100,
    curve1000,
    theoreticalCurve
) {
    if (
        experiment3Chart !== null
    ) {
        experiment3Chart.destroy();
    }

    const chartContext =
        experiment3ChartCanvas
            .getContext(
                "2d"
            );

    experiment3Chart =
        new Chart(
            chartContext,
            {
                type: "line",

                data: {
                    datasets: [
                        {
                            label:
                                "N₀ = 20",

                            data:
                                curve20,

                            borderWidth:
                                2,

                            pointRadius:
                                0,

                            showLine:
                                true
                        },

                        {
                            label:
                                "N₀ = 100",

                            data:
                                curve100,

                            borderWidth:
                                2,

                            pointRadius:
                                0,

                            showLine:
                                true
                        },

                        {
                            label:
                                "N₀ = 1000",

                            data:
                                curve1000,

                            borderWidth:
                                2,

                            pointRadius:
                                0,

                            showLine:
                                true
                        },

                        {
                            label:
                                "Lý thuyết N/N₀ = e^(-λt)",

                            data:
                                theoreticalCurve,

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

                plugins: [
                    halfLifeMarkerPlugin
                ],

                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: false,
                    parsing: false,

                    scales: {
                        x: {
                            type:
                                "linear",

                            min:
                                0,

                            max:
                                50,

                            title: {
                                display:
                                    true,

                                text:
                                    "Thời gian t (s)"
                            }
                        },

                        y: {
                            min:
                                0,

                            max:
                                1,

                            title: {
                                display:
                                    true,

                                text:
                                    "Tỉ lệ số hạt chưa phân rã N/N₀"
                            }
                        }
                    },

                    plugins: {
                        legend: {
                            display:
                                true
                        },

                        halfLifeMarkers: {
                            halfLife:
                                10
                        },

                        tooltip: {
                            callbacks: {
                                label(
                                    context
                                ) {
                                    return (
                                        `${context.dataset.label}: ` +
                                        `${context.parsed.y.toFixed(3)}`
                                    );
                                }
                            }
                        }
                    }
                }
            }
        );
}

function runExperiment3() {
    if (
        !experiment3Ready
    ) {
        alert(
            "Hãy thiết lập Nhiệm vụ 3 trước."
        );

        return;
    }

    stopTimer();

    simulationRunning =
        false;

    experiment3Status.textContent =
        "Đang thực hiện phép so sánh...";

    experiment3TableBody.innerHTML =
        "";

    experiment3Results =
        [];

    const sampleSizes = [
        20,
        100,
        1000
    ];

    const numberOfTrials =
        5;

    const halfLife =
        10;

    const dt =
        0.1;

    for (
        const N0
        of
        sampleSizes
    ) {
        const trialResults =
            [];

        for (
            let trial = 0;
            trial < numberOfTrials;
            trial++
        ) {
            trialResults.push(
                simulateOneHalfLifeTrial(
                    N0,
                    halfLife,
                    dt
                )
            );
        }

        const average =
            trialResults.reduce(
                (
                    sum,
                    value
                ) =>
                    sum + value,
                0
            ) /
            numberOfTrials;

        const theoreticalValue =
            N0 / 2;

        const relativeDeviation =
            calculateMeanAbsoluteRelativeDeviation(
                trialResults,
                theoreticalValue
            );

        experiment3Results.push({
            N0,
            trialResults,
            average,
            theoretical:
                theoreticalValue,
            relativeDeviation
        });

        const row =
            document.createElement(
                "tr"
            );

        row.innerHTML = `
            <td>${N0}</td>
            <td>${trialResults.join(", ")}</td>
            <td>${average.toFixed(1)}</td>
            <td>${theoreticalValue.toFixed(0)}</td>
            <td>${relativeDeviation.toFixed(1)} %</td>
        `;

        experiment3TableBody
            .appendChild(
                row
            );
    }

    const curve20 =
        simulateDecayCurve(
            20,
            halfLife,
            dt
        );

    const curve100 =
        simulateDecayCurve(
            100,
            halfLife,
            dt
        );

    const curve1000 =
        simulateDecayCurve(
            1000,
            halfLife,
            dt
        );

    const theoreticalCurve =
        generateNormalizedTheoryCurve(
            halfLife
        );

    experiment3Result.hidden =
        false;

    createExperiment3Chart(
        curve20,
        curve100,
        curve1000,
        theoreticalCurve
    );

    experiment3Status.textContent =
        "Hoàn thành";

    experiment3Message.textContent =
        "Ba đường mô phỏng đều có dao động ngẫu nhiên. Khi N₀ tăng, mức dao động tương đối có xu hướng nhỏ hơn và đường N/N₀ thường bám sát đường lý thuyết hơn. " +
        "Không nhất thiết mọi lần chạy riêng lẻ đều cho mức lệch giảm đều từ N₀ = 20 đến 1000; cần quan sát xu hướng thống kê qua nhiều lần lặp.";

    console.log(
        "Kết quả Nhiệm vụ 3:",
        experiment3Results
    );
}

// ======================================================
// 13. KIỂM CHỨNG MONTE CARLO NHIỀU LẦN
// ======================================================

function createEmptyAverageArray(
    numberOfPoints
) {
    return new Float64Array(
        numberOfPoints + 1
    );
}

function simulateOneCompleteRun(
    numberOfPoints,
    sampleStep,
    lambda
) {
    const decaysPerInterval =
        new Uint32Array(
            numberOfPoints + 1
        );

    const maxTime =
        numberOfPoints *
        sampleStep;

    for (
        let nucleus = 0;
        nucleus < currentN0;
        nucleus++
    ) {
        let randomValue =
            Math.random();

        while (
            randomValue === 0
        ) {
            randomValue =
                Math.random();
        }

        const decayTime =
            -Math.log(
                randomValue
            ) /
            lambda;

        if (
            decayTime <=
            maxTime
        ) {
            let intervalIndex =
                Math.ceil(
                    decayTime /
                    sampleStep
                );

            if (
                intervalIndex < 1
            ) {
                intervalIndex =
                    1;
            }

            if (
                intervalIndex <=
                numberOfPoints
            ) {
                decaysPerInterval[
                    intervalIndex
                ]++;
            }
        }
    }

    const remainingAtTime =
        new Uint32Array(
            numberOfPoints + 1
        );

    let remaining =
        currentN0;

    remainingAtTime[0] =
        remaining;

    for (
        let i = 1;
        i <= numberOfPoints;
        i++
    ) {
        remaining -=
            decaysPerInterval[i];

        remainingAtTime[i] =
            remaining;
    }

    return remainingAtTime;
}

function calculateNormalizedRMSE(
    averageData
) {
    if (
        averageData.length === 0
    ) {
        return NaN;
    }

    const lambda =
        calculateLambda(
            currentHalfLife
        );

    let sumSquaredError =
        0;

    for (
        const point
        of
        averageData
    ) {
        const theoreticalValue =
            calculateTheoreticalN(
                currentN0,
                lambda,
                point.x
            );

        const difference =
            point.y -
            theoreticalValue;

        sumSquaredError +=
            difference *
            difference;
    }

    const meanSquaredError =
        sumSquaredError /
        averageData.length;

    return (
        Math.sqrt(
            meanSquaredError
        ) /
        currentN0
    ) * 100;
}

async function runValidationExperiment() {
    if (
        validationIsRunning
    ) {
        return;
    }

    stopTimer();

    simulationRunning =
        false;

    readInputs();

    if (
        !validateInputs()
    ) {
        return;
    }

    if (
        !prepareNewSimulation()
    ) {
        return;
    }

    const repeatCount =
        parseInt(
            repeatCountSelect.value,
            10
        );

    if (
        !Number.isFinite(
            repeatCount
        ) ||
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

    setSimulationStatus(
        "Đang chạy kiểm chứng thống kê...",
        "running"
    );

    setControlState(
        "running"
    );

    validationRuns.textContent =
        "0";

    validationError.textContent =
        "—";

    try {
        const lambda =
            calculateLambda(
                currentHalfLife
            );

        const numberOfPoints =
            100;

        const maxTime =
            currentHalfLife * 5;

        const sampleStep =
            maxTime /
            numberOfPoints;

        const accumulatedValues =
            createEmptyAverageArray(
                numberOfPoints
            );

        const yieldEvery =
            20;

        for (
            let run = 0;
            run < repeatCount;
            run++
        ) {
            const runValues =
                simulateOneCompleteRun(
                    numberOfPoints,
                    sampleStep,
                    lambda
                );

            for (
                let i = 0;
                i <= numberOfPoints;
                i++
            ) {
                accumulatedValues[i] +=
                    runValues[i];
            }

            if (
                (run + 1) %
                    yieldEvery === 0 ||
                run ===
                    repeatCount - 1
            ) {
                validationRuns.textContent =
                    String(
                        run + 1
                    );

                validationStatus.textContent =
                    `Đang tính ${run + 1}/${repeatCount}`;

                await new Promise(
                    resolve =>
                        setTimeout(
                            resolve,
                            0
                        )
                );
            }
        }

        averageMonteCarloData =
            [];

        for (
            let i = 0;
            i <= numberOfPoints;
            i++
        ) {
            averageMonteCarloData.push({
                x:
                    i *
                    sampleStep,

                y:
                    accumulatedValues[i] /
                    repeatCount
            });
        }

        updateChart();

        const normalizedRMSE =
            calculateNormalizedRMSE(
                averageMonteCarloData
            );

        validationStatus.textContent =
            "Hoàn thành";

        validationRuns.textContent =
            String(
                repeatCount
            );

        validationError.textContent =
            `${normalizedRMSE.toFixed(3)} %`;

        setSimulationStatus(
            "Kiểm chứng thống kê đã hoàn thành.",
            "finished"
        );

        setControlState(
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
// 14. XUẤT CSV
// ======================================================

function exportCSV() {
    if (
        experimentalData.length === 0
    ) {
        alert(
            "Chưa có dữ liệu để xuất."
        );

        return;
    }

    const lambda =
        calculateLambda(
            currentHalfLife
        );

    let csv =
        "time_s,N_simulation,N_theory,N_over_N0\n";

    for (
        const point
        of
        experimentalData
    ) {
        const theoreticalN =
            calculateTheoreticalN(
                currentN0,
                lambda,
                point.x
            );

        const ratio =
            point.y /
            currentN0;

        csv +=
            `${point.x.toFixed(4)},` +
            `${point.y},` +
            `${theoreticalN.toFixed(4)},` +
            `${ratio.toFixed(6)}\n`;
    }

    const blob =
        new Blob(
            [
                "\uFEFF" +
                csv
            ],
            {
                type:
                    "text/csv;charset=utf-8;"
            }
        );

    const url =
        URL.createObjectURL(
            blob
        );

    const link =
        document.createElement(
            "a"
        );

    link.href =
        url;

    link.download =
        "radioactive_decay_data.csv";

    document.body.appendChild(
        link
    );

    link.click();

    document.body.removeChild(
        link
    );

    URL.revokeObjectURL(
        url
    );
}

// ======================================================
// 15. CHUYỂN CHẾ ĐỘ
// ======================================================

function setMode(mode) {
    stopTimer();

    simulationRunning =
        false;

    simulationHasStarted =
        false;

    unlockInputs();

    if (
        mode !== "experiment"
    ) {
        experiment1InProgress =
            false;

        activeExperiment =
            0;
    }

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

    dtControlGroup.style.display =
        "none";

    lambdaDataBox.style.display =
        "none";

    dataTablePanel.style.display =
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

        dataTablePanel.style.display =
            "block";
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

        dtControlGroup.style.display =
            "block";

        lambdaDataBox.style.display =
            "block";

        dataTablePanel.style.display =
            "block";
    }

    if (
        mode === "explore"
    ) {
        setSimulationStatus(
            "Sẵn sàng khám phá. Chọn N₀, T₁/₂ rồi nhấn Bắt đầu.",
            "ready"
        );

    } else if (
        mode === "experiment"
    ) {
        setSimulationStatus(
            "Chọn một nhiệm vụ thí nghiệm để bắt đầu.",
            "ready"
        );

    } else {
        setSimulationStatus(
            "Chế độ kiểm chứng dành cho giáo viên / nghiên cứu.",
            "ready"
        );
    }

    if (
        mode === "experiment"
    ) {
        setTaskOnlyControlState();
    } else {
        setControlState(
            "ready"
        );
    }

    updateChartModeVisibility();
}

// ======================================================
// 16. XỬ LÝ NÚT BẮT ĐẦU / TẠM DỪNG / ĐẶT LẠI
// ======================================================

function handleStart() {
    if (
        currentMode === "experiment" &&
        activeExperiment === 1 &&
        !experiment1InProgress
    ) {
        const prediction =
            parseInt(
                predictionInput.value,
                10
            );

        if (
            !Number.isFinite(
                prediction
            ) ||
            prediction < 0 ||
            prediction > 1000
        ) {
            alert(
                "Hãy nhập dự đoán từ 0 đến 1000 hạt trước khi bắt đầu."
            );

            predictionInput.focus();

            return;
        }

        inputN0.value =
            1000;

        inputHalfLife.value =
            10;

        inputDt.value =
            0.1;

        experiment1Prediction =
            prediction;

        experiment1InProgress =
            true;

        experiment1Result.hidden =
            true;

        experiment1Status.textContent =
            "Đang chạy đến t = T₁/₂ = 10 s...";
    }

    if (
        !simulationHasStarted
    ) {
        const success =
            prepareNewSimulation();

        if (
            !success
        ) {
            experiment1InProgress =
                false;

            return;
        }

        simulationHasStarted =
            true;

        lockInputs();
    }

    simulationRunning =
        true;

    setSimulationStatus(
        "Mô phỏng đang chạy...",
        "running"
    );

    setControlState(
        "running"
    );

    startTimer();
}

startButton.addEventListener(
    "click",
    handleStart
);

pauseButton.addEventListener(
    "click",
    () => {
        simulationRunning =
            false;

        stopTimer();

        setSimulationStatus(
            `Đã tạm dừng tại t = ${currentTime.toFixed(2)} s.`,
            "paused"
        );

        setControlState(
            "paused"
        );

        if (
            experiment1InProgress
        ) {
            experiment1Status.textContent =
                `Đã tạm dừng tại t = ${currentTime.toFixed(2)} s.`;
        }
    }
);

resetButton.addEventListener(
    "click",
    () => {
        stopTimer();

        simulationRunning =
            false;

        simulationHasStarted =
            false;

        unlockInputs();

        if (
            activeExperiment === 1
        ) {
            resetExperiment1Display();

            experiment1Status.textContent =
                "Đã đặt lại.";
        }

        if (
            activeExperiment === 2
        ) {
            resetExperiment2Display();

            experiment2Status.textContent =
                "Đã đặt lại.";
        }

        if (
            activeExperiment === 3
        ) {
            resetExperiment3Display();

            experiment3Status.textContent =
                "Đã đặt lại.";
        }

        prepareNewSimulation();

        setSimulationStatus(
            "Đã đặt lại mô phỏng.",
            "ready"
        );

        if (
            currentMode === "experiment" &&
            (
                activeExperiment === 2 ||
                activeExperiment === 3
            )
        ) {
            setTaskOnlyControlState();
        } else {
            setControlState(
                "ready"
            );
        }
    }
);

// ======================================================
// 17. EVENT LISTENER
// ======================================================

exportCsvButton.addEventListener(
    "click",
    exportCSV
);

runValidationButton.addEventListener(
    "click",
    runValidationExperiment
);

exploreModeButton.addEventListener(
    "click",
    () => setMode(
        "explore"
    )
);

experimentModeButton.addEventListener(
    "click",
    () => setMode(
        "experiment"
    )
);

validationModeButton.addEventListener(
    "click",
    () => setMode(
        "validation"
    )
);

loadExperiment1Button.addEventListener(
    "click",
    setupExperiment1
);

loadExperiment2Button.addEventListener(
    "click",
    setupExperiment2
);

runExperiment2Button.addEventListener(
    "click",
    runExperiment2
);

loadExperiment3Button.addEventListener(
    "click",
    setupExperiment3
);

runExperiment3Button.addEventListener(
    "click",
    runExperiment3
);

// ======================================================
// 18. KHỞI TẠO
// ======================================================

prepareNewSimulation();

resetExperiment2Display();

resetExperiment3Display();

setMode(
    "explore"
);