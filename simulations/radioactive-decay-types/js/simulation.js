console.log(
    "SIMULATION.JS - RADIOACTIVE DECAY EXPLORE VERSION 2"
);


// ======================================================
// MÀU SẮC
// ======================================================

const DECAY_CANVAS_COLORS = {

    /*
     * Hạt nhân mẹ:
     * trắng / trung tính.
     */

    parentFill:
        "#ffffff",

    /*
     * Trạng thái đang biến đổi:
     * vàng nhạt.
     */

    transformingFill:
        "#fef3c7",

    /*
     * Hạt nhân con:
     * xanh nhạt để dễ phân biệt.
     */

    daughterFill:
        "#dcfce7",

    parentStroke:
        "#94a3b8",

    transformingStroke:
        "#d97706",

    daughterStroke:
        "#16a34a",

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

    secondary:
        "#64748b",

    radiation:
        "#7c3aed",

    daughterLabel:
        "#15803d",

    transformationLabel:
        "#b45309"

};


// ======================================================
// NỘI SUY
// ======================================================

function decayLerp(
    start,
    end,
    t
) {

    return (
        start
        +
        (
            end - start
        )
        *
        t
    );
}


// ======================================================
// GIỚI HẠN GIÁ TRỊ
// ======================================================

function clampDecayValue(
    value,
    min,
    max
) {

    return Math.max(
        min,
        Math.min(
            max,
            value
        )
    );
}


// ======================================================
// XÓA CANVAS
// ======================================================

