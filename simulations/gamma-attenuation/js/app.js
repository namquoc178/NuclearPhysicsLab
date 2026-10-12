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
// 1. GIAO DIỆN
// ======================================================

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


const photonCountInput =
    getRequiredElement(
        "photonCountInput"
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


const hvlDisplay =
    getRequiredElement(
        "hvlDisplay"
    );


// ======================================================
// CANVAS
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
// KẾT QUẢ
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


const theoryDisplay =
    getRequiredElement(
        "theoryDisplay"
    );


// ======================================================
// CHẾ ĐỘ
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

const attenuationChartCanvas =
    getRequiredElement(
        "attenuationChart"
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


const task2Equation =
    getRequiredElement(
        "task2Equation"
    );


const task2MuExperimental =
    getRequiredElement(
        "task2MuExperimental"
    );


const task2MuModel =
    getRequiredElement(
        "task2MuModel"
    );


const task2R2 =
    getRequiredElement(
        "task2R2"
    );


const task2RelativeError =
    getRequiredElement(
        "task2RelativeError"
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


const task3MuExperimental =
    getRequiredElement(
        "task3MuExperimental"
    );


const task3HvlExperimental =
    getRequiredElement(
        "task3HvlExperimental"
    );


const task3HvlModel =
    getRequiredElement(
        "task3HvlModel"
    );


const task3HvlError =
    getRequiredElement(
        "task3HvlError"
    );


const task3TableBody =
    getRequiredElement(
        "task3TableBody"
    );


const task3AverageRatio =
    getRequiredElement(
        "task3AverageRatio"
    );


const task3TheoryRatio =
    getRequiredElement(
        "task3TheoryRatio"
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


const validationMeanMu =
    getRequiredElement(
        "validationMeanMu"
    );


const validationSdMu =
    getRequiredElement(
        "validationSdMu"
    );


const validationRelativeError =
    getRequiredElement(
        "validationRelativeError"
    );


const validationMeanR2 =
    getRequiredElement(
        "validationMeanR2"
    );


const validationResult =
    getRequiredElement(
        "validationResult"
    );


const validationChartCanvas =
    getRequiredElement(
        "validationChart"
    );


const validationTableBody =
    getRequiredElement(
        "validationTableBody"
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


let attenuationChart =
    null;


let task1Chart =
    null;


let task2Chart =
    null;

let task3Chart =
    null;

let lastExperimentalPoint =
    null;


let currentPhotonResults =
    [];


let task1Ready =
    false;


let task2Ready =
    false;

let task3Ready =
    false;

let task1Data =
    [];


let task2Data =
    [];

let task2ExperimentalMu =
    null;


let task3ExperimentalHvl =
    null;

    let validationChart =
    null;


let validationIsRunning =
    false;


let validationData =
    [];

// ======================================================
// 3. ĐỌC THAM SỐ
// ======================================================

function readParameters() {

    return {

        material:
            materialSelect.value,

        thicknessMm:
            parseFloat(
                thicknessInput.value
            ),

        totalPhotons:
            parseInt(
                photonCountInput.value,
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
        parameters.thicknessMm < 0
        ||
        parameters.thicknessMm > 50
    ) {

        alert(
            "Độ dày phải nằm trong khoảng từ 0 đến 50 mm."
        );


        return false;
    }


    if (
        !Number.isFinite(
            parameters.totalPhotons
        )
        ||
        parameters.totalPhotons < 50
        ||
        parameters.totalPhotons > 5000
    ) {

        alert(
            "Số photon đại diện phải nằm trong khoảng từ 50 đến 5000."
        );


        return false;
    }


    return true;
}


// ======================================================
// 5. NHÃN VẬT LIỆU
// ======================================================

function getMaterialLabel(
    material
) {

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
// 6. HIỂN THỊ THÔNG SỐ
// ======================================================

function updateThicknessLabel() {

    const thickness =
        parseFloat(
            thicknessInput.value
        );


    thicknessDisplay.textContent =
        `${thickness.toFixed(1)} mm`;
}


function updateAdvancedInfo() {

    const parameters =
        readParameters();


    const mu =
        getGammaMu(
            parameters.material
        );


    const hvl =
        calculateHalfValueLayer(
            mu
        );


    muDisplay.textContent =
        `${mu.toFixed(3)} mm⁻¹`;


    hvlDisplay.textContent =
        `${hvl.toFixed(2)} mm`;
}


// ======================================================
// 7. TRẠNG THÁI
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
// 8. KẾT QUẢ
// ======================================================

function clearResults() {

    emittedDisplay.textContent =
        "0";


    transmittedDisplay.textContent =
        "0";


    absorbedDisplay.textContent =
        "0";


    transmissionDisplay.textContent =
        "0.000";


    theoryDisplay.textContent =
        "—";
}


function updateResults(
    totalPhotons,
    transmitted,
    theoreticalRatio
) {

    const absorbed =
        totalPhotons -
        transmitted;


    const simulatedRatio =
        totalPhotons > 0
            ?
            transmitted /
            totalPhotons
            :
            0;


    emittedDisplay.textContent =
        String(
            totalPhotons
        );


    transmittedDisplay.textContent =
        String(
            transmitted
        );


    absorbedDisplay.textContent =
        String(
            absorbed
        );


    transmissionDisplay.textContent =
        simulatedRatio.toFixed(
            3
        );


    theoryDisplay.textContent =
        theoreticalRatio.toFixed(
            3
        );
}


// ======================================================
// 9. VẼ MÔ HÌNH
// ======================================================

function drawStaticScene() {

    const ctx =
        simulationContext;


    const width =
        simulationCanvas.width;


    const height =
        simulationCanvas.height;


    const parameters =
        readParameters();


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


    const detectorX =
        width - 100;


    const visualShieldWidth =
        parameters.thicknessMm > 0
            ?
            Math.min(
                130,
                20 +
                parameters.thicknessMm *
                2.2
            )
            :
            0;


    ctx.fillStyle =
        "#1f2937";


    ctx.beginPath();


    ctx.arc(
        sourceX,
        sourceY,
        30,
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
        "γ",
        sourceX,
        sourceY + 8
    );


    ctx.fillStyle =
        "#475569";


    ctx.font =
        "16px Arial";


    ctx.fillText(
        "Nguồn γ",
        sourceX,
        sourceY + 62
    );


    if (
        parameters.thicknessMm >
        0
    ) {

        ctx.fillStyle =
            "#cbd5e1";


        ctx.fillRect(
            shieldX,
            75,
            visualShieldWidth,
            height - 150
        );


        ctx.strokeStyle =
            "#64748b";


        ctx.lineWidth =
            2;


        ctx.strokeRect(
            shieldX,
            75,
            visualShieldWidth,
            height - 150
        );

    } else {

        ctx.strokeStyle =
            "#94a3b8";


        ctx.lineWidth =
            2;


        ctx.setLineDash(
            [6, 6]
        );


        ctx.beginPath();


        ctx.moveTo(
            shieldX,
            80
        );


        ctx.lineTo(
            shieldX,
            height - 80
        );


        ctx.stroke();


        ctx.setLineDash(
            []
        );
    }


    ctx.fillStyle =
        "#334155";


    ctx.font =
        "bold 16px Arial";


    ctx.fillText(
        getMaterialLabel(
            parameters.material
        ),
        shieldX +
        visualShieldWidth / 2,
        50
    );


    ctx.font =
        "14px Arial";


    ctx.fillText(
        `${parameters.thicknessMm.toFixed(1)} mm`,
        shieldX +
        visualShieldWidth / 2,
        height - 45
    );


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

function buildAnimatedPhotons(
    results
) {

    const width =
        simulationCanvas.width;


    const height =
        simulationCanvas.height;


    const parameters =
        readParameters();


    const sourceX =
        122;


    const shieldX =
        width * 0.48;


    const detectorX =
        width - 126;


    const visualShieldWidth =
        parameters.thicknessMm > 0
            ?
            Math.min(
                130,
                20 +
                parameters.thicknessMm *
                2.2
            )
            :
            0;


    return results.map(
        (
            result,
            index
        ) => {

            const laneCount =
                20;


            const lane =
                index %
                laneCount;


            const y =
                100 +
                lane *
                (
                    (
                        height -
                        200
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
                    40
                )
                *
                0.009;


            let endX;


            if (
                result.transmitted
            ) {

                endX =
                    detectorX;

            } else {

                const minimumStop =
                    shieldX;


                const maximumStop =
                    shieldX +
                    Math.max(
                        visualShieldWidth,
                        5
                    );


                const fraction =
                    0.1 +
                    result.randomValue *
                    0.8;


                endX =
                    minimumStop +
                    (
                        maximumStop -
                        minimumStop
                    )
                    *
                    fraction;
            }


            return {

                y,

                startX:
                    sourceX,

                endX,

                transmitted:
                    result.transmitted,

                delay

            };
        }
    );
}


function animatePhotonResults(
    results,
    onComplete
) {

    stopGammaAnimation();


    gammaPhotons =
        buildAnimatedPhotons(
            results
        );


    simulationRunning =
        true;


    const startTime =
        performance.now();


    const duration =
        1500;


    function frame(
        now
    ) {

        drawStaticScene();


        const elapsed =
            now -
            startTime;


        let allFinished =
            true;


        for (
            const photon
            of
            gammaPhotons
        ) {

            const progress =
                Math.max(
                    0,

                    Math.min(
                        1,

                        elapsed /
                        duration -
                        photon.delay
                    )
                );


            if (
                progress < 1
            ) {

                allFinished =
                    false;
            }


            const x =
                photon.startX +
                (
                    photon.endX -
                    photon.startX
                )
                *
                progress;


            simulationContext.beginPath();


            simulationContext.arc(
                x,
                photon.y,
                3.7,
                0,
                Math.PI * 2
            );


            simulationContext.fillStyle =
                "#2563eb";


            simulationContext.fill();


            if (
                progress >= 1
            ) {

                simulationContext.beginPath();


                simulationContext.arc(
                    photon.endX,
                    photon.y,
                    5,
                    0,
                    Math.PI * 2
                );


                simulationContext.fillStyle =
                    photon.transmitted
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
// 11. ĐƯỜNG LÍ THUYẾT
// ======================================================

function generateTheoryCurve(
    material
) {

    const mu =
        getGammaMu(
            material
        );


    const data =
        [];


    for (
        let x = 0;
        x <= 50.0001;
        x += 0.25
    ) {

        data.push(
            {

                x:
                    Number(
                        x.toFixed(2)
                    ),

                y:
                    calculateGammaTransmission(
                        mu,
                        x
                    )

            }
        );
    }


    return data;
}


// ======================================================
// 12. ĐỒ THỊ CHÍNH
// ======================================================

function createOrUpdateChart() {

    const parameters =
        readParameters();


    const theoryData =
        generateTheoryCurve(
            parameters.material
        );


    const experimentalData =
        lastExperimentalPoint
            ?
            [lastExperimentalPoint]
            :
            [];


    if (
        attenuationChart !==
        null
    ) {

        attenuationChart.destroy();
    }


    attenuationChart =
        new Chart(
            attenuationChartCanvas
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
                                "Lí thuyết I/I₀ = e^(-μx)",

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
                                "Kết quả Monte Carlo",

                            data:
                                experimentalData,

                            borderWidth:
                                0,

                            pointRadius:
                                7,

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
                                50,

                            title:
                            {

                                display:
                                    true,

                                text:
                                    "Độ dày vật liệu x (mm)"

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
                                    "Tỉ lệ cường độ I/I₀"

                            }

                        }

                    }

                }

            }
        );
}


// ======================================================
// 13. KHÁM PHÁ
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


    stopGammaAnimation();


    runButton.disabled =
        true;


    setStatus(
        "Đang mô phỏng...",
        "running"
    );


    const mu =
        getGammaMu(
            parameters.material
        );


    const theoreticalRatio =
        calculateGammaTransmission(
            mu,
            parameters.thicknessMm
        );


    currentPhotonResults =
        buildGammaPhotonResults(
            parameters.totalPhotons,
            theoreticalRatio
        );


    const transmitted =
        countGammaTransmitted(
            currentPhotonResults
        );


    const simulatedRatio =
        transmitted /
        parameters.totalPhotons;


    updateResults(
        parameters.totalPhotons,
        transmitted,
        theoreticalRatio
    );


    lastExperimentalPoint =
    {

        x:
            parameters.thicknessMm,

        y:
            simulatedRatio

    };


    createOrUpdateChart();


    animatePhotonResults(
        currentPhotonResults,

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
// 14. ĐẶT LẠI
// ======================================================

function resetSimulation() {

    stopGammaAnimation();


    materialSelect.value =
        "aluminum";


    thicknessInput.value =
        "4";


    photonCountInput.value =
        "1000";


    currentPhotonResults =
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
// 15. NHIỆM VỤ 1
// ======================================================

function resetTask1Display() {

    task1Ready =
        false;


    task1Data =
        [];


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


    resetTask2Display();
}


function setupTask1() {

    stopGammaAnimation();


    resetTask1Display();


    materialSelect.value =
        "lead";


    thicknessInput.value =
        "0";


    photonCountInput.value =
        "1000";


    updateThicknessLabel();


    updateAdvancedInfo();


    clearResults();


    drawStaticScene();


    lastExperimentalPoint =
        null;


    createOrUpdateChart();


    task1Ready =
        true;


    runTask1Button.disabled =
        false;


    task1Status.textContent =
        "Đã thiết lập: Chì, N₀ = 1000 photon. Nhấn “Chạy khảo sát”.";


    setStatus(
        "Nhiệm vụ 1 đã sẵn sàng",
        "ready"
    );
}


function runTask1Trial(
    thicknessMm
) {

    const totalPhotons =
        1000;


    const mu =
        getGammaMu(
            "lead"
        );


    const theoreticalRatio =
        calculateGammaTransmission(
            mu,
            thicknessMm
        );


    const results =
        buildGammaPhotonResults(
            totalPhotons,
            theoreticalRatio
        );


    const transmitted =
        countGammaTransmitted(
            results
        );


    return {

        thicknessMm,

        totalPhotons,

        transmitted,

        simulatedRatio:
            transmitted /
            totalPhotons,

        theoreticalRatio

    };
}


function createTask1Chart(
    data
) {

    if (
        task1Chart !== null
    ) {

        task1Chart.destroy();
    }


    const monteCarloData =
        data.map(
            point => ({

                x:
                    point.thicknessMm,

                y:
                    point.simulatedRatio

            })
        );


    const theoryData =
        generateTheoryCurve(
            "lead"
        );


    task1Chart =
        new Chart(
            task1ChartCanvas
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
                                "Dữ liệu Monte Carlo",

                            data:
                                monteCarloData,

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
                                20,

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
                                    "Tỉ lệ cường độ I/I₀"

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
        "Đang thực hiện các phép đo...";


    setStatus(
        "Đang chạy Nhiệm vụ 1...",
        "running"
    );


    // Độ dày khảo sát trải tới khoảng 3,6 bề dày bán giảm của chì (x½ ≈ 5,5 mm).
    const thicknessValues =
    [
        0,
        2,
        4,
        6,
        8,
        10,
        12,
        15,
        20
    ];


    task1Data =
        thicknessValues.map(
            thickness =>
                runTask1Trial(
                    thickness
                )
        );


    task1TableBody.innerHTML =
        "";


    for (
        const result
        of
        task1Data
    ) {

        const row =
            document.createElement(
                "tr"
            );


        row.innerHTML =
            `
            <td>${result.thicknessMm.toFixed(1)}</td>
            <td>${result.totalPhotons}</td>
            <td>${result.transmitted}</td>
            <td>${result.simulatedRatio.toFixed(3)}</td>
            <td>${result.theoreticalRatio.toFixed(3)}</td>
            `;


        task1TableBody.appendChild(
            row
        );
    }


    createTask1Chart(
        task1Data
    );


    task1Result.hidden =
        false;


    task1Status.textContent =
        "Hoàn thành";


    task1Conclusion.textContent =
        "Khi độ dày lớp chì tăng, tỉ lệ I/I₀ giảm nhưng không giảm đều theo từng milimét. "
        +
        "Các điểm Monte Carlo dao động quanh đường lí thuyết và cho thấy quá trình suy giảm có dạng hàm mũ.";


    task1Ready =
        true;


    runTask1Button.disabled =
        false;


    task2Status.textContent =
        "Dữ liệu Nhiệm vụ 1 đã sẵn sàng để xử lí.";


    setStatus(
        "Nhiệm vụ 1 hoàn thành",
        "finished"
    );
}


// ======================================================
// 16. NHIỆM VỤ 2
// ======================================================

function resetTask2Display() {

    task2Ready =
        false;


    task2Data =
        [];


    task2Result.hidden =
        true;


    task2TableBody.innerHTML =
        "";


    task2Equation.textContent =
        "—";


    task2MuExperimental.textContent =
        "—";


    task2MuModel.textContent =
        `${getGammaMu("lead").toFixed(3)} mm⁻¹`;


    task2R2.textContent =
        "—";


    task2RelativeError.textContent =
        "—";


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
    task2ExperimentalMu =
    null;


    resetTask3Display();
}


// ======================================================
// LẤY DỮ LIỆU NHIỆM VỤ 1
// ======================================================

function setupTask2() {

    if (
        task1Data.length < 2
    ) {

        alert(
            "Em cần hoàn thành Nhiệm vụ 1 trước để có dữ liệu xử lí."
        );


        task2Status.textContent =
            "Chưa có dữ liệu. Hãy hoàn thành Nhiệm vụ 1 trước.";


        return;
    }


    resetTask2Display();


    const invalidPoint =
        task1Data.find(
            point =>
                point.simulatedRatio <= 0
        );


    if (
        invalidPoint
    ) {

        alert(
            "Có một giá trị I/I₀ bằng 0 nên không thể tính logarit. Hãy chạy lại Nhiệm vụ 1."
        );


        return;
    }


    task2Data =
        task1Data.map(
            point => ({

                x:
                    point.thicknessMm,

                ratio:
                    point.simulatedRatio,

                lnRatio:
                    Math.log(
                        point.simulatedRatio
                    ),

                // Số photon tới đầu dò: dùng làm trọng số hồi quy.
                weight:
                    point.transmitted

            })
        );


    task2Ready =
        true;


    runTask2Button.disabled =
        false;


    task2Status.textContent =
        `Đã lấy ${task2Data.length} điểm dữ liệu từ Nhiệm vụ 1.`;


    setStatus(
        "Nhiệm vụ 2 đã sẵn sàng",
        "ready"
    );
}


// ======================================================
// HỒI QUY TUYẾN TÍNH
//
// y = a + b*x
// ======================================================

function calculateLinearRegression(
    data
) {

    // Hồi quy tuyến tính có trọng số cho y = a + b·x với y = ln(I/I₀).
    // Số photon đếm được N tuân theo phân bố Poisson nên phương sai của
    // ln N xấp xỉ 1/N: điểm có nhiều photon được tin cậy hơn, trọng số w = N.
    // Điểm không có trường "weight" được coi có trọng số 1 (hồi quy thường).

    const weightOf = point =>
        Number.isFinite(point.weight) && point.weight > 0 ? point.weight : 1;

    let sumW = 0;
    let sumX = 0;
    let sumY = 0;
    let sumXX = 0;
    let sumXY = 0;

    for (const point of data) {
        const w = weightOf(point);
        sumW += w;
        sumX += w * point.x;
        sumY += w * point.lnRatio;
        sumXX += w * point.x * point.x;
        sumXY += w * point.x * point.lnRatio;
    }

    const denominator =
        sumW * sumXX - sumX * sumX;

    if (
        data.length < 2 ||
        Math.abs(denominator) < 1e-12
    ) {
        throw new Error(
            "Không thể thực hiện hồi quy tuyến tính với dữ liệu hiện tại."
        );
    }

    const slope =
        (sumW * sumXY - sumX * sumY) / denominator;

    const intercept =
        (sumY - slope * sumX) / sumW;

    const meanY =
        sumY / sumW;

    let ssTotal = 0;
    let ssResidual = 0;

    for (const point of data) {
        const w = weightOf(point);
        const predicted = intercept + slope * point.x;
        ssTotal += w * Math.pow(point.lnRatio - meanY, 2);
        ssResidual += w * Math.pow(point.lnRatio - predicted, 2);
    }

    const rSquared =
        ssTotal > 0 ? 1 - ssResidual / ssTotal : 1;

    // Sai số chuẩn của hệ số góc.
    // Có trọng số Poisson: σ_b = √(Σw / D). Không trọng số: ước lượng từ phần dư.
    const weighted =
        data.every(point => Number.isFinite(point.weight) && point.weight > 0);

    const slopeStandardError =
        weighted
            ? Math.sqrt(sumW / denominator)
            : (data.length > 2
                ? Math.sqrt(ssResidual / (data.length - 2) * sumW / denominator)
                : NaN);

    return {
        slope,
        intercept,
        rSquared,
        slopeStandardError,
        weighted
    };
}


// ======================================================
// ĐỒ THỊ NHIỆM VỤ 2
// ======================================================

function createTask2Chart(
    data,
    regression
) {

    if (
        task2Chart !== null
    ) {

        task2Chart.destroy();
    }


    const experimentalData =
        data.map(
            point => ({

                x:
                    point.x,

                y:
                    point.lnRatio

            })
        );


    const minimumX =
        Math.min(
            ...data.map(
                point =>
                    point.x
            )
        );


    const maximumX =
        Math.max(
            ...data.map(
                point =>
                    point.x
            )
        );


    const regressionLine =
    [
        {

            x:
                minimumX,

            y:
                regression.intercept +
                regression.slope *
                minimumX

        },

        {

            x:
                maximumX,

            y:
                regression.intercept +
                regression.slope *
                maximumX

        }

    ];


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
                                "Dữ liệu ln(I/I₀)",

                            data:
                                experimentalData,

                            borderWidth:
                                0,

                            pointRadius:
                                6,

                            pointHoverRadius:
                                7,

                            showLine:
                                false
                        },


                        {
                            label:
                                "Đường hồi quy tuyến tính",

                            data:
                                regressionLine,

                            borderWidth:
                                3,

                            pointRadius:
                                0,

                            showLine:
                                true
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
                                20,

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

                            title:
                            {

                                display:
                                    true,

                                text:
                                    "ln(I/I₀)"

                            }

                        }

                    }

                }

            }
        );
}


// ======================================================
// CHẠY NHIỆM VỤ 2
// ======================================================

function runTask2() {

    if (
        !task2Ready
        ||
        task2Data.length <
        2
    ) {

        alert(
            "Hãy nhấn “Lấy dữ liệu Nhiệm vụ 1” trước."
        );


        return;
    }


    runTask2Button.disabled =
        true;


    task2Status.textContent =
        "Đang biến đổi và hồi quy dữ liệu...";


    setStatus(
        "Đang xử lí Nhiệm vụ 2...",
        "running"
    );


    try {

        const regression =
            calculateLinearRegression(
                task2Data
            );


        const experimentalMu =
            -regression.slope;

task2ExperimentalMu =
    experimentalMu;

        const modelMu =
            getGammaMu(
                "lead"
            );


        const relativeError =
            Math.abs(
                experimentalMu -
                modelMu
            )
            /
            modelMu *
            100;


        task2TableBody.innerHTML =
            "";


        for (
            const point
            of
            task2Data
        ) {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML =
                `
                <td>
                    ${point.x.toFixed(1)}
                </td>

                <td>
                    ${point.ratio.toFixed(4)}
                </td>

                <td>
                    ${point.lnRatio.toFixed(4)}
                </td>
                `;


            task2TableBody
                .appendChild(
                    row
                );
        }


        createTask2Chart(
            task2Data,
            regression
        );


        const interceptSign =
            regression.intercept >= 0
                ?
                "+"
                :
                "−";


        task2Equation.textContent =
            `y = ${regression.slope.toFixed(4)}x ${interceptSign} ${Math.abs(regression.intercept).toFixed(4)}`;


        task2MuExperimental.textContent =
            Number.isFinite(regression.slopeStandardError)
                ? `${experimentalMu.toFixed(4)} ± ${regression.slopeStandardError.toFixed(4)} mm⁻¹`
                : `${experimentalMu.toFixed(4)} mm⁻¹`;


        task2MuModel.textContent =
            `${modelMu.toFixed(3)} mm⁻¹`;


        task2R2.textContent =
            regression.rSquared.toFixed(
                4
            );


        task2RelativeError.textContent =
            `${relativeError.toFixed(2)} %`;


        task2Conclusion.textContent =
            "Sau khi lấy logarit tự nhiên của I/I₀, các điểm dữ liệu nằm gần một đường thẳng. "
            +
            "Theo ln(I/I₀) = −μx, độ lớn hệ số góc của đường hồi quy cho phép xác định hệ số suy giảm μ. "
            +
            "Hồi quy có trọng số theo số photon đếm được, vì điểm có ít photon có sai số tương đối lớn hơn. "
            +
            "Giá trị thu được dao động quanh μ của mô hình trong phạm vi sai số ± do số photon mô phỏng là hữu hạn.";


        task2Result.hidden =
            false;


        task2Status.textContent =
            "Hoàn thành";

task3Status.textContent =
    "Đã có μ từ Nhiệm vụ 2. Có thể tính bề dày bán giá trị.";

        setStatus(
            "Nhiệm vụ 2 hoàn thành",
            "finished"
        );

    } catch (
        error
    ) {

        console.error(
            error
        );


        task2Status.textContent =
            "Có lỗi khi xử lí dữ liệu.";


        alert(
            error.message
        );

    } finally {

        runTask2Button.disabled =
            false;
    }
}

// ======================================================
// NHIỆM VỤ 3
// BỀ DÀY BÁN GIÁ TRỊ
// ======================================================

function resetTask3Display() {

    task3Ready =
        false;


    task3ExperimentalHvl =
        null;


    task3Result.hidden =
        true;


    task3MuExperimental.textContent =
        "—";


    task3HvlExperimental.textContent =
        "—";


    task3HvlModel.textContent =
        "—";


    task3HvlError.textContent =
        "—";


    task3AverageRatio.textContent =
        "—";


    task3TheoryRatio.textContent =
        "—";


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


// ======================================================
// THIẾT LẬP NHIỆM VỤ 3
// ======================================================

function setupTask3() {

    if (
        !Number.isFinite(
            task2ExperimentalMu
        )
        ||
        task2ExperimentalMu <= 0
    ) {

        alert(
            "Em cần hoàn thành Nhiệm vụ 2 trước để xác định μ."
        );


        task3Status.textContent =
            "Chưa có μ. Hãy hoàn thành Nhiệm vụ 2 trước.";


        return;
    }


    resetTask3Display();


    const modelMu =
        getGammaMu(
            "lead"
        );


    const experimentalHvl =
        calculateHalfValueLayer(
            task2ExperimentalMu
        );


    const modelHvl =
        calculateHalfValueLayer(
            modelMu
        );


    const relativeError =
        Math.abs(
            experimentalHvl -
            modelHvl
        )
        /
        modelHvl *
        100;


    task3ExperimentalHvl =
        experimentalHvl;


    task3MuExperimental.textContent =
        `${task2ExperimentalMu.toFixed(4)} mm⁻¹`;


    task3HvlExperimental.textContent =
        `${experimentalHvl.toFixed(3)} mm`;


    task3HvlModel.textContent =
        `${modelHvl.toFixed(3)} mm`;


    task3HvlError.textContent =
        `${relativeError.toFixed(2)} %`;


    task3Ready =
        true;


    runTask3Button.disabled =
        false;


    task3Result.hidden =
        false;


    task3Status.textContent =
        "Đã tính x₁/₂ từ μ của Nhiệm vụ 2. Có thể chạy mô phỏng kiểm tra.";


    setStatus(
        "Nhiệm vụ 3 đã sẵn sàng",
        "ready"
    );
}


// ======================================================
// MỘT PHÉP KIỂM TRA TẠI x1/2
// ======================================================

function runTask3SingleTrial(
    thicknessMm
) {

    const totalPhotons =
        2000;


    const modelMu =
        getGammaMu(
            "lead"
        );


    const theoreticalRatio =
        calculateGammaTransmission(
            modelMu,
            thicknessMm
        );


    const results =
        buildGammaPhotonResults(
            totalPhotons,
            theoreticalRatio
        );


    const transmitted =
        countGammaTransmitted(
            results
        );


    return {

        totalPhotons,

        transmitted,

        ratio:
            transmitted /
            totalPhotons

    };
}


// ======================================================
// ĐỒ THỊ NHIỆM VỤ 3
// ======================================================

function createTask3Chart(
    trials,
    averageRatio
) {

    if (
        task3Chart !== null
    ) {

        task3Chart.destroy();
    }


    const labels =
        trials.map(
            (
                trial,
                index
            ) =>
                `Lần ${index + 1}`
        );


    labels.push(
        "Trung bình"
    );


    const simulationData =
        trials.map(
            trial =>
                trial.ratio
        );


    simulationData.push(
        averageRatio
    );


    const targetData =
        labels.map(
            () =>
                0.5
        );


    task3Chart =
        new Chart(
            task3ChartCanvas
                .getContext(
                    "2d"
                ),

            {

                type:
                    "line",


                data:
                {

                    labels:
                        labels,


                    datasets:
                    [

                        {
                            label:
                                "I/I₀ mô phỏng",

                            data:
                                simulationData,

                            borderWidth:
                                2,

                            pointRadius:
                                6,

                            pointHoverRadius:
                                7,

                            showLine:
                                false
                        },


                        {
                            label:
                                "Giá trị 0,500",

                            data:
                                targetData,

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


                    scales:
                    {

                        y:
                        {

                            min:
                                0.4,

                            max:
                                0.6,

                            title:
                            {

                                display:
                                    true,

                                text:
                                    "Tỉ lệ I/I₀"

                            }

                        },


                        x:
                        {

                            title:
                            {

                                display:
                                    true,

                                text:
                                    "Các lần mô phỏng"

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

    if (
        !task3Ready
        ||
        !Number.isFinite(
            task3ExperimentalHvl
        )
    ) {

        alert(
            "Hãy nhấn “Tính bề dày bán giá trị” trước."
        );


        return;
    }


    runTask3Button.disabled =
        true;


    task3Status.textContent =
        "Đang kiểm tra bằng 5 phép mô phỏng Monte Carlo...";


    setStatus(
        "Đang chạy Nhiệm vụ 3...",
        "running"
    );


    const numberOfTrials =
        5;


    const trials =
        [];


    for (
        let i = 0;
        i < numberOfTrials;
        i++
    ) {

        trials.push(
            runTask3SingleTrial(
                task3ExperimentalHvl
            )
        );
    }


    let sumRatio =
        0;


    task3TableBody.innerHTML =
        "";


    trials.forEach(
        (
            trial,
            index
        ) => {

            sumRatio +=
                trial.ratio;


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML =
                `
                <td>
                    ${index + 1}
                </td>

                <td>
                    ${trial.totalPhotons}
                </td>

                <td>
                    ${trial.transmitted}
                </td>

                <td>
                    ${trial.ratio.toFixed(4)}
                </td>
                `;


            task3TableBody
                .appendChild(
                    row
                );
        }
    );


    const averageRatio =
        sumRatio /
        numberOfTrials;


    const modelMu =
        getGammaMu(
            "lead"
        );


    const theoryRatio =
        calculateGammaTransmission(
            modelMu,
            task3ExperimentalHvl
        );


    task3AverageRatio.textContent =
        averageRatio.toFixed(
            4
        );


    task3TheoryRatio.textContent =
        theoryRatio.toFixed(
            4
        );


    createTask3Chart(
        trials,
        averageRatio
    );


    const differenceFromHalf =
        Math.abs(
            averageRatio -
            0.5
        );


    task3Conclusion.textContent =
        "Bề dày bán giá trị được tính từ μ xác định trong Nhiệm vụ 2. "
        +
        "Khi mô phỏng bức xạ gamma truyền qua lớp chì có độ dày này, "
        +
        "các giá trị I/I₀ của từng lần dao động do tính ngẫu nhiên, "
        +
        "nhưng giá trị trung bình nằm gần 0,500. "
        +
        `Trong lần kiểm tra này, độ lệch của giá trị trung bình so với 0,500 là ${differenceFromHalf.toFixed(4)}.`;


    task3Status.textContent =
        "Hoàn thành";


    setStatus(
        "Nhiệm vụ 3 hoàn thành",
        "finished"
    );


    runTask3Button.disabled =
        false;
}

// ======================================================
// KIỂM CHỨNG BÀI 7
// ======================================================

function resetValidationDisplay() {

    validationData =
        [];


    validationStatus.textContent =
        "Chưa chạy";


    validationMeanMu.textContent =
        "—";


    validationSdMu.textContent =
        "—";


    validationRelativeError.textContent =
        "—";


    validationMeanR2.textContent =
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
// MÔ PHỎNG NHANH MỘT TỈ LỆ TRUYỀN QUA
//
// Không cần tạo mảng photon vì chế độ kiểm chứng
// không cần animation.
// ======================================================

function simulateValidationRatio(
    totalPhotons,
    probability
) {

    let transmitted =
        0;


    for (
        let i = 0;
        i < totalPhotons;
        i++
    ) {

        if (
            Math.random() <
            probability
        ) {

            transmitted++;
        }
    }


    return (
        transmitted /
        totalPhotons
    );
}


// ======================================================
// TẠO MỘT BỘ DỮ LIỆU MONTE CARLO
// ======================================================

function generateValidationDataset() {

    // Độ dày khảo sát trải tới khoảng 3,6 bề dày bán giảm của chì (x½ ≈ 5,5 mm).
    const thicknessValues =
    [
        0,
        2,
        4,
        6,
        8,
        10,
        12,
        15,
        20
    ];


    const totalPhotons =
        1000;


    const mu =
        getGammaMu(
            "lead"
        );


    const dataset =
        [];


    for (
        const thickness
        of
        thicknessValues
    ) {

        const probability =
            calculateGammaTransmission(
                mu,
                thickness
            );


        const ratio =
            simulateValidationRatio(
                totalPhotons,
                probability
            );


        /*
         * ln(0) không xác định.
         *
         * Với N = 1000 và dải x hiện tại,
         * khả năng ratio = 0 là cực nhỏ.
         * Tuy nhiên vẫn kiểm tra để chương trình an toàn.
         */

        if (
            ratio <= 0
        ) {

            return null;
        }


        dataset.push(
            {

                x:
                    thickness,

                ratio,

                lnRatio:
                    Math.log(
                        ratio
                    ),

                weight:
                    Math.round(ratio * totalPhotons)

            }
        );
    }


    return dataset;
}


// ======================================================
// XÁC ĐỊNH MU TỪ MỘT BỘ DỮ LIỆU
// ======================================================

function estimateMuFromValidationDataset(
    dataset
) {

    const regression =
        calculateLinearRegression(
            dataset
        );


    return {

        mu:
            -regression.slope,

        rSquared:
            regression.rSquared,

        intercept:
            regression.intercept

    };
}


// ======================================================
// TRUNG BÌNH
// ======================================================

function calculateMean(
    values
) {

    if (
        values.length === 0
    ) {

        return NaN;
    }


    let sum =
        0;


    for (
        const value
        of
        values
    ) {

        sum +=
            value;
    }


    return (
        sum /
        values.length
    );
}


// ======================================================
// ĐỘ LỆCH CHUẨN MẪU
// ======================================================

function calculateSampleStandardDeviation(
    values
) {

    if (
        values.length <
        2
    ) {

        return 0;
    }


    const mean =
        calculateMean(
            values
        );


    let sumSquaredDeviation =
        0;


    for (
        const value
        of
        values
    ) {

        sumSquaredDeviation +=
            Math.pow(
                value -
                mean,
                2
            );
    }


    return Math.sqrt(
        sumSquaredDeviation /
        (
            values.length -
            1
        )
    );
}


// ======================================================
// ĐỒ THỊ KIỂM CHỨNG
// ======================================================

function createValidationChart(
    results,
    modelMu
) {

    if (
        validationChart !== null
    ) {

        validationChart.destroy();
    }


    const estimatedMuData =
        results.map(
            (
                result,
                index
            ) => ({

                x:
                    index + 1,

                y:
                    result.mu

            })
        );


    const modelLine =
    [
        {

            x:
                1,

            y:
                modelMu

        },

        {

            x:
                results.length,

            y:
                modelMu

        }

    ];


    /*
     * Xác định giới hạn trục y tự động để
     * đồ thị không bị quá phóng đại hoặc quá bẹt.
     */

    const muValues =
        results.map(
            result =>
                result.mu
        );


    const minimumMu =
        Math.min(
            ...muValues,
            modelMu
        );


    const maximumMu =
        Math.max(
            ...muValues,
            modelMu
        );


    const range =
        Math.max(
            maximumMu -
            minimumMu,
            0.02
        );


    const yMinimum =
        Math.max(
            0,
            minimumMu -
            range *
            0.25
        );


    const yMaximum =
        maximumMu +
        range *
        0.25;


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
                                "μ từ từng bộ dữ liệu",

                            data:
                                estimatedMuData,

                            borderWidth:
                                0,

                            pointRadius:
                                4.5,

                            pointHoverRadius:
                                6,

                            showLine:
                                false
                        },


                        {
                            label:
                                `μ mô hình = ${getGammaMu("lead").toFixed(3).replace(".", ",")} mm⁻¹`,

                            data:
                                modelLine,

                            borderWidth:
                                3,

                            pointRadius:
                                0,

                            showLine:
                                true,

                            borderDash:
                                [
                                    8,
                                    4
                                ]
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
                                1,

                            max:
                                results.length,

                            title:
                            {

                                display:
                                    true,

                                text:
                                    "Số thứ tự bộ dữ liệu"

                            }

                        },


                        y:
                        {

                            min:
                                yMinimum,

                            max:
                                yMaximum,

                            title:
                            {

                                display:
                                    true,

                                text:
                                    "Hệ số suy giảm μ (mm⁻¹)"

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
        repeatCount <
        2
    ) {

        alert(
            "Số bộ dữ liệu kiểm chứng không hợp lệ."
        );


        return;
    }


    validationIsRunning =
        true;


    runValidationButton.disabled =
        true;


    validationResult.hidden =
        true;


    validationTableBody.innerHTML =
        "";


    validationMeanMu.textContent =
        "—";


    validationSdMu.textContent =
        "—";


    validationRelativeError.textContent =
        "—";


    validationMeanR2.textContent =
        "—";


    validationData =
        [];


    const modelMu =
        getGammaMu(
            "lead"
        );


    setStatus(
        "Đang kiểm chứng...",
        "running"
    );


    try {

        for (
            let run = 0;
            run < repeatCount;
            run++
        ) {

            validationStatus.textContent =
                `Đang xử lí bộ ${run + 1}/${repeatCount}...`;


            let dataset =
                generateValidationDataset();


            /*
             * Nếu ngẫu nhiên xuất hiện ratio = 0,
             * tạo lại bộ dữ liệu để tránh ln(0).
             */

            let attempts =
                0;


            while (
                dataset === null
                &&
                attempts <
                10
            ) {

                dataset =
                    generateValidationDataset();


                attempts++;
            }


            if (
                dataset === null
            ) {

                throw new Error(
                    "Không tạo được bộ dữ liệu hợp lệ để hồi quy."
                );
            }


            const estimation =
                estimateMuFromValidationDataset(
                    dataset
                );


            const relativeError =
                Math.abs(
                    estimation.mu -
                    modelMu
                )
                /
                modelMu *
                100;


            validationData.push(
                {

                    run:
                        run + 1,

                    mu:
                        estimation.mu,

                    rSquared:
                        estimation.rSquared,

                    relativeError

                }
            );


            /*
             * Nhường thời gian cho trình duyệt cập nhật giao diện.
             */

            if (
                (run + 1) %
                10 ===
                0
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


        // ==================================================
        // THỐNG KÊ
        // ==================================================

        const muValues =
            validationData.map(
                result =>
                    result.mu
            );


        const rSquaredValues =
            validationData.map(
                result =>
                    result.rSquared
            );


        const meanMu =
            calculateMean(
                muValues
            );


        const sdMu =
            calculateSampleStandardDeviation(
                muValues
            );


        const meanR2 =
            calculateMean(
                rSquaredValues
            );


        const relativeErrorOfMean =
            Math.abs(
                meanMu -
                modelMu
            )
            /
            modelMu *
            100;


        // ==================================================
        // BẢNG
        // ==================================================

        validationTableBody.innerHTML =
            "";


        for (
            const result
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
                    ${result.run}
                </td>

                <td>
                    ${result.mu.toFixed(5)}
                </td>

                <td>
                    ${result.rSquared.toFixed(5)}
                </td>

                <td>
                    ${result.relativeError.toFixed(2)}
                </td>
                `;


            validationTableBody
                .appendChild(
                    row
                );
        }


        // ==================================================
        // HIỂN THỊ THỐNG KÊ
        // ==================================================

        validationMeanMu.textContent =
            `${meanMu.toFixed(5)} mm⁻¹`;


        validationSdMu.textContent =
            `${sdMu.toFixed(5)} mm⁻¹`;


        validationRelativeError.textContent =
            `${relativeErrorOfMean.toFixed(2)} %`;


        validationMeanR2.textContent =
            meanR2.toFixed(
                5
            );


        // ==================================================
        // ĐỒ THỊ
        // ==================================================

        createValidationChart(
            validationData,
            modelMu
        );


        validationResult.hidden =
            false;


        validationStatus.textContent =
            `Hoàn thành ${repeatCount} bộ dữ liệu`;


        validationConclusion.textContent =
            `Sau ${repeatCount} bộ dữ liệu Monte Carlo độc lập, `
            +
            `giá trị μ trung bình thu được là ${meanMu.toFixed(5)} mm⁻¹, `
            +
            `so với μ của mô hình là ${modelMu.toFixed(3)} mm⁻¹. `
            +
            `Độ lệch chuẩn của các giá trị μ là ${sdMu.toFixed(5)} mm⁻¹ `
            +
            `và sai lệch tương đối của giá trị trung bình là ${relativeErrorOfMean.toFixed(2)} %. `
            +
            `Các giá trị μ riêng lẻ dao động do tính ngẫu nhiên của quá trình Monte Carlo, `
            +
            `nhưng tập hợp kết quả có xu hướng phân bố quanh giá trị của mô hình.`;


        setStatus(
            "Kiểm chứng hoàn thành",
            "finished"
        );

    } catch (
        error
    ) {

        console.error(
            error
        );


        validationStatus.textContent =
            "Có lỗi khi kiểm chứng";


        alert(
            error.message
        );


        setStatus(
            "Kiểm chứng gặp lỗi",
            "ready"
        );

    } finally {

        validationIsRunning =
            false;


        runValidationButton.disabled =
            false;
    }
}

// ======================================================
// 17. CHUYỂN CHẾ ĐỘ
// ======================================================

function setMode(
    mode
) {

    stopGammaAnimation();


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


    materialSelect.value =
        "lead";


    updateAdvancedInfo();


    setStatus(
        "Sẵn sàng kiểm chứng",
        "ready"
    );
}
}


// ======================================================
// 18. EVENT LISTENER
// ======================================================

materialSelect.addEventListener(
    "change",

    () => {

        stopGammaAnimation();


        lastExperimentalPoint =
            null;


        clearResults();


        updateAdvancedInfo();


        drawStaticScene();


        createOrUpdateChart();
    }
);


thicknessInput.addEventListener(
    "input",

    () => {

        stopGammaAnimation();


        updateThicknessLabel();


        updateAdvancedInfo();


        drawStaticScene();
    }
);


photonCountInput.addEventListener(
    "change",

    () => {

        clearResults();
    }
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
// 19. KHỞI TẠO
// ======================================================

updateThicknessLabel();


updateAdvancedInfo();


clearResults();


drawStaticScene();


createOrUpdateChart();


resetTask2Display();


resetTask1Display();

resetValidationDisplay();

setMode(
    "explore"
);