// ======================================================
// nuclear-data.js
// BÀI 8 - NĂNG LƯỢNG LIÊN KẾT HẠT NHÂN
// ======================================================
//
// Dữ liệu đầu vào:
// Relative atomic masses của các đồng vị.
//
// Nguồn tham chiếu:
// - NIST Atomic Weights and Isotopic Compositions
// - AME2020 Atomic Mass Evaluation
//
// Chú ý:
// atomicMassU là khối lượng NGUYÊN TỬ trung hòa,
// không phải khối lượng hạt nhân.
//
// Các đại lượng:
// - độ hụt khối
// - năng lượng liên kết
// - năng lượng liên kết riêng
//
// KHÔNG được lưu cứng ở đây.
// Chúng sẽ được physics.js tính từ dữ liệu gốc.
// ======================================================


// ======================================================
// CÁC HẰNG SỐ
// ======================================================

// Khối lượng nguyên tử hydrogen-1.
const HYDROGEN_ATOM_MASS_U =
    1.00782503223;


// Khối lượng neutron.
// CODATA 2022.
const NEUTRON_MASS_U =
    1.00866491606;


// Năng lượng tương đương của 1 u.
// Giá trị CODATA 2018, cũng là giá trị AME2020 dùng.
// (CODATA 2022: 931,49410372 MeV; chênh lệch cỡ 1 phần tỷ, không ảnh hưởng kết quả.)
const U_TO_MEV =
    931.49410242;


// ======================================================
// BỘ DỮ LIỆU HẠT NHÂN
// ======================================================

const NUCLEAR_DATA = [

    {
        id: "H-2",
        symbol: "H",
        elementName: "Hydrogen",
        vietnameseName: "Hydrogen",
        A: 2,
        Z: 1,
        atomicMassU: 2.01410177812,
        source: "NIST"
    },

    {
        id: "H-3",
        symbol: "H",
        elementName: "Hydrogen",
        vietnameseName: "Hydrogen",
        A: 3,
        Z: 1,
        atomicMassU: 3.0160492779,
        source: "NIST"
    },

    {
        id: "He-3",
        symbol: "He",
        elementName: "Helium",
        vietnameseName: "Helium",
        A: 3,
        Z: 2,
        atomicMassU: 3.0160293201,
        source: "NIST"
    },

    {
        id: "He-4",
        symbol: "He",
        elementName: "Helium",
        vietnameseName: "Helium",
        A: 4,
        Z: 2,
        atomicMassU: 4.00260325413,
        source: "NIST"
    },

    {
        id: "Li-6",
        symbol: "Li",
        elementName: "Lithium",
        vietnameseName: "Lithium",
        A: 6,
        Z: 3,
        atomicMassU: 6.0151228874,
        source: "NIST"
    },

    {
        id: "Li-7",
        symbol: "Li",
        elementName: "Lithium",
        vietnameseName: "Lithium",
        A: 7,
        Z: 3,
        atomicMassU: 7.0160034366,
        source: "NIST"
    },

    {
        id: "C-12",
        symbol: "C",
        elementName: "Carbon",
        vietnameseName: "Carbon",
        A: 12,
        Z: 6,
        atomicMassU: 12.00000000000,
        source: "NIST"
    },

    {
        id: "O-16",
        symbol: "O",
        elementName: "Oxygen",
        vietnameseName: "Oxygen",
        A: 16,
        Z: 8,
        atomicMassU: 15.99491461957,
        source: "NIST"
    },

    {
        id: "Ne-20",
        symbol: "Ne",
        elementName: "Neon",
        vietnameseName: "Neon",
        A: 20,
        Z: 10,
        atomicMassU: 19.9924401762,
        source: "NIST"
    },

    {
        id: "Ca-40",
        symbol: "Ca",
        elementName: "Calcium",
        vietnameseName: "Calcium",
        A: 40,
        Z: 20,
        atomicMassU: 39.962590863,
        source: "NIST"
    },

    {
        id: "Fe-56",
        symbol: "Fe",
        elementName: "Iron",
        vietnameseName: "Sắt",
        A: 56,
        Z: 26,
        atomicMassU: 55.93493633,
        source: "NIST"
    },

    {
        id: "Ni-62",
        symbol: "Ni",
        elementName: "Nickel",
        vietnameseName: "Nickel",
        A: 62,
        Z: 28,
        atomicMassU: 61.92834537,
        source: "NIST"
    },

    {
        id: "Zr-90",
        symbol: "Zr",
        elementName: "Zirconium",
        vietnameseName: "Zirconium",
        A: 90,
        Z: 40,
        atomicMassU: 89.9046977,
        source: "NIST"
    },

    {
        id: "Sn-120",
        symbol: "Sn",
        elementName: "Tin",
        vietnameseName: "Thiếc",
        A: 120,
        Z: 50,
        atomicMassU: 119.90220163,
        source: "NIST"
    },

    {
        id: "Pb-208",
        symbol: "Pb",
        elementName: "Lead",
        vietnameseName: "Chì",
        A: 208,
        Z: 82,
        atomicMassU: 207.9766525,
        source: "NIST"
    },

    {
        id: "U-235",
        symbol: "U",
        elementName: "Uranium",
        vietnameseName: "Uranium",
        A: 235,
        Z: 92,
        atomicMassU: 235.0439301,
        source: "NIST"
    },

    {
        id: "U-238",
        symbol: "U",
        elementName: "Uranium",
        vietnameseName: "Uranium",
        A: 238,
        Z: 92,
        atomicMassU: 238.0507884,
        source: "NIST"
    }

];


// ======================================================
// TÌM HẠT NHÂN THEO ID
// ======================================================

function getNuclideById(id) {

    return (
        NUCLEAR_DATA.find(
            nuclide =>
                nuclide.id === id
        )
        ||
        null
    );
}