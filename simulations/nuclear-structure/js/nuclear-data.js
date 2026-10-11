// ======================================================
// nuclear-data.js
// BÀI 1 - CẤU TẠO HẠT NHÂN VÀ ĐỒNG VỊ
// EXPLORE DATA VERSION 2
// ======================================================
//
// Bộ dữ liệu gồm các đồng vị đại diện,
// ưu tiên các hạt nhân thường gặp trong nội dung
// Vật lí hạt nhân THPT.
//
// Đây KHÔNG phải danh mục đầy đủ mọi đồng vị.
// ======================================================

const NUCLEAR_STRUCTURE_ELEMENTS = {

    H: {
        symbol: "H",
        name: "Hydrogen",
        vietnameseName: "Hiđrô",
        Z: 1,

        isotopes: [
            {
                A: 1,
                label: "H-1",
                commonName: "Proti",
                category: "stable"
            },
            {
                A: 2,
                label: "H-2",
                commonName: "Đơteri",
                category: "stable"
            },
            {
                A: 3,
                label: "H-3",
                commonName: "Triti",
                category: "radioactive"
            }
        ]
    },


    He: {
        symbol: "He",
        name: "Helium",
        vietnameseName: "Heli",
        Z: 2,

        isotopes: [
            {
                A: 3,
                label: "He-3",
                category: "stable"
            },
            {
                A: 4,
                label: "He-4",
                category: "stable"
            }
        ]
    },


    C: {
        symbol: "C",
        name: "Carbon",
        vietnameseName: "Cacbon",
        Z: 6,

        isotopes: [
            {
                A: 12,
                label: "C-12",
                category: "stable"
            },
            {
                A: 13,
                label: "C-13",
                category: "stable"
            },
            {
                A: 14,
                label: "C-14",
                category: "radioactive"
            }
        ]
    },


    O: {
        symbol: "O",
        name: "Oxygen",
        vietnameseName: "Oxi",
        Z: 8,

        isotopes: [
            {
                A: 16,
                label: "O-16",
                category: "stable"
            },
            {
                A: 17,
                label: "O-17",
                category: "stable"
            },
            {
                A: 18,
                label: "O-18",
                category: "stable"
            }
        ]
    },


    Ne: {
        symbol: "Ne",
        name: "Neon",
        vietnameseName: "Neon",
        Z: 10,

        isotopes: [
            {
                A: 20,
                label: "Ne-20",
                category: "stable"
            },
            {
                A: 21,
                label: "Ne-21",
                category: "stable"
            },
            {
                A: 22,
                label: "Ne-22",
                category: "stable"
            }
        ]
    },


    Al: {
        symbol: "Al",
        name: "Aluminium",
        vietnameseName: "Nhôm",
        Z: 13,

        isotopes: [
            {
                A: 27,
                label: "Al-27",
                category: "stable"
            }
        ]
    },


    Cl: {
        symbol: "Cl",
        name: "Chlorine",
        vietnameseName: "Clo",
        Z: 17,

        isotopes: [
            {
                A: 35,
                label: "Cl-35",
                category: "stable"
            },
            {
                A: 37,
                label: "Cl-37",
                category: "stable"
            }
        ]
    },


    Fe: {
        symbol: "Fe",
        name: "Iron",
        vietnameseName: "Sắt",
        Z: 26,

        isotopes: [
            {
                A: 54,
                label: "Fe-54",
                category: "stable"
            },
            {
                A: 56,
                label: "Fe-56",
                category: "stable"
            },
            {
                A: 57,
                label: "Fe-57",
                category: "stable"
            },
            {
                A: 58,
                label: "Fe-58",
                category: "stable"
            }
        ]
    },


    Co: {
        symbol: "Co",
        name: "Cobalt",
        vietnameseName: "Coban",
        Z: 27,

        isotopes: [
            {
                A: 59,
                label: "Co-59",
                category: "stable"
            },
            {
                A: 60,
                label: "Co-60",
                category: "radioactive"
            }
        ]
    },


    Sr: {
        symbol: "Sr",
        name: "Strontium",
        vietnameseName: "Stronti",
        Z: 38,

        isotopes: [
            {
                A: 88,
                label: "Sr-88",
                category: "stable"
            },
            {
                A: 90,
                label: "Sr-90",
                category: "radioactive"
            }
        ]
    },


    I: {
        symbol: "I",
        name: "Iodine",
        vietnameseName: "Iốt",
        Z: 53,

        isotopes: [
            {
                A: 127,
                label: "I-127",
                category: "stable"
            },
            {
                A: 131,
                label: "I-131",
                category: "radioactive"
            }
        ]
    },


    Cs: {
        symbol: "Cs",
        name: "Caesium",
        vietnameseName: "Xêsi",
        Z: 55,

        isotopes: [
            {
                A: 133,
                label: "Cs-133",
                category: "stable"
            },
            {
                A: 137,
                label: "Cs-137",
                category: "radioactive"
            }
        ]
    },


    Lu: {
        symbol: "Lu",
        name: "Lutetium",
        vietnameseName: "Luteti",
        Z: 71,

        isotopes: [
            {
                A: 175,
                label: "Lu-175",
                category: "stable"
            },
            {
                A: 177,
                label: "Lu-177",
                category: "radioactive"
            }
        ]
    },


    Au: {
        symbol: "Au",
        name: "Gold",
        vietnameseName: "Vàng",
        Z: 79,

        isotopes: [
            {
                A: 197,
                label: "Au-197",
                category: "stable"
            },
            {
                A: 198,
                label: "Au-198",
                category: "radioactive"
            }
        ]
    },


    Ra: {
        symbol: "Ra",
        name: "Radium",
        vietnameseName: "Radi",
        Z: 88,

        isotopes: [
            {
                A: 223,
                label: "Ra-223",
                category: "radioactive"
            },
            {
                A: 226,
                label: "Ra-226",
                category: "radioactive"
            }
        ]
    },


    U: {
        symbol: "U",
        name: "Uranium",
        vietnameseName: "Urani",
        Z: 92,

        isotopes: [
            {
                A: 235,
                label: "U-235",
                category: "radioactive"
            },
            {
                A: 238,
                label: "U-238",
                category: "radioactive"
            }
        ]
    }

};


