console.log(
    "VALIDATION.JS - BINDING ENERGY VERSION 1"
);


// ======================================================
// THAM CHIẾU BE/A
// ======================================================
//
// Đơn vị:
// keV / nucleon
//
// Các giá trị được lưu ở độ chính xác 1 keV/nucleon,
// phù hợp để đối chiếu với bảng BE/A của AME2020.
//
// Việc dùng số nguyên keV cũng giúp minh họa rõ
// ảnh hưởng của làm tròn.
// ======================================================

const AME2020_REFERENCE_BEA_KEV = {

    "H-2":
        1112,

    "H-3":
        2827,

    "He-3":
        2573,

    "He-4":
        7074,

    "Li-6":
        5332,

    "Li-7":
        5606,

    "C-12":
        7680,

    "O-16":
        7976,

    "Ne-20":
        8032,

    "Ca-40":
        8551,

    "Fe-56":
        8790,

    "Ni-62":
        8795,

    "Zr-90":
        8710,

    "Sn-120":
        8504,

    "Pb-208":
        7867,

    "U-235":
        7591,

    "U-238":
        7570

};


// ======================================================
// DOM
// ======================================================

const runBindingValidationButton =
    document.getElementById(
        "runBindingValidationButton"
    );


const resetBindingValidationButton =
    document.getElementById(
        "resetBindingValidationButton"
    );


const bindingValidationStatus =
    document.getElementById(
        "bindingValidationStatus"
    );


const bindingValidationCount =
    document.getElementById(
        "bindingValidationCount"
    );


const bindingValidationRmse =
    document.getElementById(
        "bindingValidationRmse"
    );


const bindingValidationMeanError =
    document.getElementById(
        "bindingValidationMeanError"
    );


const bindingValidationMaxError =
    document.getElementById(
        "bindingValidationMaxError"
    );


const bindingValidationResult =
    document.getElementById(
        "bindingValidationResult"
    );


const bindingValidationChartCanvas =
    document.getElementById(
        "bindingValidationChart"
    );


const bindingValidationTableBody =
    document.getElementById(
        "bindingValidationTableBody"
    );


const bindingValidationConclusion =
    document.getElementById(
        "bindingValidationConclusion"
    );


// ======================================================
// KIỂM TRA DOM
// ======================================================

const bindingValidationElements =
[
    runBindingValidationButton,
    resetBindingValidationButton,
    bindingValidationStatus,
    bindingValidationCount,
    bindingValidationRmse,
    bindingValidationMeanError,
    bindingValidationMaxError,
    bindingValidationResult,
    bindingValidationChartCanvas,
    bindingValidationTableBody,
    bindingValidationConclusion
];


if (
    bindingValidationElements.some(
        element =>
            element === null
    )
) {

    throw new Error(
        "Thiếu một hoặc nhiều phần tử HTML của chế độ Kiểm chứng Bài 8."
    );
}


// ======================================================
// TRẠNG THÁI
// ======================================================

let bindingValidationChart =
    null;


let bindingValidationData =
    [];


// ======================================================
// RESET
// ======================================================

function resetBindingValidation() {

    bindingValidationData =
        [];


    bindingValidationStatus.textContent =
        "Chưa chạy";


    bindingValidationCount.textContent =
        "0";


    bindingValidationRmse.textContent =
        "—";


    bindingValidationMeanError.textContent =
        "—";


    bindingValidationMaxError.textContent =
        "—";


    bindingValidationTableBody.innerHTML =
        "";


    bindingValidationConclusion.textContent =
        "";


    bindingValidationResult.hidden =
        true;


    if (
        bindingValidationChart !==
        null
    ) {

        bindingValidationChart.destroy();


        bindingValidationChart =
            null;
    }
}


// ======================================================
// TẠO DỮ LIỆU KIỂM CHỨNG
// ======================================================

function buildBindingValidationData() {

    const data =
        [];


    for (
        const nuclide
        of
        NUCLEAR_DATA
    ) {

        const referenceKeV =
            AME2020_REFERENCE_BEA_KEV[
                nuclide.id
            ];


        if (
            !Number.isFinite(
                referenceKeV
            )
        ) {

            console.warn(
                `Không có dữ liệu BE/A tham chiếu cho ${nuclide.id}.`
            );


            continue;
        }


        const properties =
            calculateNuclideProperties(
                nuclide
            );


        const calculatedMeV =
            properties
                .bindingEnergyPerNucleonMeV;


        const calculatedKeV =
            calculatedMeV *
            1000;


        const signedDifference =
            calculatedKeV -
            referenceKeV;


        const absoluteDifference =
            Math.abs(
                signedDifference
            );


        const relativeError =
            absoluteDifference /
            referenceKeV *
            100;


        data.push(
            {

                id:
                    nuclide.id,

                label:
                    `${nuclide.symbol}-${nuclide.A}`,

                A:
                    nuclide.A,

                calculatedKeV,

                referenceKeV,

                signedDifference,

                absoluteDifference,

                relativeError

            }
        );
    }


    return data.sort(
        (
            first,
            second
        ) =>
            first.A -
            second.A
    );
}


// ======================================================
// TRUNG BÌNH
// ======================================================

