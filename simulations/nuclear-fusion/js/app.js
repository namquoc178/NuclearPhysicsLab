console.log(
    "APP.JS - NUCLEAR FUSION MULTI REACTION EXPLORE VERSION 2"
);


// ======================================================
// DOM AN TOÀN
// ======================================================

function getRequiredElement(
    id
) {

    const element =
        document.getElementById(
            id
        );


    if (
        element ===
        null
    ) {

        throw new Error(
            `Thiếu phần tử HTML có id="${id}"`
        );
    }


    return element;
}


// ======================================================
// DOM - ĐIỀU KHIỂN
// ======================================================

const fusionReactionSelect =
    getRequiredElement(
        "fusionReactionSelect"
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


// ======================================================
// DOM - CANVAS
// ======================================================

const fusionCanvas =
    getRequiredElement(
        "fusionCanvas"
    );


const fusionContext =
    fusionCanvas.getContext(
        "2d"
    );


if (
    fusionContext ===
    null
) {

    throw new Error(
        "Không thể tạo Canvas 2D context."
    );
}


// ======================================================
// DOM - THÔNG TIN MÔ PHỎNG
// ======================================================

const stageDescription =
    getRequiredElement(
        "stageDescription"
    );


const statusBadge =
    getRequiredElement(
        "statusBadge"
    );


const selectedReactionTitle =
    getRequiredElement(
        "selectedReactionTitle"
    );


const selectedReactionDescription =
    getRequiredElement(
        "selectedReactionDescription"
    );


const simulationReactionTitle =
    getRequiredElement(
        "simulationReactionTitle"
    );


const reactionEquation =
    getRequiredElement(
        "reactionEquation"
    );


const reactionNote =
    getRequiredElement(
        "reactionNote"
    );


// ======================================================
// DOM - KẾT QUẢ
// ======================================================

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


// Q chia cho tổng số nucleon: để so sánh với phân hạch (≈ 0,85 MeV/nucleon).
const qPerNucleonDisplay =
    document.getElementById(
        "qPerNucleonDisplay"
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
// DOM - KHỐI LƯỢNG
// ======================================================

const initialMassDisplay =
    getRequiredElement(
        "initialMassDisplay"
    );


const finalMassDisplay =
    getRequiredElement(
        "finalMassDisplay"
    );


const initialMassBar =
    getRequiredElement(
        "initialMassBar"
    );


const finalMassBar =
    getRequiredElement(
        "finalMassBar"
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
// PHẢN ỨNG HIỆN TẠI
// ======================================================

let currentFusionReaction =
    null;


let currentFusionProperties =
    null;


// ======================================================
// NHÃN NGẮN
// ======================================================

function getNuclideShortLabel(
    id
) {

    const labels = {

        "H-1":
            "H-1",

        "H-2":
            "D",

        "H-3":
            "T",

        "He-3":
            "He-3",

        "He-4":
            "He-4"

    };


    return (
        labels[id]
        ||
        id
    );
}


// ======================================================
// TÊN TIẾNG VIỆT
// ======================================================

function getNuclideVietnameseName(
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
        nuclide.vietnameseName
        ||
        id
    );
}


// ======================================================
// KÝ HIỆU HẠT NHÂN HTML
// ======================================================

function getNuclideHtml(
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
// MÔ TẢ PHẢN ỨNG
// ======================================================

function getReactionDescription(
    reaction
) {

    if (
        reaction.description
    ) {

        return reaction.description;
    }


    return (
        "Phản ứng nhiệt hạch minh họa."
    );
}


// ======================================================
// CẬP NHẬT PHƯƠNG TRÌNH
// ======================================================

function updateReactionEquation() {

    const reactantParts =
        currentFusionReaction.reactants.map(
            id =>
                `<span>${getNuclideHtml(id)}</span>`
        );


    const productParts =
        currentFusionReaction.products.map(
            id =>
                `<span>${getNuclideHtml(id)}</span>`
        );


    if (
        currentFusionReaction.emittedNeutrons >
        0
    ) {

        const number =
            currentFusionReaction.emittedNeutrons;


        const neutronHtml =
            number ===
            1

            ?
            "<sup>1</sup><sub>0</sub>n"

            :
            `${number}<sup>1</sup><sub>0</sub>n`;


        productParts.push(
            `<span>${neutronHtml}</span>`
        );
    }


    reactionEquation.innerHTML =
        reactantParts.join(
            "<span>+</span>"
        )
        +
        "<span>→</span>"
        +
        productParts.join(
            "<span>+</span>"
        );


    reactionNote.textContent =
        getReactionDescription(
            currentFusionReaction
        );
}


// ======================================================
// CẬP NHẬT THÔNG TIN PHẢN ỨNG
// ======================================================

function updateReactionInformation() {

    selectedReactionTitle.textContent =
        currentFusionReaction.name;


    selectedReactionDescription.textContent =
        getReactionDescription(
            currentFusionReaction
        );


    simulationReactionTitle.textContent =
        `Quá trình nhiệt hạch ${currentFusionReaction.shortName}`;


    updateReactionEquation();
}


// ======================================================
// MÔ TẢ GIAI ĐOẠN
// ======================================================

function buildStageDescriptions() {

    const reactants =
        currentFusionReaction.reactants
            .map(
                getNuclideShortLabel
            )
            .join(
                " và "
            );


    const products =
        currentFusionReaction.products
            .map(
                getNuclideShortLabel
            );


    if (
        currentFusionReaction.emittedNeutrons >
        0
    ) {

        if (
            currentFusionReaction.emittedNeutrons ===
            1
        ) {

            products.push(
                "một neutron"
            );

        } else {

            products.push(
                `${currentFusionReaction.emittedNeutrons} neutron`
            );
        }
    }


    return [

        `Hệ ban đầu gồm ${reactants}.`,

        "Các hạt nhân được minh họa tiến vào gần vùng tương tác.",

        "Các hạt nhân đi vào vùng tương tác hạt nhân trong mô hình.",

        "Các nucleon được minh họa tái sắp xếp thành trạng thái sản phẩm.",

        `Hình thành ${products.join(" và ")}.`,

        `Khối lượng trạng thái sau nhỏ hơn trạng thái trước; Q ≈ ${currentFusionProperties.qValueMeV.toFixed(2)} MeV.`

    ];
}


// ======================================================
// STATUS
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
// CẬP NHẬT CHỈ BÁO GIAI ĐOẠN
// ======================================================

function updateStageIndicator(
    stage
) {

    const descriptions =
        buildStageDescriptions();


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
                itemStage ===
                stage
            );
        }
    );


    stageDescription.textContent =
        descriptions[
            stage
        ];
}


