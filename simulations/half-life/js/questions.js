// questions.js – Bài 4: đáp án và phản hồi cho các câu hỏi có kiểm tra.

QuickCheck.define({
    "hl-kp-1": {
        options: [
            {
                text: "Không. Mỗi hạt nhân phân rã vào một thời điểm ngẫu nhiên.",
                correct: true
            },
            {
                text: "Có. Tất cả cùng phân rã khi hết một chu kì bán rã.",
                feedback: "Em hãy quan sát lại mô phỏng: các hạt đổi màu rải rác theo thời gian, không đồng loạt."
            },
            {
                text: "Không. Các hạt nhân phân rã lần lượt theo một thứ tự cố định.",
                feedback: "Thứ tự không cố định. Chạy lại mô phỏng, em sẽ thấy những hạt phân rã đầu tiên mỗi lần một khác."
            }
        ],
        explanation: "Không thể biết trước khi nào một hạt nhân cụ thể phân rã. Ta chỉ biết xác suất để nó phân rã trong mỗi khoảng thời gian; xác suất này như nhau với mọi hạt nhân cùng loại."
    },

    "hl-kp-2": {
        options: [
            { text: "Khoảng một nửa", correct: true },
            {
                text: "Khoảng một phần tư",
                feedback: "Còn một phần tư là sau hai chu kì bán rã."
            },
            {
                text: "Không còn hạt nào",
                feedback: "Chu kì bán rã không phải là thời gian để tất cả hạt nhân phân rã hết."
            },
            {
                text: "Khoảng 37 % (tức 1/e)",
                feedback: "1/e ứng với thời gian sống trung bình τ = T₁/₂/ln2 ≈ 1,44 T₁/₂, dài hơn một chu kì bán rã."
            }
        ],
        explanation: "N = N₀·2^(−t/T₁/₂). Với t = T₁/₂ thì N = N₀/2. Kết quả mô phỏng gần N₀/2 nhưng thường lệch một chút vì phân rã là ngẫu nhiên."
    },

    "hl-kp-3": {
        options: [
            {
                text: "Không. Mỗi lần chạy cho một đường hơi khác, dao động quanh đường lí thuyết.",
                correct: true
            },
            {
                text: "Có, vì N₀ và T₁/₂ giống nhau.",
                feedback: "Cùng điều kiện thì giá trị kì vọng giống nhau, nhưng từng lần chạy vẫn khác nhau. Em hãy chạy lại hai lần và so sánh."
            },
            {
                text: "Không, và kết quả không theo quy luật nào.",
                feedback: "Mỗi lần một khác, nhưng các lần chạy đều dao động quanh đường N = N₀·2^(−t/T₁/₂)."
            }
        ],
        explanation: "Định luật phóng xạ cho giá trị kì vọng của số hạt còn lại. Mỗi lần chạy là một mẫu ngẫu nhiên nên lệch khỏi giá trị kì vọng một lượng khác nhau."
    },

    "hl-quan-sat": {
        options: [
            {
                text: "Dao động tương đối giảm dần: đường mô phỏng bám sát đường lí thuyết hơn.",
                correct: true
            },
            {
                text: "Dao động tăng dần: đường mô phỏng càng lệch xa đường lí thuyết.",
                feedback: "Độ lệch tính bằng số hạt có tăng, nhưng hãy so sánh độ lệch so với N₀ (tỉ lệ N/N₀)."
            },
            {
                text: "Mức dao động gần như không đổi.",
                feedback: "Em hãy đặt đồ thị N₀ = 20 cạnh đồ thị N₀ = 1000 và so sánh độ gồ ghề của đường mô phỏng."
            }
        ],
        explanation: "Độ lệch chuẩn của số hạt còn lại vào cỡ √N₀, nên độ lệch so với N₀ tỉ lệ với 1/√N₀. Khi N₀ tăng từ 20 lên 1000 (gấp 50 lần), dao động tương đối giảm khoảng √50 ≈ 7 lần."
    },

    "bridge-explore": {
        options: [
            { text: "1/8", correct: true },
            {
                text: "1/6",
                feedback: "Mỗi chu kì nhân thêm một hệ số 1/2, không phải trừ đi một lượng cố định."
            },
            {
                text: "1/3",
                feedback: "Không lấy N₀ chia cho số chu kì. Mỗi chu kì số hạt còn lại giảm một nửa."
            },
            {
                text: "0, vì đã phân rã hết",
                feedback: "Sau mỗi chu kì, chỉ một nửa số hạt còn lại phân rã, nên số hạt không về 0 sau vài chu kì."
            }
        ],
        explanation: "Sau mỗi chu kì bán rã, số hạt còn lại giảm một nửa: N/N₀ = (1/2)³ = 1/8 sau ba chu kì."
    },

    "bridge-experiment": {
        options: [
            { text: "Gần đường lí thuyết hơn.", correct: true },
            {
                text: "Xa đường lí thuyết hơn.",
                feedback: "Em hãy so sánh lại kết quả Nhiệm vụ 3 với N₀ = 20 và N₀ = 1000."
            },
            {
                text: "Không thay đổi.",
                feedback: "Em hãy so sánh lại kết quả Nhiệm vụ 3 với N₀ = 20 và N₀ = 1000."
            }
        ],
        explanation: "Dao động tương đối tỉ lệ với 1/√N₀, nên càng nhiều hạt thì tỉ lệ N/N₀ trong mô phỏng càng gần giá trị lí thuyết."
    }
});

QuickCheck.mountAll();
