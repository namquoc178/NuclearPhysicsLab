// questions.js – Bài 5: đáp án và phản hồi cho các câu hỏi có kiểm tra.
// Câu có predict: true là câu dự đoán: học sinh ghi dự đoán trước, chạy
// nhiệm vụ xong mới so sánh với đáp án.

QuickCheck.define({
    "rp-kp-1": {
        options: [
            { text: "Bức xạ γ", correct: true },
            {
                text: "Bức xạ β",
                feedback: "β truyền qua được lớp chắn mỏng, nhưng ở cùng vật liệu và độ dày, γ vẫn truyền qua nhiều hơn."
            },
            {
                text: "Bức xạ α",
                feedback: "Hạt α dừng lại sau vài chục micromet trong vật rắn; trong bài, α bị chặn hoàn toàn ở mọi độ dày."
            }
        ],
        explanation: "α và β là hạt mang điện: trên đường đi chúng liên tục tương tác với electron của vật liệu nên mất năng lượng nhanh. Photon γ không mang điện, chỉ bị hấp thụ hoặc tán xạ trong một số ít va chạm nên đi được xa hơn."
    },

    "rp-kp-2": {
        options: [
            { text: "Giảm.", correct: true },
            {
                text: "Tăng.",
                feedback: "Lớp chắn dày hơn thì bức xạ phải đi qua nhiều vật chất hơn. Em hãy tăng độ dày và đọc lại tỉ lệ truyền qua."
            },
            {
                text: "Không đổi.",
                feedback: "Em hãy thử độ dày nhỏ nhất và lớn nhất với cùng một loại bức xạ rồi so sánh."
            }
        ],
        explanation: "Với γ, tỉ lệ truyền qua giảm theo hàm mũ e^(−μx). Với β, tỉ lệ truyền qua giảm nhanh và bằng 0 khi độ dày vượt quá tầm xa cực đại của β."
    },

    "rp-kp-3": {
        options: [
            {
                text: "Có. Vật liệu có khối lượng riêng lớn, như chì, chắn mạnh hơn.",
                correct: true
            },
            {
                text: "Không. Chỉ độ dày mới quyết định.",
                feedback: "Em hãy so sánh 5 mm giấy và 5 mm chì với cùng một loại bức xạ."
            }
        ],
        explanation: "Hệ số suy giảm μ phụ thuộc vật liệu: μ = (μ/ρ)·ρ. Chì có khối lượng riêng 11,35 g/cm³, gấp hơn 4 lần nhôm (2,70 g/cm³) và khoảng 14 lần giấy (≈ 0,8 g/cm³), nên chắn mạnh nhất."
    },

    "rp-du-doan-1": {
        predict: true,
        options: [
            { text: "α < β < γ", correct: true },
            {
                text: "γ < β < α",
                feedback: "Hạt α nặng và mang điện tích +2e nên tương tác rất mạnh với vật chất và dừng lại nhanh nhất."
            },
            {
                text: "β < α < γ",
                feedback: "Trong bài, α bị chặn hoàn toàn còn β truyền qua được một phần."
            },
            {
                text: "α < γ < β",
                feedback: "β mang điện nên mất năng lượng liên tục trên đường đi; γ không mang điện nên đi xa hơn."
            }
        ],
        explanation: "Khả năng đâm xuyên tăng dần từ α đến β rồi đến γ. Hạt mang điện tích càng lớn và chuyển động càng chậm thì càng mất năng lượng nhanh."
    },

    "rp-suy-nghi-1": {
        options: [
            {
                text: "Vì mỗi loại bức xạ tương tác với vật chất theo cách khác nhau: α và β mang điện nên mất năng lượng liên tục, γ không mang điện nên ít tương tác hơn.",
                correct: true
            },
            {
                text: "Vì nguồn phát ra số tia khác nhau cho mỗi loại bức xạ.",
                feedback: "Trong nhiệm vụ này mỗi loại đều phát 200 tia (cột Số tia phát ra)."
            },
            {
                text: "Vì γ có khối lượng lớn nhất nên đi xa nhất.",
                feedback: "Photon γ không có khối lượng nghỉ; hạt α mới là hạt nặng nhất."
            }
        ],
        explanation: "Cùng số tia, cùng lớp chắn, nhưng xác suất truyền qua phụ thuộc cách bức xạ tương tác với vật chất. Hạt mang điện tương tác với electron của vật liệu trên suốt đường đi; photon chỉ tương tác ở một số điểm ngẫu nhiên."
    },

    "rp-du-doan-2": {
        predict: true,
        options: [
            {
                text: "Giảm theo một đường cong: lúc đầu giảm nhanh, càng về sau giảm càng chậm.",
                correct: true
            },
            {
                text: "Giảm đều theo một đường thẳng.",
                feedback: "Mỗi milimét chì làm giảm cùng một tỉ lệ của phần còn lại, nên lượng giảm nhỏ dần."
            },
            {
                text: "Không thay đổi.",
                feedback: "Lớp chì dày hơn thì photon có nhiều cơ hội bị hấp thụ hoặc tán xạ hơn."
            },
            {
                text: "Giảm về 0 chỉ sau vài milimét.",
                feedback: "γ không có tầm xa xác định như α và β; luôn còn một phần photon truyền qua."
            }
        ],
        explanation: "Tỉ lệ truyền qua của γ là e^(−μx). Đây là hàm mũ giảm: đồ thị là đường cong, tiến dần về 0 nhưng không bằng 0."
    },

    "rp-suy-nghi-2": {
        options: [
            {
                text: "Không. Tăng gấp đôi độ dày thì tỉ lệ truyền qua bị bình phương: e^(−2μx) = (e^(−μx))².",
                correct: true
            },
            {
                text: "Có, tỉ lệ truyền qua giảm còn đúng một nửa.",
                feedback: "Điều đó chỉ đúng nếu tỉ lệ truyền qua giảm theo đường thẳng. Em hãy đọc trên đồ thị giá trị tại x và tại 2x rồi chia cho nhau."
            }
        ],
        explanation: "Ví dụ: nếu qua lớp chì dày x còn 60 % số photon thì qua lớp dày 2x còn 0,6 × 0,6 = 36 %, không phải 30 %."
    },

    "rp-du-doan-3": {
        predict: true,
        options: [
            { text: "Chì", correct: true },
            {
                text: "Nhôm",
                feedback: "Nhôm chắn tốt hơn giấy nhưng nhẹ hơn chì nhiều."
            },
            {
                text: "Giấy",
                feedback: "Giấy có khối lượng riêng nhỏ nhất trong ba vật liệu."
            }
        ],
        explanation: "Với γ, μ của chì lớn nhất trong ba vật liệu vì chì có khối lượng riêng và số hiệu nguyên tử Z lớn nhất."
    },

    "rp-suy-nghi-3": {
        options: [
            {
                text: "Vì hệ số suy giảm μ phụ thuộc vật liệu: khối lượng riêng và thành phần nguyên tố.",
                correct: true
            },
            {
                text: "Vì kết quả mô phỏng là ngẫu nhiên.",
                feedback: "Dao động ngẫu nhiên nhỏ và đổi chiều giữa các lần chạy. Chênh lệch giữa giấy và chì lớn và lặp lại ở mọi lần chạy."
            },
            {
                text: "Vì hai lớp chắn thực ra có độ dày khác nhau.",
                feedback: "Trong nhiệm vụ này ba lớp chắn có cùng độ dày 5,0 mm."
            }
        ],
        explanation: "Cùng độ dày, nhưng mỗi milimét chì chứa nhiều vật chất (và nhiều electron) hơn mỗi milimét giấy, nên photon có nhiều cơ hội tương tác hơn."
    },

    "bridge-explore": {
        options: [
            { text: "Giảm.", correct: true },
            {
                text: "Tăng.",
                feedback: "Trong P = e^(−μx) với μ > 0, x tăng thì P nhỏ đi."
            },
            {
                text: "Không đổi.",
                feedback: "Trong P = e^(−μx) với μ > 0, x tăng thì P nhỏ đi."
            }
        ],
        explanation: "Lớp chắn dày hơn thì bức xạ có nhiều cơ hội bị hấp thụ hoặc tán xạ hơn, nên phần truyền qua giảm."
    },

    "bridge-experiment": {
        options: [
            { text: "Trường hợp có μ lớn hơn.", correct: true },
            {
                text: "Trường hợp có μ nhỏ hơn.",
                feedback: "Với cùng x, μ lớn hơn làm số mũ −μx âm hơn, nên e^(−μx) nhỏ hơn."
            },
            {
                text: "Hai trường hợp như nhau vì cùng x.",
                feedback: "Phần truyền qua phụ thuộc tích μx, không chỉ phụ thuộc x."
            }
        ],
        explanation: "P = e^(−μx): cùng x, μ càng lớn thì P càng nhỏ."
    }
});

QuickCheck.mountAll();
