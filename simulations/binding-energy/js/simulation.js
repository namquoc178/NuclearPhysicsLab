// ======================================================
// simulation.js
// BÀI 8 - MINH HỌA CẤU TẠO HẠT NHÂN
// ======================================================


// ======================================================
// TẠO DANH SÁCH NUCLEON
// ======================================================

function buildNucleons(
    Z,
    N
) {

    const nucleons =
        [];


    for (
        let i = 0;
        i < Z;
        i++
    ) {

        nucleons.push(
            {
                type:
                    "proton"
            }
        );
    }


    for (
        let i = 0;
        i < N;
        i++
    ) {

        nucleons.push(
            {
                type:
                    "neutron"
            }
        );
    }


    /*
     * Xáo trộn để proton và neutron
     * phân bố xen kẽ trực quan hơn.
     */

    for (
        let i =
            nucleons.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (
                    i + 1
                )
            );


        const temporary =
            nucleons[i];


        nucleons[i] =
            nucleons[j];


        nucleons[j] =
            temporary;
    }


    return nucleons;
}


// ======================================================
// TẠO VỊ TRÍ THEO XOẮN ỐC
// ======================================================

function createNucleonPositions(
    count,
    centerX,
    centerY,
    maximumRadius
) {

    const positions =
        [];


    if (
        count <= 0
    ) {

        return positions;
    }


    /*
     * Chỉ vẽ tối đa 120 điểm riêng biệt.
     *
     * Với hạt nhân nặng, mỗi điểm có thể đại diện
     * cho nhiều nucleon. app.js sẽ cung cấp
     * số lượng điểm thích hợp.
     */

    for (
        let i = 0;
        i < count;
        i++
    ) {

        const fraction =
            (
                i + 0.5
            )
            /
            count;


        const radius =
            maximumRadius *
            Math.sqrt(
                fraction
            );


        const angle =
            i *
            2.399963229728653;


        positions.push(
            {

                x:
                    centerX +
                    radius *
                    Math.cos(
                        angle
                    ),

                y:
                    centerY +
                    radius *
                    Math.sin(
                        angle
                    )

            }
        );
    }


    return positions;
}