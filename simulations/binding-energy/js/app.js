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
// 1. GIAO DIỆN KHÁM PHÁ
// ======================================================

const nuclideSelect =
    getRequiredElement(
        "nuclideSelect"
    );


const calculateButton =
    getRequiredElement(
        "calculateButton"
    );


const resetButton =
    getRequiredElement(
        "resetButton"
    );


const nuclideNotation =
    getRequiredElement(
        "nuclideNotation"
    );


const nuclideName =
    getRequiredElement(
        "nuclideName"
    );


const statusBadge =
    getRequiredElement(
        "statusBadge"
    );


// ======================================================
// CANVAS HẠT NHÂN
// ======================================================

const nucleusCanvas =
    getRequiredElement(
        "nucleusCanvas"
    );


const nucleusContext =
    nucleusCanvas.getContext(
        "2d"
    );


// ======================================================
// THÔNG TIN HẠT NHÂN
// ======================================================

const aDisplay =
    getRequiredElement(
        "aDisplay"
    );


const zDisplay =
    getRequiredElement(
        "zDisplay"
    );


const nDisplay =
    getRequiredElement(
        "nDisplay"
    );


const atomicMassDisplay =
    getRequiredElement(
        "atomicMassDisplay"
    );


// ======================================================
// KẾT QUẢ KHÁM PHÁ
// ======================================================

const freeMassDisplay =
    getRequiredElement(
        "freeMassDisplay"
    );


const massDefectDisplay =
    getRequiredElement(
        "massDefectDisplay"
    );


const bindingEnergyDisplay =
    getRequiredElement(
        "bindingEnergyDisplay"
    );


const bindingEnergyPerNucleonDisplay =
    getRequiredElement(
        "bindingEnergyPerNucleonDisplay"
    );


// ======================================================
// SO SÁNH KHỐI LƯỢNG
// ======================================================

const freeMassBar =
    getRequiredElement(
        "freeMassBar"
    );


const atomicMassBar =
    getRequiredElement(
        "atomicMassBar"
    );


const freeMassBarLabel =
    getRequiredElement(
        "freeMassBarLabel"
    );


const atomicMassBarLabel =
    getRequiredElement(
        "atomicMassBarLabel"
    );


const massDefectHighlight =
    getRequiredElement(
        "massDefectHighlight"
    );


// ======================================================
// ĐỒ THỊ CHÍNH
// ======================================================

const bindingEnergyChartCanvas =
    getRequiredElement(
        "bindingEnergyChart"
    );


