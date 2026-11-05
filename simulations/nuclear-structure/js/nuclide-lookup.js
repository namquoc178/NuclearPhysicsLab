// nuclide-lookup.js – tra cứu hạt nhân trong NUBASE2020 (js/nubase-data.js).
// Hàm thuần, không đụng DOM, để kiểm thử được bằng Node.
// Dùng cho "Dựng hạt nhân từ Z và N" (chế độ Khám phá) và Nhiệm vụ 3.

const NUBASE_BY_KEY = new Map(
    NUBASE_NUCLIDES.map((row) => [`${row[0]}-${row[1]}`, row])
);

// Hạt nhân có chu kì bán rã ngắn hơn ngưỡng này không được chọn làm dòng
// luyện tập ở Nhiệm vụ 3 (vẫn hiện trong bảng đầy đủ).
const PRACTICE_MIN_HALF_LIFE_S = 1e-3;
const PRACTICE_ROW_COUNT = 5;

function nubaseRowToNuclide(row) {
    const [Z, A, halfLife, halfLifeSeconds, abundance, modes] = row;
    const symbol = NUBASE_SYMBOLS[Z] || "?";
    return {
        Z,
        A,
        N: A - Z,
        symbol,
        label: Z === 0 ? "neutron" : `${symbol}-${A}`,
        halfLife,
        halfLifeSeconds,
        abundance,
        modes: modes ? modes.split(" ") : [],
        stable: halfLife === "stbl",
        natural: abundance !== null
    };
}

// Tìm hạt nhân theo Z và A. Trả về null nếu NUBASE2020 không có
// (tức là hạt nhân chưa được quan sát).
function findNuclide(Z, A) {
    const row = NUBASE_BY_KEY.get(`${Z}-${A}`);
    return row ? nubaseRowToNuclide(row) : null;
}

// Mọi đồng vị đã biết của nguyên tố có số proton Z, theo thứ tự A tăng dần.
function getKnownIsotopes(Z) {
    return NUBASE_NUCLIDES
        .filter((row) => row[0] === Z)
        .map(nubaseRowToNuclide);
}

function getMaxObservedZ() {
    return NUBASE_NUCLIDES.reduce((max, row) => Math.max(max, row[0]), 0);
}

// ---------------- Hiển thị bằng tiếng Việt ----------------

const HALF_LIFE_UNITS_VI = {
    ys: "× 10⁻²⁴ s", zs: "× 10⁻²¹ s", as: "× 10⁻¹⁸ s", fs: "× 10⁻¹⁵ s",
    ps: "× 10⁻¹² s", ns: "ns", us: "µs", ms: "ms", s: "s",
    m: "phút", h: "giờ", d: "ngày", y: "năm",
    ky: "nghìn năm", My: "triệu năm", Gy: "tỉ năm", Ty: "nghìn tỉ năm",
    Py: "× 10¹⁵ năm", Ey: "× 10¹⁸ năm", Zy: "× 10²¹ năm", Yy: "× 10²⁴ năm"
};

// "12.32 y" -> "12,32 năm"; "9# ms" -> "khoảng 9 ms (ước lượng)"; "stbl" -> "bền".
function formatHalfLifeVi(text) {
    if (text === "stbl") return "bền";
    if (text === "p-unst") return "rã gần như tức thì (phát nucleon)";
    if (!text || text === "?") return "chưa đo được";
    const [rawValue, unit] = text.split(" ");
    let value = rawValue;
    let prefix = "";
    let suffix = "";
    if (value.includes("#")) {
        value = value.replace(/#/g, "");
        prefix = "khoảng ";
        suffix = " (ước lượng)";
    }
    const sign = value.match(/^[<>~]/);
    if (sign) {
        value = value.slice(1);
        prefix = { "<": "dưới ", ">": "trên ", "~": "khoảng " }[sign[0]];
    }
    const unitText = HALF_LIFE_UNITS_VI[unit] || unit || "";
    return `${prefix}${value.replace(".", ",")} ${unitText}${suffix}`.trim();
}

const DECAY_MODES_VI = {
    "B-": "β⁻", "B+": "β⁺", "e+": "β⁺", EC: "bắt electron", A: "α",
    p: "phát proton", "2p": "phát 2 proton", "3p": "phát 3 proton",
    n: "phát neutron", "2n": "phát 2 neutron", "3n": "phát 3 neutron", "4n": "phát 4 neutron",
    SF: "phân hạch tự phát", IT: "chuyển về mức năng lượng thấp hơn",
    "2B-": "β⁻ kép", "2B+": "β⁺ kép", "B-n": "β⁻ rồi phát neutron",
    "B-2n": "β⁻ rồi phát 2 neutron", "B+p": "β⁺ rồi phát proton",
    "B+2p": "β⁺ rồi phát 2 proton", "B-A": "β⁻ rồi phát α", "B+A": "β⁺ rồi phát α"
};

function formatDecayModesVi(modes) {
    return modes.map((mode) => DECAY_MODES_VI[mode] || mode).join(", ");
}

function formatAbundanceVi(abundance) {
    if (abundance === null) return "—";
    return `${String(abundance).replace(".", ",")} %`;
}

// ---------------- Nhiệm vụ 3: chọn các dòng học sinh tự điền ----------------
// Ưu tiên: đồng vị đã có trong bài (preferredA), rồi đồng vị có trong tự
// nhiên (độ phổ cập lớn trước), rồi đồng vị phóng xạ sống lâu nhất.
// Lấy tối đa PRACTICE_ROW_COUNT dòng, trả về theo A tăng dần.
function choosePracticeIsotopes(Z, preferredA) {
    const known = getKnownIsotopes(Z);
    const chosen = [];
    const take = (nuclide) => {
        if (nuclide && chosen.length < PRACTICE_ROW_COUNT && !chosen.includes(nuclide)) {
            chosen.push(nuclide);
        }
    };
    (preferredA || []).forEach((A) => take(known.find((n) => n.A === A)));
    known.filter((n) => n.natural)
        .sort((a, b) => b.abundance - a.abundance)
        .forEach(take);
    known.filter((n) => !n.natural && !n.stable && n.halfLifeSeconds !== null
            && n.halfLifeSeconds >= PRACTICE_MIN_HALF_LIFE_S)
        .sort((a, b) => b.halfLifeSeconds - a.halfLifeSeconds)
        .forEach(take);
    return chosen.sort((a, b) => a.A - b.A);
}
