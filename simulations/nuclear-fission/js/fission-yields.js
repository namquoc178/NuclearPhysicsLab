// fission-yields.js – Bài 7, chế độ Khám phá: "Phân hạch ngẫu nhiên".
//
// Mỗi lần phân hạch U-235 + n tạo ra một cặp mảnh khác nhau. Mô hình chọn
// cặp mảnh từ hiệu suất độc lập ENDF/B-VIII.0 (js/fission-yield-data.js):
//   1. Mảnh nhẹ (A ≤ 117) chọn ngẫu nhiên theo hiệu suất Y(Z, A).
//   2. Mảnh nặng có Z₂ = 92 − Z₁ và A₂ = 236 − A₁ − ν, với ν = 0…5 neutron
//      tức thời; ν được chọn theo hiệu suất của mảnh nặng tương ứng.
// Q = (M_U-235 + m_n − M₁ − M₂ − ν·m_n)·c², tính bằng độ dư khối lượng
// NUBASE2020: Q = Δ(U-235) + Δ(n) − Δ₁ − Δ₂ − ν·Δ(n).
// Đây là mô hình giản lược: không xét tương quan đầy đủ giữa hai mảnh và
// số neutron, nên dùng để thấy hình dạng phân bố chứ không để dự đoán ν
// chính xác (giá trị đánh giá ν̄ ≈ 2,44 ở neutron nhiệt, ENDF/B-VIII.0 MF1/MT452).

const FISSION_LIGHT_MAX_A = 117;

const FISSION_YIELD_INDEX = new Map(
    FISSION_FRAGMENTS.map((row) => [`${row[0]}-${row[1]}`, row])
);

const FISSION_LIGHT_FRAGMENTS = FISSION_FRAGMENTS.filter((row) => row[1] <= FISSION_LIGHT_MAX_A);

const FISSION_LIGHT_TOTAL = FISSION_LIGHT_FRAGMENTS.reduce((sum, row) => sum + row[2], 0);

function pickWeighted(items, weightOf, random) {
    const total = items.reduce((sum, item) => sum + weightOf(item), 0);
    let target = random() * total;
    for (const item of items) {
        target -= weightOf(item);
        if (target <= 0) return item;
    }
    return items[items.length - 1];
}

function calculateFissionQMeV(light, heavy, neutrons) {
    const keV = FISSION_MASS_EXCESS_KEV.U235 + FISSION_MASS_EXCESS_KEV.neutron
        - light[3] - heavy[3] - neutrons * FISSION_MASS_EXCESS_KEV.neutron;
    return keV / 1000;
}

function sampleFissionEvent(random) {
    const rand = random || Math.random;
    for (let attempt = 0; attempt < 100; attempt++) {
        const light = pickWeighted(FISSION_LIGHT_FRAGMENTS, (row) => row[2], rand);
        const options = [];
        for (let nu = 0; nu <= 5; nu++) {
            const heavy = FISSION_YIELD_INDEX.get(`${92 - light[0]}-${236 - light[1] - nu}`);
            if (heavy) options.push({ nu, heavy });
        }
        if (options.length === 0) continue;
        const chosen = pickWeighted(options, (option) => option.heavy[2], rand);
        return {
            light: { Z: light[0], A: light[1] },
            heavy: { Z: chosen.heavy[0], A: chosen.heavy[1] },
            neutrons: chosen.nu,
            qMeV: calculateFissionQMeV(light, chosen.heavy, chosen.nu)
        };
    }
    throw new Error("Không chọn được cặp mảnh phân hạch.");
}


// ---------------- Giao diện ----------------