const chartObservation =
    getRequiredElement(
        "chartObservation"
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
// NHIỆM VỤ 1
// ======================================================

const task1NuclideSelect =
    getRequiredElement(
        "task1NuclideSelect"
    );


const setupTask1Button =
    getRequiredElement(
        "setupTask1Button"
    );


const task1GivenData =
    getRequiredElement(
        "task1GivenData"
    );


const task1NuclideDisplay =
    getRequiredElement(
        "task1NuclideDisplay"
    );


const task1ADisplay =
    getRequiredElement(
        "task1ADisplay"
    );


const task1ZDisplay =
    getRequiredElement(
        "task1ZDisplay"
    );


const task1NDisplay =
    getRequiredElement(
        "task1NDisplay"
    );


const task1AtomicMassDisplay =
    getRequiredElement(
        "task1AtomicMassDisplay"
    );


const task1MassDefectInput =
    getRequiredElement(
        "task1MassDefectInput"
    );


const task1BindingEnergyInput =
    getRequiredElement(
        "task1BindingEnergyInput"
    );


const task1BindingEnergyPerNucleonInput =
    getRequiredElement(
        "task1BindingEnergyPerNucleonInput"
    );


const task1MassDefectFeedback =
    getRequiredElement(
        "task1MassDefectFeedback"
    );


const task1BindingEnergyFeedback =
    getRequiredElement(
        "task1BindingEnergyFeedback"
    );


const task1BindingEnergyPerNucleonFeedback =
    getRequiredElement(
        "task1BindingEnergyPerNucleonFeedback"
    );


const checkTask1Button =
    getRequiredElement(
        "checkTask1Button"
    );


const clearTask1AnswersButton =
    getRequiredElement(
        "clearTask1AnswersButton"
    );


const task1Status =
    getRequiredElement(
        "task1Status"
    );


const task1Result =
    getRequiredElement(
        "task1Result"
    );


const task1CorrectMassDefect =
    getRequiredElement(
        "task1CorrectMassDefect"
    );


const task1CorrectBindingEnergy =
    getRequiredElement(
        "task1CorrectBindingEnergy"
    );


const task1CorrectBindingEnergyPerNucleon =
    getRequiredElement(
        "task1CorrectBindingEnergyPerNucleon"
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
// NHIỆM VỤ 2
// ======================================================

const setupTask2Button =
    getRequiredElement(
        "setupTask2Button"
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


const task2TotalChartCanvas =
    getRequiredElement(
        "task2TotalChart"
    );


const task2SpecificChartCanvas =
    getRequiredElement(
        "task2SpecificChart"
    );


const task2HighestTotalSelect =
    getRequiredElement(
        "task2HighestTotalSelect"
    );


const task2HighestSpecificSelect =
    getRequiredElement(
        "task2HighestSpecificSelect"
    );


const task2RelationshipSelect =
    getRequiredElement(
        "task2RelationshipSelect"
    );


const task2HighestTotalFeedback =
    getRequiredElement(
        "task2HighestTotalFeedback"
    );


const task2HighestSpecificFeedback =
    getRequiredElement(
        "task2HighestSpecificFeedback"
    );


const task2RelationshipFeedback =
    getRequiredElement(
        "task2RelationshipFeedback"
    );


const checkTask2Button =
    getRequiredElement(
        "checkTask2Button"
    );


const resetTask2AnswersButton =
    getRequiredElement(
        "resetTask2AnswersButton"
    );


const task2ConclusionBox =
    getRequiredElement(
        "task2ConclusionBox"
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


const task3Status =
    getRequiredElement(
        "task3Status"
    );


const task3Result =
    getRequiredElement(
        "task3Result"
    );


const task3NuclideCount =
    getRequiredElement(
        "task3NuclideCount"
    );


const task3MaximumNuclide =
    getRequiredElement(
        "task3MaximumNuclide"
    );


const task3MaximumValue =
    getRequiredElement(
        "task3MaximumValue"
    );


const task3ChartCanvas =
    getRequiredElement(
        "task3Chart"
    );


const task3TableBody =
    getRequiredElement(
        "task3TableBody"
    );


const task3PeakRegionSelect =
    getRequiredElement(
        "task3PeakRegionSelect"
    );


const task3LightTrendSelect =
    getRequiredElement(
        "task3LightTrendSelect"
    );


const task3HeavyTrendSelect =
    getRequiredElement(
        "task3HeavyTrendSelect"
    );


const task3EnergyDirectionSelect =
    getRequiredElement(
        "task3EnergyDirectionSelect"
    );


const task3PeakRegionFeedback =
    getRequiredElement(
        "task3PeakRegionFeedback"
    );


const task3LightTrendFeedback =
    getRequiredElement(
        "task3LightTrendFeedback"
    );


const task3HeavyTrendFeedback =
    getRequiredElement(
        "task3HeavyTrendFeedback"
    );


const task3EnergyDirectionFeedback =
    getRequiredElement(
        "task3EnergyDirectionFeedback"
    );


const checkTask3Button =
    getRequiredElement(
        "checkTask3Button"
    );


const resetTask3AnswersButton =
    getRequiredElement(
        "resetTask3AnswersButton"
    );


const task3ConclusionBox =
    getRequiredElement(
        "task3ConclusionBox"
    );


const task3Conclusion =
    getRequiredElement(
        "task3Conclusion"
    );


// ======================================================
// 2. TRẠNG THÁI
// ======================================================

let currentNuclide =
    null;


let currentProperties =
    null;


let bindingEnergyChart =
    null;


let task1Nuclide =
    null;


let task1Properties =
    null;


let task2Data =
    [];


let task2TotalChart =
    null;


let task2SpecificChart =
    null;


let task3Data =
    [];


let task3Chart =
    null;


// ======================================================
// 3. DANH SÁCH ĐỒNG VỊ KHÁM PHÁ
// ======================================================

function populateNuclideSelect() {

    nuclideSelect.innerHTML =
        "";


    for (
        const nuclide
        of
        NUCLEAR_DATA
    ) {

        const option =
            document.createElement(
                "option"
            );


        option.value =
            nuclide.id;


        option.textContent =
            `${nuclide.symbol}-${nuclide.A} — ${nuclide.vietnameseName}`;


        nuclideSelect.appendChild(
            option
        );
    }


    if (
        getNuclideById(
            "Fe-56"
        )
    ) {

        nuclideSelect.value =
            "Fe-56";
    }
}


// ======================================================
// 4. KÍ HIỆU HẠT NHÂN
// ======================================================

function buildNuclideNotation(
    nuclide
) {

    return (
        `${nuclide.symbol}-${nuclide.A}`
    );
}


// ======================================================
// 5. TRẠNG THÁI
// ======================================================

function setStatus(
    text,
    state
) {

    statusBadge.textContent =
        text;


    statusBadge.classList.remove(
        "ready",
        "finished"
    );


    statusBadge.classList.add(
        state
    );
}


// ======================================================
// 6. XÓA KẾT QUẢ KHÁM PHÁ
// ======================================================

function clearCalculationResults() {

    freeMassDisplay.textContent =
        "—";


    massDefectDisplay.textContent =
        "—";


    bindingEnergyDisplay.textContent =
        "—";


    bindingEnergyPerNucleonDisplay.textContent =
        "—";


    freeMassBar.style.width =
        "0%";


    atomicMassBar.style.width =
        "0%";


    freeMassBarLabel.textContent =
        "—";


    atomicMassBarLabel.textContent =
        "—";


    massDefectHighlight.textContent =
        "—";
}


// ======================================================
// 7. CẬP NHẬT HẠT NHÂN
// ======================================================

function updateSelectedNuclideInfo() {

    currentNuclide =
        getNuclideById(
            nuclideSelect.value
        );


    if (
        !currentNuclide
    ) {

        throw new Error(
            "Không tìm thấy hạt nhân đã chọn."
        );
    }


    const N =
        calculateNeutronNumber(
            currentNuclide.A,
            currentNuclide.Z
        );


    nuclideNotation.textContent =
        buildNuclideNotation(
            currentNuclide
        );


    nuclideName.textContent =
        currentNuclide.vietnameseName;


    aDisplay.textContent =
        String(
            currentNuclide.A
        );


    zDisplay.textContent =
        String(
            currentNuclide.Z
        );


    nDisplay.textContent =
        String(
            N
        );


    atomicMassDisplay.textContent =
        `${currentNuclide.atomicMassU.toFixed(9)} u`;


    clearCalculationResults();


    drawNucleus(
        currentNuclide
    );


    createBindingEnergyChart(
        currentNuclide.id
    );


    chartObservation.textContent =
        "Nhấn “Tính các đại lượng” để xác định độ hụt khối, năng lượng liên kết và Eₗₖ/A.";


    setStatus(
        "Đã chọn hạt nhân",
        "ready"
    );
}


// ======================================================
// 8. VẼ HẠT NHÂN
// ======================================================

function drawNucleus(
    nuclide
) {

    const ctx =
        nucleusContext;


    const width =
        nucleusCanvas.width;


    const height =
        nucleusCanvas.height;


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


    const centerX =
        width * 0.5;


    const centerY =
        height * 0.52;


    const totalNucleons =
        nuclide.A;


    const neutronNumber =
        nuclide.A -
        nuclide.Z;


    const displayCount =
        Math.min(
            totalNucleons,
            120
        );


    const protonDisplayCount =
        Math.round(
            displayCount *
            nuclide.Z /
            totalNucleons
        );


    const neutronDisplayCount =
        displayCount -
        protonDisplayCount;


    const displayNucleons =
        buildNucleons(
            protonDisplayCount,
            neutronDisplayCount
        );


    const nucleusRadius =
        Math.min(
            150,
            45 +
            Math.sqrt(
                totalNucleons
            ) *
            7
        );


    const positions =
        createNucleonPositions(
            displayCount,
            centerX,
            centerY,
            nucleusRadius *
            0.82
        );


    ctx.beginPath();


    ctx.arc(
        centerX,
        centerY,
        nucleusRadius,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        "#eef2ff";


    ctx.fill();


    ctx.strokeStyle =
        "#c7d2fe";


    ctx.lineWidth =
        2;


    ctx.stroke();


    const particleRadius =
        Math.max(
            4,
            Math.min(
                10,
                130 /
                Math.sqrt(
                    displayCount
                )
            )
        );


    displayNucleons.forEach(
        (
            nucleon,
            index
        ) => {

            const position =
                positions[index];


            ctx.beginPath();


            ctx.arc(
                position.x,
                position.y,
                particleRadius,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                nucleon.type ===
                "proton"
                    ?
                    "#dc2626"
                    :
                    "#2563eb";


            ctx.fill();
        }
    );


    ctx.fillStyle =
        "#0f172a";


    ctx.textAlign =
        "center";


    ctx.font =
        "bold 20px Arial";


    ctx.fillText(
        `${nuclide.symbol}-${nuclide.A}`,
        centerX,
        34
    );


    ctx.font =
        "15px Arial";


    ctx.fillStyle =
        "#475569";


    ctx.fillText(
        `Z = ${nuclide.Z} proton   |   N = ${neutronNumber} neutron`,
        centerX,
        height - 30
    );


    if (
        totalNucleons >
        displayCount
    ) {

        ctx.font =
            "13px Arial";


        ctx.fillStyle =
            "#64748b";


        ctx.fillText(
            `${displayCount} điểm đang được dùng để minh họa ${totalNucleons} nucleon`,
            centerX,
            height - 8
        );
    }
}


// ======================================================
// 9. TÍNH HẠT NHÂN HIỆN TẠI
// ======================================================

function calculateCurrentNuclide() {

    currentNuclide =
        getNuclideById(
            nuclideSelect.value
        );


    currentProperties =
        calculateNuclideProperties(
            currentNuclide
        );


    freeMassDisplay.textContent =
        `${currentProperties.freeNucleonMassU.toFixed(9)} u`;


    massDefectDisplay.textContent =
        `${currentProperties.massDefectU.toFixed(6)} u`;


    bindingEnergyDisplay.textContent =
        `${currentProperties.bindingEnergyMeV.toFixed(3)} MeV`;


    bindingEnergyPerNucleonDisplay.textContent =
        `${currentProperties.bindingEnergyPerNucleonMeV.toFixed(3)} MeV/nucleon`;


    updateMassComparison(
        currentProperties
    );


    createBindingEnergyChart(
        currentNuclide.id
    );


    updateObservation(
        currentProperties
    );


    setStatus(
        "Đã tính xong",
        "finished"
    );
}


// ======================================================
// 10. SO SÁNH KHỐI LƯỢNG
// ======================================================

function updateMassComparison(
    properties
) {

    freeMassBar.style.width =
        "100%";


    const ratio =
        properties.atomicMassU /
        properties.freeNucleonMassU;


    atomicMassBar.style.width =
        `${Math.max(
            92,
            ratio * 100
        )}%`;


    freeMassBarLabel.textContent =
        `${properties.freeNucleonMassU.toFixed(6)} u`;


    atomicMassBarLabel.textContent =
        `${properties.atomicMassU.toFixed(6)} u`;


    massDefectHighlight.textContent =
        `Δm = ${properties.massDefectU.toFixed(6)} u`;
}


// ======================================================
// 11. DỮ LIỆU ĐỒ THỊ CHÍNH
// ======================================================

function buildBindingEnergyDataset() {

    return NUCLEAR_DATA.map(
        nuclide => {

            const properties =
                calculateNuclideProperties(
                    nuclide
                );


            return {

                id:
                    nuclide.id,

                symbol:
                    `${nuclide.symbol}-${nuclide.A}`,

                x:
                    nuclide.A,

                y:
                    properties
                        .bindingEnergyPerNucleonMeV

            };
        }
    );
}


// ======================================================
// 12. ĐỒ THỊ CHÍNH
// ======================================================

function createBindingEnergyChart(
    selectedId
) {

    const allData =
        buildBindingEnergyDataset();


    const selectedPoint =
        allData.filter(
            point =>
                point.id ===
                selectedId
        );


    if (
        bindingEnergyChart !==
        null
    ) {

        bindingEnergyChart.destroy();
    }


    bindingEnergyChart =
        new Chart(
            bindingEnergyChartCanvas
                .getContext(
                    "2d"
                ),

            {

                type:
                    "scatter",


                data:
                {

                    datasets:
                    [

                        {
                            label:
                                "Các hạt nhân trong bộ dữ liệu",

                            data:
                                allData,

                            pointRadius:
                                5,

                            pointHoverRadius:
                                7
                        },


                        {
                            label:
                                "Hạt nhân đang chọn",

                            data:
                                selectedPoint,

                            pointRadius:
                                9,

                            pointHoverRadius:
                                10
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

                                        const point =
                                            context.raw;


                                        return (
                                            `${point.symbol}: `
                                            +
                                            `A = ${point.x}, `
                                            +
                                            `Eₗₖ/A = ${point.y.toFixed(3)} MeV/nucleon`
                                        );
                                    }

                            }

                        }

                    },


                    scales:
                    {

                        x:
                        {

                            min:
                                0,

                            max:
                                250,

                            title:
                            {

                                display:
                                    true,

                                text:
                                    "Số khối A"

                            }

                        },


                        y:
                        {

                            min:
                                0,

                            max:
                                10,

                            title:
                            {

                                display:
                                    true,

                                text:
                                    "Năng lượng liên kết riêng Eₗₖ/A (MeV/nucleon)"

                            }

                        }

                    }

                }

            }
        );
}


// ======================================================
// 13. NHẬN XÉT KHÁM PHÁ
// ======================================================

function updateObservation(
    properties
) {

    const value =
        properties
            .bindingEnergyPerNucleonMeV;


    if (
        properties.A <=
        7
    ) {

        chartObservation.textContent =
            `${properties.symbol}-${properties.A} nằm ở vùng hạt nhân nhẹ. `
            +
            `Eₗₖ/A = ${value.toFixed(3)} MeV/nucleon. `
            +
            `Hãy so sánh với các hạt nhân có số khối trung bình.`;

        return;
    }


    if (
        properties.A >=
        200
    ) {

        chartObservation.textContent =
            `${properties.symbol}-${properties.A} là hạt nhân nặng. `
            +
            `Eₗₖ/A = ${value.toFixed(3)} MeV/nucleon, `
            +
            `thấp hơn vùng Fe–Ni trong bộ dữ liệu.`;

        return;
    }


    if (
        properties.A >=
        40
        &&
        properties.A <=
        70
    ) {

        chartObservation.textContent =
            `${properties.symbol}-${properties.A} nằm trong vùng có `
            +
            `năng lượng liên kết riêng cao của bộ dữ liệu: `
            +
            `${value.toFixed(3)} MeV/nucleon.`;

        return;
    }


    chartObservation.textContent =
        `${properties.symbol}-${properties.A}: `
        +
        `Eₗₖ/A = ${value.toFixed(3)} MeV/nucleon. `
        +
        `Hãy chọn thêm các hạt nhân khác để so sánh.`;
}


// ======================================================
// 14. NHIỆM VỤ 1
// ======================================================

function populateTask1NuclideSelect() {

    task1NuclideSelect.innerHTML =
        "";


    const task1Ids =
    [
        "He-4",
        "C-12",
        "O-16",
        "Ca-40",
        "Fe-56",
        "Ni-62",
        "Pb-208",
        "U-238"
    ];


    for (
        const id
        of
        task1Ids
    ) {

        const nuclide =
            getNuclideById(
                id
            );


        if (
            !nuclide
        ) {

            continue;
        }


        const option =
            document.createElement(
                "option"
            );


        option.value =
            nuclide.id;


        option.textContent =
            `${nuclide.symbol}-${nuclide.A} — ${nuclide.vietnameseName}`;


        task1NuclideSelect.appendChild(
            option
        );
    }


    task1NuclideSelect.value =
        "C-12";
}


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
        normalized === ""
    ) {

        return NaN;
    }


    return Number(
        normalized
    );
}


function clearTask1Feedback() {

    const feedbackElements =
    [
        task1MassDefectFeedback,
        task1BindingEnergyFeedback,
        task1BindingEnergyPerNucleonFeedback
    ];


    for (
        const element
        of
        feedbackElements
    ) {

        element.textContent =
            "";


        element.classList.remove(
            "correct",
            "review",
            "invalid"
        );
    }
}


function resetTask1Display() {

    task1Nuclide =
        null;


    task1Properties =
        null;


    task1GivenData.hidden =
        true;


    task1Result.hidden =
        true;


    task1MassDefectInput.value =
        "";


    task1BindingEnergyInput.value =
        "";


    task1BindingEnergyPerNucleonInput.value =
        "";


    clearTask1Feedback();


    task1Status.textContent =
        "Chưa thiết lập nhiệm vụ";
}


function setupTask1() {

    task1Nuclide =
        getNuclideById(
            task1NuclideSelect.value
        );


    if (
        !task1Nuclide
    ) {

        alert(
            "Không tìm thấy dữ liệu hạt nhân."
        );


        return;
    }


    task1Properties =
        calculateNuclideProperties(
            task1Nuclide
        );


    task1NuclideDisplay.textContent =
        `${task1Nuclide.symbol}-${task1Nuclide.A}`;


    task1ADisplay.textContent =
        String(
            task1Nuclide.A
        );


    task1ZDisplay.textContent =
        String(
            task1Nuclide.Z
        );


    task1NDisplay.textContent =
        String(
            task1Properties.N
        );


    task1AtomicMassDisplay.textContent =
        `${task1Nuclide.atomicMassU.toFixed(9)} u`;


    task1MassDefectInput.value =
        "";


    task1BindingEnergyInput.value =
        "";


    task1BindingEnergyPerNucleonInput.value =
        "";


    clearTask1Feedback();


    task1Result.hidden =
        true;


    task1GivenData.hidden =
        false;


    task1Status.textContent =
        "Đã thiết lập. Hãy tự tính ba đại lượng rồi kiểm tra kết quả.";


    nuclideSelect.value =
        task1Nuclide.id;


    updateSelectedNuclideInfo();


    setStatus(
        "Nhiệm vụ 1 đã sẵn sàng",
        "ready"
    );
}


function evaluateTask1Answer(
    studentValue,
    correctValue,
    tolerance,
    feedbackElement
) {

    feedbackElement.classList.remove(
        "correct",
        "review",
        "invalid"
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
            correctValue
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


function checkTask1Answers() {

    if (
        !task1Properties
    ) {

        alert(
            "Hãy nhấn “Thiết lập nhiệm vụ” trước."
        );


        return;
    }


    const studentMassDefect =
        parseStudentNumber(
            task1MassDefectInput.value
        );


    const studentBindingEnergy =
        parseStudentNumber(
            task1BindingEnergyInput.value
        );


    const studentBindingEnergyPerNucleon =
        parseStudentNumber(
            task1BindingEnergyPerNucleonInput.value
        );


    const massDefectCorrect =
        evaluateTask1Answer(
            studentMassDefect,
            task1Properties.massDefectU,
            0.0005,
            task1MassDefectFeedback
        );


    const bindingEnergyCorrect =
        evaluateTask1Answer(
            studentBindingEnergy,
            task1Properties.bindingEnergyMeV,
            0.5,
            task1BindingEnergyFeedback
        );


    const bindingEnergyPerNucleonCorrect =
        evaluateTask1Answer(
            studentBindingEnergyPerNucleon,
            task1Properties.bindingEnergyPerNucleonMeV,
            0.01,
            task1BindingEnergyPerNucleonFeedback
        );


    const correctCount =
        [
            massDefectCorrect,
            bindingEnergyCorrect,
            bindingEnergyPerNucleonCorrect
        ].filter(
            value =>
                value
        ).length;


    showTask1Solution();


    task1Result.hidden =
        false;


    task1Status.textContent =
        `Đã kiểm tra: ${correctCount}/3 đại lượng phù hợp với kết quả tính từ dữ liệu.`;


    if (
        correctCount ===
        3
    ) {

        task1Conclusion.textContent =
            "Ba kết quả đều phù hợp trong giới hạn làm tròn. "
            +
            "Em đã sử dụng đúng dữ liệu khối lượng để xác định độ hụt khối, "
            +
            "năng lượng liên kết và năng lượng liên kết riêng.";

    } else {

        task1Conclusion.textContent =
            "Hãy đối chiếu lại từng bước tính bên dưới. "
            +
            "Sai khác nhỏ có thể do làm tròn, còn sai khác lớn thường xuất hiện "
            +
            "khi nhầm số neutron N = A − Z, nhầm khối lượng nguyên tử với khối lượng hạt nhân, "
            +
            "hoặc quên chia năng lượng liên kết cho A khi tính Eₗₖ/A.";
    }


    setStatus(
        "Đã kiểm tra Nhiệm vụ 1",
        "finished"
    );
}


function showTask1Solution() {

    const p =
        task1Properties;


    task1CorrectMassDefect.textContent =
        `${p.massDefectU.toFixed(6)} u`;


    task1CorrectBindingEnergy.textContent =
        `${p.bindingEnergyMeV.toFixed(3)} MeV`;


    task1CorrectBindingEnergyPerNucleon.textContent =
        `${p.bindingEnergyPerNucleonMeV.toFixed(3)} MeV/nucleon`;


    const protonMassContribution =
        p.Z *
        HYDROGEN_ATOM_MASS_U;


    const neutronMassContribution =
        p.N *
        NEUTRON_MASS_U;


    task1Solution.innerHTML =
        `
        <p>
            <strong>Bước 1.</strong>
            N = A − Z
            = ${p.A} − ${p.Z}
            = ${p.N}.
        </p>

        <p>
            <strong>Bước 2.</strong>
            Zm<sub>H</sub> + Nm<sub>n</sub>
            =
            ${p.Z} × ${HYDROGEN_ATOM_MASS_U}
            +
            ${p.N} × ${NEUTRON_MASS_U}
        </p>

        <p>
            =
            ${protonMassContribution.toFixed(9)}
            +
            ${neutronMassContribution.toFixed(9)}
            =
            ${p.freeNucleonMassU.toFixed(9)} u.
        </p>

        <p>
            <strong>Bước 3.</strong>
            Δm
            =
            ${p.freeNucleonMassU.toFixed(9)}
            −
            ${p.atomicMassU.toFixed(9)}
            =
            ${p.massDefectU.toFixed(6)} u.
        </p>

        <p>
            <strong>Bước 4.</strong>
            E<sub>lk</sub>
            =
            ${p.massDefectU.toFixed(6)}
            ×
            ${U_TO_MEV}
            ≈
            ${p.bindingEnergyMeV.toFixed(3)} MeV.
        </p>

        <p>
            <strong>Bước 5.</strong>
            E<sub>lk</sub>/A
            =
            ${p.bindingEnergyMeV.toFixed(3)}
            /
            ${p.A}
            ≈
            ${p.bindingEnergyPerNucleonMeV.toFixed(3)}
            MeV/nucleon.
        </p>
        `;
}


function clearTask1Answers() {

    task1MassDefectInput.value =
        "";


    task1BindingEnergyInput.value =
        "";


    task1BindingEnergyPerNucleonInput.value =
        "";


    clearTask1Feedback();


    task1Result.hidden =
        true;


    if (
        task1Properties
    ) {

        task1Status.textContent =
            "Đã xóa kết quả. Em có thể tính và nhập lại.";
    }
}


// ======================================================
// 15. NHIỆM VỤ 2
// ======================================================

const TASK2_NUCLIDE_IDS =
[
    "He-4",
    "Fe-56",
    "Ni-62",
    "U-238"
];


function populateTask2AnswerSelects() {

    const selects =
    [
        task2HighestTotalSelect,
        task2HighestSpecificSelect
    ];


    for (
        const select
        of
        selects
    ) {

        select.innerHTML =
            `<option value="">
                -- Chọn câu trả lời --
            </option>`;


        for (
            const id
            of
            TASK2_NUCLIDE_IDS
        ) {

            const nuclide =
                getNuclideById(
                    id
                );


            if (
                !nuclide
            ) {

                continue;
            }


            const option =
                document.createElement(
                    "option"
                );


            option.value =
                nuclide.id;


            option.textContent =
                `${nuclide.symbol}-${nuclide.A}`;


            select.appendChild(
                option
            );
        }
    }
}


function clearTask2Feedback() {

    const feedbackElements =
    [
        task2HighestTotalFeedback,
        task2HighestSpecificFeedback,
        task2RelationshipFeedback
    ];


    for (
        const element
        of
        feedbackElements
    ) {

        element.textContent =
            "";


        element.classList.remove(
            "correct",
            "review",
            "invalid"
        );
    }
}


function resetTask2Display() {

    task2Data =
        [];


    task2Result.hidden =
        true;


    task2TableBody.innerHTML =
        "";


    task2HighestTotalSelect.value =
        "";


    task2HighestSpecificSelect.value =
        "";


    task2RelationshipSelect.value =
        "";


    clearTask2Feedback();


    task2ConclusionBox.hidden =
        true;


    task2Conclusion.textContent =
        "";


    task2Status.textContent =
        "Chưa thực hiện";


    if (
        task2TotalChart !==
        null
    ) {

        task2TotalChart.destroy();


        task2TotalChart =
            null;
    }


    if (
        task2SpecificChart !==
        null
    ) {

        task2SpecificChart.destroy();


        task2SpecificChart =
            null;
    }
}


function buildTask2Data() {

    return TASK2_NUCLIDE_IDS
        .map(
            id => {

                const nuclide =
                    getNuclideById(
                        id
                    );


                if (
                    !nuclide
                ) {

                    return null;
                }


                const properties =
                    calculateNuclideProperties(
                        nuclide
                    );


                return {

                    id:
                        nuclide.id,

                    label:
                        `${nuclide.symbol}-${nuclide.A}`,

                    A:
                        nuclide.A,

                    bindingEnergy:
                        properties.bindingEnergyMeV,

                    bindingEnergyPerNucleon:
                        properties.bindingEnergyPerNucleonMeV

                };
            }
        )
        .filter(
            item =>
                item !== null
        );
}


function createTask2TotalChart(
    data
) {

    if (
        task2TotalChart !==
        null
    ) {

        task2TotalChart.destroy();
    }


    task2TotalChart =
        new Chart(
            task2TotalChartCanvas
                .getContext(
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
                                "Năng lượng liên kết Eₗₖ (MeV)",

                            data:
                                data.map(
                                    item =>
                                        item.bindingEnergy
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
                                    "Eₗₖ (MeV)"

                            }

                        },

                        x:
                        {

                            title:
                            {

                                display:
                                    true,

                                text:
                                    "Hạt nhân"

                            }

                        }

                    }

                }

            }
        );
}


function createTask2SpecificChart(
    data
) {

    if (
        task2SpecificChart !==
        null
    ) {

        task2SpecificChart.destroy();
    }


    task2SpecificChart =
        new Chart(
            task2SpecificChartCanvas
                .getContext(
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
                                "Năng lượng liên kết riêng Eₗₖ/A",

                            data:
                                data.map(
                                    item =>
                                        item.bindingEnergyPerNucleon
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


                    scales:
                    {

                        y:
                        {

                            beginAtZero:
                                true,

                            max:
                                10,

                            title:
                            {

                                display:
                                    true,

                                text:
                                    "Eₗₖ/A (MeV/nucleon)"

                            }

                        },

                        x:
                        {

                            title:
                            {

                                display:
                                    true,

                                text:
                                    "Hạt nhân"

                            }

                        }

                    }

                }

            }
        );
}


function setupTask2() {

    resetTask2Display();


    task2Data =
        buildTask2Data();


    if (
        task2Data.length !==
        TASK2_NUCLIDE_IDS.length
    ) {

        alert(
            "Thiếu dữ liệu cho một hoặc nhiều hạt nhân của Nhiệm vụ 2."
        );


        return;
    }


    for (
        const item
        of
        task2Data
    ) {

        const row =
            document.createElement(
                "tr"
            );


        row.innerHTML =
            `
            <td>${item.label}</td>
            <td>${item.A}</td>
            <td>${item.bindingEnergy.toFixed(3)}</td>
            <td>${item.bindingEnergyPerNucleon.toFixed(3)}</td>
            `;


        task2TableBody.appendChild(
            row
        );
    }


    createTask2TotalChart(
        task2Data
    );


    createTask2SpecificChart(
        task2Data
    );


    task2Result.hidden =
        false;


    task2Status.textContent =
        "Đã tạo dữ liệu. Hãy quan sát bảng và hai đồ thị rồi trả lời ba câu hỏi.";


    setStatus(
        "Nhiệm vụ 2 đã sẵn sàng",
        "ready"
    );
}


// ======================================================
// HÀM KIỂM TRA LỰA CHỌN DÙNG CHUNG
// ======================================================

function evaluateChoice(
    selectedValue,
    correctValue,
    feedbackElement
) {

    feedbackElement.classList.remove(
        "correct",
        "review",
        "invalid"
    );


    if (
        selectedValue ===
        ""
    ) {

        feedbackElement.textContent =
            "Em chưa chọn câu trả lời.";


        feedbackElement.classList.add(
            "invalid"
        );


        return false;
    }


    if (
        selectedValue ===
        correctValue
    ) {

        feedbackElement.textContent =
            "✓ Nhận xét phù hợp.";


        feedbackElement.classList.add(
            "correct"
        );


        return true;
    }


    feedbackElement.textContent =
        "Hãy đối chiếu lại dữ liệu và đồ thị.";


    feedbackElement.classList.add(
        "review"
    );


    return false;
}


function checkTask2Answers() {

    if (
        task2Data.length ===
        0
    ) {

        alert(
            "Hãy nhấn “Tạo bảng so sánh” trước."
        );


        return;
    }


    const highestTotal =
        task2Data.reduce(
            (
                best,
                current
            ) =>
                current.bindingEnergy >
                best.bindingEnergy
                    ?
                    current
                    :
                    best
        );


    const highestSpecific =
        task2Data.reduce(
            (
                best,
                current
            ) =>
                current.bindingEnergyPerNucleon >
                best.bindingEnergyPerNucleon
                    ?
                    current
                    :
                    best
        );


    const totalCorrect =
        evaluateChoice(
            task2HighestTotalSelect.value,
            highestTotal.id,
            task2HighestTotalFeedback
        );


    const specificCorrect =
        evaluateChoice(
            task2HighestSpecificSelect.value,
            highestSpecific.id,
            task2HighestSpecificFeedback
        );


    const relationshipCorrect =
        evaluateChoice(
            task2RelationshipSelect.value,
            "no",
            task2RelationshipFeedback
        );


    const correctCount =
        [
            totalCorrect,
            specificCorrect,
            relationshipCorrect
        ].filter(
            value =>
                value
        ).length;


    task2ConclusionBox.hidden =
        false;


    task2Status.textContent =
        `Đã kiểm tra: ${correctCount}/3 nhận xét phù hợp.`;


    task2Conclusion.textContent =
        `Trong bốn hạt nhân đang xét, ${highestTotal.label} có năng lượng liên kết tổng cộng lớn nhất, `
        +
        `nhưng ${highestSpecific.label} có năng lượng liên kết riêng lớn nhất. `
        +
        `Điều này cho thấy Eₗₖ và Eₗₖ/A mang hai ý nghĩa khác nhau. `
        +
        `Không thể chỉ dựa vào Eₗₖ tổng cộng để so sánh năng lượng liên kết trung bình trên mỗi nucleon.`;


    setStatus(
        "Đã kiểm tra Nhiệm vụ 2",
        "finished"
    );
}


function resetTask2Answers() {

    task2HighestTotalSelect.value =
        "";


    task2HighestSpecificSelect.value =
        "";


    task2RelationshipSelect.value =
        "";


    clearTask2Feedback();


    task2ConclusionBox.hidden =
        true;


    task2Conclusion.textContent =
        "";


    if (
        task2Data.length >
        0
    ) {

        task2Status.textContent =
            "Đã xóa câu trả lời. Hãy quan sát lại bảng và đồ thị.";
    }
}


// ======================================================
// 16. NHIỆM VỤ 3
// ======================================================

function classifyTask3Region(
    A
) {

    if (
        A <=
        20
    ) {

        return "Hạt nhân nhẹ";
    }


    if (
        A <=
        90
    ) {

        return "Vùng số khối trung bình";
    }


    return "Hạt nhân nặng";
}


// ======================================================
// XÂY DỮ LIỆU NHIỆM VỤ 3
// ======================================================

function buildTask3Data() {

    return NUCLEAR_DATA
        .map(
            nuclide => {

                const properties =
                    calculateNuclideProperties(
                        nuclide
                    );


                return {

                    id:
                        nuclide.id,

                    label:
                        `${nuclide.symbol}-${nuclide.A}`,

                    A:
                        nuclide.A,

                    Z:
                        nuclide.Z,

                    bindingEnergyPerNucleon:
                        properties.bindingEnergyPerNucleonMeV,

                    region:
                        classifyTask3Region(
                            nuclide.A
                        )

                };
            }
        )
        .sort(
            (
                first,
                second
            ) =>
                first.A -
                second.A
        );
}


// ======================================================
// XÓA FEEDBACK NHIỆM VỤ 3
// ======================================================

function clearTask3Feedback() {

    const feedbackElements =
    [
        task3PeakRegionFeedback,
        task3LightTrendFeedback,
        task3HeavyTrendFeedback,
        task3EnergyDirectionFeedback
    ];


    for (
        const element
        of
        feedbackElements
    ) {

        element.textContent =
            "";


        element.classList.remove(
            "correct",
            "review",
            "invalid"
        );
    }
}


// ======================================================
// RESET NHIỆM VỤ 3
// ======================================================

function resetTask3Display() {

    task3Data =
        [];


    task3Result.hidden =
        true;


    task3NuclideCount.textContent =
        "—";


    task3MaximumNuclide.textContent =
        "—";


    task3MaximumValue.textContent =
        "—";


    task3TableBody.innerHTML =
        "";


    task3PeakRegionSelect.value =
        "";


    task3LightTrendSelect.value =
        "";


    task3HeavyTrendSelect.value =
        "";


    task3EnergyDirectionSelect.value =
        "";


    clearTask3Feedback();


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
// ĐỒ THỊ NHIỆM VỤ 3
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


    const chartData =
        data.map(
            item => ({

                x:
                    item.A,

                y:
                    item.bindingEnergyPerNucleon,

                label:
                    item.label

            })
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

                    datasets:
                    [

                        {
                            label:
                                "Hạt nhân đại diện",

                            data:
                                chartData,

                            borderWidth:
                                2,

                            pointRadius:
                                5,

                            pointHoverRadius:
                                7,

                            showLine:
                                true,

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


                    parsing:
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

                                        const point =
                                            context.raw;


                                        return (
                                            `${point.label}: `
                                            +
                                            `A = ${point.x}, `
                                            +
                                            `Eₗₖ/A = ${point.y.toFixed(3)} MeV/nucleon`
                                        );
                                    }

                            }

                        }

                    },


                    scales:
                    {

                        x:
                        {

                            type:
                                "linear",

                            min:
                                0,

                            max:
                                250,

                            title:
                            {

                                display:
                                    true,

                                text:
                                    "Số khối A"

                            }

                        },


                        y:
                        {

                            min:
                                0,

                            max:
                                10,

                            title:
                            {

                                display:
                                    true,

                                text:
                                    "Eₗₖ/A (MeV/nucleon)"

                            }

                        }

                    }

                }

            }
        );
}


