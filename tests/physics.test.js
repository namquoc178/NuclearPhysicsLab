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

// Tài liệu giả tối thiểu cho các tệp có đọc phần tử HTML khi nạp.
function stubDocument(returnNull) {
    const element = () => new Proxy(function () {}, {
        get: (target, key) => {
            if (key === Symbol.toPrimitive) return () => "";
            if (key === "value") return "balanced";
            if (key === "getContext") return () => element();
            return element();
        },
        apply: () => element(),
        set: () => true
    });
    return { getElementById: () => (returnNull ? null : element()), querySelector: () => null, querySelectorAll: () => [] };
}

// Nạp các tệp JS của một bài vào cùng một ngữ cảnh, theo đúng thứ tự.
function loadLesson(lesson, files, extraGlobals = {}) {
    const context = vm.createContext({ console, Math, Number, Array, Object, Error, Set, Map, JSON, String, ...extraGlobals });
    // Hằng số dùng chung được nạp trước, giống thứ tự <script> trong trang.
    const shared = path.join(ROOT, "assets", "shared", "constants.js");
    vm.runInContext(fs.readFileSync(shared, "utf8"), context, { filename: shared });
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

// Phản ứng dây chuyền: số liệu mỗi thế hệ nhất quán, chế độ vượt hạn ít khi tắt.
{
    const run = loadLesson("nuclear-fission", ["chain-reaction.js"], { document: stubDocument(false) });
    near("dây chuyền: k = p·ν̄ với p = 0,40", run("CHAIN_PRESETS.balanced.probability * CHAIN_AVERAGE_NEUTRONS_PER_FISSION"), 1.0, 1e-9);
    let extinct = 0;
    let consistent = true;
    const trials = 400;
    for (let i = 0; i < trials; i++) {
        const result = run("simulateChainReaction(CHAIN_PRESETS.growth.probability, 10)");
        const rows = result.data || result;
        for (const row of rows) {
            if (row.generation > 0 && row.fissions + row.lostNeutrons !== row.incomingNeutrons) consistent = false;
        }
        const last = rows[rows.length - 1];
        if (last.nextNeutrons === 0) extinct++;
    }
    check("dây chuyền: phân hạch + không phân hạch = neutron đầu thế hệ", consistent);
    check("dây chuyền: vượt hạn (k = 1,3) hiếm khi tắt khi bắt đầu từ 20 neutron", extinct / trials < 0.02, `tắt ${extinct}/${trials}`);
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
    const conditions = loadLesson("nuclear-fusion", ["fusion-conditions.js"], { document: stubDocument(true) });
    near("nhiệt hạch: rào thế Coulomb D–T (MeV)", conditions("calculateCoulombBarrierMeV(1, 2, 1, 3)"), 0.444, 0.005);
    near("nhiệt hạch: (3/2)kT ở 10⁸ K (keV)", conditions("calculateMeanThermalEnergyKeV(1e8)"), 12.93, 0.02);
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
        check(`đâm xuyên: α ≤ β < γ qua 1 mm ${material}`, a <= b && b < g, `α=${a}, β=${b}, γ=${g}`);
    }
    // β: chắn theo bề dày khối lượng ρx, nên μ(chì)/μ(nhôm) ≈ ρ(chì)/ρ(nhôm) ≈ 4,2.
    near("đâm xuyên: μβ(chì)/μβ(nhôm) ≈ 4,2",
        run(`getEffectiveMu("beta", "lead") / getEffectiveMu("beta", "aluminum")`), 11.35 / 2.699, 0.05);
    // β có tầm xa cực đại: dày hơn thì không còn hạt nào qua.
    check("đâm xuyên: β bị chặn hoàn toàn bởi 5 mm nhôm", run(`calculateTransmissionFor("beta", "aluminum", 5)`) === 0);
    check("đâm xuyên: β còn đi qua 1 mm nhôm", run(`calculateTransmissionFor("beta", "aluminum", 1)`) > 0.1);
    // γ dùng cùng bộ μ với bài Suy giảm γ.
    near("đâm xuyên: μγ(chì) = 0,126 mm⁻¹ (Cs-137)", run(`getEffectiveMu("gamma", "lead")`), 0.126, 1e-9);
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
    // Đối chiếu với bảng NIST ở 662 keV: x½(chì) ≈ 5,5 mm, x½(nhôm) ≈ 34 mm.
    near("suy giảm γ: x½ của chì (mm)", run(`calculateHalfValueLayer(getGammaMu("lead"))`), 5.50, 0.1);
    near("suy giảm γ: x½ của nhôm (mm)", run(`calculateHalfValueLayer(getGammaMu("aluminum"))`), 34.4, 0.5);
}

// ---------------------------------------------------------------------
// 9. Hằng số dùng chung: ba bài tính năng lượng dùng cùng một giá trị
// ---------------------------------------------------------------------
{
    const lessons = [["binding-energy", "nuclear-data.js"], ["nuclear-fission", "fission-data.js"], ["nuclear-fusion", "fusion-data.js"]];
    for (const [lesson, file] of lessons) {
        const run = loadLesson(lesson, [file]);
        check(`hằng số: ${lesson} dùng U_TO_MEV chung`, run("U_TO_MEV === NPL_CONSTANTS.U_TO_MEV"));
        check(`hằng số: ${lesson} dùng NEUTRON_MASS_U chung`, run("NEUTRON_MASS_U === NPL_CONSTANTS.NEUTRON_MASS_U"));
    }
    // Không tệp nào của bài được tự khai báo lại giá trị 931,494… bằng một con số.
    for (const lesson of fs.readdirSync(path.join(ROOT, "simulations"))) {
        const dir = path.join(ROOT, "simulations", lesson, "js");
        for (const file of fs.readdirSync(dir)) {
            if (file === "validation.js") continue; // số liệu tham chiếu độc lập để đối chiếu
            const source = fs.readFileSync(path.join(dir, file), "utf8");
            check(`hằng số: ${lesson}/${file} không khai báo riêng 931,494`, !/=\s*931\.494/.test(source));
        }
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
