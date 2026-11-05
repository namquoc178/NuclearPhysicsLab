// =====================================================================
// quick-check.js – câu hỏi có kiểm tra đáp án ngay trên trang
//
// Mỗi câu hỏi trong trang là một khối
//   <div class="quick-check" data-check="ma-cau-hoi">
//       <p class="qc-prompt">Nội dung câu hỏi</p>
//   </div>
// Đáp án, phản hồi cho từng lựa chọn sai và lời giải thích nằm ở
// js/questions.js của từng bài (QuickCheck.define). Nếu trang không chạy
// JavaScript, học sinh vẫn đọc được câu hỏi.
//
// Ba dạng câu hỏi:
//   - chọn một đáp án (mặc định);
//   - nhập số (type: "number"), chấp nhận cả dấu phẩy và dấu chấm;
//   - dự đoán (predict: true): học sinh ghi dự đoán trước khi chạy mô
//     phỏng, chạy xong mới so sánh với đáp án.
// =====================================================================

(function () {
    "use strict";

    const specs = Object.create(null);
    let uid = 0;

    function define(map) {
        Object.keys(map).forEach((id) => { specs[id] = map[id]; });
    }

    function make(tag, className, html) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (html !== undefined) node.innerHTML = html;
        return node;
    }

    function button(label, className) {
        const node = make("button", className);
        node.type = "button";
        node.textContent = label;
        return node;
    }

    function parseNumber(text) {
        const cleaned = String(text).trim().replace(/\s+/g, "").replace(",", ".").replace("−", "-");
        if (!/^[-+]?(\d+\.?\d*|\.\d+)$/.test(cleaned)) return NaN;
        return Number(cleaned);
    }

    function mount(box) {
        if (box.dataset.qcReady) return;
        const id = box.dataset.check;
        const spec = specs[id];
        if (!spec) return;
        box.dataset.qcReady = "1";
        uid += 1;

        let prompt = box.querySelector(".qc-prompt");
        if (!prompt && spec.prompt) {
            prompt = make("p", "qc-prompt", spec.prompt);
            box.prepend(prompt);
        }
        if (prompt && !prompt.id) prompt.id = `qc-prompt-${uid}`;

        const isNumber = spec.type === "number";
        const correctIndex = isNumber ? -1 : spec.options.findIndex((option) => option.correct);

        // ---------- Vùng trả lời ----------
        let inputs = [];
        let numberInput = null;
        const answerArea = make("div", isNumber ? "qc-number" : "qc-options");

        if (isNumber) {
            const label = make("label", "qc-number-label", spec.label || "Đáp số");
            numberInput = document.createElement("input");
            numberInput.type = "text";
            numberInput.inputMode = "decimal";
            numberInput.autocomplete = "off";
            numberInput.id = `qc-number-${uid}`;
            label.htmlFor = numberInput.id;
            answerArea.append(label, numberInput);
            if (spec.unit) answerArea.append(make("span", "qc-unit", spec.unit));
        } else {
            answerArea.setAttribute("role", "radiogroup");
            if (prompt) answerArea.setAttribute("aria-labelledby", prompt.id);
            spec.options.forEach((option, index) => {
                const label = make("label", "qc-option");
                const input = document.createElement("input");
                input.type = "radio";
                input.name = `qc-${uid}`;
                input.value = String(index);
                label.append(input, make("span", "qc-option-text", option.text));
                answerArea.appendChild(label);
                inputs.push(input);
            });
        }

        // ---------- Nút và phản hồi ----------
        const actions = make("div", "qc-actions");
        const checkButton = button(spec.predict ? "Ghi dự đoán" : "Kiểm tra", "qc-check");
        const compareButton = button("So sánh với kết quả", "qc-compare");
        const revealButton = button("Xem đáp án", "qc-reveal");
        const retryButton = button("Làm lại", "qc-retry");
        compareButton.hidden = true;
        revealButton.hidden = true;
        retryButton.hidden = true;
        actions.append(checkButton, compareButton, revealButton, retryButton);

        const feedback = make("div", "qc-feedback");
        feedback.setAttribute("role", "status");
        feedback.setAttribute("aria-live", "polite");
        feedback.hidden = true;

        box.append(answerArea, actions, feedback);
        box.classList.add("qc-ready");

        // ---------- Trạng thái ----------
        function selectedIndex() {
            const chosen = inputs.find((input) => input.checked);
            return chosen ? Number(chosen.value) : -1;
        }

        function hasAnswer() {
            return isNumber ? numberInput.value.trim() !== "" : selectedIndex() >= 0;
        }

        function setLocked(locked) {
            inputs.forEach((input) => { input.disabled = locked; });
            if (numberInput) numberInput.disabled = locked;
        }

        function clearMarks() {
            answerArea.querySelectorAll(".qc-option").forEach((label) => {
                label.classList.remove("is-correct", "is-wrong", "is-answer");
            });
            answerArea.classList.remove("is-correct", "is-wrong");
        }

        function showFeedback(kind, title, body) {
            feedback.hidden = false;
            feedback.className = `qc-feedback ${kind}`;
            feedback.innerHTML = `<strong>${title}</strong>${body ? ` ${body}` : ""}`;
        }

        function refreshCheckButton() {
            checkButton.disabled = !hasAnswer();
        }

        function isRight() {
            if (isNumber) {
                const value = parseNumber(numberInput.value);
                if (!Number.isFinite(value)) return null;
                return Math.abs(value - spec.answer) <= (spec.tolerance || 0) + 1e-12;
            }
            return selectedIndex() === correctIndex;
        }

        function markChoice(right) {
            if (isNumber) {
                answerArea.classList.add(right ? "is-correct" : "is-wrong");
                return;
            }
            const label = inputs[selectedIndex()].closest(".qc-option");
            label.classList.add(right ? "is-correct" : "is-wrong");
        }

        function answerText() {
            if (isNumber) return `${formatVi(spec.answer)}${spec.unit ? ` ${spec.unit}` : ""}`;
            return spec.options[correctIndex].text.replace(/\.$/, "");
        }

        function finish() {
            setLocked(true);
            checkButton.hidden = true;
            compareButton.hidden = true;
            revealButton.hidden = true;
            retryButton.hidden = false;
        }

        function evaluate(afterPrediction) {
            clearMarks();
            const right = isRight();
            if (right === null) {
                showFeedback("qc-invalid", "Chưa đọc được số.", "Em hãy nhập một số, ví dụ 2 hoặc 0,5.");
                return;
            }
            markChoice(right);
            if (right) {
                showFeedback("qc-right", afterPrediction ? "Dự đoán của em đúng." : "Đúng.", spec.explanation);
                finish();
                return;
            }
            const option = isNumber ? null : spec.options[selectedIndex()];
            const hint = (option && option.feedback) || spec.hint || "";
            if (afterPrediction) {
                // Dự đoán đã ghi thì không sửa lại: nêu đáp án và giải thích luôn.
                if (!isNumber) inputs[correctIndex].closest(".qc-option").classList.add("is-answer");
                // Dự đoán sai không phải lỗi: dùng khung trung tính, không dùng màu đỏ.
                showFeedback("qc-reveal-text", "Kết quả khác với dự đoán của em.",
                    `Đáp án: ${answerText()}. ${hint ? `${hint} ` : ""}${spec.explanation}`);
                finish();
                return;
            }
            showFeedback("qc-wrong", "Chưa đúng.", hint || "Em hãy chọn lại.");
            revealButton.hidden = false;
        }

        function reveal() {
            clearMarks();
            if (isNumber) {
                numberInput.value = formatVi(spec.answer);
                answerArea.classList.add("is-correct");
            } else {
                inputs[correctIndex].checked = true;
                inputs[correctIndex].closest(".qc-option").classList.add("is-answer");
            }
            showFeedback("qc-reveal-text", `Đáp án: ${answerText()}.`, spec.explanation);
            finish();
        }

        function reset() {
            clearMarks();
            inputs.forEach((input) => { input.checked = false; });
            if (numberInput) numberInput.value = "";
            setLocked(false);
            feedback.hidden = true;
            checkButton.hidden = false;
            compareButton.hidden = true;
            revealButton.hidden = true;
            retryButton.hidden = true;
            refreshCheckButton();
            (numberInput || inputs[0]).focus();
        }

        // ---------- Sự kiện ----------
        // Đổi lựa chọn sau một lần trả lời sai: xóa đánh dấu và phản hồi cũ.
        function onAnswerChanged() {
            clearMarks();
            if (feedback.classList.contains("qc-wrong") || feedback.classList.contains("qc-invalid")) {
                feedback.hidden = true;
            }
            refreshCheckButton();
        }

        answerArea.addEventListener("change", onAnswerChanged);
        if (numberInput) {
            numberInput.addEventListener("input", onAnswerChanged);
            numberInput.addEventListener("keydown", (event) => {
                if (event.key === "Enter" && !checkButton.disabled && !checkButton.hidden) {
                    event.preventDefault();
                    checkButton.click();
                }
            });
        }

        checkButton.addEventListener("click", () => {
            if (!hasAnswer()) return;
            if (spec.predict) {
                if (isNumber && isRight() === null) {
                    showFeedback("qc-invalid", "Chưa đọc được số.", "Em hãy nhập một số, ví dụ 2 hoặc 0,5.");
                    return;
                }
                setLocked(true);
                checkButton.hidden = true;
                compareButton.hidden = false;
                showFeedback("qc-prediction", "Đã ghi dự đoán.",
                    "Em hãy chạy nhiệm vụ, quan sát kết quả rồi bấm “So sánh với kết quả”.");
                return;
            }
            evaluate(false);
        });
        compareButton.addEventListener("click", () => evaluate(true));
        revealButton.addEventListener("click", reveal);
        retryButton.addEventListener("click", reset);

        refreshCheckButton();
    }

    function mountAll(root) {
        (root || document).querySelectorAll(".quick-check[data-check]").forEach(mount);
    }

    globalThis.QuickCheck = { define, mount, mountAll, specs, parseNumber };
})();