// ======================================================
// THIẾT LẬP NHIỆM VỤ 3
// ======================================================

function setupTask3() {

    resetTask3Display();


    task3Data =
        buildTask3Data();


    if (
        task3Data.length ===
        0
    ) {

        alert(
            "Không có dữ liệu hạt nhân để khảo sát."
        );


        return;
    }


    const maximumPoint =
        task3Data.reduce(
            (
                best,
                current
            ) =>
                current.bindingEnergyPerNucleon >
                best.bindingEnergyPerNucleon
                    ?
                    current
                    :
                    best
        );


    task3NuclideCount.textContent =
        String(
            task3Data.length
        );


    task3MaximumNuclide.textContent =
        maximumPoint.label;


    task3MaximumValue.textContent =
        `${maximumPoint.bindingEnergyPerNucleon.toFixed(3)} MeV/nucleon`;


    task3TableBody.innerHTML =
        "";


    for (
        const item
        of
        task3Data
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
                ${item.A}
            </td>

            <td>
                ${item.Z}
            </td>

            <td>
                ${item.bindingEnergyPerNucleon.toFixed(3)}
            </td>

            <td>
                ${item.region}
            </td>
            `;


        task3TableBody.appendChild(
            row
        );
    }


    createTask3Chart(
        task3Data
    );


    task3Result.hidden =
        false;


    task3Status.textContent =
        "Đã tạo đồ thị. Hãy quan sát xu hướng rồi trả lời các câu hỏi.";


    setStatus(
        "Nhiệm vụ 3 đã sẵn sàng",
        "ready"
    );
}


// ======================================================
// KIỂM TRA NHIỆM VỤ 3
// ======================================================

function checkTask3Answers() {

    if (
        task3Data.length ===
        0
    ) {

        alert(
            "Hãy nhấn “Khảo sát toàn bộ dữ liệu” trước."
        );


        return;
    }


    const peakCorrect =
        evaluateChoice(
            task3PeakRegionSelect.value,
            "medium",
            task3PeakRegionFeedback
        );


    const lightTrendCorrect =
        evaluateChoice(
            task3LightTrendSelect.value,
            "increase",
            task3LightTrendFeedback
        );


    const heavyTrendCorrect =
        evaluateChoice(
            task3HeavyTrendSelect.value,
            "decrease",
            task3HeavyTrendFeedback
        );


    const energyDirectionCorrect =
        evaluateChoice(
            task3EnergyDirectionSelect.value,
            "light-fusion-heavy-fission",
            task3EnergyDirectionFeedback
        );


    const correctCount =
        [
            peakCorrect,
            lightTrendCorrect,
            heavyTrendCorrect,
            energyDirectionCorrect
        ].filter(
            value =>
                value
        ).length;


    const maximumPoint =
        task3Data.reduce(
            (
                best,
                current
            ) =>
                current.bindingEnergyPerNucleon >
                best.bindingEnergyPerNucleon
                    ?
                    current
                    :
                    best
        );


    task3ConclusionBox.hidden =
        false;


    task3Status.textContent =
        `Đã kiểm tra: ${correctCount}/4 nhận xét phù hợp.`;


    task3Conclusion.textContent =
        `Trong bộ dữ liệu đại diện hiện tại, Eₗₖ/A tăng nhanh từ vùng hạt nhân nhẹ `
        +
        `và đạt vùng giá trị cao quanh các hạt nhân có số khối trung bình; `
        +
        `${maximumPoint.label} có Eₗₖ/A lớn nhất trong chính bộ dữ liệu này, `
        +
        `với ${maximumPoint.bindingEnergyPerNucleon.toFixed(3)} MeV/nucleon. `
        +
        `Về phía các hạt nhân rất nặng, Eₗₖ/A nhìn chung giảm. `
        +
        `Xu hướng đó giúp giải thích vì sao sự kết hợp của một số hạt nhân nhẹ `
        +
        `và sự phân chia của một số hạt nhân rất nặng có thể tạo ra sản phẩm `
        +
        `có tổng năng lượng liên kết lớn hơn và giải phóng năng lượng.`;


    setStatus(
        "Đã kiểm tra Nhiệm vụ 3",
        "finished"
    );
}


// ======================================================
// LÀM LẠI NHIỆM VỤ 3
// ======================================================

function resetTask3Answers() {

    task3PeakRegionSelect.value =
        "";


    task3LightTrendSelect.value =
        "";


    task3HeavyTrendSelect.value =
        "";


    task3EnergyDirectionSelect.value =
        "";


    clearTask3Feedback();


    task3ConclusionBox.hidden =
        true;


    task3Conclusion.textContent =
        "";


    if (
        task3Data.length >
        0
    ) {

        task3Status.textContent =
            "Đã xóa câu trả lời. Hãy quan sát lại đồ thị và dữ liệu.";
    }
}


// ======================================================
// 17. CHUYỂN CHẾ ĐỘ
// ======================================================

function setMode(
    mode
) {

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


    if (
        mode ===
        "explore"
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
        mode ===
        "experiment"
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
        mode ===
        "validation"
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


        setStatus(
            "Chế độ kiểm chứng",
            "ready"
        );
    }
}


// ======================================================
// 18. ĐẶT LẠI MÔ PHỎNG
// ======================================================

function resetSimulation() {

    nuclideSelect.value =
        "Fe-56";


    currentProperties =
        null;


    updateSelectedNuclideInfo();


    setMode(
        "explore"
    );
}


// ======================================================
// 19. EVENT LISTENER
// ======================================================

nuclideSelect.addEventListener(
    "change",
    updateSelectedNuclideInfo
);


calculateButton.addEventListener(
    "click",
    calculateCurrentNuclide
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


// ======================================================
// EVENT - NHIỆM VỤ 1
// ======================================================

setupTask1Button.addEventListener(
    "click",
    setupTask1
);


checkTask1Button.addEventListener(
    "click",
    checkTask1Answers
);


clearTask1AnswersButton.addEventListener(
    "click",
    clearTask1Answers
);


// ======================================================
// EVENT - NHIỆM VỤ 2
// ======================================================

setupTask2Button.addEventListener(
    "click",
    setupTask2
);


checkTask2Button.addEventListener(
    "click",
    checkTask2Answers
);


resetTask2AnswersButton.addEventListener(
    "click",
    resetTask2Answers
);


// ======================================================
// EVENT - NHIỆM VỤ 3
// ======================================================

setupTask3Button.addEventListener(
    "click",
    setupTask3
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
// 20. KHỞI TẠO
// ======================================================

populateNuclideSelect();


populateTask1NuclideSelect();


populateTask2AnswerSelects();


resetTask1Display();


resetTask2Display();


resetTask3Display();


updateSelectedNuclideInfo();


setMode(
    "explore"
);