function clearDecayCanvas(
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
// THUỘC TÍNH HÌNH ẢNH THEO TRẠNG THÁI
// ======================================================

function getDecayNucleusVisualStyle(
    state
) {

    switch (
        state
    ) {

        case "daughter":

            return {

                fill:
                    DECAY_CANVAS_COLORS.daughterFill,

                stroke:
                    DECAY_CANVAS_COLORS.daughterStroke,

                labelColor:
                    DECAY_CANVAS_COLORS.daughterLabel

            };


        case "transforming":

            return {

                fill:
                    DECAY_CANVAS_COLORS.transformingFill,

                stroke:
                    DECAY_CANVAS_COLORS.transformingStroke,

                labelColor:
                    DECAY_CANVAS_COLORS.transformationLabel

            };


        case "parent":

        default:

            return {

                fill:
                    DECAY_CANVAS_COLORS.parentFill,

                stroke:
                    DECAY_CANVAS_COLORS.parentStroke,

                labelColor:
                    DECAY_CANVAS_COLORS.secondary

            };
    }
}


// ======================================================
// VẼ HẠT NHÂN
// ======================================================

function drawDecayNucleus(
    context,
    x,
    y,
    radius,
    nucleus,
    options = {}
) {

    const excited =
        options.excited ===
        true;


    const state =
        options.state
        ||
        "parent";


    const style =
        getDecayNucleusVisualStyle(
            state
        );


    // --------------------------------------------------
    // QUẦNG SÁNG CHO TRẠNG THÁI KÍCH THÍCH
    // --------------------------------------------------

    if (
        excited
    ) {

        context.beginPath();


        context.arc(
            x,
            y,
            radius + 19,
            0,
            Math.PI * 2
        );


        context.fillStyle =
            "rgba(250, 204, 21, 0.24)";


        context.fill();


        context.beginPath();


        context.arc(
            x,
            y,
            radius + 11,
            0,
            Math.PI * 2
        );


        context.strokeStyle =
            "rgba(217, 119, 6, 0.45)";


        context.lineWidth =
            3;


        context.stroke();
    }


    // --------------------------------------------------
    // HẠT NHÂN
    // --------------------------------------------------

    context.beginPath();


    context.arc(
        x,
        y,
        radius,
        0,
        Math.PI * 2
    );


    context.fillStyle =
        style.fill;


    context.fill();


    context.strokeStyle =
        style.stroke;


    context.lineWidth =
        state === "daughter"
            ?
            4
            :
            3;


    context.stroke();


    // --------------------------------------------------
    // KÍ HIỆU NGUYÊN TỐ
    // --------------------------------------------------

    context.fillStyle =
        DECAY_CANVAS_COLORS.text;


    context.textAlign =
        "center";


    context.textBaseline =
        "alphabetic";


    context.font =
        "bold 25px Arial";


    context.fillText(
        nucleus.symbol,
        x,
        y - 20
    );


    // --------------------------------------------------
    // A Z N
    // --------------------------------------------------

    context.font =
        "15px Arial";


    context.fillText(
        `A = ${nucleus.A}`,
        x,
        y + 9
    );


    context.fillText(
        `Z = ${nucleus.Z}`,
        x,
        y + 31
    );


    context.fillText(
        `N = ${nucleus.A - nucleus.Z}`,
        x,
        y + 53
    );


    // --------------------------------------------------
    // TRẠNG THÁI KÍCH THÍCH
    // --------------------------------------------------

    if (
        excited
    ) {

        context.fillStyle =
            "#a16207";


        context.font =
            "bold 14px Arial";


        context.fillText(
            "TRẠNG THÁI KÍCH THÍCH",
            x,
            y - radius - 28
        );
    }


    // --------------------------------------------------
    // NHÃN HẠT NHÂN CON
    // --------------------------------------------------

    if (
        state ===
        "daughter"
    ) {

        context.fillStyle =
            style.labelColor;


        context.font =
            "bold 13px Arial";


        context.fillText(
            "HẠT NHÂN CON",
            x,
            y + radius + 30
        );
    }


    // --------------------------------------------------
    // NHÃN ĐANG BIẾN ĐỔI
    // --------------------------------------------------

    if (
        state ===
        "transforming"
    ) {

        context.fillStyle =
            style.labelColor;


        context.font =
            "bold 13px Arial";


        context.fillText(
            "ĐANG BIẾN ĐỔI",
            x,
            y + radius + 30
        );
    }
}


// ======================================================
// VẼ NHÃN HẠT NHÂN MẸ
// ======================================================

function drawParentLabel(
    context,
    x,
    y
) {

    context.fillStyle =
        DECAY_CANVAS_COLORS.secondary;


    context.textAlign =
        "center";


    context.font =
        "bold 14px Arial";


    context.fillText(
        "HẠT NHÂN MẸ",
        x,
        y
    );
}


// ======================================================
// HẠT ALPHA
// ======================================================

function drawAlphaParticle(
    context,
    x,
    y
) {

    const particles =
    [
        {
            dx: -11,
            dy: -11,
            type: "p"
        },

        {
            dx: 11,
            dy: -11,
            type: "n"
        },

        {
            dx: -11,
            dy: 11,
            type: "n"
        },

        {
            dx: 11,
            dy: 11,
            type: "p"
        }
    ];


    for (
        const particle
        of
        particles
    ) {

        context.beginPath();


        context.arc(
            x + particle.dx,
            y + particle.dy,
            11,
            0,
            Math.PI * 2
        );


        const proton =
            particle.type ===
            "p";


        context.fillStyle =
            proton
                ?
                DECAY_CANVAS_COLORS.protonFill
                :
                DECAY_CANVAS_COLORS.neutronFill;


        context.fill();


        context.strokeStyle =
            proton
                ?
                DECAY_CANVAS_COLORS.protonStroke
                :
                DECAY_CANVAS_COLORS.neutronStroke;


        context.lineWidth =
            1.5;


        context.stroke();


        context.fillStyle =
            proton
                ?
                "#991b1b"
                :
                "#1e3a8a";


        context.textAlign =
            "center";


        context.textBaseline =
            "middle";


        context.font =
            "bold 10px Arial";


        context.fillText(
            particle.type,
            x + particle.dx,
            y + particle.dy
        );
    }


    context.textBaseline =
        "alphabetic";
}


// ======================================================
// HẠT NHẸ / PHOTON
// ======================================================

function drawEmissionLabel(
    context,
    x,
    y,
    text,
    subtitle = ""
) {

    context.fillStyle =
        DECAY_CANVAS_COLORS.radiation;


    context.textAlign =
        "center";


    context.font =
        "bold 24px Arial";


    context.fillText(
        text,
        x,
        y
    );


    if (
        subtitle
    ) {

        context.fillStyle =
            DECAY_CANVAS_COLORS.secondary;


        context.font =
            "13px Arial";


        context.fillText(
            subtitle,
            x,
            y + 23
        );
    }
}


// ======================================================
// MŨI TÊN BỨC XẠ
// ======================================================

function drawEmissionArrow(
    context,
    startX,
    startY,
    endX,
    endY
) {

    context.save();


    context.strokeStyle =
        DECAY_CANVAS_COLORS.radiation;


    context.fillStyle =
        DECAY_CANVAS_COLORS.radiation;


    context.lineWidth =
        2;


    context.beginPath();


    context.moveTo(
        startX,
        startY
    );


    context.lineTo(
        endX,
        endY
    );


    context.stroke();


    const angle =
        Math.atan2(
            endY - startY,
            endX - startX
        );


    const arrowSize =
        8;


    context.beginPath();


    context.moveTo(
        endX,
        endY
    );


    context.lineTo(
        endX
        -
        arrowSize
        *
        Math.cos(
            angle - Math.PI / 6
        ),
        endY
        -
        arrowSize
        *
        Math.sin(
            angle - Math.PI / 6
        )
    );


    context.lineTo(
        endX
        -
        arrowSize
        *
        Math.cos(
            angle + Math.PI / 6
        ),
        endY
        -
        arrowSize
        *
        Math.sin(
            angle + Math.PI / 6
        )
    );


    context.closePath();


    context.fill();


    context.restore();
}


// ======================================================
// TRẠNG THÁI BAN ĐẦU
// ======================================================

function renderDecayInitialState(
    canvas,
    context,
    example
) {

    clearDecayCanvas(
        canvas,
        context
    );


    context.fillStyle =
        DECAY_CANVAS_COLORS.secondary;


    context.textAlign =
        "center";


    context.font =
        "16px Arial";


    context.fillText(
        "Ban đầu",
        canvas.width / 2,
        50
    );


    drawDecayNucleus(
        context,
        canvas.width / 2,
        270,
        105,
        example.parent,
        {

            excited:
                example.parent.excited,

            state:
                "parent"

        }
    );


    drawParentLabel(
        context,
        canvas.width / 2,
        410
    );
}


// ======================================================
// PHÂN RÃ ALPHA
// ======================================================

function renderAlphaDecay(
    canvas,
    context,
    example,
    progress
) {

    clearDecayCanvas(
        canvas,
        context
    );


    /*
     * Ba giai đoạn:
     *
     * 0.00 - 0.25 : hạt nhân mẹ
     * 0.25 - 0.50 : đang phân rã
     * 0.50 - 1.00 : hạt nhân con + alpha
     */


    let state =
        "parent";


    if (
        progress >=
        0.25
        &&
        progress <
        0.50
    ) {

        state =
            "transforming";

    } else if (
        progress >=
        0.50
    ) {

        state =
            "daughter";
    }


    // --------------------------------------------------
    // TỌA ĐỘ
    // --------------------------------------------------

    const movementProgress =
        clampDecayValue(
            (
                progress - 0.25
            )
            /
            0.75,
            0,
            1
        );


    const daughterX =
        decayLerp(
            450,
            315,
            movementProgress
        );


    /*
     * Với alpha:
     * A giảm 4.
     *
     * Ta cường điệu nhẹ thay đổi kích thước
     * để học sinh dễ nhận biết.
     *
     * Đây KHÔNG phải tỉ lệ bán kính vật lí thật.
     */

    let nucleusRadius =
        105;


    if (
        progress >=
        0.25
    ) {

        const radiusProgress =
            clampDecayValue(
                (
                    progress - 0.25
                )
                /
                0.45,
                0,
                1
            );


        nucleusRadius =
            decayLerp(
                105,
                90,
                radiusProgress
            );
    }


    const displayedNucleus =
        progress <
        0.50
            ?
            example.parent
            :
            example.daughter;


    drawDecayNucleus(
        context,
        daughterX,
        270,
        nucleusRadius,
        displayedNucleus,
        {
            state
        }
    );


    // --------------------------------------------------
    // NHÃN HẠT NHÂN MẸ
    // --------------------------------------------------

    if (
        state ===
        "parent"
    ) {

        drawParentLabel(
            context,
            daughterX,
            410
        );
    }


    // --------------------------------------------------
    // ALPHA TÁCH RA
    // --------------------------------------------------

    if (
        progress >
        0.28
    ) {

        const emissionProgress =
            clampDecayValue(
                (
                    progress - 0.28
                )
                /
                0.72,
                0,
                1
            );


        const alphaX =
            decayLerp(
                505,
                730,
                emissionProgress
            );


        const alphaY =
            decayLerp(
                270,
                245,
                emissionProgress
            );


        drawEmissionArrow(
            context,
            daughterX
            +
            nucleusRadius
            +
            8,
            270,
            alphaX - 32,
            alphaY
        );


        drawAlphaParticle(
            context,
            alphaX,
            alphaY
        );


        context.fillStyle =
            DECAY_CANVAS_COLORS.secondary;


        context.textAlign =
            "center";


        context.font =
            "14px Arial";


        context.fillText(
            "hạt α = 2p + 2n",
            alphaX,
            alphaY + 58
        );
    }


    // --------------------------------------------------
    // GIẢI THÍCH
    // --------------------------------------------------

    context.fillStyle =
        DECAY_CANVAS_COLORS.secondary;


    context.textAlign =
        "center";


    context.font =
        "15px Arial";


    if (
        progress <
        0.25
    ) {

        context.fillText(
            "Hạt nhân mẹ còn nguyên",
            450,
            74
        );

    } else if (
        progress <
        0.50
    ) {

        context.fillText(
            "Cụm 2 proton + 2 neutron bắt đầu tách ra",
            450,
            74
        );

    } else {

        context.fillText(
            "Hạt nhân con có A giảm 4 và Z giảm 2",
            450,
            74
        );
    }


    if (
        progress >=
        0.50
    ) {

        context.fillStyle =
            "#64748b";


        context.font =
            "12px Arial";


        context.fillText(
            "Kích thước hạt nhân con được thu nhỏ cường điệu để trực quan hóa; không theo tỉ lệ vật lí thật.",
            450,
            500
        );
    }
}


// ======================================================
// PHÂN RÃ BETA TRỪ
// ======================================================

function renderBetaMinusDecay(
    canvas,
    context,
    example,
    progress
) {

    clearDecayCanvas(
        canvas,
        context
    );


    let state =
        "parent";


    if (
        progress >=
        0.25
        &&
        progress <
        0.52
    ) {

        state =
            "transforming";

    } else if (
        progress >=
        0.52
    ) {

        state =
            "daughter";
    }


    const nucleus =
        progress <
        0.52
            ?
            example.parent
            :
            example.daughter;


    /*
     * A không đổi nên bán kính giữ nguyên.
     */

    drawDecayNucleus(
        context,
        335,
        270,
        105,
        nucleus,
        {
            state
        }
    );


    if (
        state ===
        "parent"
    ) {

        drawParentLabel(
            context,
            335,
            410
        );
    }


    // --------------------------------------------------
    // n -> p
    // --------------------------------------------------

    if (
        progress >=
        0.18
        &&
        progress <
        0.65
    ) {

        context.fillStyle =
            "#1d4ed8";


        context.textAlign =
            "center";


        context.font =
            "bold 29px Arial";


        context.fillText(
            "n",
            300,
            265
        );


        context.fillStyle =
            DECAY_CANVAS_COLORS.secondary;


        context.font =
            "24px Arial";


        context.fillText(
            "→",
            350,
            265
        );


        context.fillStyle =
            "#b91c1c";


        context.font =
            "bold 29px Arial";


        context.fillText(
            "p",
            400,
            265
        );
    }


    // --------------------------------------------------
    // ELECTRON + PHẢN NEUTRINO
    // --------------------------------------------------

    if (
        progress >
        0.38
    ) {

        const emissionProgress =
            clampDecayValue(
                (
                    progress - 0.38
                )
                /
                0.62,
                0,
                1
            );


        const electronX =
            decayLerp(
                475,
                720,
                emissionProgress
            );


        const neutrinoX =
            decayLerp(
                475,
                760,
                emissionProgress
            );


        drawEmissionArrow(
            context,
            455,
            240,
            electronX - 25,
            205
        );


        drawEmissionArrow(
            context,
            455,
            300,
            neutrinoX - 28,
            355
        );


        drawEmissionLabel(
            context,
            electronX,
            205,
            "e⁻",
            "electron"
        );


        drawEmissionLabel(
            context,
            neutrinoX,
            355,
            "ν̅ₑ",
            "phản neutrino"
        );
    }


    // --------------------------------------------------
    // EXPLANATION
    // --------------------------------------------------

    context.fillStyle =
        DECAY_CANVAS_COLORS.secondary;


    context.textAlign =
        "center";


    context.font =
        "15px Arial";


    if (
        progress <
        0.25
    ) {

        context.fillText(
            "Hạt nhân mẹ",
            335,
            75
        );

    } else if (
        progress <
        0.52
    ) {

        context.fillText(
            "Trong hạt nhân: một neutron chuyển thành proton",
            335,
            75
        );

    } else {

        context.fillText(
            "A không đổi; Z tăng 1; N giảm 1",
            335,
            75
        );
    }
}


// ======================================================
// PHÂN RÃ BETA CỘNG
// ======================================================

function renderBetaPlusDecay(
    canvas,
    context,
    example,
    progress
) {

    clearDecayCanvas(
        canvas,
        context
    );


    let state =
        "parent";


    if (
        progress >=
        0.25
        &&
        progress <
        0.52
    ) {

        state =
            "transforming";

    } else if (
        progress >=
        0.52
    ) {

        state =
            "daughter";
    }


    const nucleus =
        progress <
        0.52
            ?
            example.parent
            :
            example.daughter;


    /*
     * A không đổi:
     * giữ nguyên kích thước.
     */

    drawDecayNucleus(
        context,
        335,
        270,
        105,
        nucleus,
        {
            state
        }
    );


    if (
        state ===
        "parent"
    ) {

        drawParentLabel(
            context,
            335,
            410
        );
    }


    // --------------------------------------------------
    // p -> n
    // --------------------------------------------------

    if (
        progress >=
        0.18
        &&
        progress <
        0.65
    ) {

        context.fillStyle =
            "#b91c1c";


        context.textAlign =
            "center";


        context.font =
            "bold 29px Arial";


        context.fillText(
            "p",
            300,
            265
        );


        context.fillStyle =
            DECAY_CANVAS_COLORS.secondary;


        context.font =
            "24px Arial";


        context.fillText(
            "→",
            350,
            265
        );


        context.fillStyle =
            "#1d4ed8";


        context.font =
            "bold 29px Arial";


        context.fillText(
            "n",
            400,
            265
        );
    }


    // --------------------------------------------------
    // POSITRON + NEUTRINO
    // --------------------------------------------------

    if (
        progress >
        0.38
    ) {

        const emissionProgress =
            clampDecayValue(
                (
                    progress - 0.38
                )
                /
                0.62,
                0,
                1
            );


        const positronX =
            decayLerp(
                475,
                720,
                emissionProgress
            );


        const neutrinoX =
            decayLerp(
                475,
                760,
                emissionProgress
            );


        drawEmissionArrow(
            context,
            455,
            240,
            positronX - 25,
            205
        );


        drawEmissionArrow(
            context,
            455,
            300,
            neutrinoX - 28,
            355
        );


        drawEmissionLabel(
            context,
            positronX,
            205,
            "e⁺",
            "positron"
        );


        drawEmissionLabel(
            context,
            neutrinoX,
            355,
            "νₑ",
            "neutrino"
        );
    }


    context.fillStyle =
        DECAY_CANVAS_COLORS.secondary;


    context.textAlign =
        "center";


    context.font =
        "15px Arial";


    if (
        progress <
        0.25
    ) {

        context.fillText(
            "Hạt nhân mẹ",
            335,
            75
        );

    } else if (
        progress <
        0.52
    ) {

        context.fillText(
            "Trong hạt nhân: một proton chuyển thành neutron",
            335,
            75
        );

    } else {

        context.fillText(
            "A không đổi; Z giảm 1; N tăng 1",
            335,
            75
        );
    }
}


// ======================================================
// CHUYỂN MỨC GAMMA
// ======================================================

function renderGammaDecay(
    canvas,
    context,
    example,
    progress
) {

    clearDecayCanvas(
        canvas,
        context
    );


    const excited =
        progress <
        0.52;


    let state;


    if (
        progress <
        0.25
    ) {

        state =
            "parent";

    } else if (
        progress <
        0.52
    ) {

        state =
            "transforming";

    } else {

        state =
            "daughter";
    }


    /*
     * Gamma:
     * A, Z, N không đổi.
     * Bán kính luôn giữ nguyên.
     */

    drawDecayNucleus(
        context,
        335,
        270,
        105,
        excited
            ?
            example.parent
            :
            example.daughter,
        {

            excited,

            state

        }
    );


    if (
        state ===
        "parent"
    ) {

        drawParentLabel(
            context,
            335,
            410
        );
    }


    // --------------------------------------------------
    // PHOTON GAMMA
    // --------------------------------------------------

    if (
        progress >
        0.34
    ) {

        const gammaProgress =
            clampDecayValue(
                (
                    progress - 0.34
                )
                /
                0.66,
                0,
                1
            );


        const gammaX =
            decayLerp(
                470,
                760,
                gammaProgress
            );


        drawEmissionArrow(
            context,
            455,
            270,
            gammaX - 25,
            270
        );


        drawEmissionLabel(
            context,
            gammaX,
            270,
            "γ",
            "photon gamma"
        );
    }


    context.fillStyle =
        DECAY_CANVAS_COLORS.secondary;


    context.textAlign =
        "center";


    context.font =
        "15px Arial";


    if (
        progress <
        0.25
    ) {

        context.fillText(
            "Hạt nhân mẹ đang ở trạng thái kích thích",
            335,
            75
        );

    } else if (
        progress <
        0.52
    ) {

        context.fillText(
            "Hạt nhân phát photon γ",
            335,
            75
        );

    } else {

        context.fillText(
            "A, Z và N không đổi; trạng thái năng lượng đã thay đổi",
            335,
            75
        );
    }
}


// ======================================================
// RENDER THEO LOẠI
// ======================================================

function renderDecayAnimationFrame(
    canvas,
    context,
    example,
    progress
) {

    const safeProgress =
        clampDecayValue(
            progress,
            0,
            1
        );


    switch (
        example.type
    ) {

        case "alpha":

            renderAlphaDecay(
                canvas,
                context,
                example,
                safeProgress
            );

            break;


        case "betaMinus":

            renderBetaMinusDecay(
                canvas,
                context,
                example,
                safeProgress
            );

            break;


        case "betaPlus":

            renderBetaPlusDecay(
                canvas,
                context,
                example,
                safeProgress
            );

            break;


        case "gamma":

            renderGammaDecay(
                canvas,
                context,
                example,
                safeProgress
            );

            break;


        default:

            renderDecayInitialState(
                canvas,
                context,
                example
            );
    }
}