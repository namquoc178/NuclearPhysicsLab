console.log(
    "APP.JS - NUCLEAR FISSION TASK 2 VERSION 3"
);


// ======================================================
// DOM AN TOÀN
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
// DOM - KHÁM PHÁ
// ======================================================

const fissionChannelSelect =
    getRequiredElement(
        "fissionChannelSelect"
    );


const startButton =
    getRequiredElement(
        "startButton"
    );


const pauseButton =
    getRequiredElement(
        "pauseButton"
    );


const resetButton =
    getRequiredElement(
        "resetButton"
    );


const speedSelect =
    getRequiredElement(
        "speedSelect"
    );


const fissionCanvas =
    getRequiredElement(
        "fissionCanvas"
    );


const ctx =
    fissionCanvas.getContext(
        "2d"
    );


const stageDescription =
    getRequiredElement(
        "stageDescription"
    );


const statusBadge =
    getRequiredElement(
        "statusBadge"
    );


const initialADisplay =
    getRequiredElement(
        "initialADisplay"
    );


const finalADisplay =
    getRequiredElement(
        "finalADisplay"
    );


const initialZDisplay =
    getRequiredElement(
        "initialZDisplay"
    );


const finalZDisplay =
    getRequiredElement(
        "finalZDisplay"
    );


const massDifferenceDisplay =
    getRequiredElement(
        "massDifferenceDisplay"
    );


const qValueDisplay =
    getRequiredElement(
        "qValueDisplay"
    );


const massConservationStatus =
    getRequiredElement(
        "massConservationStatus"
    );


const chargeConservationStatus =
    getRequiredElement(
        "chargeConservationStatus"
    );


// ======================================================
// DOM - CHẾ ĐỘ
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
// DOM - NHIỆM VỤ 1
// ======================================================

const task1InitialAInput =
    getRequiredElement(
        "task1InitialAInput"
    );


const task1FinalAInput =
    getRequiredElement(
        "task1FinalAInput"
    );


const task1InitialZInput =
    getRequiredElement(
        "task1InitialZInput"
    );


const task1FinalZInput =
    getRequiredElement(
        "task1FinalZInput"
    );


const task1InitialAFeedback =
    getRequiredElement(
        "task1InitialAFeedback"
    );


const task1FinalAFeedback =
    getRequiredElement(
        "task1FinalAFeedback"
    );


const task1InitialZFeedback =
    getRequiredElement(
        "task1InitialZFeedback"
    );


const task1FinalZFeedback =
    getRequiredElement(
        "task1FinalZFeedback"
    );


const task1ConservationSelect =
    getRequiredElement(
        "task1ConservationSelect"
    );


const task1ConservationFeedback =
    getRequiredElement(
        "task1ConservationFeedback"
    );


const task1NeutronSelect =
    getRequiredElement(
        "task1NeutronSelect"
    );


const task1NeutronFeedback =
    getRequiredElement(
        "task1NeutronFeedback"
    );


const checkTask1Button =
    getRequiredElement(
        "checkTask1Button"
    );


const resetTask1Button =
    getRequiredElement(
        "resetTask1Button"
    );


const task1Status =
    getRequiredElement(
        "task1Status"
    );


const task1Result =
    getRequiredElement(
        "task1Result"
    );


const task1CorrectInitialA =
    getRequiredElement(
        "task1CorrectInitialA"
    );


const task1CorrectFinalA =
    getRequiredElement(
        "task1CorrectFinalA"
    );


const task1CorrectInitialZ =
    getRequiredElement(
        "task1CorrectInitialZ"
    );


const task1CorrectFinalZ =
    getRequiredElement(
        "task1CorrectFinalZ"
    );


const task1Solution =
    getRequiredElement(
        "task1Solution"
    );


const task1Conclusion =
    getRequiredElement(
        "task1Conclusion"
    );


// ======================================================
// DOM - NHIỆM VỤ 2
// ======================================================

const task2InitialMassInput =
    getRequiredElement(
        "task2InitialMassInput"
    );


const task2FinalMassInput =
    getRequiredElement(
        "task2FinalMassInput"
    );


const task2MassDifferenceInput =
    getRequiredElement(
        "task2MassDifferenceInput"
    );


const task2QValueInput =
    getRequiredElement(
        "task2QValueInput"
    );


const task2InitialMassFeedback =
    getRequiredElement(
        "task2InitialMassFeedback"
    );