(function () {
    "use strict";

    if (typeof document === "undefined") return; // chạy trong kiểm thử Node

    const runButtons = document.querySelectorAll("[data-fission-runs]");
    const resetButton = document.getElementById("fissionYieldReset");
    const countOutput = document.getElementById("fissionYieldCount");
    const meanQOutput = document.getElementById("fissionYieldMeanQ");
    const meanNuOutput = document.getElementById("fissionYieldMeanNu");
    const lastEvents = document.getElementById("fissionYieldEvents");
    const canvas = document.getElementById("fissionYieldChart");
    if (!canvas || !runButtons.length || typeof Chart === "undefined") return;

    const A_MIN = 66;
    const A_MAX = 172;
    const labels = [];
    for (let A = A_MIN; A <= A_MAX; A++) labels.push(String(A));

    let counts = new Array(labels.length).fill(0);
    let totalEvents = 0;
    let sumQ = 0;
    let sumNu = 0;
    let recent = [];

    function symbolOf(Z) {
        return FISSION_SYMBOLS[Z] || `Z${Z}`;
    }

    function referenceCurve() {
        // ENDF/B-VIII.0 cho Y(A) trên một phân hạch, tổng bằng 2 (hai mảnh).
        // Đổi sang phần trăm số mảnh: Y(A)/2 × 100 %.
        const map = new Map(FISSION_MASS_YIELD.map(([A, y]) => [A, y]));
        return labels.map((label) => 100 * (map.get(Number(label)) || 0) / 2);
    }

    const chart = new Chart(canvas.getContext("2d"), {
        data: {
            labels,
            datasets: [
                {
                    type: "bar",
                    label: "Mô phỏng: tỉ lệ số mảnh có số khối A (%)",
                    data: counts.map(() => 0),
                    backgroundColor: "rgba(21, 35, 59, 0.55)",
                    barPercentage: 1,
                    categoryPercentage: 1
                },
                {
                    type: "line",
                    label: "ENDF/B-VIII.0: Y(A)/2 (%)",
                    data: referenceCurve(),
                    borderColor: "#b45309",
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            scales: {
                x: {
                    title: { display: true, text: "Số khối A của mảnh phân hạch" },
                    ticks: { maxTicksLimit: 12 }
                },
                y: {
                    beginAtZero: true,
                    title: { display: true, text: "Tỉ lệ số mảnh (%)" }
                }
            },
            plugins: {
                legend: { display: true },
                tooltip: {
                    callbacks: {
                        title: (items) => `A = ${items[0].label}`,
                        label: (context) => `${context.dataset.label}: ${formatVi(context.parsed.y, 2)} %`
                    }
                }
            }
        }
    });

    function render() {
        const fragments = 2 * totalEvents;
        chart.data.datasets[0].data = counts.map((count) => fragments ? 100 * count / fragments : 0);
        chart.update();
        countOutput.textContent = totalEvents >= 10000
            ? String(totalEvents).replace(/\B(?=(\d{3})+(?!\d))/g, "\u202F")
            : String(totalEvents);
        meanQOutput.textContent = totalEvents ? `${formatVi(sumQ / totalEvents, 1)} MeV` : "—";
        meanNuOutput.textContent = totalEvents ? formatVi(sumNu / totalEvents, 2) : "—";
        lastEvents.innerHTML = recent.map((event) => `
            <li>
                ${nuclideHtml(235, 92, "U")} + ${nuclideHtml(1, 0, "n")} →
                ${nuclideHtml(event.light.A, event.light.Z, symbolOf(event.light.Z))} +
                ${nuclideHtml(event.heavy.A, event.heavy.Z, symbolOf(event.heavy.Z))}
                ${event.neutrons ? `+ ${event.neutrons}${nuclideHtml(1, 0, "n")}` : ""}
                <span class="fission-event-q">Q = ${formatVi(event.qMeV, 1)} MeV</span>
            </li>`).join("");
    }

    function run(times) {
        for (let i = 0; i < times; i++) {
            const event = sampleFissionEvent();
            for (const fragment of [event.light, event.heavy]) {
                const index = fragment.A - A_MIN;
                if (index >= 0 && index < counts.length) counts[index]++;
            }
            totalEvents++;
            sumQ += event.qMeV;
            sumNu += event.neutrons;
            recent.unshift(event);
        }
        recent = recent.slice(0, 5);
        render();
    }

    function reset() {
        counts = new Array(labels.length).fill(0);
        totalEvents = 0;
        sumQ = 0;
        sumNu = 0;
        recent = [];
        render();
    }

    runButtons.forEach((button) => {
        button.addEventListener("click", () => run(Number(button.dataset.fissionRuns)));
    });
    resetButton.addEventListener("click", reset);
    render();
})();
