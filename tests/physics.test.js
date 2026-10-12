// =====================================================================
// tests/physics.test.js
// Kiểm thử vật lí tự động cho NuclearPhysicsLab.
//
// Chạy:  node tests/physics.test.js
// Không cần cài thêm thư viện. Mỗi bài được nạp trong một môi trường
// riêng (node:vm) giống như trình duyệt nạp các thẻ <script>.
// Kết thúc bằng mã thoát 1 nếu có kiểm thử thất bại.
// =====================================================================

"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");

let passed = 0;
let failed = 0;
const failures = [];

function check(name, condition, detail = "") {
    if (condition) {
        passed++;
    } else {
        failed++;
        failures.push(`${name}${detail ? " — " + detail : ""}`);
    }
}

function near(name, actual, expected, tolerance) {
    check(
        name,
        Number.isFinite(actual) && Math.abs(actual - expected) <= tolerance,
        `nhận ${actual}, mong đợi ${expected} ± ${tolerance}`
    );
}

// Nạp các tệp JS của một bài vào cùng một ngữ cảnh, theo đúng thứ tự.
function loadLesson(lesson, files) {
    const context = vm.createContext({ console, Math, Number, Array, Object, Error, Set, Map, JSON });
    for (const file of files) {
        const full = path.join(ROOT, "simulations", lesson, "js", file);
        vm.runInContext(fs.readFileSync(full, "utf8"), context, { filename: full });
    }
    return (expression) => vm.runInContext(expression, context);
}

