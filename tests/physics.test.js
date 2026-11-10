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
    for (const name of ["format.js", "constants.js", "gamma-mu-data.js"]) {
        const shared = path.join(ROOT, "assets", "shared", name);
        vm.runInContext(fs.readFileSync(shared, "utf8"), context, { filename: shared });
    }
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
// 2b. Bắt electron (EC): ΔA = 0, ΔZ = −1; ngưỡng β⁺ là 2mₑc²
// Q_EC tính lại từ độ dư khối lượng NUBASE2020 (keV) ghi trong decay-data.js.
// ---------------------------------------------------------------------
{
    const run = loadLesson("radioactive-decay-types", ["decay-data.js", "physics.js"]);
    const ec = run('getDecayTypeById("electronCapture")');
    check("bắt electron: ΔA = 0, ΔZ = −1", ec.deltaA === 0 && ec.deltaZ === -1);
    near("bắt electron: 2mₑc² (keV)", run("getBetaPlusThresholdKeV()"), 1021.998, 0.001);
    near("bắt electron: Q của Be-7", run('getDecayExampleById("Be7-electronCapture").qKeV'), 15769.00 - 14907.105, 0.01);
    near("bắt electron: Q của Fe-55", run('getDecayExampleById("Fe55-electronCapture").qKeV'), -57481.4 - (-57712.54), 0.01);
    near("bắt electron: Q của Na-22", run("NA22_Q_EC_KEV"), -5181.39 - (-8024.716), 0.01);
    for (const id of ["Be7-electronCapture", "Fe55-electronCapture"]) {
        const allowed = run(`getAllowedProtonRichDecays(getDecayExampleById("${id}").qKeV)`);
        check(`bắt electron: ${id} không thể β⁺`, allowed.electronCapture && !allowed.betaPlus);
        const ex = run(`getDecayExampleById("${id}")`);
        const d = run(`calculateDaughterNucleus(${JSON.stringify(ex.parent)}, "electronCapture")`);
        check(`bắt electron: hạt nhân con của ${id}`, d.A === ex.daughter.A && d.Z === ex.daughter.Z && d.symbol === ex.daughter.symbol);
    }
    check("bắt electron: Na-22 đủ năng lượng cho β⁺", run("getAllowedProtonRichDecays(NA22_Q_EC_KEV).betaPlus"));
    check("bắt electron: không lẫn vào ví dụ của các nhiệm vụ",
        run('RADIOACTIVE_DECAY_EXAMPLES.every(e => e.type !== "electronCapture")'));
    check("bắt electron: phương trình có e⁻ ở vế trái",
        /\+ e<sup>−<\/sup> →/.test(run('buildDecayEquationHtml({A:7,Z:4,symbol:"Be"}, "electronCapture")')));
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
    near("đâm xuyên: μγ(chì) = 0,126 mm⁻¹ (Cs-137)", run(`getEffectiveMu("gamma", "lead")`), 0.126, 5e-4);
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
// 7b. Đâm xuyên theo năng lượng
// Giá trị tham chiếu:
//  - Quy tắc Geiger: R_kk(5 MeV) = 0,318·5^1,5 ≈ 3,56 cm.
//  - Katz–Penfold: R(2,28 MeV) ≈ 1,10 g/cm²; R(0,156 MeV) ≈ 0,028 g/cm².
//  - E_max của β và động năng α: tính từ độ dư khối lượng NUBASE2020.
// ---------------------------------------------------------------------
{
    const run = loadLesson("radiation-penetration", ["physics.js"]);
    near("đâm xuyên: tầm xa α 5 MeV trong không khí (cm)", run("getAlphaRangeInAirCm(5)"), 3.556, 0.01);
    near("đâm xuyên: tầm xa β 2,28 MeV (g/cm²)", run("getBetaRangeGPerCm2(2.28)"), 1.10, 0.01);
    near("đâm xuyên: tầm xa β 0,156 MeV (g/cm²)", run("getBetaRangeGPerCm2(0.156)"), 0.0283, 0.0005);
    const delta = { He4: 2424.91587, Am241: 52934.3, Np237: 44871.6, Po210: -15953.1, Pb206: -23785.5,
        Ra226: 23667.6, Rn222: 16372.0, Po214: -4470.0, Pb210: -14728.4,
        C14: 3019.893, N14: 2863.4168, Sr90: -85950.9, Y90: -86496.9, P32: -24304.88, S32: -26015.5371, Zr90: -88772.55 };
    const alphaE = (parent, daughter, A, levelKeV = 0) =>
        (delta[parent] - delta[daughter] - delta.He4 - levelKeV) * (A - 4) / A / 1000;
    const sources = run("RADIATION_SOURCES");
    const byId = (type, id) => sources[type].find((s) => s.id === id).energyMeV;
    near("nguồn: α của Am-241 (MeV)", byId("alpha", "Am241"), alphaE("Am241", "Np237", 241, 59.5409), 0.002);
    near("nguồn: α của Po-210 (MeV)", byId("alpha", "Po210"), alphaE("Po210", "Pb206", 210), 0.002);
    near("nguồn: α của Ra-226 (MeV)", byId("alpha", "Ra226"), alphaE("Ra226", "Rn222", 226), 0.002);
    near("nguồn: α của Po-214 (MeV)", byId("alpha", "Po214"), alphaE("Po214", "Pb210", 214), 0.002);
    near("nguồn: E_max β của C-14 (MeV)", byId("beta", "C14"), (delta.C14 - delta.N14) / 1000, 0.001);
    near("nguồn: E_max β của Sr-90 (MeV)", byId("beta", "Sr90"), (delta.Sr90 - delta.Y90) / 1000, 0.001);
    near("nguồn: E_max β của P-32 (MeV)", byId("beta", "P32"), (delta.P32 - delta.S32) / 1000, 0.001);
    near("nguồn: E_max β của Y-90 (MeV)", byId("beta", "Y90"), (delta.Y90 - delta.Zr90) / 1000, 0.001);
    for (const type of ["alpha", "beta", "gamma"]) {
        const range = run("RADIATION_ENERGY_RANGE")[type];
        check(`nguồn: năng lượng các nguồn ${type} nằm trong miền thanh trượt`,
            sources[type].every((s) => s.energyMeV >= range.min && s.energyMeV <= range.max));
    }
    // α 8 MeV vẫn bị 0,1 mm giấy chặn hết.
    check("đâm xuyên: α 8 MeV bị chặn bởi 0,1 mm giấy", run('getAlphaRangeMm("paper", 8)') < 0.1);
    // β năng lượng thấp (C-14) không qua nổi 0,1 mm nhôm.
    check("đâm xuyên: β của C-14 bị 0,1 mm nhôm chặn hết", run('getBetaMaxRangeMm("aluminum", 0.156)') < 0.11 && run('getBetaMaxRangeMm("aluminum", 0.156)') > 0.1);
    // γ: photon năng lượng thấp bị chặn mạnh hơn nhiều.
    check("đâm xuyên: μγ(chì) giảm khi năng lượng tăng",
        run('getEffectiveMu("gamma", "lead", 0.0595409) > getEffectiveMu("gamma", "lead", 0.661657) && getEffectiveMu("gamma", "lead", 0.661657) > getEffectiveMu("gamma", "lead", 1.25286)'));
    run('setRadiationEnergy("gamma", 0.0595409)');
    check("đâm xuyên: đổi năng lượng làm đổi μ", Math.abs(run('getEffectiveMu("gamma", "lead")') - 0.126) > 1);
    run("useDefaultRadiationEnergies()");
    near("đâm xuyên: trở về nguồn mặc định", run('getEffectiveMu("gamma", "lead")'), 0.1261, 2e-4);
}

// ---------------------------------------------------------------------
// 7c. Bảng μ/ρ của NIST (assets/shared/gamma-mu-data.js)
// Tại các điểm lưới, nội suy phải trả lại đúng giá trị trong bảng NIST.
// ---------------------------------------------------------------------
{
    const run = loadLesson("gamma-attenuation", ["physics.js"]);
    near("NIST: μ/ρ chì 0,6 MeV", run('getMassAttenuation("lead", 0.6)'), 0.1248, 1e-6);
    near("NIST: μ/ρ nhôm 1 MeV", run('getMassAttenuation("aluminum", 1)'), 0.06146, 1e-6);
    near("NIST: μ/ρ nước 1 MeV", run('getMassAttenuation("water", 1)'), 0.07072, 1e-6);
    // Giấy (cellulose) theo quy tắc cộng: nằm giữa C và O, nhỏ hơn nước ở 1 MeV.
    const paper1 = run('getMassAttenuation("paper", 1)');
    check("NIST: μ/ρ cellulose 1 MeV nhỏ hơn nước", paper1 < 0.07072 && paper1 > 0.06);
    // Bờ hấp thụ K của chì (88 keV): μ/ρ nhảy lên phía năng lượng cao.
    check("NIST: bờ K của chì", run('getMassAttenuation("lead", 0.0881) > 3 * getMassAttenuation("lead", 0.0879)'));
    near("NIST: μ chì ở 662 keV (mm⁻¹)", run('getGammaMu("lead", 0.661657)'), 0.1261, 2e-4);
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
// 10. Hiển thị số và kí hiệu hạt nhân (assets/shared/format.js)
// ---------------------------------------------------------------------
{
    const run = loadLesson("half-life", []);
    check("định dạng: dấu phẩy thập phân", run("(2.5).toFixedVi(2)") === "2,50");
    check("định dạng: số âm", run("(-0.125).toFixedVi(3)") === "-0,125");
    check("định dạng: hằng số đầy đủ chữ số", run("formatVi(931.49410242)") === "931,49410242");
    check("định dạng: số nguyên giữ nguyên", run("formatVi(12)") === "12");
    const html = run('nuclideHtml(235, 92, "U")');
    check("kí hiệu hạt nhân: A và Z xếp chồng trước kí hiệu",
        /nuclide-a">235<\/span><span class="nuclide-z">92<\/span><\/span><span class="nuclide-symbol">U</.test(html));
}

// ---------------------------------------------------------------------
// 4b. Bài 4: lấy mẫu nhị thức cho N₀ lớn
// Trung bình và phương sai của sampleBinomial phải khớp n·p và n·p·(1 − p).
// ---------------------------------------------------------------------
{
    const run = loadLesson("half-life", ["physics.js"]);
    const sample = run("sampleBinomial");
    const random = seededRandom(2024);
    for (const [n, p] of [[1, 0.3], [400, 0.0069], [1000000, 0.5], [50, 0.9]]) {
        const trials = n >= 1000000 ? 400 : 4000;
        let sum = 0;
        let sumSq = 0;
        for (let i = 0; i < trials; i++) {
            const k = sample(n, p, random);
            sum += k;
            sumSq += k * k;
        }
        const mean = sum / trials;
        const variance = sumSq / trials - mean * mean;
        const sigma = Math.sqrt(n * p * (1 - p));
        near(`nhị thức: trung bình B(${n}; ${p})`, mean, n * p, 4 * sigma / Math.sqrt(trials) + 1e-9);
        near(`nhị thức: phương sai B(${n}; ${p})`, variance, sigma * sigma, 0.15 * sigma * sigma + 1e-9);
    }
    check("nhị thức: n = 0 cho 0", sample(0, 0.5, random) === 0);
    check("nhị thức: p = 1 cho n", sample(7, 1, random) === 7);
    near("Bài 4: độ lệch dự kiến tại N₀ = 10⁶", run("expectedMeanRelativeDeviationAtHalfLife(1e6)"), Math.sqrt(2 / Math.PI) / 1000, 1e-15);

    const sim = loadLesson("half-life", ["physics.js", "simulation.js"]);
    sim("createNuclei(1000000)");
    check("Bài 4: N₀ = 10⁶ vẽ 2500 chấm", sim("nuclei.length") === 2500);
    check("Bài 4: tổng số hạt các chấm bằng N₀", sim("nucleiInitial.reduce((a, b) => a + b, 0)") === 1000000);
    sim("createNuclei(1234)");
    check("Bài 4: N₀ ≤ 2500 thì mỗi chấm một hạt", sim("nuclei.length === 1234 && nucleiInitial.every(c => c === 1)"));
}

// ---------------------------------------------------------------------
// 7d. Bài 7: phân hạch ngẫu nhiên từ hiệu suất ENDF/B-VIII.0
// ---------------------------------------------------------------------
{
    const run = loadLesson("nuclear-fission", ["fission-yield-data.js", "fission-yields.js"]);
    near("phân hạch: tổng Y(A) = 2 mảnh mỗi phân hạch", run("FISSION_MASS_YIELD.reduce((s, r) => s + r[1], 0)"), 2, 0.001);
    // Hai đỉnh của phân bố số khối: quanh A ≈ 95 và A ≈ 138.
    const peakLight = run("FISSION_MASS_YIELD.filter(r => r[0] < 118).reduce((a, b) => b[1] > a[1] ? b : a)[0]");
    const peakHeavy = run("FISSION_MASS_YIELD.filter(r => r[0] >= 118).reduce((a, b) => b[1] > a[1] ? b : a)[0]");
    check("phân hạch: đỉnh nhẹ ở A = 89–102", peakLight >= 89 && peakLight <= 102, String(peakLight));
    check("phân hạch: đỉnh nặng ở A = 130–145", peakHeavy >= 130 && peakHeavy <= 145, String(peakHeavy));
    const random = seededRandom(7);
    const events = [];
    for (let i = 0; i < 3000; i++) events.push(run("sampleFissionEvent")(random));
    check("phân hạch: mỗi sự kiện bảo toàn Z", events.every((e) => e.light.Z + e.heavy.Z === 92));
    check("phân hạch: mỗi sự kiện bảo toàn A", events.every((e) => e.light.A + e.heavy.A + e.neutrons === 236));
    const meanQ = events.reduce((s, e) => s + e.qMeV, 0) / events.length;
    check("phân hạch: Q trung bình 170–190 MeV", meanQ > 170 && meanQ < 190, String(meanQ));
    const meanNu = events.reduce((s, e) => s + e.neutrons, 0) / events.length;
    check("phân hạch: số neutron trung bình 2–3", meanNu > 2 && meanNu < 3, String(meanNu));
    // Q của kênh Ba-141 + Kr-92 + 3n tính từ NUBASE2020 khớp với Q của bài (AME2020).
    const qBaKr = run(`calculateFissionQMeV(FISSION_FRAGMENTS.find(r => r[0] === 36 && r[1] === 92), FISSION_FRAGMENTS.find(r => r[0] === 56 && r[1] === 141), 3)`);
    near("phân hạch: Q(Ba-141 + Kr-92 + 3n) (MeV)", qBaKr, 173.3, 0.2);
}

// ---------------------------------------------------------------------
// 11. Câu hỏi có kiểm tra đáp án (js/questions.js của từng bài)
// Mỗi câu hỏi trong trang phải có đáp án; mỗi câu chọn có đúng một
// đáp án đúng; mỗi lựa chọn sai có phản hồi riêng hoặc gợi ý chung.
// ---------------------------------------------------------------------
{
    const LESSONS = fs.readdirSync(path.join(ROOT, "simulations"))
        .filter((name) => fs.existsSync(path.join(ROOT, "simulations", name, "index.html")));
    const lessonUi = fs.readFileSync(path.join(ROOT, "assets/shared/lesson-ui.js"), "utf8");

    for (const lesson of LESSONS) {
        const html = fs.readFileSync(path.join(ROOT, "simulations", lesson, "index.html"), "utf8");
        const file = path.join(ROOT, "simulations", lesson, "js", "questions.js");
        check(`câu hỏi: ${lesson} có js/questions.js`, fs.existsSync(file));
        if (!fs.existsSync(file)) continue;

        const specs = {};
        const context = vm.createContext({ QuickCheck: { define: (map) => Object.assign(specs, map), mountAll: () => {} } });
        vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });

        const placed = [...html.matchAll(/class="quick-check" data-check="([^"]+)"/g)].map((m) => m[1]);
        check(`câu hỏi: ${lesson} có câu hỏi trong trang`, placed.length > 0);
        check(`câu hỏi: ${lesson} không trùng mã câu hỏi`, new Set(placed).size === placed.length);
        for (const id of placed) check(`câu hỏi: ${lesson}/${id} có đáp án`, id in specs);
        for (const id of Object.keys(specs)) {
            check(`câu hỏi: ${lesson}/${id} được dùng`, placed.includes(id) || id.startsWith("bridge-"));
        }
        check(`câu hỏi: ${lesson} có dữ liệu câu hỏi chuyển tiếp`,
            ["bridge-explore", "bridge-experiment"].every((id) => id in specs) && lessonUi.includes(`"${lesson}": {`));

        for (const [id, spec] of Object.entries(specs)) {
            const name = `câu hỏi: ${lesson}/${id}`;
            check(`${name} có lời giải thích`, typeof spec.explanation === "string" && spec.explanation.length > 20);
            const texts = [spec.explanation, spec.hint, ...(spec.options || []).flatMap((o) => [o.text, o.feedback])]
                .filter(Boolean).join(" ");
            check(`${name} dùng dấu phẩy thập phân`, !/\d\.\d/.test(texts), (texts.match(/\S*\d\.\d\S*/) || [""])[0]);
            if (spec.type === "number") {
                check(`${name} có đáp số`, Number.isFinite(spec.answer));
                check(`${name} có gợi ý khi sai`, typeof spec.hint === "string" && spec.hint.length > 0);
                continue;
            }
            const options = spec.options || [];
            check(`${name} có từ 2 lựa chọn`, options.length >= 2);
            check(`${name} có đúng một đáp án đúng`, options.filter((o) => o.correct).length === 1);
            check(`${name} mỗi lựa chọn sai có phản hồi`,
                options.every((o) => o.correct || (o.feedback && o.feedback.length > 0) || spec.hint));
        }
    }

    // Đọc số học sinh nhập: chấp nhận dấu phẩy và dấu chấm.
    const qcContext = vm.createContext({});
    vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/shared/quick-check.js"), "utf8"), qcContext);
    const parse = vm.runInContext("globalThis.QuickCheck.parseNumber", qcContext);
    check("câu hỏi: đọc 0,5", parse("0,5") === 0.5);
    check("câu hỏi: đọc 0.5", parse("0.5") === 0.5);
    check("câu hỏi: đọc −2", parse("−2") === -2);
    check("câu hỏi: không đọc chữ", Number.isNaN(parse("hai")));
}

// ---------------------------------------------------------------------
// 12. Bài 1: tra cứu hạt nhân trong NUBASE2020
// Giá trị tham chiếu: NUBASE2020 (Kondev và cộng sự, Chin. Phys. C 45, 030001, 2021).
// ---------------------------------------------------------------------
{
    const run = loadLesson("nuclear-structure", ["nubase-data.js", "nuclide-lookup.js"]);
    const count = run("NUBASE_NUCLIDES.length");
    const html = fs.readFileSync(path.join(ROOT, "simulations/nuclear-structure/index.html"), "utf8");
    check("NUBASE: số hạt nhân ghi trong trang khớp dữ liệu", html.includes(`gồm ${count} hạt nhân`), `dữ liệu có ${count}`);
    const fe56 = run("findNuclide(26, 56)");
    check("NUBASE: Fe-56 bền", fe56 && fe56.stable);
    near("NUBASE: độ phổ cập Fe-56 (%)", fe56.abundance, 91.754, 1e-9);
    near("NUBASE: độ phổ cập H-1 (%)", run("findNuclide(1, 1).abundance"), 99.9855, 1e-9);
    const be7 = run("findNuclide(4, 7)");
    check("NUBASE: Be-7 phân rã bằng bắt electron", be7 && be7.modes[0] === "EC");
    near("NUBASE: chu kì bán rã H-3 (năm)", run("findNuclide(1, 3).halfLifeSeconds") / (365.2422 * 86400), 12.32, 0.01);
    check("NUBASE: U-238 vừa có trong tự nhiên vừa phóng xạ", run("findNuclide(92, 238).natural && !findNuclide(92, 238).stable"));
    check("NUBASE: O-30 chưa được quan sát", run("findNuclide(8, 30)") === null);
    check("NUBASE: Li-3 chỉ có giá trị ước lượng nên bị loại", run("findNuclide(3, 3)") === null);
    check("NUBASE: nguyên tố nặng nhất Z = 118", run("getMaxObservedZ()") === 118);
    check("NUBASE: chu kì bán rã tiếng Việt", run('formatHalfLifeVi("12.32 y")') === "12,32 năm");
    check("NUBASE: chu kì bán rã ước lượng", run('formatHalfLifeVi("9# ms")') === "khoảng 9 ms (ước lượng)");
    check("NUBASE: kiểu phân rã tiếng Việt", run('formatDecayModesVi(["B-", "EC"])') === "β⁻, bắt electron");
    const practiceFe = run("choosePracticeIsotopes(26, [54, 56, 57, 58]).map(n => n.A).join(',')");
    check("Nhiệm vụ 3: dòng luyện tập của Fe", practiceFe === "54,56,57,58,60", practiceFe);
    const practiceC = run("choosePracticeIsotopes(6, [12, 13, 14]).map(n => n.A)");
    check("Nhiệm vụ 3: 4–5 dòng luyện tập cho C", practiceC.length >= 4 && practiceC.length <= 5, String(practiceC));
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
