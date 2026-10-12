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


    if (!element) {

        throw new Error(
            `Thiếu phần tử HTML có id="${id}"`
        );
    }


    return element;
}


// ======================================================
// MAIN CONTROLS
// ======================================================

const elementSelect =
    getRequiredElement(
        "elementSelect"
    );


const isotopeSelect =
    getRequiredElement(
        "isotopeSelect"
    );


const resetExploreButton =
    getRequiredElement(
        "resetExploreButton"
    );


const nucleusCanvas =
    getRequiredElement(
        "nucleusCanvas"
    );


const nucleusContext =
    nucleusCanvas.getContext(
        "2d"
    );


const nucleusTitle =
    getRequiredElement(
        "nucleusTitle"
    );


const nucleusSubtitle =
    getRequiredElement(
        "nucleusSubtitle"
    );


const stabilityBadge =
    getRequiredElement(
        "stabilityBadge"
    );


// ======================================================
// PROPERTY DISPLAY
// ======================================================

const nuclearNotation =
    getRequiredElement(
        "nuclearNotation"
    );


const protonDisplay =
    getRequiredElement(
        "protonDisplay"
    );


const neutronDisplay =
    getRequiredElement(
        "neutronDisplay"
    );


const massNumberDisplay =
    getRequiredElement(
        "massNumberDisplay"
    );


const elementNameDisplay =
    getRequiredElement(
        "elementNameDisplay"
    );


const relationZ =
    getRequiredElement(
        "relationZ"
    );


const relationN =
    getRequiredElement(
        "relationN"
    );


const relationA =
    getRequiredElement(
        "relationA"
    );


const relationCalculation =
    getRequiredElement(
        "relationCalculation"
    );


// ======================================================
// COMPARISON
// ======================================================

const compareElementSelect =
    getRequiredElement(
        "compareElementSelect"
    );


const compareIsotope1Select =
    getRequiredElement(
        "compareIsotope1Select"
    );


const compareIsotope2Select =
    getRequiredElement(
        "compareIsotope2Select"
    );


const comparisonCanvas =
    getRequiredElement(
        "comparisonCanvas"
    );


const comparisonContext =
    comparisonCanvas.getContext(
        "2d"
    );


const compareHeader1 =
    getRequiredElement(
        "compareHeader1"
    );


const compareHeader2 =
    getRequiredElement(
        "compareHeader2"
    );


const compareZ1 =
    getRequiredElement(
        "compareZ1"
    );


const compareZ2 =
    getRequiredElement(
        "compareZ2"
    );


const compareN1 =
    getRequiredElement(
        "compareN1"
    );


const compareN2 =
    getRequiredElement(
        "compareN2"
    );


const compareA1 =
    getRequiredElement(
        "compareA1"
    );


const compareA2 =
    getRequiredElement(
        "compareA2"
    );


const compareZComment =
    getRequiredElement(
        "compareZComment"
    );


const compareNComment =
    getRequiredElement(
        "compareNComment"
    );


const compareAComment =
    getRequiredElement(
        "compareAComment"
    );