// ======================================================
// VẼ HẠT
// ======================================================

function drawParticle(
    x,
    y,
    radius,
    fill,
    stroke,
    label,
    textColor
) {

    fusionContext.beginPath();


    fusionContext.arc(
        x,
        y,
        radius,
        0,
        Math.PI *
        2
    );


    fusionContext.fillStyle =
        fill;


    fusionContext.fill();


    fusionContext.strokeStyle =
        stroke;


    fusionContext.lineWidth =
        2;


    fusionContext.stroke();


    fusionContext.textAlign =
        "center";


    fusionContext.textBaseline =
        "middle";


    fusionContext.font =
        "bold 18px Arial";


    fusionContext.fillStyle =
        textColor;


    fusionContext.fillText(
        label,
        x,
        y
    );
}


// ======================================================
// PROTON
// ======================================================

function drawProton(
    x,
    y,
    radius = 13
) {

    drawParticle(
        x,
        y,
        radius,
        "#fee2e2",
        "#b91c1c",
        "p",
        "#991b1b"
    );
}


// ======================================================
// NEUTRON
// ======================================================

function drawNeutron(
    x,
    y,
    radius = 13
) {

    drawParticle(
        x,
        y,
        radius,
        "#dbeafe",
        "#1d4ed8",
        "n",
        "#1e3a8a"
    );
}


// ======================================================
// CẤU HÌNH NUCLEON
// ======================================================

function getNuclideNucleons(
    id
) {

    const configurations = {

        "H-1":
        [
            "p"
        ],

        "H-2":
        [
            "p",
            "n"
        ],

        "H-3":
        [
            "p",
            "n",
            "n"
        ],

        "He-3":
        [
            "p",
            "p",
            "n"
        ],

        "He-4":
        [
            "p",
            "p",
            "n",
            "n"
        ]

    };


    return (
        configurations[
            id
        ]
        ||
        []
    );
}


