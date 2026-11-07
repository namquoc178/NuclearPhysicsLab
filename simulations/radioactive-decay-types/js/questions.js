// questions.js – Bài 3: đáp án và phản hồi cho các câu hỏi có kiểm tra.

QuickCheck.define({
    "dt-kp-1": {
        options: [
            { text: "Phân rã α", correct: true },
            {
                text: "Phân rã β⁻",
                feedback: "Trong β⁻, A giữ nguyên còn Z tăng 1."
            },
            {
                text: "Phân rã β⁺",
                feedback: "Trong β⁺, Z giảm 1 nhưng A giữ nguyên."
            },
            {
                text: "Phát xạ γ",
                feedback: "Phát xạ γ không làm thay đổi A và Z."
            }
        ],
        explanation: "Hạt α là hạt nhân He-4, gồm 2 proton và 2 neutron. Khi phát ra hạt α, hạt nhân mẹ mất 4 nucleon và 2 proton: ΔA = −4, ΔZ = −2."
    },

    "dt-kp-2": {
        options: [
            {
                text: "Một neutron trong hạt nhân biến thành proton, đồng thời phát ra một electron và một phản neutrino.",
                correct: true
            },
            {
                text: "Hạt nhân nhận thêm một proton từ bên ngoài.",
                feedback: "Không có proton nào đi vào hạt nhân. Nếu có, số khối A cũng phải tăng."
            },
            {
                text: "Một electron ở vỏ nguyên tử bị hạt nhân hút vào.",
                feedback: "Quá trình đó gọi là bắt electron. Nó làm Z giảm 1, không phải tăng 1."
            },
            {
                text: "Hạt nhân phát ra một proton.",
                feedback: "Mất một proton thì Z giảm và A cũng giảm."
            }
        ],
        explanation: "Trong β⁻: n → p + e⁻ + ν̅ₑ. Số nucleon không đổi nên A giữ nguyên; số proton tăng thêm 1 nên Z tăng 1. Điện tích được bảo toàn vì electron mang điện tích −1."
    },

    "dt-kp-3": {
        options: [
            {
                text: "β⁻: neutron → proton, Z tăng 1. β⁺: proton → neutron, Z giảm 1. Cả hai đều giữ nguyên A.",
                correct: true
            },
            {
                text: "Cả β⁻ và β⁺ đều biến neutron thành proton.",
                feedback: "Nếu vậy thì Z phải tăng trong cả hai trường hợp. Em hãy quan sát ΔZ của β⁺ trong mô phỏng."
            },
            {
                text: "β⁻: proton → neutron. β⁺: neutron → proton.",
                feedback: "Ngược chiều. Hạt nhân phát ra electron (điện tích −1) thì điện tích của hạt nhân phải tăng thêm +1."
            },
            {
                text: "β⁺ làm A giảm 1 vì mất một hạt.",
                feedback: "Positron không phải nucleon. Trong cả β⁻ và β⁺, số nucleon giữ nguyên."
            }
        ],
        explanation: "β⁻: n → p + e⁻ + ν̅ₑ. β⁺: p → n + e⁺ + νₑ. Hai quá trình diễn ra theo hai chiều ngược nhau giữa proton và neutron; tổng số nucleon A không đổi."
    },

    "dt-kp-4": {
        options: [
            {
                text: "Vì γ là photon: không mang điện và không phải nucleon, nên A, Z, N giữ nguyên; hạt nhân chỉ giảm năng lượng.",
                correct: true
            },
            {
                text: "Vì tia γ mang đi một neutron.",
                feedback: "Nếu mất một neutron thì A đã giảm 1 và hạt nhân trở thành một nuclide khác."
            },
            {
                text: "Vì tia γ phát ra từ vỏ electron, không phải từ hạt nhân.",
                feedback: "Tia γ trong bài phát ra từ hạt nhân ở trạng thái kích thích X*. Photon phát ra từ vỏ electron là tia X."
            },
            {
                text: "Vì trước khi phát γ, hạt nhân đã ở trạng thái năng lượng thấp nhất.",
                feedback: "Trước khi phát γ, hạt nhân đang ở trạng thái kích thích, có năng lượng cao hơn trạng thái cơ bản."
            }
        ],
        explanation: "X* → X + γ. Hạt nhân chuyển từ trạng thái kích thích xuống trạng thái có năng lượng thấp hơn. Phần năng lượng chênh lệch mang đi bởi photon γ; số proton và số neutron không đổi."
    },

    "dt-kp-5": {
        options: [
            {
                text: "Vì năng lượng phân rã Q ≈ 0,862 MeV nhỏ hơn 2mₑc² ≈ 1,022 MeV, không đủ để tạo ra positron.",
                correct: true
            },
            {
                text: "Vì Be-7 là hạt nhân bền.",
                feedback: "Be-7 là hạt nhân phóng xạ, chu kì bán rã khoảng 53 ngày. Câu hỏi là vì sao nó chọn cách bắt electron."
            },
            {
                text: "Vì Be-7 có quá nhiều neutron.",
                feedback: "Be-7 có 4 proton và 3 neutron, tức là thừa proton. Hạt nhân thừa proton mới phân rã bằng β⁺ hoặc bắt electron."
            },
            {
                text: "Vì bắt electron làm A giảm 1.",
                feedback: "Bắt electron giữ nguyên A, giống β⁺. Em hãy xem bảng ΔA, ΔZ, ΔN."
            }
        ],
        explanation: "β⁺ phải tạo ra một positron, cần Q lớn hơn 2mₑc² ≈ 1,022 MeV (tính theo khối lượng nguyên tử). Be-7 chỉ có Q ≈ 0,862 MeV nên chỉ bắt electron được. Na-22 có Q ≈ 2,843 MeV, vượt ngưỡng, nên chủ yếu phân rã β⁺."
    },

    "bridge-explore": {
        options: [
            { text: "Phân rã β⁻", correct: true },
            {
                text: "Phân rã β⁺",
                feedback: "β⁺ làm Z giảm 1."
            },
            {
                text: "Phân rã α",
                feedback: "α làm A giảm 4 và Z giảm 2."
            },
            {
                text: "Phát xạ γ",
                feedback: "γ không làm thay đổi Z."
            }
        ],
        explanation: "ΔA = 0, ΔZ = +1 là dấu hiệu của β⁻: một neutron biến thành proton."
    },

    "bridge-experiment": {
        type: "number",
        label: "Tổng ΔZ =",
        answer: 0,
        hint: "Cộng lần lượt ΔZ của từng bước: α cho −2, mỗi β⁻ cho +1.",
        explanation: "ΔZ = −2 + 1 + 1 = 0, còn ΔA = −4. Hạt nhân cuối là một đồng vị của chính nguyên tố ban đầu. Ví dụ trong dãy uranium: U-238 → Th-234 → Pa-234 → U-234."
    }
});

QuickCheck.mountAll();