const isotopeConclusion =
    getRequiredElement(
        "isotopeConclusion"
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
// POPULATE ELEMENT SELECT
// ======================================================

function populateElementSelect(
    selectElement
) {

    selectElement.innerHTML =
        "";


    for (
        const element
        of
        getAllNuclearElements()
    ) {

        const option =
            document.createElement(
                "option"
            );


        option.value =
            element.symbol;


        option.textContent =
            `${element.vietnameseName} (${element.symbol})`;


        selectElement.appendChild(
            option
        );
    }
}


// ======================================================
// POPULATE ISOTOPE SELECT
// ======================================================

function populateIsotopeSelect(
    selectElement,
    symbol
) {

    const element =
        getNuclearElementBySymbol(
            symbol
        );


    selectElement.innerHTML =
        "";


    if (!element) {
        return;
    }


    for (
        const isotope
        of
        element.isotopes
    ) {

        const option =
            document.createElement(
                "option"
            );


        option.value =
            String(
                isotope.A
            );


        option.textContent =
            isotope.commonName
                ?
                `${isotope.label} – ${isotope.commonName}`
                :
                isotope.label;


        selectElement.appendChild(
            option
        );
    }
}


// ======================================================
// CATEGORY LABEL
// ======================================================

function updateStabilityBadge(
    category
) {

    stabilityBadge.classList.remove(
        "stable",
        "radioactive"
    );


    if (
        category ===
        "stable"
    ) {

        stabilityBadge.textContent =
            "Bền";


        stabilityBadge.classList.add(
            "stable"
        );

    } else {

        stabilityBadge.textContent =
            "Phóng xạ";


        stabilityBadge.classList.add(
            "radioactive"
        );
    }
}


// ======================================================
// UPDATE MAIN NUCLEUS
// ======================================================

function updateMainNucleus() {

    const symbol =
        elementSelect.value;


    const A =
        Number(
            isotopeSelect.value
        );


    const properties =
        calculateNuclearProperties(
            symbol,
            A
        );


    nucleusTitle.textContent =
        `${properties.vietnameseName} – ${properties.label}`;


    nucleusSubtitle.textContent =
        `${properties.protonNumber} proton, `
        +
        `${properties.neutronNumber} neutron, `
        +
        `${properties.nucleonNumber} nucleon`;


    updateStabilityBadge(
        properties.category
    );


    nuclearNotation.innerHTML =
        properties.notationHtml;


    protonDisplay.textContent =
        String(
            properties.protonNumber
        );


    neutronDisplay.textContent =
        String(
            properties.neutronNumber
        );


    massNumberDisplay.textContent =
        String(
            properties.nucleonNumber
        );


    elementNameDisplay.textContent =
        properties.vietnameseName;


    relationZ.textContent =
        `Z = ${properties.Z}`;


    relationN.textContent =
        `N = ${properties.N}`;


    relationA.textContent =
        `A = ${properties.A}`;


    relationCalculation.innerHTML =
        `A = Z + N = `
        +
        `${properties.Z} + ${properties.N} = `
        +
        `<strong>${properties.A}</strong>`
        +
        ` &nbsp;&nbsp; | &nbsp;&nbsp; `
        +
        `N = A − Z = `
        +
        `${properties.A} − ${properties.Z} = `
        +
        `<strong>${properties.N}</strong>`;


    renderMainNucleus(
        nucleusCanvas,
        nucleusContext,
        properties
    );
}


// ======================================================
// RESET MAIN
// ======================================================

function resetExplore() {

    elementSelect.value =
        "C";


    populateIsotopeSelect(
        isotopeSelect,
        "C"
    );


    isotopeSelect.value =
        "12";


    updateMainNucleus();
}


// ======================================================
// COMPARISON ELEMENTS
// Chỉ lấy nguyên tố có từ 2 đồng vị trở lên.
// ======================================================

function populateComparisonElements() {

    compareElementSelect.innerHTML =
        "";


    const elements =
        getAllNuclearElements()
            .filter(
                element =>
                    element.isotopes.length >=
                    2
            );


    for (
        const element
        of
        elements
    ) {

        const option =
            document.createElement(
                "option"
            );


        option.value =
            element.symbol;


        option.textContent =
            `${element.vietnameseName} (${element.symbol})`;


        compareElementSelect.appendChild(
            option
        );
    }
}


// ======================================================
// CẬP NHẬT SELECT SO SÁNH
// ======================================================

function updateComparisonIsotopeSelectors() {

    const symbol =
        compareElementSelect.value;


    populateIsotopeSelect(
        compareIsotope1Select,
        symbol
    );


    populateIsotopeSelect(
        compareIsotope2Select,
        symbol
    );


    const element =
        getNuclearElementBySymbol(
            symbol
        );


    if (
        element
        &&
        element.isotopes.length >=
        2
    ) {

        compareIsotope1Select.value =
            String(
                element.isotopes[0].A
            );


        compareIsotope2Select.value =
            String(
                element.isotopes[
                    element.isotopes.length - 1
                ].A
            );
    }


    updateComparison();
}


// ======================================================
// UPDATE COMPARISON
// ======================================================

function updateComparison() {

    const symbol =
        compareElementSelect.value;


    const A1 =
        Number(
            compareIsotope1Select.value
        );


    const A2 =
        Number(
            compareIsotope2Select.value
        );


    const first =
        calculateNuclearProperties(
            symbol,
            A1
        );


    const second =
        calculateNuclearProperties(
            symbol,
            A2
        );


    const comparison =
        compareNuclei(
            first,
            second
        );


    compareHeader1.textContent =
        first.label;


    compareHeader2.textContent =
        second.label;


    compareZ1.textContent =
        String(
            first.Z
        );


    compareZ2.textContent =
        String(
            second.Z
        );


    compareN1.textContent =
        String(
            first.N
        );


    compareN2.textContent =
        String(
            second.N
        );


    compareA1.textContent =
        String(
            first.A
        );


    compareA2.textContent =
        String(
            second.A
        );


    compareZComment.textContent =
        first.Z === second.Z
            ?
            "Giống nhau"
            :
            "Khác nhau";


    compareNComment.textContent =
        first.N === second.N
            ?
            "Giống nhau"
            :
            `Khác ${Math.abs(
                second.N - first.N
            )}`;


    compareAComment.textContent =
        first.A === second.A
            ?
            "Giống nhau"
            :
            `Khác ${Math.abs(
                second.A - first.A
            )}`;


    renderComparisonNuclei(
        comparisonCanvas,
        comparisonContext,
        first,
        second
    );


    if (
        comparison.areSameNuclide
    ) {

        isotopeConclusion.innerHTML =
            `<strong>${first.label}</strong> và `
            +
            `<strong>${second.label}</strong> `
            +
            `là cùng một hạt nhân. `
            +
            `Hãy chọn hai số khối khác nhau để so sánh đồng vị.`;

        return;
    }


    if (
        comparison.areIsotopes
    ) {

        isotopeConclusion.innerHTML =
            `<strong>${first.label}</strong> và `
            +
            `<strong>${second.label}</strong> `
            +
            `là hai đồng vị của ${first.vietnameseName}: `
            +
            `chúng có cùng Z = ${first.Z} `
            +
            `nhưng khác số neutron `
            +
            `(${first.N} và ${second.N}), `
            +
            `nên số khối A cũng khác nhau.`;

    } else {

        isotopeConclusion.textContent =
            "Hai hạt nhân đang chọn không thỏa điều kiện đồng vị.";
    }
}


// ======================================================
// MODE
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
// EVENTS - MAIN
// ======================================================

elementSelect.addEventListener(
    "change",

    () => {

        populateIsotopeSelect(
            isotopeSelect,
            elementSelect.value
        );


        updateMainNucleus();
    }
);


isotopeSelect.addEventListener(
    "change",
    updateMainNucleus
);


resetExploreButton.addEventListener(
    "click",
    resetExplore
);


// ======================================================
// EVENTS - COMPARISON
// ======================================================

compareElementSelect.addEventListener(
    "change",
    updateComparisonIsotopeSelectors
);


compareIsotope1Select.addEventListener(
    "change",
    updateComparison
);


compareIsotope2Select.addEventListener(
    "change",
    updateComparison
);


// ======================================================
// EVENTS - MODE
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
// KHỞI TẠO
// ======================================================

populateElementSelect(
    elementSelect
);


populateComparisonElements();


resetExplore();


compareElementSelect.value =
    "H";


updateComparisonIsotopeSelectors();


setMode(
    "explore"
);