// ======================================================
// VẼ HẠT NHÂN
// ======================================================

function drawNuclide(
    id,
    x,
    y,
    scale = 1,
    showLabel = true
) {

    const nucleons =
        getNuclideNucleons(
            id
        );


    const positions = {

        1:
        [
            [0, 0]
        ],

        2:
        [
            [-10, 0],
            [10, 0]
        ],

        3:
        [
            [0, -12],
            [-12, 10],
            [12, 10]
        ],

        4:
        [
            [-12, -12],
            [12, -12],
            [-12, 12],
            [12, 12]
        ]

    };


    const pointPositions =
        positions[
            nucleons.length
        ]
        ||
        [];


    nucleons.forEach(
        (
            type,
            index
        ) => {

            const position =
                pointPositions[
                    index
                ];


            if (
                !position
            ) {

                return;
            }


            const px =
                x
                +
                position[0]
                *
                scale;


            const py =
                y
                +
                position[1]
                *
                scale;


            if (
                type ===
                "p"
            ) {

                drawProton(
                    px,
                    py,
                    14 *
                    scale
                );

            } else {

                drawNeutron(
                    px,
                    py,
                    14 *
                    scale
                );
            }
        }
    );


    if (
        showLabel
    ) {

        fusionContext.textAlign =
            "center";


        fusionContext.textBaseline =
            "alphabetic";


        fusionContext.font =
            "bold 18px Arial";


        fusionContext.fillStyle =
            "#0f172a";


        fusionContext.fillText(
            getNuclideShortLabel(
                id
            ),
            x,
            y
            +
            58 *
            scale
        );
    }
}


// ======================================================
// NHÃN TRÊN CANVAS
// ======================================================

function drawTopLabel(
    text
) {

    fusionContext.textAlign =
        "center";


    fusionContext.textBaseline =
        "alphabetic";


    fusionContext.font =
        "bold 20px Arial";


    fusionContext.fillStyle =
        "#0f172a";


    fusionContext.fillText(
        text,
        fusionCanvas.width /
        2,
        38
    );
}


// ======================================================
// VÙNG TƯƠNG TÁC
// ======================================================

function drawInteractionRegion(
    radius,
    opacity
) {

    fusionContext.beginPath();


    fusionContext.arc(
        450,
        250,
        radius,
        0,
        Math.PI *
        2
    );


    fusionContext.fillStyle =
        `rgba(245, 158, 11, ${opacity})`;


    fusionContext.fill();


    fusionContext.strokeStyle =
        `rgba(180, 83, 9, ${Math.min(1, opacity + 0.2)})`;


    fusionContext.lineWidth =
        2;


    fusionContext.stroke();
}


// ======================================================
// GIAI ĐOẠN 0
// ======================================================

function drawStage0(
    progress
) {

    drawTopLabel(
        "Các hạt nhân ban đầu"
    );


    const motion =
        Math.sin(
            progress *
            Math.PI *
            2
        )
        *
        4;


    drawNuclide(
        currentFusionReaction.reactants[0],
        270 + motion,
        250
    );


    drawNuclide(
        currentFusionReaction.reactants[1],
        630 - motion,
        250
    );
}


// ======================================================
// GIAI ĐOẠN 1
// ======================================================

function drawStage1(
    progress
) {

    drawTopLabel(
        "Các hạt nhân tiến lại gần nhau"
    );


    const leftX =
        270
        +
        135 *
        progress;


    const rightX =
        630
        -
        135 *
        progress;


    drawNuclide(
        currentFusionReaction.reactants[0],
        leftX,
        250
    );


    drawNuclide(
        currentFusionReaction.reactants[1],
        rightX,
        250
    );


    fusionContext.strokeStyle =
        "#94a3b8";


    fusionContext.setLineDash(
        [
            6,
            6
        ]
    );


    fusionContext.beginPath();


    fusionContext.moveTo(
        leftX + 45,
        250
    );


    fusionContext.lineTo(
        rightX - 45,
        250
    );


    fusionContext.stroke();


    fusionContext.setLineDash(
        []
    );
}


