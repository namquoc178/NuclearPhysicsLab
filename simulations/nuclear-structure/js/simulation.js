console.log(
    "SIMULATION.JS - NUCLEAR STRUCTURE EXPLORE VERSION 1"
);


// ======================================================
// CẤU HÌNH MÀU SẮC
// ======================================================

const NUCLEAR_DRAW_COLORS = {

    protonFill:
        "#fee2e2",

    protonStroke:
        "#b91c1c",

    neutronFill:
        "#dbeafe",

    neutronStroke:
        "#1d4ed8",

    text:
        "#0f172a",

    secondaryText:
        "#64748b",

    nucleusGlow:
        "rgba(59, 130, 246, 0.08)"

};


// ======================================================
// TẠO DANH SÁCH NUCLEON
//
// Phân bố p/n xen kẽ tương đối đều
// trong hình minh họa.
// ======================================================

function buildNucleonSequence(
    A,
    Z
) {

    const sequence = [];


    for (
        let index = 0;
        index < A;
        index++
    ) {

        const previousProtons =
            Math.floor(
                index * Z / A
            );


        const nextProtons =
            Math.floor(
                (index + 1) * Z / A
            );


        if (
            nextProtons >
            previousProtons
        ) {

            sequence.push(
                "p"
            );

        } else {

            sequence.push(
                "n"
            );
        }
    }


    return sequence;
}


// ======================================================
// BÁN KÍNH HẠT NUCLEON TRÊN CANVAS
// ======================================================

function getNucleonVisualRadius(
    A
) {

    if (A <= 4) {
        return 17;
    }


    if (A <= 20) {
        return 12;
    }


    if (A <= 60) {
        return 8;
    }


    if (A <= 140) {
        return 6;
    }


    return 5;
}


// ======================================================
// BÁN KÍNH VÙNG PHÂN BỐ
// ======================================================

function getNucleusVisualRadius(
    A
) {

    if (A <= 4) {
        return 42;
    }


    if (A <= 20) {
        return 85;
    }


    if (A <= 60) {
        return 115;
    }


    if (A <= 140) {
        return 135;
    }


    return 150;
}


// ======================================================
// VẼ MỘT NUCLEON
// ======================================================

function drawNucleon(
    context,
    x,
    y,
    radius,
    type,
    showLetter
) {

    const isProton =
        type === "p";


    context.beginPath();


    context.arc(
        x,
        y,
        radius,
        0,
        Math.PI * 2
    );


    context.fillStyle =
        isProton
            ?
            NUCLEAR_DRAW_COLORS.protonFill
            :
            NUCLEAR_DRAW_COLORS.neutronFill;


    context.fill();


    context.strokeStyle =
        isProton
            ?
            NUCLEAR_DRAW_COLORS.protonStroke
            :
            NUCLEAR_DRAW_COLORS.neutronStroke;


    context.lineWidth =
        1.5;


    context.stroke();


    if (
        showLetter
    ) {

        context.fillStyle =
            isProton
                ?
                "#991b1b"
                :
                "#1e3a8a";


        context.textAlign =
            "center";


        context.textBaseline =
            "middle";


        context.font =
            `bold ${Math.max(
                9,
                radius
            )}px Arial`;


        context.fillText(
            type,
            x,
            y
        );
    }
}


// ======================================================
// VẼ HẠT NHÂN
// ======================================================

