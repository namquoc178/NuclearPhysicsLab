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
        !element
    ) {

        throw new Error(
            `Thiếu phần tử HTML có id="${id}"`
        );
    }


    return element;
}


// ======================================================
// CONTROL
// ======================================================

const decayTypeSelect =
    getRequiredElement(
        "decayTypeSelect"
    );


const decayExampleSelect =
    getRequiredElement(
        "decayExampleSelect"
    );


const playAnimationButton =
    getRequiredElement(
        "playAnimationButton"
    );


const resetAnimationButton =
    getRequiredElement(
        "resetAnimationButton"
    );


// ======================================================
// SIMULATION
// ======================================================

const selectedDecayTitle =
    getRequiredElement(
        "selectedDecayTitle"
    );


const selectedDecayDescription =
    getRequiredElement(
        "selectedDecayDescription"
    );


const decaySymbolBadge =
    getRequiredElement(
        "decaySymbolBadge"
    );


const decayCanvas =
    getRequiredElement(
        "decayCanvas"
    );


const decayContext =
    decayCanvas.getContext(
        "2d"
    );


const phaseParent =
    getRequiredElement(
        "phaseParent"
    );


const phaseTransformation =
    getRequiredElement(
        "phaseTransformation"
    );


const phaseDaughter =
    getRequiredElement(
        "phaseDaughter"
    );


// ======================================================
// EQUATION
// ======================================================

const decayEquation =
    getRequiredElement(
        "decayEquation"
    );


const decayEquationNote =
    getRequiredElement(
        "decayEquationNote"
    );


// ======================================================
// TABLE
// ======================================================

const parentADisplay =
    getRequiredElement(
        "parentADisplay"
    );


const deltaADisplay =
    getRequiredElement(
        "deltaADisplay"
    );


const daughterADisplay =
    getRequiredElement(
        "daughterADisplay"
    );


const parentZDisplay =
    getRequiredElement(
        "parentZDisplay"
    );


const deltaZDisplay =
    getRequiredElement(
        "deltaZDisplay"
    );


const daughterZDisplay =
    getRequiredElement(
        "daughterZDisplay"
    );


const parentNDisplay =
    getRequiredElement(
        "parentNDisplay"
    );


const deltaNDisplay =
    getRequiredElement(
        "deltaNDisplay"
    );


const daughterNDisplay =
    getRequiredElement(
        "daughterNDisplay"
    );


// ======================================================
// COMPOSITION
// ======================================================

const parentNuclideDisplay =
    getRequiredElement(
        "parentNuclideDisplay"
    );


const parentCompositionDisplay =
    getRequiredElement(
        "parentCompositionDisplay"
    );


const daughterNuclideDisplay =
    getRequiredElement(
        "daughterNuclideDisplay"
    );


const daughterCompositionDisplay =
    getRequiredElement(
        "daughterCompositionDisplay"
    );


const physicsExplanation =
    getRequiredElement(
        "physicsExplanation"
    );


// ======================================================
// MODE
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
// TRẠNG THÁI
// ======================================================

let currentDecayExample =
    null;


let currentDecayProperties =
    null;


let animationFrameId =
    null;


let animationRunning =
    false;


const DECAY_ANIMATION_DURATION =
    4200;


// ======================================================
// ĐỊNH DẠNG DELTA
// ======================================================

function formatSignedNumber(
    value
) {

    if (
        value >
        0
    ) {

        return `+${value}`;
    }


    return String(
        value
    );
}


// ======================================================
// POPULATE EXAMPLES
// ======================================================

function populateDecayExamples() {

    const selectedType =
        decayTypeSelect.value;


    const examples =
        RADIOACTIVE_DECAY_EXAMPLES.filter(
            example =>
                example.type ===
                selectedType
        );


    decayExampleSelect.innerHTML =
        "";


    for (
        const example
        of
        examples
    ) {

        const option =
            document.createElement(
                "option"
            );


        option.value =
            example.id;


        option.textContent =
            example.title;


        decayExampleSelect.appendChild(
            option
        );
    }


    if (
        examples.length >
        0
    ) {

        decayExampleSelect.value =
            examples[0].id;
    }
}


// ======================================================
// UPDATE PHASE
// ======================================================