// ======================================================
// GIAI ĐOẠN 2
// ======================================================

function drawStage2(
    progress
) {

    drawTopLabel(
        "Vùng tương tác hạt nhân"
    );


    const separation =
        55
        -
        30 *
        progress;


    drawInteractionRegion(
        80
        +
        10 *
        progress,
        0.12
        +
        0.12 *
        progress
    );


    drawNuclide(
        currentFusionReaction.reactants[0],
        450 - separation,
        250,
        0.9,
        false
    );


    drawNuclide(
        currentFusionReaction.reactants[1],
        450 + separation,
        250,
        0.9,
        false
    );


    fusionContext.textAlign =
        "center";


    fusionContext.textBaseline =
        "alphabetic";


    fusionContext.font =
        "15px Arial";


    fusionContext.fillStyle =
        "#92400e";


    fusionContext.fillText(
        "Vùng tương tác trong mô hình",
        450,
        390
    );
}


// ======================================================
// TẬP HỢP NUCLEON BAN ĐẦU
// ======================================================

function getAllInitialNucleons() {

    return currentFusionReaction
        .reactants
        .flatMap(
            getNuclideNucleons
        );
}


// ======================================================
// GIAI ĐOẠN 3
// ======================================================

function drawStage3(
    progress
) {

    drawTopLabel(
        "Các nucleon được minh họa tái sắp xếp"
    );


    drawInteractionRegion(
        90,
        0.18
    );


    const nucleons =
        getAllInitialNucleons();


    const orbitRadius =
        38;


    nucleons.forEach(
        (
            type,
            index
        ) => {

            const angle =
                index
                *
                (
                    2
                    *
                    Math.PI
                    /
                    nucleons.length
                )
                +
                progress
                *
                1.4;


            const x =
                450
                +
                orbitRadius
                *
                Math.cos(
                    angle
                );


            const y =
                250
                +
                orbitRadius
                *
                Math.sin(
                    angle
                );


            if (
                type ===
                "p"
            ) {

                drawProton(
                    x,
                    y,
                    14
                );

            } else {

                drawNeutron(
                    x,
                    y,
                    14
                );
            }
        }
    );


    fusionContext.textAlign =
        "center";


    fusionContext.textBaseline =
        "alphabetic";


    fusionContext.font =
        "15px Arial";


    fusionContext.fillStyle =
        "#475569";


    fusionContext.fillText(
        "Mô hình hóa sự chuyển sang trạng thái sản phẩm",
        450,
        390
    );
}


// ======================================================
// VẼ SẢN PHẨM
// ======================================================

function drawReactionProducts(
    progress,
    finalStage
) {

    const products =
        currentFusionReaction.products;


    const neutronCount =
        currentFusionReaction.emittedNeutrons;


    const leftX =
        finalStage
            ?
            300
            -
            30 *
            progress

            :
            350
            -
            45 *
            progress;


    const rightX =
        finalStage
            ?
            620
            +
            30 *
            progress

            :
            550
            +
            45 *
            progress;


    /*
     * Trường hợp:
     * 1 hạt nhân sản phẩm + neutron.
     */

    if (
        products.length ===
        1
    ) {

        drawNuclide(
            products[0],
            leftX,
            250
        );


        if (
            neutronCount >
            0
        ) {

            drawNeutron(
                rightX,
                250,
                15
            );


            fusionContext.textAlign =
                "center";


            fusionContext.textBaseline =
                "alphabetic";


            fusionContext.font =
                "15px Arial";


            fusionContext.fillStyle =
                "#1e3a8a";


            fusionContext.fillText(
                neutronCount ===
                1
                    ?
                    "n"
                    :
                    `${neutronCount}n`,
                rightX,
                292
            );
        }


        return;
    }


    /*
     * Trường hợp hai hạt nhân sản phẩm.
     */

    if (
        products.length >=
        2
    ) {

        drawNuclide(
            products[0],
            leftX,
            250
        );


        drawNuclide(
            products[1],
            rightX,
            250
        );
    }
}


// ======================================================
// GIAI ĐOẠN 4
// ======================================================

function drawStage4(
    progress
) {

    drawTopLabel(
        "Hình thành các sản phẩm phản ứng"
    );


    drawReactionProducts(
        progress,
        false
    );
}


