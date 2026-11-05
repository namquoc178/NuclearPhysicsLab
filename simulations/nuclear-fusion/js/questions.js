// questions.js – Bài 8: đáp án và phản hồi cho các câu hỏi có kiểm tra.
// Các giá trị Q trong lời giải tính từ khối lượng AME2020 của bài
// (kiểm thử "nhiệt hạch" trong tests/physics.test.js đối chiếu cùng giá trị).

QuickCheck.define({
    "fu-kp-1": {
        options: [
            {
                text: "Không. Tổng A và tổng Z đều được bảo toàn ở mọi phản ứng.",
                correct: true
            },
            {
                text: "Tổng A không đổi nhưng tổng Z thay đổi.",
                feedback: "Em hãy cộng số proton ở hai vế, ví dụ D + T → He-4 + n: 1 + 1 so với 2 + 0."
            },
            {
                text: "Cả hai đều thay đổi vì sinh ra hạt nhân mới.",
                feedback: "Hạt nhân mới được tạo thành từ chính các nucleon ban đầu. Em hãy cộng A và Z ở hai vế."
            }
        ],
        explanation: "Ví dụ D + T → He-4 + n: tổng A là 2 + 3 = 4 + 1; tổng Z là 1 + 1 = 2 + 0. Các nucleon chỉ sắp xếp lại thành hạt nhân mới."
    },

    "fu-kp-2": {
        options: [
            {
                text: "Không. Hai kênh D + D có Q khác nhau vì tổng khối lượng sản phẩm khác nhau.",
                correct: true
            },
            {
                text: "Có, vì cùng hạt nhân ban đầu.",
                feedback: "Q phụ thuộc cả khối lượng trước và sau phản ứng. Em hãy chọn lần lượt hai phản ứng D + D và đọc Q."
            }
        ],
        explanation: "D + D → He-3 + n có Q ≈ 3,27 MeV; D + D → T + H-1 có Q ≈ 4,03 MeV. Vế trái giống nhau, vế phải khác nhau nên chênh lệch khối lượng khác nhau."
    },

    "fu-kp-3": {
        options: [
            {
                text: "D + T → He-4 + n",
                feedback: "D + T có Q ≈ 17,59 MeV, rất lớn nhưng chưa phải lớn nhất. Phản ứng này được chọn cho các lò nhiệt hạch đang phát triển vì dễ xảy ra nhất ở nhiệt độ thấp nhất, không phải vì Q lớn nhất."
            },
            {
                text: "D + D → He-3 + n",
                feedback: "Hai kênh D + D chỉ có Q khoảng 3–4 MeV."
            },
            {
                text: "D + D → T + H-1",
                feedback: "Hai kênh D + D chỉ có Q khoảng 3–4 MeV."
            },
            { text: "D + He-3 → He-4 + H-1", correct: true }
        ],
        explanation: "Q của bốn phản ứng: D + He-3 ≈ 18,35 MeV; D + T ≈ 17,59 MeV; D + D → T + H-1 ≈ 4,03 MeV; D + D → He-3 + n ≈ 3,27 MeV. Hai phản ứng tạo ra He-4 có Q lớn nhất vì He-4 liên kết rất chặt."
    },

    "bridge-explore": {
        options: [
            { text: "Cộng tổng A và tổng Z ở hai vế.", correct: true },
            {
                text: "So sánh tổng khối lượng hai vế.",
                feedback: "Đó là bước tính Q. Nếu phương trình sai A hoặc Z thì không cần tính tiếp."
            },
            {
                text: "Đếm số hạt ở hai vế.",
                feedback: "Số hạt không phải đại lượng bảo toàn trong phản ứng hạt nhân."
            }
        ],
        explanation: "Tổng A và tổng Z phải bằng nhau ở hai vế. Kiểm tra này chỉ cần cộng các số nguyên trong kí hiệu hạt nhân."
    },

    "bridge-experiment": {
        options: [
            { text: "Q dương.", correct: true },
            {
                text: "Q âm.",
                feedback: "Q = (m trước − m sau)·c². Em hãy xét dấu của hiệu trong ngoặc."
            },
            {
                text: "Q bằng 0.",
                feedback: "Q chỉ bằng 0 khi khối lượng hai vế bằng nhau."
            }
        ],
        explanation: "Q = (m trước − m sau)·c² > 0: phản ứng tỏa năng lượng. Phần khối lượng giảm chuyển thành động năng của các sản phẩm."
    }
});

QuickCheck.mountAll();
