// =====================================================================
// constants.js – hằng số vật lí dùng chung cho mọi bài
//
// Mỗi hằng số chỉ khai báo một lần ở đây, để hai bài không thể dùng
// hai giá trị khác nhau cho cùng một đại lượng. Tệp này phải được nạp
// trước các tệp dữ liệu của bài (nuclear-data.js, fission-data.js, ...).
// =====================================================================

const NPL_CONSTANTS = Object.freeze({
    // Năng lượng nghỉ của 1 u (MeV). Dùng giá trị CODATA 2018 vì bảng khối
    // lượng AME2020 được tính với giá trị này. CODATA 2022 là 931,49410372 MeV,
    // chênh khoảng 1 phần tỉ, không ảnh hưởng tới mọi chữ số hiển thị trong bài.
    U_TO_MEV: 931.49410242,

    // Khối lượng neutron (u), CODATA 2022.
    NEUTRON_MASS_U: 1.00866491606,

    // Khối lượng nguyên tử hydrogen-1 (u), AME2020.
    HYDROGEN_ATOM_MASS_U: 1.00782503223
});