// ======================================================
// GIAI ĐOẠN 5
// ======================================================

function drawStage5(
    progress
) {

    drawTopLabel(
        "Sản phẩm và năng lượng phản ứng"
    );


    drawReactionProducts(
        progress,
        true
    );


    fusionContext.textAlign =
        "center";


    fusionContext.textBaseline =
        "alphabetic";


    fusionContext.font =
        "bold 21px Arial";


    fusionContext.fillStyle =
        "#92400e";


    fusionContext.fillText(
        `Q ≈ ${currentFusionProperties.qValueMeV.toFixed(2)} MeV`,
        450,
        430
    );
}


// ======================================================
// VẼ FRAME
// ======================================================

function drawFusionFrame(
    time
) {

    fusionCurrentTime =
        time;


    fusionContext.clearRect(
        0,
        0,
        fusionCanvas.width,
        fusionCanvas.height
    );


    fusionContext.fillStyle =
        "#f8fbff";


    fusionContext.fillRect(
        0,
        0,
        fusionCanvas.width,
        fusionCanvas.height
    );


    const stage =
        getFusionStageFromTime(
            time
        );


    const progress =
        getFusionStageProgress(
            time,
            stage
        );


    updateStageIndicator(
        stage
    );


    switch (
        stage
    ) {

        case 0:

            drawStage0(
                progress
            );

            break;


        case 1:

            drawStage1(
                progress
            );

            break;


        case 2:

            drawStage2(
                progress
            );

            break;


        case 3:

            drawStage3(
                progress
            );

            break;


        case 4:

            drawStage4(
                progress
            );

            break;


        case 5:

            drawStage5(
                progress
            );

            break;
    }
}


// ======================================================
// HIỂN THỊ KẾT QUẢ CUỐI
// ======================================================

function showFinalResults() {

    const p =
        currentFusionProperties;


    initialADisplay.textContent =
        String(
            p.initialA
        );


    finalADisplay.textContent =
        String(
            p.finalA
        );


    initialZDisplay.textContent =
        String(
            p.initialZ
        );


    finalZDisplay.textContent =
        String(
            p.finalZ
        );


    massDifferenceDisplay.textContent =
        `${p.massDifferenceU.toFixed(6)} u`;


    qValueDisplay.textContent =
        `${p.qValueMeV.toFixed(3)} MeV`;


    if (qPerNucleonDisplay) {
        qPerNucleonDisplay.textContent =
            `${(p.qValueMeV / p.initialA).toFixed(2)} MeV/nucleon`;
    }


    massConservationStatus.textContent =
        p.massNumberConserved
            ?
            `✓ Bảo toàn A: ${p.initialA} = ${p.finalA}`

            :
            "Cần kiểm tra bảo toàn A";


    chargeConservationStatus.textContent =
        p.atomicNumberConserved
            ?
            `✓ Bảo toàn Z: ${p.initialZ} = ${p.finalZ}`

            :
            "Cần kiểm tra bảo toàn Z";


    initialMassDisplay.textContent =
        `${p.initialMassU.toFixed(9)} u`;


    finalMassDisplay.textContent =
        `${p.finalMassU.toFixed(9)} u`;


    initialMassBar.style.width =
        "100%";


    const ratio =
        p.finalMassU
        /
        p.initialMassU;


    finalMassBar.style.width =
        `${Math.max(
            0,
            Math.min(
                100,
                ratio * 100
            )
        )}%`;
}


// ======================================================
// XÓA KẾT QUẢ
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


    if (qPerNucleonDisplay) {
        qPerNucleonDisplay.textContent =
            "—";
    }


    massConservationStatus.textContent =
        "Bảo toàn A: —";


    chargeConservationStatus.textContent =
        "Bảo toàn Z: —";


    initialMassDisplay.textContent =
        "—";


    finalMassDisplay.textContent =
        "—";


    initialMassBar.style.width =
        "0%";


    finalMassBar.style.width =
        "0%";
}


// ======================================================
// ANIMATION LOOP
// ======================================================