function calculateValidationMean(
    values
) {

    if (
        values.length ===
        0
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
// RMSE
// ======================================================

function calculateBindingValidationRmse(
    data
) {

    if (
        data.length ===
        0
    ) {

        return NaN;
    }


    let sumSquared =
        0;


    for (
        const item
        of
        data
    ) {

        sumSquared +=
            Math.pow(
                item.signedDifference,
                2
            );
    }


    return Math.sqrt(
        sumSquared /
        data.length
    );
}


// ======================================================
// VẼ ĐỒ THỊ
// ======================================================

function createBindingValidationChart(
    data
) {

    if (
        bindingValidationChart !==
        null
    ) {

        bindingValidationChart.destroy();
    }


    const calculatedData =
        data.map(
            item => ({

                x:
                    item.A,

                y:
                    item.calculatedKeV /
                    1000,

                label:
                    item.label

            })
        );


    const referenceData =
        data.map(
            item => ({

                x:
                    item.A,

                y:
                    item.referenceKeV /
                    1000,

                label:
                    item.label

            })
        );


    bindingValidationChart =
        new Chart(
            bindingValidationChartCanvas
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
                                "Tính từ khối lượng nguyên tử",

                            data:
                                calculatedData,

                            pointRadius:
                                6,

                            pointHoverRadius:
                                8
                        },


                        {
                            label:
                                "Tham chiếu AME2020",

                            data:
                                referenceData,

                            pointRadius:
                                4,

                            pointHoverRadius:
                                7
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
                                            `${context.dataset.label} — `
                                            +
                                            `${point.label}: `
                                            +
                                            `${point.y.toFixed(4)} MeV/nucleon`
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
// CHẠY KIỂM CHỨNG
// ======================================================

function runBindingValidation() {

    bindingValidationStatus.textContent =
        "Đang kiểm chứng...";


    runBindingValidationButton.disabled =
        true;


    try {

        bindingValidationData =
            buildBindingValidationData();


        if (
            bindingValidationData.length ===
            0
        ) {

            throw new Error(
                "Không có dữ liệu phù hợp để kiểm chứng."
            );
        }


        // ==================================================
        // THỐNG KÊ
        // ==================================================

        const absoluteErrors =
            bindingValidationData.map(
                item =>
                    item.absoluteDifference
            );


        const meanAbsoluteError =
            calculateValidationMean(
                absoluteErrors
            );


        const rmse =
            calculateBindingValidationRmse(
                bindingValidationData
            );


        const maximumErrorItem =
            bindingValidationData.reduce(
                (
                    largest,
                    current
                ) =>
                    current.absoluteDifference >
                    largest.absoluteDifference
                        ?
                        current
                        :
                        largest
            );


        // ==================================================
        // BẢNG
        // ==================================================

        bindingValidationTableBody.innerHTML =
            "";


        for (
            const item
            of
            bindingValidationData
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
                    ${item.calculatedKeV.toFixed(3)}
                </td>

                <td>
                    ${item.referenceKeV.toFixed(0)}
                </td>

                <td>
                    ${item.signedDifference.toFixed(3)}
                </td>

                <td>
                    ${item.relativeError.toFixed(4)}
                </td>
                `;


            bindingValidationTableBody
                .appendChild(
                    row
                );
        }


        // ==================================================
        // THỐNG KÊ HIỂN THỊ
        // ==================================================

        bindingValidationCount.textContent =
            String(
                bindingValidationData.length
            );


        bindingValidationRmse.textContent =
            `${rmse.toFixed(3)} keV/nucleon`;


        bindingValidationMeanError.textContent =
            `${meanAbsoluteError.toFixed(3)} keV/nucleon`;


        bindingValidationMaxError.textContent =
            `${maximumErrorItem.absoluteDifference.toFixed(3)} keV/nucleon`;


        // ==================================================
        // ĐỒ THỊ
        // ==================================================

        createBindingValidationChart(
            bindingValidationData
        );


        // ==================================================
        // KẾT LUẬN
        // ==================================================

        bindingValidationConclusion.textContent =
            `Đã kiểm tra ${bindingValidationData.length} hạt nhân. `
            +
            `Sai lệch tuyệt đối trung bình giữa kết quả tính toán `
            +
            `và giá trị tham chiếu là ${meanAbsoluteError.toFixed(3)} keV/nucleon, `
            +
            `RMSE là ${rmse.toFixed(3)} keV/nucleon. `
            +
            `Sai lệch lớn nhất xuất hiện ở ${maximumErrorItem.label}, `
            +
            `với ${maximumErrorItem.absoluteDifference.toFixed(3)} keV/nucleon. `
            +
            `Mức sai khác nhỏ chủ yếu phản ánh việc giá trị tham chiếu `
            +
            `được làm tròn tới 1 keV/nucleon và số chữ số hữu hạn `
            +
            `của dữ liệu khối lượng được sử dụng trong mô phỏng.`;


        bindingValidationResult.hidden =
            false;


        bindingValidationStatus.textContent =
            "Hoàn thành";


        /*
         * Nếu hàm setStatus của app.js tồn tại,
         * cập nhật luôn trạng thái chung.
         */

        if (
            typeof setStatus ===
            "function"
        ) {

            setStatus(
                "Kiểm chứng hoàn thành",
                "finished"
            );
        }

    } catch (
        error
    ) {

        console.error(
            error
        );


        bindingValidationStatus.textContent =
            "Có lỗi";


        alert(
            error.message
        );

    } finally {

        runBindingValidationButton.disabled =
            false;
    }
}


// ======================================================
// EVENT
// ======================================================

runBindingValidationButton.addEventListener(
    "click",
    runBindingValidation
);


resetBindingValidationButton.addEventListener(
    "click",
    resetBindingValidation
);


// ======================================================
// KHỞI TẠO
// ======================================================

resetBindingValidation();