const task2FinalMassFeedback =
    getRequiredElement(
        "task2FinalMassFeedback"
    );


const task2MassDifferenceFeedback =
    getRequiredElement(
        "task2MassDifferenceFeedback"
    );


const task2QValueFeedback =
    getRequiredElement(
        "task2QValueFeedback"
    );


const task2EnergyMeaningSelect =
    getRequiredElement(
        "task2EnergyMeaningSelect"
    );


const task2EnergyMeaningFeedback =
    getRequiredElement(
        "task2EnergyMeaningFeedback"
    );


const checkTask2Button =
    getRequiredElement(
        "checkTask2Button"
    );


const resetTask2Button =
    getRequiredElement(
        "resetTask2Button"
    );


const task2Status =
    getRequiredElement(
        "task2Status"
    );


const task2Result =
    getRequiredElement(
        "task2Result"
    );


const task2CorrectInitialMass =
    getRequiredElement(
        "task2CorrectInitialMass"
    );


const task2CorrectFinalMass =
    getRequiredElement(
        "task2CorrectFinalMass"
    );


const task2CorrectMassDifference =
    getRequiredElement(
        "task2CorrectMassDifference"
    );


const task2CorrectQValue =
    getRequiredElement(
        "task2CorrectQValue"
    );


const task2InitialMassBar =
    getRequiredElement(
        "task2InitialMassBar"
    );


const task2FinalMassBar =
    getRequiredElement(
        "task2FinalMassBar"
    );


const task2InitialMassBarLabel =
    getRequiredElement(
        "task2InitialMassBarLabel"
    );


const task2FinalMassBarLabel =
    getRequiredElement(
        "task2FinalMassBarLabel"
    );


const task2Solution =
    getRequiredElement(
        "task2Solution"
    );


const task2Conclusion =
    getRequiredElement(
        "task2Conclusion"
    );


// ======================================================
// DỮ LIỆU PHẢN ỨNG
// ======================================================

const currentFissionChannel =
    getFissionChannelById(
        "U235-Ba141-Kr92-3n"
    );


if (
    !currentFissionChannel
) {

    throw new Error(
        "Không tìm thấy kênh phân hạch."
    );
}


const currentFissionProperties =
    calculateFissionChannelProperties(
        currentFissionChannel
    );


// ======================================================
// MÔ TẢ GIAI ĐOẠN
// ======================================================

const STAGE_DESCRIPTIONS =
[
    "Một neutron đang chuyển động về phía hạt nhân U-235.",

    "Neutron đã tới gần và được U-235 hấp thụ.",

    "Hình thành hạt nhân hợp phần kích thích U-236*.",

    "Hạt nhân kích thích biến dạng trước khi phân hạch.",

    "Hạt nhân tách thành hai mảnh phân hạch.",

    "Ba neutron thứ cấp được phát ra cùng với hai mảnh phân hạch."
];


// ======================================================
// THỜI GIAN ANIMATION HIỆN TẠI
// ======================================================

let lastAnimationTime =
    0;


// ======================================================
// TRẠNG THÁI
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
// CHỈ BÁO GIAI ĐOẠN
// ======================================================

function updateStageIndicator(
    stage
) {

    const items =
        document.querySelectorAll(
            ".stage-item"
        );


    items.forEach(
        item => {

            const itemStage =
                Number(
                    item.dataset.stage
                );


            item.classList.toggle(
                "active",
                itemStage === stage
            );
        }
    );


    stageDescription.textContent =
        STAGE_DESCRIPTIONS[
            stage
        ];
}


// ======================================================
// VẼ NEUTRON
// ======================================================