function fusionAnimationLoop(
    timestamp
) {

    if (
        !fusionAnimationRunning
        ||
        fusionAnimationPaused
    ) {

        return;
    }


    if (
        fusionAnimationStartTimestamp ===
        null
    ) {

        fusionAnimationStartTimestamp =
            timestamp;
    }


    const elapsed =
        (
            timestamp
            -
            fusionAnimationStartTimestamp
        )
        /
        1000
        *
        fusionSpeed;


    const time =
        fusionStoredTime
        +
        elapsed;


    const finalTime =
        getFusionFinalTime();


    if (
        time >=
        finalTime
    ) {

        fusionCurrentTime =
            finalTime;


        fusionStoredTime =
            finalTime;


        fusionAnimationRunning =
            false;


        fusionAnimationPaused =
            false;


        fusionAnimationStartTimestamp =
            null;


        drawFusionFrame(
            finalTime
        );


        showFinalResults();


        stageDescription.textContent =
            `Phản ứng hoàn thành. Q ≈ ${currentFusionProperties.qValueMeV.toFixed(3)} MeV.`;


        setStatus(
            "Mô phỏng hoàn thành",
            "finished"
        );


        fusionAnimationFrameId =
            null;


        return;
    }


    drawFusionFrame(
        time
    );


    fusionAnimationFrameId =
        requestAnimationFrame(
            fusionAnimationLoop
        );
}


// ======================================================
// BẮT ĐẦU / TIẾP TỤC
// ======================================================

function startSimulation() {

    const finalTime =
        getFusionFinalTime();


    if (
        fusionStoredTime >=
        finalTime
    ) {

        resetSimulation();
    }


    if (
        fusionAnimationRunning
    ) {

        return;
    }


    fusionSpeed =
        Number(
            speedSelect.value
        );


    fusionAnimationRunning =
        true;


    fusionAnimationPaused =
        false;


    fusionAnimationStartTimestamp =
        null;


    setStatus(
        "Đang mô phỏng",
        "running"
    );


    stopFusionAnimationFrame();


    fusionAnimationFrameId =
        requestAnimationFrame(
            fusionAnimationLoop
        );
}


// ======================================================
// TẠM DỪNG
// ======================================================

function pauseSimulation() {

    if (
        !fusionAnimationRunning
    ) {

        return;
    }


    fusionStoredTime =
        fusionCurrentTime;


    fusionAnimationRunning =
        false;


    fusionAnimationPaused =
        true;


    fusionAnimationStartTimestamp =
        null;


    stopFusionAnimationFrame();


    setStatus(
        "Đang tạm dừng",
        "ready"
    );
}


// ======================================================
// RESET
// ======================================================

function resetSimulation() {

    resetFusionAnimationState();


    clearResults();


    drawFusionFrame(
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
// CHỌN PHẢN ỨNG
// ======================================================

function selectFusionReaction(
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
            `Không tìm thấy phản ứng ${reactionId}.`
        );
    }


    currentFusionReaction =
        reaction;


    currentFusionProperties =
        calculateFusionReactionProperties(
            reaction
        );


    updateReactionInformation();


    resetSimulation();
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


        return;
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


        return;
    }


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


// ======================================================
// EVENT - CHỌN PHẢN ỨNG
// ======================================================

fusionReactionSelect.addEventListener(
    "change",

    () => {

        selectFusionReaction(
            fusionReactionSelect.value
        );
    }
);


// ======================================================
// EVENT - ANIMATION
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


// ======================================================
// EVENT - TỐC ĐỘ
// ======================================================

speedSelect.addEventListener(
    "change",

    () => {

        /*
         * Nếu đang chạy, lưu đúng thời điểm hiện tại
         * trước khi thay tốc độ để tránh animation bị nhảy.
         */

        if (
            fusionAnimationRunning
        ) {

            fusionStoredTime =
                fusionCurrentTime;


            fusionAnimationStartTimestamp =
                null;
        }


        fusionSpeed =
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

    () => {

        setMode(
            "explore"
        );
    }
);


experimentModeButton.addEventListener(
    "click",

    () => {

        setMode(
            "experiment"
        );
    }
);


validationModeButton.addEventListener(
    "click",

    () => {

        setMode(
            "validation"
        );
    }
);


// ======================================================
// KHỞI TẠO
// ======================================================

selectFusionReaction(
    fusionReactionSelect.value
);


setMode(
    "explore"
);