// Ngẫu nhiên có hạt giống để kết quả Monte Carlo lặp lại được.
function seededRandom(seed) {
    let state = seed >>> 0;
    return () => {
        state = (state + 0x6d2b79f5) >>> 0;
        let t = state;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// ---------------------------------------------------------------------
// 1. Cấu tạo hạt nhân: N = A − Z cho mọi đồng vị, đồng vị cùng Z
// ---------------------------------------------------------------------
{
    const run = loadLesson("nuclear-structure", ["nuclear-data.js", "physics.js"]);
    const isotopes = run("getAllNuclearIsotopes()");
    check("cấu tạo: có dữ liệu đồng vị", isotopes.length >= 30, `số đồng vị ${isotopes.length}`);
    for (const iso of isotopes) {
        const props = run(`calculateNuclearProperties(${JSON.stringify(iso.symbol)}, ${iso.A})`);
        check(`cấu tạo: N = A − Z cho ${iso.label}`, props.N === iso.A - iso.Z && props.N >= 0);
    }
}

// ---------------------------------------------------------------------
// 2. Các dạng phân rã: ΔA, ΔZ chuẩn và hạt nhân con của các ví dụ
// ---------------------------------------------------------------------
{
    const run = loadLesson("radioactive-decay-types", ["decay-data.js", "physics.js"]);
    const rules = { alpha: [-4, -2], betaMinus: [0, 1], betaPlus: [0, -1], gamma: [0, 0] };
    for (const [id, [dA, dZ]] of Object.entries(rules)) {
        const type = run(`getDecayTypeById(${JSON.stringify(id)})`);
        check(`phân rã: quy tắc ${id}`, type.deltaA === dA && type.deltaZ === dZ);
    }
    const examples = run("RADIOACTIVE_DECAY_EXAMPLES");
    for (const ex of examples) {
        const d = run(`calculateDaughterNucleus(${JSON.stringify(ex.parent)}, ${JSON.stringify(ex.type)})`);
        check(`phân rã: hạt nhân con của ${ex.id}`, d.A === ex.daughter.A && d.Z === ex.daughter.Z);
    }
}

// ---------------------------------------------------------------------
// 3. Chu kì bán rã: λ = ln2/T và trung bình Monte Carlo trong ±4σ
// ---------------------------------------------------------------------
{
    const run = loadLesson("half-life", ["physics.js"]);
    near("chu kì: λ = ln2/T với T = 10 s", run("calculateLambda(10)"), Math.LN2 / 10, 1e-12);
    near("chu kì: N(T) = N₀/2", run("calculateTheoreticalN(1000, calculateLambda(10), 10)"), 500, 1e-9);

    // Mô phỏng theo đúng cách bài làm: xác suất p = 1 − e^(−λΔt) mỗi bước.
    const random = seededRandom(12345);
    const lambda = Math.LN2 / 10;
    const p = run(`calculateDecayProbability(${lambda}, 0.1)`);
    const runs = 200;
    const N0 = 1000;
    let sum = 0;
    for (let r = 0; r < runs; r++) {
        let alive = N0;
        for (let step = 0; step < 100; step++) {
            let survivors = 0;
            for (let i = 0; i < alive; i++) if (random() >= p) survivors++;
            alive = survivors;
        }
        sum += alive;
    }
    const mean = sum / runs;
    const sigmaOfMean = Math.sqrt(N0 * 0.5 * 0.5) / Math.sqrt(runs);
    near("chu kì: trung bình Monte Carlo tại t = T", mean, 500, 4 * sigmaOfMean);
}

// ---------------------------------------------------------------------
// 4. Năng lượng liên kết: Eₗₖ/A so với AME2020 (≤ 1 keV/nucleon)
// ---------------------------------------------------------------------
{
    const run = loadLesson("binding-energy", ["nuclear-data.js", "physics.js"]);
    const validationSource = fs.readFileSync(
        path.join(ROOT, "simulations/binding-energy/js/validation.js"), "utf8");
    const reference = JSON.parse(
        validationSource
            .match(/AME2020_REFERENCE_BEA_KEV\s*=\s*(\{[\s\S]*?\});/)[1]
            .replace(/"?([A-Za-z]+-\d+)"?\s*:/g, '"$1":')
    );
    const nuclides = run("NUCLEAR_DATA");
    check("liên kết: có tham chiếu cho mọi hạt nhân", nuclides.every(n => n.id in reference));
    for (const n of nuclides) {
        const props = run(`calculateNuclideProperties(getNuclideById(${JSON.stringify(n.id)}))`);
        near(`liên kết: Eₗₖ/A của ${n.id} (keV)`, props.bindingEnergyPerNucleonMeV * 1000, reference[n.id], 1.0);
    }
    const best = nuclides
        .map(n => run(`calculateNuclideProperties(getNuclideById(${JSON.stringify(n.id)}))`))
        .sort((a, b) => b.bindingEnergyPerNucleonMeV - a.bindingEnergyPerNucleonMeV)[0];
    check("liên kết: Ni-62 có Eₗₖ/A lớn nhất trong bộ dữ liệu", best.id === "Ni-62", `nhận ${best.id}`);
}

// ---------------------------------------------------------------------
// 5. Phân hạch: bảo toàn A, Z và Q từng kênh
// ---------------------------------------------------------------------
{
    const run = loadLesson("nuclear-fission", ["fission-data.js", "physics.js"]);
    const expectedQ = {
        "U235-Ba141-Kr92-3n": 173.28,
        "U235-Xe140-Sr94-2n": 184.68,
        "U235-Cs144-Rb89-3n": 169.76
    };
    for (const channel of run("FISSION_CHANNELS")) {
        const p = run(`calculateFissionChannelProperties(getFissionChannelById(${JSON.stringify(channel.id)}))`);
        check(`phân hạch: bảo toàn A, Z (${channel.id})`, p.massNumberConserved && p.atomicNumberConserved);
        near(`phân hạch: Q (${channel.id}, MeV)`, p.qValueMeV, expectedQ[channel.id], 0.05);
    }
}

// ---------------------------------------------------------------------
// 6. Nhiệt hạch: bảo toàn A, Z và Q từng phản ứng
// ---------------------------------------------------------------------
{
    const run = loadLesson("nuclear-fusion", ["fusion-data.js", "physics.js"]);
    const expectedQ = {
        "D-T-He4-n": 17.59,
        "D-D-He3-n": 3.27,
        "D-D-T-H1": 4.03,
        "D-He3-He4-H1": 18.35
    };
    for (const reaction of run("FUSION_REACTIONS")) {
        const p = run(`calculateFusionReactionProperties(getFusionReactionById(${JSON.stringify(reaction.id)}))`);
        check(`nhiệt hạch: bảo toàn A, Z (${reaction.id})`, p.massNumberConserved && p.atomicNumberConserved);
        near(`nhiệt hạch: Q (${reaction.id}, MeV)`, p.qValueMeV, expectedQ[reaction.id], 0.01);
    }
}

// ---------------------------------------------------------------------
// 7. Đâm xuyên: α bị chặn, thứ tự α < β < γ, γ theo hàm mũ
// ---------------------------------------------------------------------
{
    const run = loadLesson("radiation-penetration", ["physics.js"]);
    for (const material of ["paper", "aluminum", "lead"]) {
        check(`đâm xuyên: α bị chặn hoàn toàn bởi 0,1 mm ${material}`,
            run(`calculateTransmissionFor("alpha", "${material}", 0.1)`) === 0);
        const a = run(`calculateTransmissionFor("alpha", "${material}", 1)`);
        const b = run(`calculateTransmissionFor("beta", "${material}", 1)`);
        const g = run(`calculateTransmissionFor("gamma", "${material}", 1)`);
        check(`đâm xuyên: α < β < γ qua 1 mm ${material}`, a < b && b < g, `α=${a}, β=${b}, γ=${g}`);
    }
    // Chì phải chắn γ tốt hơn nhôm, nhôm tốt hơn giấy.
    const gPaper = run(`calculateTransmissionFor("gamma", "paper", 5)`);
    const gAl = run(`calculateTransmissionFor("gamma", "aluminum", 5)`);
    const gPb = run(`calculateTransmissionFor("gamma", "lead", 5)`);
    check("đâm xuyên: γ qua chì < nhôm < giấy", gPb < gAl && gAl < gPaper);
    // Hàm mũ: truyền qua 2x bằng bình phương truyền qua x.
    near("đâm xuyên: γ tuân theo hàm mũ",
        run(`calculateTransmissionFor("gamma", "lead", 4)`), gPb ** (4 / 5), 1e-12);
}

// ---------------------------------------------------------------------
// 8. Suy giảm γ: bề dày bán giảm x½ = ln2/μ
// ---------------------------------------------------------------------
{
    const run = loadLesson("gamma-attenuation", ["physics.js"]);
    for (const material of ["paper", "aluminum", "lead"]) {
        const mu = run(`getGammaMu("${material}")`);
        const hvl = run(`calculateHalfValueLayer(${mu})`);
        near(`suy giảm γ: I(x½) = I₀/2 (${material})`, run(`calculateGammaTransmission(${mu}, ${hvl})`), 0.5, 1e-12);
    }
}

// ---------------------------------------------------------------------
// Kết quả
// ---------------------------------------------------------------------
console.log(`\nKiểm thử vật lí: ${passed} đạt, ${failed} không đạt.`);
if (failed > 0) {
    for (const f of failures) console.log("  ✗ " + f);
    process.exit(1);
}
console.log("  ✓ Tất cả kiểm thử vật lí đều đạt.");
