console.log("LESSON-UI.JS - SHARED LESSON INTERFACE VERSION 2 - LAYER 3");

(function () {
    const modeButtons = {
        explore: document.getElementById("exploreModeButton"),
        experiment: document.getElementById("experimentModeButton"),
        validation: document.getElementById("validationModeButton")
    };

    const panels = {
        explore: document.getElementById("explorePanel"),
        experiment: document.getElementById("experimentPanel"),
        validation: document.getElementById("validationPanel")
    };

    const nav = document.querySelector(".mode-navigation");

    const LESSON_EXPERIENCE = {
        "nuclear-structure": {
            explore: {
                bullets: [
                    "Số proton quyết định Z; số neutron được tính từ N = A − Z.",
                    "Các đồng vị có cùng Z nhưng khác A vì số neutron khác nhau."
                ],
                question: "Hai hạt nhân có cùng Z nhưng khác A có quan hệ gì với nhau?",
                hint: "Hãy nhớ định nghĩa đồng vị: cùng số proton, khác số neutron nên khác số khối."
            },
            experiment: {
                bullets: [
                    "Bạn đã đọc kí hiệu hạt nhân và suy ra A, Z, N.",
                    "Bạn đã dùng Z và A để nhận diện, so sánh các đồng vị."
                ],
                question: "Nếu A tăng 1 nhưng Z không đổi thì N thay đổi thế nào?",
                hint: "Từ N = A − Z, khi Z cố định thì ΔN = ΔA."
            },
            selfCheck: [
                "Tôi xác định được A, Z, N từ kí hiệu hạt nhân.",
                "Tôi giải thích được vì sao các đồng vị có cùng Z nhưng khác A.",
                "Tôi phân biệt được cùng nuclide và hai đồng vị khác nhau."
            ]
        },
        "radioactive-decay-types": {
            explore: {
                bullets: [
                    "α làm A giảm 4 và Z giảm 2; β⁻ và β⁺ giữ nguyên A nhưng làm Z đổi ±1.",
                    "γ không làm đổi A, Z, N; hạt nhân chỉ chuyển từ trạng thái kích thích xuống mức năng lượng thấp hơn."
                ],
                question: "Nếu A không đổi nhưng Z tăng 1, đó là dạng phân rã nào?",
                hint: "So sánh với bộ quy tắc ΔA = 0, ΔZ = +1."
            },
            experiment: {
                bullets: [
                    "Bạn đã suy ra hạt nhân con từ dạng phân rã và nhận diện chiều ngược lại từ ΔA, ΔZ.",
                    "Bạn đã ghép nhiều bước thành một chuỗi biến đổi hạt nhân."
                ],
                question: "Sau một phân rã α rồi hai phân rã β⁻, tổng ΔZ bằng bao nhiêu?",
                hint: "Cộng lần lượt −2, +1 và +1."
            },
            selfCheck: [
                "Tôi nhận diện được α, β⁻, β⁺ và γ từ ΔA, ΔZ.",
                "Tôi xác định được hạt nhân con sau một bước phân rã.",
                "Tôi theo dõi được một chuỗi biến đổi nhiều bước."
            ]
        },
        "half-life": {
            explore: {
                bullets: [
                    "Số hạt chưa phân rã giảm theo quy luật mũ và không giảm tuyến tính theo thời gian.",
                    "Sau mỗi chu kỳ bán rã, giá trị kì vọng của số hạt còn lại giảm còn một nửa."
                ],
                question: "Sau 3 chu kỳ bán rã, phần số hạt còn lại theo lí thuyết là bao nhiêu so với N₀?",
                hint: "Mỗi chu kỳ bán rã nhân thêm một hệ số 1/2."
            },
            experiment: {
                bullets: [
                    "Bạn đã so sánh kết quả Monte Carlo với đường cong phân rã lí thuyết.",
                    "Bạn đã quan sát vai trò của số hạt ban đầu và dao động thống kê."
                ],
                question: "Khi tăng N₀ rất lớn, đường mô phỏng thường tiến gần đường lí thuyết hơn hay xa hơn?",
                hint: "Hãy nghĩ đến dao động tương đối của một mẫu ngẫu nhiên lớn."
            },
            selfCheck: [
                "Tôi dùng được N = N₀e^(−λt) và λ = ln2/T₁/₂.",
                "Tôi giải thích được ý nghĩa của chu kỳ bán rã.",
                "Tôi phân biệt được giá trị lí thuyết với dao động ngẫu nhiên của mô phỏng."
            ]
        },
        "radiation-penetration": {
            explore: {
                bullets: [
                    "Trong mô hình sư phạm, α bị suy giảm rất mạnh, β ở mức trung gian và γ có khả năng truyền qua lớn hơn.",
                    "Độ dày và loại vật liệu đều ảnh hưởng đến phần bức xạ truyền qua."
                ],
                question: "Khi tăng độ dày vật liệu nhưng giữ nguyên loại bức xạ và vật liệu, phần truyền qua tăng hay giảm?",
                hint: "Quan sát dạng P = e^(−μx) với μ > 0."
            },
            experiment: {
                bullets: [
                    "Bạn đã so sánh các loại bức xạ qua nhiều vật liệu và độ dày khác nhau.",
                    "Bạn đã liên hệ hệ số suy giảm hiệu dụng với mức truyền qua."
                ],
                question: "Hai trường hợp có cùng x nhưng μ lớn hơn thì trường hợp nào truyền qua ít hơn?",
                hint: "Trong số mũ −μx, μ lớn làm e^(−μx) nhỏ hơn."
            },
            selfCheck: [
                "Tôi mô tả được khác biệt tương đối về khả năng đâm xuyên của α, β, γ.",
                "Tôi dự đoán được tác động của độ dày vật liệu lên mức truyền qua.",
                "Tôi hiểu đây là mô hình hiệu dụng phục vụ học tập, không phải mô hình vi mô đầy đủ."
            ]
        },
        "gamma-attenuation": {
            explore: {
                bullets: [
                    "Cường độ gamma giảm theo hàm mũ I = I₀e^(−μx).",
                    "Bề dày bán giảm x₁/₂ = ln2/μ là độ dày làm cường độ còn một nửa."
                ],
                question: "Nếu μ tăng gấp đôi thì bề dày bán giảm x₁/₂ thay đổi thế nào?",
                hint: "x₁/₂ tỉ lệ nghịch với μ."
            },
            experiment: {
                bullets: [
                    "Bạn đã thay đổi μ, x và so sánh I với I₀.",
                    "Bạn đã dùng tuyến tính hóa để kiểm tra dạng hàm mũ của định luật suy giảm."
                ],
                question: "Đồ thị ln(I/I₀) theo x có hệ số góc bằng đại lượng nào?",
                hint: "Lấy logarit tự nhiên hai vế của I/I₀ = e^(−μx)."
            },
            selfCheck: [
                "Tôi tính được I từ I₀, μ và x.",
                "Tôi giải thích được ý nghĩa của bề dày bán giảm.",
                "Tôi hiểu cách tuyến tính hóa ln(I/I₀) = −μx."
            ]
        },
        "binding-energy": {
            explore: {
                bullets: [
                    "Độ hụt khối tạo nên năng lượng liên kết của hạt nhân.",
                    "E_b/A giúp so sánh mức liên kết trung bình giữa các hạt nhân có số khối khác nhau."
                ],
                question: "Đại lượng nào phù hợp hơn để so sánh độ bền liên kết trung bình của hai hạt nhân có A rất khác nhau?",
                hint: "So sánh năng lượng liên kết trên mỗi nucleon thay vì chỉ dùng tổng E_b."
            },
            experiment: {
                bullets: [
                    "Bạn đã tính Δm, E_b và E_b/A từ dữ liệu khối lượng.",
                    "Bạn đã so sánh nhiều hạt nhân và nhận ra vùng Fe/Ni có E_b/A lớn trong tập dữ liệu."
                ],
                question: "Nếu hai hạt nhân có cùng E_b nhưng A khác nhau, E_b/A của hạt nhân nào lớn hơn?",
                hint: "Với cùng tử số, mẫu số A nhỏ hơn cho thương lớn hơn."
            },
            selfCheck: [
                "Tôi tính được độ hụt khối từ dữ liệu khối lượng nguyên tử.",
                "Tôi chuyển đổi được Δm sang năng lượng liên kết.",
                "Tôi dùng E_b/A để so sánh mức liên kết trung bình giữa các hạt nhân."
            ]
        },
        "nuclear-fission": {
            explore: {
                bullets: [
                    "Một hạt nhân nặng có thể tách thành các mảnh nhẹ hơn và giải phóng neutron cùng năng lượng.",
                    "Trong mỗi phương trình hạt nhân, tổng A và tổng Z phải được bảo toàn."
                ],
                question: "Trong một phương trình phân hạch, bạn nên kiểm tra hai đại lượng bảo toàn nào trước tiên?",
                hint: "Đó là hai số xuất hiện trong kí hiệu hạt nhân: số khối và số proton."
            },
            experiment: {
                bullets: [
                    "Bạn đã kiểm tra bảo toàn A, Z và phân tích phản ứng phân hạch mẫu.",
                    "Bạn đã khảo sát mô hình phản ứng dây chuyền ở mức khái niệm."
                ],
                question: "Vì sao mô hình phản ứng dây chuyền trong bài không nên được hiểu là mô hình lò phản ứng thực?",
                hint: "Mô hình đã giản lược mạnh hình học, xác suất, năng lượng và nhiều cơ chế vật lí thực tế."
            },
            selfCheck: [
                "Tôi kiểm tra được bảo toàn A và Z trong phản ứng phân hạch.",
                "Tôi mô tả được vai trò của neutron trong phản ứng dây chuyền khái niệm.",
                "Tôi phân biệt được mô hình giáo dục với mô hình hệ thống hạt nhân thực."
            ]
        },
        "nuclear-fusion": {
            explore: {
                bullets: [
                    "Hai hạt nhân nhẹ có thể hợp nhất thành sản phẩm mới và giải phóng năng lượng khi Q > 0.",
                    "A và Z vẫn phải được bảo toàn ở cả hai vế của phản ứng."
                ],
                question: "Trước khi tính Q, bước kiểm tra nhanh nào giúp phát hiện một phương trình nhiệt hạch viết sai?",
                hint: "Cộng tổng A và tổng Z ở hai vế."
            },
            experiment: {
                bullets: [
                    "Bạn đã kiểm tra bảo toàn A, Z và tính Q từ chênh lệch khối lượng.",
                    "Bạn đã so sánh nhiều kênh phản ứng nhiệt hạch điển hình."
                ],
                question: "Nếu khối lượng nghỉ của hệ trước phản ứng lớn hơn hệ sau phản ứng, Q có dấu gì?",
                hint: "Phần khối lượng giảm được chuyển thành năng lượng theo E = mc²."
            },
            selfCheck: [
                "Tôi kiểm tra được bảo toàn A và Z trong phản ứng nhiệt hạch.",
                "Tôi tính và diễn giải được giá trị Q của phản ứng.",
                "Tôi so sánh được các phản ứng dựa trên sản phẩm và năng lượng giải phóng."
            ]
        }
    };

    function getLessonKey() {
        const parts = window.location.pathname.split("/").filter(Boolean);
        const simulationIndex = parts.lastIndexOf("simulations");
        if (simulationIndex >= 0 && parts[simulationIndex + 1]) {
            return parts[simulationIndex + 1];
        }
        return "";
    }

    const lessonKey = getLessonKey();
    const lessonData = LESSON_EXPERIENCE[lessonKey] || null;
    const visitedModes = new Set(["explore"]);

    function scrollToModes() {
        if (!nav) return;
        nav.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function goToMode(mode) {
        const button = modeButtons[mode];
        if (!button) return;
        button.click();
        visitedModes.add(mode);
        updateJourney(mode);
        window.setTimeout(scrollToModes, 30);
    }

    function createModeButton(label, mode, isPrimary) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = label;
        if (isPrimary) button.classList.add("next-mode");
        button.addEventListener("click", () => goToMode(mode));
        return button;
    }

    function addFooter(panel, mode) {
        if (!panel || panel.querySelector(":scope > .lesson-mode-footer")) return;

        const footer = document.createElement("div");
        footer.className = "lesson-mode-footer";
        footer.setAttribute("aria-label", "Điều hướng giữa các chế độ học tập");

        if (mode === "explore") {
            footer.appendChild(document.createElement("span")).className = "footer-spacer";
            footer.appendChild(createModeButton("Tiếp tục: THÍ NGHIỆM →", "experiment", true));
        }

        if (mode === "experiment") {
            footer.appendChild(createModeButton("← KHÁM PHÁ", "explore", false));
            footer.appendChild(createModeButton("Tiếp tục: KIỂM CHỨNG →", "validation", true));
        }

        if (mode === "validation") {
            footer.appendChild(createModeButton("← THÍ NGHIỆM", "experiment", false));

            const home = document.createElement("a");
            home.href = "../../index.html";
            home.textContent = "Về Trang chủ";
            home.className = "next-mode";
            footer.appendChild(home);
        }

        panel.appendChild(footer);
    }

    function buildJourney() {
        if (!nav || document.querySelector(".lesson-journey")) return;

        const journey = document.createElement("section");
        journey.className = "lesson-journey";
        journey.setAttribute("aria-label", "Hành trình bài học");
        journey.innerHTML = `
            <div class="lesson-journey-heading">
                <div>
                    <span class="lesson-journey-kicker">HÀNH TRÌNH BÀI HỌC</span>
                    <strong>Khám phá → Thực hành → Kiểm chứng</strong>
                </div>
                <span class="lesson-journey-status" aria-live="polite">Bước 1/3 · Khám phá</span>
            </div>
            <div class="lesson-journey-track" role="list">
                <button type="button" class="lesson-journey-step" data-mode="explore" role="listitem">
                    <span class="journey-dot">1</span>
                    <span><b>Khám phá</b><small>Quan sát & tìm quy luật</small></span>
                </button>
                <span class="journey-connector" aria-hidden="true"></span>
                <button type="button" class="lesson-journey-step" data-mode="experiment" role="listitem">
                    <span class="journey-dot">2</span>
                    <span><b>Thí nghiệm</b><small>Thực hiện nhiệm vụ</small></span>
                </button>
                <span class="journey-connector" aria-hidden="true"></span>
                <button type="button" class="lesson-journey-step" data-mode="validation" role="listitem">
                    <span class="journey-dot">3</span>
                    <span><b>Kiểm chứng</b><small>Đối chiếu mô hình</small></span>
                </button>
            </div>
        `;

        journey.querySelectorAll(".lesson-journey-step").forEach((button) => {
            button.addEventListener("click", () => goToMode(button.dataset.mode));
        });

        nav.insertAdjacentElement("afterend", journey);
        updateJourney("explore");
    }

    function updateJourney(activeMode) {
        const journey = document.querySelector(".lesson-journey");
        if (!journey) return;

        const order = ["explore", "experiment", "validation"];
        const labels = {
            explore: "Khám phá",
            experiment: "Thí nghiệm",
            validation: "Kiểm chứng"
        };
        const activeIndex = Math.max(0, order.indexOf(activeMode));

        journey.querySelectorAll(".lesson-journey-step").forEach((step) => {
            const mode = step.dataset.mode;
            step.classList.toggle("active", mode === activeMode);
            step.classList.toggle("visited", visitedModes.has(mode));
            step.setAttribute("aria-current", mode === activeMode ? "step" : "false");
        });

        journey.querySelectorAll(".journey-connector").forEach((connector, index) => {
            connector.classList.toggle("visited", index < activeIndex);
        });

        const status = journey.querySelector(".lesson-journey-status");
        if (status) {
            status.textContent = `Bước ${activeIndex + 1}/3 · ${labels[activeMode]}`;
        }
    }

    function createReflectionCard(mode, data) {
        const card = document.createElement("section");
        card.className = `lesson-reflection-card ${mode === "experiment" ? "practice-reflection" : ""}`;
        card.setAttribute("aria-label", mode === "explore" ? "Tóm tắt phần khám phá" : "Tóm tắt phần thực hành");

        const heading = mode === "explore" ? "Bạn vừa quan sát" : "Bạn vừa luyện tập";
        const kicker = mode === "explore" ? "DỪNG LẠI 30 GIÂY" : "KẾT NỐI KIẾN THỨC";
        const icon = mode === "explore" ? "✓" : "↗";

        card.innerHTML = `
            <div class="lesson-reflection-heading">
                <span class="lesson-reflection-icon" aria-hidden="true">${icon}</span>
                <div>
                    <span class="lesson-reflection-kicker">${kicker}</span>
                    <h3>${heading}</h3>
                </div>
            </div>
            <ul class="lesson-reflection-points">
                ${data.bullets.map((item) => `<li>${item}</li>`).join("")}
            </ul>
            <div class="lesson-bridge-question">
                <strong>Câu hỏi trước khi tiếp tục</strong>
                <p>${data.question}</p>
                <details>
                    <summary>Xem gợi ý</summary>
                    <p>${data.hint}</p>
                </details>
            </div>
        `;

        return card;
    }

    function addReflection(panel, mode, data) {
        if (!panel || !data || panel.querySelector(":scope > .lesson-reflection-card")) return;
        const card = createReflectionCard(mode, data);
        const footer = panel.querySelector(":scope > .lesson-mode-footer");
        if (footer) {
            panel.insertBefore(card, footer);
        } else {
            panel.appendChild(card);
        }
    }

    function createSelfCheckCard(items) {
        const card = document.createElement("section");
        card.className = "lesson-self-check-card";
        card.setAttribute("aria-label", "Tự đánh giá cuối bài");

        card.innerHTML = `
            <div class="lesson-self-check-heading">
                <div>
                    <span class="lesson-reflection-kicker">TRƯỚC KHI KẾT THÚC</span>
                    <h3>Tự đánh giá nhanh</h3>
                    <p>Đánh dấu những điều bạn cảm thấy mình đã làm được sau bài học.</p>
                </div>
                <span class="lesson-self-check-count" aria-live="polite">0/${items.length}</span>
            </div>
            <div class="lesson-self-check-list">
                ${items.map((item, index) => `
                    <label class="lesson-self-check-item">
                        <input type="checkbox" data-self-check="${index}">
                        <span class="self-check-mark" aria-hidden="true">✓</span>
                        <span>${item}</span>
                    </label>
                `).join("")}
            </div>
            <p class="lesson-self-check-note">Đây là phần tự đánh giá, không phải điểm số. Nếu còn mục chưa chắc chắn, bạn có thể quay lại Khám phá hoặc Thí nghiệm để xem lại.</p>
        `;

        const checkboxes = card.querySelectorAll("input[type='checkbox']");
        const count = card.querySelector(".lesson-self-check-count");

        function updateCount() {
            const checked = Array.from(checkboxes).filter((input) => input.checked).length;
            count.textContent = `${checked}/${checkboxes.length}`;
            count.classList.toggle("complete", checked === checkboxes.length);
        }

        checkboxes.forEach((checkbox) => checkbox.addEventListener("change", updateCount));
        updateCount();

        return card;
    }

    function addSelfCheck(panel, items) {
        if (!panel || !items || panel.querySelector(":scope > .lesson-self-check-card")) return;
        const card = createSelfCheckCard(items);
        const footer = panel.querySelector(":scope > .lesson-mode-footer");
        if (footer) {
            panel.insertBefore(card, footer);
        } else {
            panel.appendChild(card);
        }
    }

    Object.entries(panels).forEach(([mode, panel]) => addFooter(panel, mode));
    buildJourney();

    if (lessonData) {
        addReflection(panels.explore, "explore", lessonData.explore);
        addReflection(panels.experiment, "experiment", lessonData.experiment);
        addSelfCheck(panels.validation, lessonData.selfCheck);
    }

    Object.entries(modeButtons).forEach(([mode, button]) => {
        if (!button) return;
        button.setAttribute("aria-pressed", button.classList.contains("active") ? "true" : "false");
        button.addEventListener("click", () => {
            visitedModes.add(mode);
            updateJourney(mode);
            window.setTimeout(() => {
                Object.values(modeButtons).forEach((candidate) => {
                    if (!candidate) return;
                    candidate.setAttribute("aria-pressed", candidate.classList.contains("active") ? "true" : "false");
                });
            }, 0);
        });
    });
})();