function drawNucleus(
    context,
    centerX,
    centerY,
    properties,
    maxRadius = 150
) {

    const A =
        properties.A;


    const Z =
        properties.Z;


    const sequence =
        buildNucleonSequence(
            A,
            Z
        );


    const particleRadius =
        getNucleonVisualRadius(
            A
        );


    const nucleusRadius =
        Math.min(
            maxRadius,
            getNucleusVisualRadius(
                A
            )
        );


    // Vùng nền

    context.beginPath();


    context.arc(
        centerX,
        centerY,
        nucleusRadius + 16,
        0,
        Math.PI * 2
    );


    context.fillStyle =
        NUCLEAR_DRAW_COLORS.nucleusGlow;


    context.fill();


    const goldenAngle =
        Math.PI *
        (
            3 -
            Math.sqrt(5)
        );


    sequence.forEach(
        (
            type,
            index
        ) => {

            let x;
            let y;


            if (
                A === 1
            ) {

                x =
                    centerX;

                y =
                    centerY;

            } else {

                const fraction =
                    (
                        index + 0.5
                    )
                    /
                    A;


                const radialDistance =
                    nucleusRadius
                    *
                    Math.sqrt(
                        fraction
                    )
                    *
                    0.91;


                const angle =
                    index
                    *
                    goldenAngle;


                x =
                    centerX
                    +
                    radialDistance
                    *
                    Math.cos(
                        angle
                    );


                y =
                    centerY
                    +
                    radialDistance
                    *
                    Math.sin(
                        angle
                    );
            }


            drawNucleon(
                context,
                x,
                y,
                particleRadius,
                type,
                A <= 20
            );
        }
    );
}


// ======================================================
// XÓA CANVAS
// ======================================================

function clearNuclearCanvas(
    canvas,
    context
) {

    context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    context.fillStyle =
        "#f8fbff";


    context.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
}


// ======================================================
// VẼ CANVAS CHÍNH
// ======================================================

function renderMainNucleus(
    canvas,
    context,
    properties
) {

    clearNuclearCanvas(
        canvas,
        context
    );


    context.textAlign =
        "center";


    context.textBaseline =
        "alphabetic";


    context.fillStyle =
        NUCLEAR_DRAW_COLORS.text;


    context.font =
        "bold 24px Arial";


    context.fillText(
        `${properties.vietnameseName} – ${properties.label}`,
        canvas.width / 2,
        42
    );


    drawNucleus(
        context,
        canvas.width / 2,
        255,
        properties,
        150
    );


    context.fillStyle =
        NUCLEAR_DRAW_COLORS.secondaryText;


    context.font =
        "15px Arial";


    context.fillText(
        `${properties.protonNumber} proton + ${properties.neutronNumber} neutron`,
        canvas.width / 2,
        455
    );


    if (
        properties.A > 60
    ) {

        context.fillText(
            "Các nucleon được thu nhỏ để có thể biểu diễn toàn bộ hạt nhân.",
            canvas.width / 2,
            480
        );
    }
}


// ======================================================
// VẼ CANVAS SO SÁNH
// ======================================================

function renderComparisonNuclei(
    canvas,
    context,
    first,
    second
) {

    clearNuclearCanvas(
        canvas,
        context
    );


    context.fillStyle =
        NUCLEAR_DRAW_COLORS.text;


    context.textAlign =
        "center";


    context.font =
        "bold 21px Arial";


    context.fillText(
        first.label,
        canvas.width * 0.27,
        42
    );


    context.fillText(
        second.label,
        canvas.width * 0.73,
        42
    );


    drawNucleus(
        context,
        canvas.width * 0.27,
        225,
        first,
        110
    );


    drawNucleus(
        context,
        canvas.width * 0.73,
        225,
        second,
        110
    );


    context.strokeStyle =
        "#cbd5e1";


    context.setLineDash([
        7,
        7
    ]);


    context.beginPath();


    context.moveTo(
        canvas.width / 2,
        80
    );


    context.lineTo(
        canvas.width / 2,
        385
    );


    context.stroke();


    context.setLineDash([]);


    context.fillStyle =
        NUCLEAR_DRAW_COLORS.secondaryText;


    context.font =
        "14px Arial";


    context.fillText(
        `${first.Z} p + ${first.N} n`,
        canvas.width * 0.27,
        390
    );


    context.fillText(
        `${second.Z} p + ${second.N} n`,
        canvas.width * 0.73,
        390
    );
}