// task4.js – Nhiệm vụ 4: phân bố số khối của mảnh phân hạch.
// Mỗi nút chạy một loạt phân hạch mới (sampleFissionEvent trong
// fission-yields.js) và ghi một dòng vào bảng; đồ thị so phân bố của loạt
// gần nhất với hiệu suất ENDF/B-VIII.0.

(function () {
    "use strict";

    if (typeof document === "undefined") return;

    const card = document.getElementById("task4Card");
    if (!card || typeof sampleFissionEvent !== "function") return;

    const runButtons = card.querySelectorAll("[data-task4-runs]");
    const resetButton = document.getElementById("resetTask4Button");
    const statusOutput = document.getElementById("task4Status");
    const tableBody = document.getElementById("task4TableBody");
    const canvas = document.getElementById("task4Chart");
    const lightInput = document.getElementById("task4LightPeakInput");
    const heavyInput = document.getElementById("task4HeavyPeakInput");
    const checkButton = document.getElementById("checkTask4Button");
    const feedback = document.getElementById("task4PeakFeedback");
    const conclusionBox = document.getElementById("task4ConclusionBox");
    const conclusion = document.getElementById("task4Conclusion");

    const A_MIN = 66;
    const A_MAX = 172;
    const LARGE_RUN = 10000;
    const emptyRowHtml = tableBody.innerHTML;
    const labels = [];
    for (let A = A_MIN; A <= A_MAX; A++) labels.push(String(A));

    let largeRun = null;

    function groupDigits(n) {
        return n >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ") : String(n);
    }

    let chart = null;
    if (typeof Chart !== "undefined" && canvas) {
        const yieldMap = new Map(FISSION_MASS_YIELD);
        chart = new Chart(canvas.getContext("2d"), {
            data: {
                labels,
                datasets: [
                    {
                        type: "bar",
                        label: "Mô phỏng: tỉ lệ số mảnh có số khối A (%)",
                        data: labels.map(() => 0),
                        backgroundColor: "rgba(21, 35, 59, 0.55)",
                        barPercentage: 1,
                        categoryPercentage: 1
                    },
                    {
                        type: "line",
                        label: "ENDF/B-VIII.0: Y(A)/2 (%)",
                        data: labels.map((label) => 100 * (yieldMap.get(Number(label)) || 0) / 2),
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
    }

    function drawChart(summary) {
        if (!chart) return;
        const fragments = summary ? 2 * summary.events : 0;
        chart.data.datasets[0].data = labels.map((label) => {
            const count = summary ? summary.counts.get(Number(label)) || 0 : 0;
            return fragments ? 100 * count / fragments : 0;
        });
        chart.update();
    }

    function percentText(value) {
        if (value === 0) return "0";
        return value < 1 ? formatVi(value, 2) : formatVi(value, 1);
    }

    function addRow(summary) {
        const empty = tableBody.querySelector(".task4-empty-row");
        if (empty) tableBody.innerHTML = "";
        const row = document.createElement("tr");
        [
            groupDigits(summary.events),
            summary.lightPeakA ?? "—",
            summary.heavyPeakA ?? "—",
            percentText(summary.peakWindowPercent),
            percentText(summary.valleyWindowPercent),
            formatVi(summary.meanQMeV, 1),
            formatVi(summary.meanNeutrons, 2)
        ].forEach((value) => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    }

    function run(times) {
        const events = [];
        for (let i = 0; i < times; i++) events.push(sampleFissionEvent());
        const summary = summarizeFissionRun(events);
        if (times >= LARGE_RUN) largeRun = summary;
        addRow(summary);
        drawChart(summary);
        statusOutput.textContent = `Đã chạy ${groupDigits(times)} phân hạch. Đồ thị đang hiển thị loạt này.`;
    }

    function setFeedback(kind, text) {
        feedback.className = `answer-feedback ${kind}`;
        feedback.textContent = text;
    }

    function readInteger(input) {
        const text = input.value.trim();
        return /^\d{2,3}$/.test(text) ? Number(text) : null;
    }

    function inRange(value, [low, high]) {
        return value !== null && value >= low && value <= high;
    }

    function checkPeaks() {
        conclusionBox.hidden = true;
        if (!largeRun) {
            setFeedback("invalid", "Em hãy chạy loạt 10 000 phân hạch trước khi đọc vị trí đỉnh.");
            return;
        }
        const light = readInteger(lightInput);
        const heavy = readInteger(heavyInput);
        if (light === null || heavy === null) {
            setFeedback("invalid", "Em hãy nhập hai số khối là số nguyên, ví dụ 95.");
            return;
        }
        const lightRange = fissionPeakRange("light");
        const heavyRange = fissionPeakRange("heavy");
        const lightOk = inRange(light, lightRange);
        const heavyOk = inRange(heavy, heavyRange);
        if (!lightOk || !heavyOk) {
            const hints = [];
            if (!lightOk) hints.push("số đọc của mảnh nhẹ chưa trùng vùng cột cao nhất ở nửa trái (A ≤ 117)");
            if (!heavyOk) hints.push("số đọc của mảnh nặng chưa trùng vùng cột cao nhất ở nửa phải (A ≥ 118)");
            setFeedback("review", `Chưa đúng: ${hints.join("; ")}. Em hãy rê chuột hoặc chạm vào cột để đọc số khối A.`);
            return;
        }
        setFeedback("correct", "Đúng. Hai đỉnh của em nằm trong vùng hiệu suất cao nhất theo ENDF/B-VIII.0.");
        conclusion.textContent =
            `Trong ${groupDigits(largeRun.events)} phân hạch mô phỏng, mảnh nhẹ thường gặp nhất có A = ${largeRun.lightPeakA}, ` +
            `mảnh nặng thường gặp nhất có A = ${largeRun.heavyPeakA}. Vùng A = 90–100 chiếm ${percentText(largeRun.peakWindowPercent)} % số mảnh, ` +
            `còn vùng hai mảnh gần bằng nhau (A = 112–122) chỉ chiếm ${percentText(largeRun.valleyWindowPercent)} %. ` +
            "Phân hạch U-235 bởi neutron nhiệt là một quá trình ngẫu nhiên: không đoán trước được cặp mảnh của từng lần, " +
            "nhưng với rất nhiều lần, số khối của mảnh tuân theo một phân bố hai đỉnh, và phân hạch không đối xứng chiếm ưu thế. " +
            `Q trung bình khoảng ${formatVi(largeRun.meanQMeV, 0)} MeV, mỗi phân hạch giải phóng trung bình ${formatVi(largeRun.meanNeutrons, 1)} neutron.`;
        conclusionBox.hidden = false;
    }

    function reset() {
        largeRun = null;
        tableBody.innerHTML = emptyRowHtml;
        drawChart(null);
        statusOutput.textContent = "Chưa thực hiện";
        lightInput.value = "";
        heavyInput.value = "";
        feedback.className = "answer-feedback";
        feedback.textContent = "";
        conclusionBox.hidden = true;
    }

    runButtons.forEach((button) => {
        button.addEventListener("click", () => run(Number(button.dataset.task4Runs)));
    });
    resetButton.addEventListener("click", reset);
    checkButton.addEventListener("click", checkPeaks);
})();