// ======================================================
// LẤY NGUYÊN TỐ
// ======================================================

function getNuclearElementBySymbol(symbol) {

    return (
        NUCLEAR_STRUCTURE_ELEMENTS[symbol]
        ||
        null
    );
}


// ======================================================
// LẤY ĐỒNG VỊ
// ======================================================

function getNuclearIsotope(
    symbol,
    A
) {

    const element =
        getNuclearElementBySymbol(
            symbol
        );


    if (!element) {
        return null;
    }


    return (
        element.isotopes.find(
            isotope =>
                isotope.A === Number(A)
        )
        ||
        null
    );
}


// ======================================================
// DANH SÁCH NGUYÊN TỐ
// ======================================================

function getAllNuclearElements() {

    return Object.values(
        NUCLEAR_STRUCTURE_ELEMENTS
    );
}


// ======================================================
// DANH SÁCH TẤT CẢ ĐỒNG VỊ
// ======================================================

function getAllNuclearIsotopes() {

    const result = [];


    for (
        const element
        of
        getAllNuclearElements()
    ) {

        for (
            const isotope
            of
            element.isotopes
        ) {

            result.push({

                symbol:
                    element.symbol,

                elementName:
                    element.name,

                vietnameseName:
                    element.vietnameseName,

                Z:
                    element.Z,

                A:
                    isotope.A,

                label:
                    isotope.label,

                commonName:
                    isotope.commonName || "",

                category:
                    isotope.category

            });
        }
    }


    return result;
}