function drawNeutron(
    x,
    y,
    radius = 10
) {

    ctx.beginPath();


    ctx.arc(
        x,
        y,
        radius,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        "#2563eb";


    ctx.fill();


    ctx.strokeStyle =
        "#1e3a8a";


    ctx.lineWidth =
        1.5;


    ctx.stroke();
}


// ======================================================
// VẼ HẠT NHÂN
// ======================================================

function drawNucleusCircle(
    x,
    y,
    radius,
    fillColor,
    label,
    secondaryLabel = ""
) {

    ctx.beginPath();


    ctx.arc(
        x,
        y,
        radius,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        fillColor;


    ctx.fill();


    ctx.strokeStyle =
        "#475569";


    ctx.lineWidth =
        2;


    ctx.stroke();


    ctx.textAlign =
        "center";


    ctx.fillStyle =
        "#0f172a";


    ctx.font =
        "bold 22px Arial";


    ctx.fillText(
        label,
        x,
        y + 4
    );


    if (
        secondaryLabel !==
        ""
    ) {

        ctx.font =
            "14px Arial";


        ctx.fillStyle =
            "#475569";


        ctx.fillText(
            secondaryLabel,
            x,
            y + 27
        );
    }
}


// ======================================================
// HẠT NHÂN BIẾN DẠNG
// ======================================================

function drawDeformedNucleus(
    x,
    y,
    progress
) {

    const widthRadius =
        72 +
        progress * 55;


    const heightRadius =
        72 -
        progress * 22;


    ctx.save();


    ctx.translate(
        x,
        y
    );


    ctx.scale(
        widthRadius / 72,
        heightRadius / 72
    );


    ctx.beginPath();


    ctx.arc(
        0,
        0,
        72,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        "#fde68a";


    ctx.fill();


    ctx.strokeStyle =
        "#92400e";


    ctx.lineWidth =
        2;


    ctx.stroke();


    ctx.restore();


    ctx.textAlign =
        "center";


    ctx.fillStyle =
        "#0f172a";


    ctx.font =
        "bold 22px Arial";


    ctx.fillText(
        "U-236*",
        x,
        y + 6
    );
}


// ======================================================
// NHÃN TRÊN CANVAS
// ======================================================

function drawTopLabel(
    text
) {

    ctx.textAlign =
        "center";


    ctx.font =
        "bold 20px Arial";


    ctx.fillStyle =
        "#0f172a";


    ctx.fillText(
        text,
        fissionCanvas.width / 2,
        38
    );
}


// ======================================================
// GIAI ĐOẠN 0
// ======================================================

function drawStage0(
    progress
) {

    drawTopLabel(
        "Neutron tiến tới U-235"
    );


    const targetX =
        620;


    const targetY =
        250;


    const neutronX =
        110 +
        (
            490 - 110
        )
        *
        progress;


    drawNucleusCircle(
        targetX,
        targetY,
        82,
        "#dbeafe",
        "U-235"
    );


    drawNeutron(
        neutronX,
        targetY,
        11
    );


    ctx.strokeStyle =
        "#94a3b8";


    ctx.setLineDash(
        [
            6,
            6
        ]
    );


    ctx.beginPath();


    ctx.moveTo(
        neutronX + 18,
        targetY
    );


    ctx.lineTo(
        targetX - 95,
        targetY
    );


    ctx.stroke();


    ctx.setLineDash(
        []
    );
}


// ======================================================
// GIAI ĐOẠN 1
// ======================================================

function drawStage1(
    progress
) {

    drawTopLabel(
        "U-235 hấp thụ neutron"
    );


    const centerX =
        540;


    const centerY =
        250;


    const neutronX =
        430 +
        95 *
        progress;


    drawNucleusCircle(
        centerX,
        centerY,
        82,
        "#dbeafe",
        "U-235"
    );


    if (
        progress <
        0.9
    ) {

        drawNeutron(
            neutronX,
            centerY,
            11
        );
    }


    ctx.textAlign =
        "center";


    ctx.font =
        "16px Arial";


    ctx.fillStyle =
        "#475569";


    ctx.fillText(
        "Hấp thụ neutron",
        centerX,
        370
    );
}


// ======================================================
// GIAI ĐOẠN 2
// ======================================================

function drawStage2(
    progress
) {

    drawTopLabel(
        "Hình thành trạng thái kích thích U-236*"
    );


    const centerX =
        450;


    const centerY =
        250;


    const pulse =
        1 +
        0.04 *
        Math.sin(
            progress *
            Math.PI *
            5
        );


    ctx.save();


    ctx.translate(
        centerX,
        centerY
    );


    ctx.scale(
        pulse,
        pulse
    );


    drawNucleusCircle(
        0,
        0,
        88,
        "#fef3c7",
        "U-236*",
        "trạng thái kích thích"
    );


    ctx.restore();
}


// ======================================================
// GIAI ĐOẠN 3
// ======================================================

function drawStage3(
    progress
) {

    drawTopLabel(
        "Hạt nhân U-236* biến dạng"
    );


    drawDeformedNucleus(
        450,
        250,
        progress
    );


    ctx.textAlign =
        "center";


    ctx.font =
        "15px Arial";


    ctx.fillStyle =
        "#475569";


    ctx.fillText(
        "Biến dạng tăng dần",
        450,
        390
    );
}


// ======================================================
// GIAI ĐOẠN 4
// ======================================================

function drawStage4(
    progress
) {

    drawTopLabel(
        "Hạt nhân tách thành hai mảnh"
    );


    const centerX =
        450;


    const centerY =
        250;


    const separation =
        40 +
        145 *
        progress;


    const leftX =
        centerX -
        separation;


    const rightX =
        centerX +
        separation;


    drawNucleusCircle(
        leftX,
        centerY,
        68,
        "#fee2e2",
        "Ba-141"
    );


    drawNucleusCircle(
        rightX,
        centerY,
        58,
        "#dcfce7",
        "Kr-92"
    );


    if (
        progress <
        0.7
    ) {

        ctx.strokeStyle =
            "#f59e0b";


        ctx.lineWidth =
            3;


        ctx.beginPath();


        ctx.moveTo(
            leftX + 65,
            centerY
        );


        ctx.lineTo(
            rightX - 55,
            centerY
        );


        ctx.stroke();
    }
}


// ======================================================
// GIAI ĐOẠN 5
// ======================================================

function drawStage5(
    progress
) {

    drawTopLabel(
        "Sản phẩm phân hạch và neutron thứ cấp"
    );


    const centerX =
        450;


    const centerY =
        250;


    const fragmentTravel =
        40 *
        progress;


    drawNucleusCircle(
        270 -
        fragmentTravel,
        centerY,
        68,
        "#fee2e2",
        "Ba-141"
    );


    drawNucleusCircle(
        630 +
        fragmentTravel,
        centerY,
        58,
        "#dcfce7",
        "Kr-92"
    );


    const neutronDistance =
        95 +
        95 *
        progress;


    drawNeutron(
        centerX,
        centerY -
        neutronDistance,
        10
    );


    drawNeutron(
        centerX -
        neutronDistance *
        0.75,
        centerY +
        neutronDistance *
        0.55,
        10
    );


    drawNeutron(
        centerX +
        neutronDistance *
        0.75,
        centerY +
        neutronDistance *
        0.55,
        10
    );


    ctx.textAlign =
        "center";


    ctx.font =
        "bold 18px Arial";


    ctx.fillStyle =
        "#92400e";


    ctx.fillText(
        `Q ≈ ${currentFissionProperties.qValueMeV.toFixed(2)} MeV`,
        centerX,
        450
    );
}


// ======================================================
// VẼ FRAME
// ======================================================

function drawFissionFrame(
    time
) {

    lastAnimationTime =
        time;


    ctx.clearRect(
        0,
        0,
        fissionCanvas.width,
        fissionCanvas.height
    );


    ctx.fillStyle =
        "#f8fbff";


    ctx.fillRect(
        0,
        0,
        fissionCanvas.width,
        fissionCanvas.height
    );


    const stage =
        getFissionStageFromTime(
            time
        );


    const progress =
        calculateStageProgress(
            time,
            stage
        );


    updateStageIndicator(
        stage
    );


    if (
        stage === 0
    ) {

        drawStage0(
            progress
        );
    }


    if (
        stage === 1
    ) {

        drawStage1(
            progress
        );
    }


    if (
        stage === 2
    ) {

        drawStage2(
            progress
        );
    }


    if (
        stage === 3
    ) {

        drawStage3(
            progress
        );
    }


    if (
        stage === 4
    ) {

        drawStage4(
            progress
        );
    }


    if (
        stage === 5
    ) {

        drawStage5(
            progress
        );
    }
}


// ======================================================
// KẾT QUẢ KHÁM PHÁ
// ======================================================

function showFinalResults() {

    initialADisplay.textContent =
        String(
            currentFissionProperties.initialA
        );


    finalADisplay.textContent =
        String(
            currentFissionProperties.finalA
        );


    initialZDisplay.textContent =
        String(
            currentFissionProperties.initialZ
        );


    finalZDisplay.textContent =
        String(
            currentFissionProperties.finalZ
        );


    massDifferenceDisplay.textContent =
        `${currentFissionProperties.massDifferenceU.toFixed(6)} u`;


    qValueDisplay.textContent =
        `${currentFissionProperties.qValueMeV.toFixed(3)} MeV`;


    massConservationStatus.textContent =
        currentFissionProperties.massNumberConserved
            ?
            `✓ Bảo toàn A: ${currentFissionProperties.initialA} = ${currentFissionProperties.finalA}`
            :
            "Cần kiểm tra bảo toàn A";


    chargeConservationStatus.textContent =
        currentFissionProperties.atomicNumberConserved
            ?
            `✓ Bảo toàn Z: ${currentFissionProperties.initialZ} = ${currentFissionProperties.finalZ}`
            :
            "Cần kiểm tra bảo toàn Z";
}


// ======================================================
// XÓA KẾT QUẢ KHÁM PHÁ
// ======================================================

function clearResults() {

    initialADisplay.textContent =
        "—";


    finalADisplay.textContent =
        "—";


    initialZDisplay.textContent =
        "—";


    finalZDisplay.textContent =
        "—";


    massDifferenceDisplay.textContent =
        "—";


    qValueDisplay.textContent =
        "—";


    massConservationStatus.textContent =
        "Bảo toàn A: —";


    chargeConservationStatus.textContent =
        "Bảo toàn Z: —";
}


// ======================================================
// ANIMATION LOOP
// ======================================================

function animationLoop(
    timestamp
) {

    if (
        !fissionAnimationRunning
        ||
        fissionAnimationPaused
    ) {

        return;
    }


    if (
        fissionAnimationStartTime ===
        null
    ) {

        fissionAnimationStartTime =
            timestamp;
    }


    const currentTime =
        fissionElapsedTime
        +
        (
            timestamp -
            fissionAnimationStartTime
        )
        /
        1000
        *
        fissionSpeed;


    drawFissionFrame(
        currentTime
    );


    const finalTime =
        FISSION_STAGE_TIMES[
            FISSION_STAGE_TIMES.length - 1
        ];


    if (
        currentTime >=
        finalTime
    ) {

        fissionElapsedTime =
            finalTime;


        fissionAnimationRunning =
            false;


        fissionAnimationPaused =
            false;


        drawFissionFrame(
            finalTime
        );


        showFinalResults();


        stageDescription.textContent =
            "Phân hạch hoàn thành: hai mảnh phân hạch và ba neutron thứ cấp đã được tạo thành.";


        setStatus(
            "Mô phỏng hoàn thành",
            "finished"
        );


        return;
    }


    fissionAnimationFrameId =
        requestAnimationFrame(
            animationLoop
        );
}


// ======================================================
// BẮT ĐẦU
// ======================================================

function startSimulation() {

    const finalTime =
        FISSION_STAGE_TIMES[
            FISSION_STAGE_TIMES.length - 1
        ];


    if (
        fissionElapsedTime >=
        finalTime
    ) {

        resetSimulation();
    }


    if (
        fissionAnimationPaused
    ) {

        fissionElapsedTime =
            lastAnimationTime;
    }


    fissionSpeed =
        Number(
            speedSelect.value
        );


    fissionAnimationRunning =
        true;


    fissionAnimationPaused =
        false;


    fissionAnimationStartTime =
        null;


    setStatus(
        "Đang mô phỏng",
        "running"
    );


    stopFissionAnimationFrame();


    fissionAnimationFrameId =
        requestAnimationFrame(
            animationLoop
        );
}


// ======================================================
// TẠM DỪNG
// ======================================================

function pauseSimulation() {

    if (
        !fissionAnimationRunning
        ||
        fissionAnimationPaused
    ) {

        return;
    }


    fissionElapsedTime =
        lastAnimationTime;


    fissionAnimationPaused =
        true;


    fissionAnimationRunning =
        false;


    stopFissionAnimationFrame();


    setStatus(
        "Đang tạm dừng",
        "ready"
    );
}


// ======================================================
// RESET KHÁM PHÁ
// ======================================================

function resetSimulation() {

    stopFissionAnimationFrame();


    fissionAnimationRunning =
        false;


    fissionAnimationPaused =
        false;


    fissionAnimationStartTime =
        null;


    fissionElapsedTime =
        0;


    lastAnimationTime =
        0;


    clearResults();


    drawFissionFrame(
        0
    );


    stageDescription.textContent =
        "Sẵn sàng bắt đầu mô phỏng.";


    setStatus(
        "Sẵn sàng",
        "ready"
    );
}


// ======================================================
// HÀM DÙNG CHUNG CHO NHIỆM VỤ
// ======================================================

function parseStudentNumber(
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


function clearFeedbackElement(
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


function evaluateNumericAnswer(
    studentValue,
    expectedValue,
    tolerance,
    feedbackElement
) {

    clearFeedbackElement(
        feedbackElement
    );


    if (
        !Number.isFinite(
            studentValue
        )
    ) {

        feedbackElement.textContent =
            "Chưa có giá trị hợp lệ.";


        feedbackElement.classList.add(
            "invalid"
        );


        return false;
    }


    const difference =
        Math.abs(
            studentValue -
            expectedValue
        );


    if (
        difference <=
        tolerance
    ) {

        feedbackElement.textContent =
            "✓ Kết quả phù hợp.";


        feedbackElement.classList.add(
            "correct"
        );


        return true;
    }


    feedbackElement.textContent =
        "Cần kiểm tra lại phép tính hoặc cách làm tròn.";


    feedbackElement.classList.add(
        "review"
    );


    return false;
}


function evaluateChoice(
    selectedValue,
    expectedValue,
    feedbackElement
) {

    clearFeedbackElement(
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
        "Hãy đối chiếu lại dữ liệu và công thức.";


    feedbackElement.classList.add(
        "review"
    );


    return false;
}


// ======================================================
// NHIỆM VỤ 1
// ======================================================

function clearTask1Feedback() {

    const elements =
    [
        task1InitialAFeedback,
        task1FinalAFeedback,
        task1InitialZFeedback,
        task1FinalZFeedback,
        task1ConservationFeedback,
        task1NeutronFeedback
    ];


    for (
        const element
        of
        elements
    ) {

        clearFeedbackElement(
            element
        );
    }
}


function evaluateTask1Integer(
    inputElement,
    expectedValue,
    feedbackElement
) {

    const value =
        Number(
            inputElement.value
        );


    return evaluateNumericAnswer(
        inputElement.value.trim() === ""
            ?
            NaN
            :
            value,

        expectedValue,

        0,

        feedbackElement
    );
}


function showTask1Solution() {

    const p =
        currentFissionProperties;


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


    task1Solution.innerHTML =
        `
        <p>
            <strong>Số nucleon trước phản ứng:</strong>
            A<sub>trước</sub>
            = 235 + 1
            = ${p.initialA}.
        </p>

        <p>
            <strong>Số nucleon sau phản ứng:</strong>
            A<sub>sau</sub>
            = 141 + 92 + 3 × 1
            = ${p.finalA}.
        </p>

        <p>
            Vì ${p.initialA} = ${p.finalA},
            số nucleon được bảo toàn.
        </p>

        <p>
            <strong>Điện tích trước:</strong>
            Z<sub>trước</sub>
            = 92 + 0
            = ${p.initialZ}.
        </p>

        <p>
            <strong>Điện tích sau:</strong>
            Z<sub>sau</sub>
            = 56 + 36 + 3 × 0
            = ${p.finalZ}.
        </p>

        <p>
            Vì ${p.initialZ} = ${p.finalZ},
            điện tích được bảo toàn.
        </p>

        <p>
            Neutron có A = 1 nhưng Z = 0,
            nên góp vào tổng số nucleon
            nhưng không góp vào tổng điện tích.
        </p>
        `;
}


function checkTask1() {

    const p =
        currentFissionProperties;


    const result1 =
        evaluateTask1Integer(
            task1InitialAInput,
            p.initialA,
            task1InitialAFeedback
        );


    const result2 =
        evaluateTask1Integer(
            task1FinalAInput,
            p.finalA,
            task1FinalAFeedback
        );


    const result3 =
        evaluateTask1Integer(
            task1InitialZInput,
            p.initialZ,
            task1InitialZFeedback
        );


    const result4 =
        evaluateTask1Integer(
            task1FinalZInput,
            p.finalZ,
            task1FinalZFeedback
        );


    const result5 =
        evaluateChoice(
            task1ConservationSelect.value,
            "both",
            task1ConservationFeedback
        );


    const result6 =
        evaluateChoice(
            task1NeutronSelect.value,
            "correct",
            task1NeutronFeedback
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
            "Các kết quả đều phù hợp. "
            +
            "Trong kênh phân hạch đang xét, "
            +
            "tổng số nucleon A và tổng điện tích Z đều được bảo toàn.";

    } else {

        task1Conclusion.textContent =
            "Hãy đối chiếu lại các phép tính. "
            +
            "Cần cộng số khối A và số điện tích Z "
            +
            "của tất cả các hạt ở mỗi phía.";
    }


    setStatus(
        "Đã kiểm tra Nhiệm vụ 1",
        "finished"
    );
}


function resetTask1() {

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


    task1NeutronSelect.value =
        "";


    clearTask1Feedback();


    task1Result.hidden =
        true;


    task1Status.textContent =
        "Chờ học sinh thực hiện";
}


// ======================================================
// NHIỆM VỤ 2
// ======================================================

function clearTask2Feedback() {

    const elements =
    [
        task2InitialMassFeedback,
        task2FinalMassFeedback,
        task2MassDifferenceFeedback,
        task2QValueFeedback,
        task2EnergyMeaningFeedback
    ];


    for (
        const element
        of
        elements
    ) {

        clearFeedbackElement(
            element
        );
    }
}


// ======================================================
// HIỂN THỊ SO SÁNH KHỐI LƯỢNG
// ======================================================

function updateTask2MassComparison() {

    const p =
        currentFissionProperties;


    task2InitialMassBar.style.width =
        "100%";


    /*
     * Hai khối lượng chỉ khác nhau khoảng 0,08%.
     * Nếu vẽ đúng cùng thang, hai thanh gần như bằng nhau.
     */

    const ratio =
        p.finalMassU /
        p.initialMassU;


    task2FinalMassBar.style.width =
        `${ratio * 100}%`;


    task2InitialMassBarLabel.textContent =
        `${p.initialMassU.toFixed(9)} u`;


    task2FinalMassBarLabel.textContent =
        `${p.finalMassU.toFixed(9)} u`;
}


// ======================================================
// LỜI GIẢI NHIỆM VỤ 2
// ======================================================

function showTask2Solution() {

    const p =
        currentFissionProperties;


    task2CorrectInitialMass.textContent =
        `${p.initialMassU.toFixed(9)} u`;


    task2CorrectFinalMass.textContent =
        `${p.finalMassU.toFixed(9)} u`;


    task2CorrectMassDifference.textContent =
        `${p.massDifferenceU.toFixed(9)} u`;


    task2CorrectQValue.textContent =
        `${p.qValueMeV.toFixed(3)} MeV`;


    updateTask2MassComparison();


    task2Solution.innerHTML =
        `
        <p>
            <strong>Bước 1. Khối lượng trước phản ứng:</strong>
        </p>

        <p>
            m<sub>trước</sub>
            =
            m(<sup>235</sup>U)
            +
            m<sub>n</sub>
        </p>

        <p>
            =
            235.0439301
            +
            ${NEUTRON_MASS_U}
            =
            ${p.initialMassU.toFixed(11)} u.
        </p>


        <p>
            <strong>Bước 2. Khối lượng sau phản ứng:</strong>
        </p>

        <p>
            m<sub>sau</sub>
            =
            m(<sup>141</sup>Ba)
            +
            m(<sup>92</sup>Kr)
            +
            3m<sub>n</sub>
        </p>

        <p>
            =
            140.9144033
            +
            91.9261731
            +
            3 × ${NEUTRON_MASS_U}
        </p>

        <p>
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
// KIỂM TRA NHIỆM VỤ 2
// ======================================================

function checkTask2() {

    const p =
        currentFissionProperties;


    const studentInitialMass =
        parseStudentNumber(
            task2InitialMassInput.value
        );


    const studentFinalMass =
        parseStudentNumber(
            task2FinalMassInput.value
        );


    const studentMassDifference =
        parseStudentNumber(
            task2MassDifferenceInput.value
        );


    const studentQValue =
        parseStudentNumber(
            task2QValueInput.value
        );


    /*
     * Cho phép học sinh làm tròn hợp lý:
     *
     * khối lượng trước/sau: ±0.0005 u
     * Δm: ±0.0005 u
     * Q: ±0.5 MeV
     */

    const result1 =
        evaluateNumericAnswer(
            studentInitialMass,
            p.initialMassU,
            0.0005,
            task2InitialMassFeedback
        );


    const result2 =
        evaluateNumericAnswer(
            studentFinalMass,
            p.finalMassU,
            0.0005,
            task2FinalMassFeedback
        );


    const result3 =
        evaluateNumericAnswer(
            studentMassDifference,
            p.massDifferenceU,
            0.0005,
            task2MassDifferenceFeedback
        );


    const result4 =
        evaluateNumericAnswer(
            studentQValue,
            p.qValueMeV,
            0.5,
            task2QValueFeedback
        );


    const result5 =
        evaluateChoice(
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
            result5
        ].filter(
            value =>
                value
        ).length;


    showTask2Solution();


    task2Result.hidden =
        false;


    task2Status.textContent =
        `Đã kiểm tra: ${correctCount}/5 nội dung phù hợp.`;


    if (
        correctCount ===
        5
    ) {

        task2Conclusion.textContent =
            `Các kết quả đều phù hợp. `
            +
            `Với kênh phân hạch đang xét, tổng khối lượng sau phản ứng `
            +
            `nhỏ hơn tổng khối lượng trước khoảng `
            +
            `${p.massDifferenceU.toFixed(6)} u. `
            +
            `Chênh lệch đó tương ứng với Q ≈ `
            +
            `${p.qValueMeV.toFixed(3)} MeV.`;

    } else {

        task2Conclusion.textContent =
            "Hãy đối chiếu lại các bước tính. "
            +
            "Cần tính đầy đủ khối lượng của ba neutron ở phía sản phẩm, "
            +
            "sau đó lấy khối lượng trước trừ khối lượng sau. "
            +
            "Nếu Δm > 0 thì Q > 0 và phản ứng tỏa năng lượng.";
    }


    setStatus(
        "Đã kiểm tra Nhiệm vụ 2",
        "finished"
    );
}


// ======================================================
// RESET NHIỆM VỤ 2
// ======================================================

function resetTask2() {

    task2InitialMassInput.value =
        "";


    task2FinalMassInput.value =
        "";


    task2MassDifferenceInput.value =
        "";


    task2QValueInput.value =
        "";


    task2EnergyMeaningSelect.value =
        "";


    clearTask2Feedback();


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
// CHUYỂN CHẾ ĐỘ
// ======================================================

function setMode(
    mode
) {

    exploreModeButton.classList.remove(
        "active"
    );


    experimentModeButton.classList.remove(
        "active"
    );


    validationModeButton.classList.remove(
        "active"
    );


    explorePanel.classList.remove(
        "active"
    );


    experimentPanel.classList.remove(
        "active"
    );


    validationPanel.classList.remove(
        "active"
    );


    if (
        mode ===
        "explore"
    ) {

        exploreModeButton.classList.add(
            "active"
        );


        explorePanel.classList.add(
            "active"
        );


        setStatus(
            "Sẵn sàng khám phá",
            "ready"
        );
    }


    if (
        mode ===
        "experiment"
    ) {

        experimentModeButton.classList.add(
            "active"
        );


        experimentPanel.classList.add(
            "active"
        );


        setStatus(
            "Chọn một nhiệm vụ thí nghiệm",
            "ready"
        );
    }


    if (
        mode ===
        "validation"
    ) {

        validationModeButton.classList.add(
            "active"
        );


        validationPanel.classList.add(
            "active"
        );


        setStatus(
            "Chế độ kiểm chứng",
            "ready"
        );
    }
}


// ======================================================
// EVENT - KHÁM PHÁ
// ======================================================

startButton.addEventListener(
    "click",
    startSimulation
);


pauseButton.addEventListener(
    "click",
    pauseSimulation
);


resetButton.addEventListener(
    "click",
    resetSimulation
);


speedSelect.addEventListener(
    "change",

    () => {

        fissionSpeed =
            Number(
                speedSelect.value
            );
    }
);


// ======================================================
// EVENT - CHẾ ĐỘ
// ======================================================

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


// ======================================================
// EVENT - NHIỆM VỤ 1
// ======================================================

checkTask1Button.addEventListener(
    "click",
    checkTask1
);


resetTask1Button.addEventListener(
    "click",
    resetTask1
);


// ======================================================
// EVENT - NHIỆM VỤ 2
// ======================================================

checkTask2Button.addEventListener(
    "click",
    checkTask2
);


resetTask2Button.addEventListener(
    "click",
    resetTask2
);


// ======================================================
// KHỞI TẠO
// ======================================================

resetSimulation();


resetTask1();


resetTask2();


setMode(
    "explore"
);