function updatePhaseIndicator(
    progress
) {

    phaseParent.classList.remove(
        "active"
    );


    phaseTransformation.classList.remove(
        "active"
    );


    phaseDaughter.classList.remove(
        "active"
    );


    if (
        progress <
        0.30
    ) {

        phaseParent.classList.add(
            "active"
        );

    } else if (
        progress <
        0.70
    ) {

        phaseTransformation.classList.add(
            "active"
        );

    } else {

        phaseDaughter.classList.add(
            "active"
        );
    }
}


// ======================================================
// PHYSICS EXPLANATION
// ======================================================

function buildPhysicsExplanation(
    example,
    properties
) {

    switch (
        example.type
    ) {

        case "alpha":

            return `
                <p>
                    Hạt nhân mẹ phát ra một hạt α,
                    tương ứng với hạt nhân
                    <strong>helium-4 gồm 2 proton và 2 neutron</strong>.
                </p>

                <p class="physics-equation">
                    A → A − 4
                    &nbsp;&nbsp;&nbsp;
                    Z → Z − 2
                </p>

                <p>
                    Vì mất 2 proton và 2 neutron nên
                    số neutron của hạt nhân còn lại
                    cũng giảm 2.
                </p>
            `;


        case "betaMinus":

            return `
                <p>
                    Trong phân rã β⁻,
                    một neutron trong hạt nhân
                    chuyển thành proton.
                </p>

                <p class="physics-equation">
                    n → p + e<sup>−</sup> + ν̅<sub>e</sub>
                </p>

                <p>
                    Vì một neutron trở thành proton nên
                    <strong>A không đổi</strong>,
                    nhưng <strong>Z tăng 1</strong>
                    và N giảm 1.
                </p>

                <p>
                    Electron phát ra trong quá trình này
                    <strong>không được mô hình hóa như một electron
                    đã nằm sẵn trong hạt nhân</strong>.
                </p>
            `;


        case "betaPlus":

            return `
                <p>
                    Trong phân rã β⁺,
                    một proton trong hạt nhân
                    chuyển thành neutron.
                </p>

                <p class="physics-equation">
                    p → n + e<sup>+</sup> + ν<sub>e</sub>
                </p>

                <p>
                    Vì một proton trở thành neutron nên
                    <strong>A không đổi</strong>,
                    nhưng <strong>Z giảm 1</strong>
                    và N tăng 1.
                </p>
            `;


        case "gamma":

            return `
                <p>
                    Hạt nhân ban đầu ở
                    <strong>trạng thái kích thích</strong>.
                    Khi chuyển xuống trạng thái năng lượng thấp hơn,
                    nó phát ra một photon γ.
                </p>

                <p class="physics-equation">
                    <sup>A</sup><sub>Z</sub>X*
                    →
                    <sup>A</sup><sub>Z</sub>X
                    + γ
                </p>

                <p>
                    Không có proton hoặc neutron nào bị mất
                    hay đổi loại, vì vậy
                    <strong>A, Z và N đều không đổi</strong>.
                </p>

                <p>
                    Hạt nhân trước và sau vẫn là
                    <strong>cùng một nuclide</strong>,
                    chỉ khác trạng thái năng lượng.
                </p>
            `;


        default:

            return "";
    }
}


// ======================================================
// UPDATE PAGE
// ======================================================

function updateDecayDisplay() {

    currentDecayExample =
        getDecayExampleById(
            decayExampleSelect.value
        );


    if (
        !currentDecayExample
    ) {

        return;
    }


    currentDecayProperties =
        calculateDecayExampleProperties(
            currentDecayExample
        );


    const decayType =
        currentDecayProperties.decayType;


    const parent =
        currentDecayExample.parent;


    const daughter =
        currentDecayExample.daughter;


    const parentN =
        currentDecayProperties.parentNeutrons;


    const daughterN =
        currentDecayProperties.daughterNeutrons;


    const deltaN =
        daughterN
        -
        parentN;


    // TITLE

    selectedDecayTitle.textContent =
        currentDecayExample.title;


    selectedDecayDescription.textContent =
        decayType.description;


    decaySymbolBadge.textContent =
        decayType.symbol;


    // EQUATION

    decayEquation.innerHTML =
        currentDecayProperties.equationHtml;


    decayEquationNote.textContent =
        currentDecayExample.note;


    // A

    parentADisplay.textContent =
        String(
            parent.A
        );


    deltaADisplay.textContent =
        formatSignedNumber(
            currentDecayProperties.deltaA
        );


    daughterADisplay.textContent =
        String(
            daughter.A
        );


    // Z

    parentZDisplay.textContent =
        String(
            parent.Z
        );


    deltaZDisplay.textContent =
        formatSignedNumber(
            currentDecayProperties.deltaZ
        );


    daughterZDisplay.textContent =
        String(
            daughter.Z
        );


    // N

    parentNDisplay.textContent =
        String(
            parentN
        );


    deltaNDisplay.textContent =
        formatSignedNumber(
            deltaN
        );


    daughterNDisplay.textContent =
        String(
            daughterN
        );


    // COMPOSITION

    parentNuclideDisplay.innerHTML =
        buildDecayNuclearNotationHtml(
            parent
        );


    parentCompositionDisplay.textContent =
        `${parent.Z} proton + ${parentN} neutron`;


    daughterNuclideDisplay.innerHTML =
        buildDecayNuclearNotationHtml(
            daughter
        );


    daughterCompositionDisplay.textContent =
        `${daughter.Z} proton + ${daughterN} neutron`;


    // EXPLANATION

    physicsExplanation.innerHTML =
        buildPhysicsExplanation(
            currentDecayExample,
            currentDecayProperties
        );


    resetDecayAnimation();
}


// ======================================================
// RESET ANIMATION
// ======================================================

function resetDecayAnimation() {

    if (
        animationFrameId !==
        null
    ) {

        cancelAnimationFrame(
            animationFrameId
        );


        animationFrameId =
            null;
    }


    animationRunning =
        false;


    playAnimationButton.disabled =
        false;


    playAnimationButton.textContent =
        "▶ Quan sát phân rã";


    updatePhaseIndicator(
        0
    );


    if (
        currentDecayExample
    ) {

        renderDecayInitialState(
            decayCanvas,
            decayContext,
            currentDecayExample
        );
    }
}


// ======================================================
// PLAY ANIMATION
// ======================================================

function playDecayAnimation() {

    if (
        !currentDecayExample
        ||
        animationRunning
    ) {

        return;
    }


    animationRunning =
        true;


    playAnimationButton.disabled =
        true;


    playAnimationButton.textContent =
        "Đang mô phỏng...";


    const startTime =
        performance.now();


    function frame(
        currentTime
    ) {

        const elapsed =
            currentTime
            -
            startTime;


        const progress =
            Math.min(
                1,
                elapsed
                /
                DECAY_ANIMATION_DURATION
            );


        renderDecayAnimationFrame(
            decayCanvas,
            decayContext,
            currentDecayExample,
            progress
        );


        updatePhaseIndicator(
            progress
        );


        if (
            progress <
            1
        ) {

            animationFrameId =
                requestAnimationFrame(
                    frame
                );

        } else {

            animationRunning =
                false;


            animationFrameId =
                null;


            playAnimationButton.disabled =
                false;


            playAnimationButton.textContent =
                "▶ Xem lại";
        }
    }


    animationFrameId =
        requestAnimationFrame(
            frame
        );
}


// ======================================================
// MODE
// ======================================================

function setMode(
    mode
) {

    const buttons =
    [
        exploreModeButton,
        experimentModeButton,
        validationModeButton
    ];


    const panels =
    [
        explorePanel,
        experimentPanel,
        validationPanel
    ];


    buttons.forEach(
        button =>
            button.classList.remove(
                "active"
            )
    );


    panels.forEach(
        panel =>
            panel.classList.remove(
                "active"
            )
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

    } else if (
        mode ===
        "experiment"
    ) {

        experimentModeButton.classList.add(
            "active"
        );


        experimentPanel.classList.add(
            "active"
        );

    } else {

        validationModeButton.classList.add(
            "active"
        );


        validationPanel.classList.add(
            "active"
        );
    }
}


// ======================================================
// EVENT
// ======================================================

decayTypeSelect.addEventListener(
    "change",

    () => {

        populateDecayExamples();

        updateDecayDisplay();
    }
);


decayExampleSelect.addEventListener(
    "change",
    updateDecayDisplay
);


playAnimationButton.addEventListener(
    "click",
    playDecayAnimation
);


resetAnimationButton.addEventListener(
    "click",
    resetDecayAnimation
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
// KHỞI TẠO
// ======================================================

decayTypeSelect.value =
    "alpha";


populateDecayExamples();


updateDecayDisplay();


setMode(
    "explore"
);