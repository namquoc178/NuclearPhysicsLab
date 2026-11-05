// questions.js – Bài 2: đáp án và phản hồi cho các câu hỏi có kiểm tra.
// Các giá trị Eₗₖ, Eₗₖ/A trong lời giải tính từ dữ liệu AME2020 của bài
// (kiểm thử "liên kết" trong tests/physics.test.js đối chiếu cùng dữ liệu).

QuickCheck.define({
    "be-kp-1": {
        options: [
            { text: "Không nhất thiết.", correct: true },
            {
                text: "Có, luôn luôn.",
                feedback: "Em hãy so sánh U-238 với Ni-62 trong mô phỏng: hạt nhân nào có Eₗₖ lớn hơn, hạt nhân nào có Eₗₖ/A lớn hơn?"
            }
        ],
        explanation: "Eₗₖ/A là Eₗₖ chia cho số nucleon A. Hạt nhân nặng có Eₗₖ lớn vì có nhiều nucleon, nhưng tính trung bình cho mỗi nucleon thì có thể nhỏ hơn. U-238 có Eₗₖ ≈ 1802 MeV nhưng Eₗₖ/A ≈ 7,57 MeV/nucleon. Ni-62 có Eₗₖ ≈ 545 MeV nhưng Eₗₖ/A ≈ 8,79 MeV/nucleon."
    },

    "be-kp-2": {
        options: [
            {
                text: "He-4",
                feedback: "He-4 (≈ 7,07 MeV/nucleon) liên kết chặt hơn nhiều so với các hạt nhân nhẹ bên cạnh nó, nhưng chưa phải lớn nhất trong bốn hạt nhân này."
            },
            {
                text: "Fe-56",
                feedback: "Rất sát: Fe-56 có Eₗₖ/A ≈ 8,790 MeV/nucleon. Em hãy so sánh đến chữ số thứ ba sau dấu phẩy."
            },
            { text: "Ni-62", correct: true },
            {
                text: "U-238",
                feedback: "U-238 có năng lượng liên kết tổng cộng Eₗₖ lớn nhất, không phải Eₗₖ/A lớn nhất."
            }
        ],
        explanation: "Eₗₖ/A của He-4 ≈ 7,074; Fe-56 ≈ 8,790; Ni-62 ≈ 8,795; U-238 ≈ 7,570 MeV/nucleon. Eₗₖ/A tăng nhanh ở các hạt nhân nhẹ, đạt cực đại ở vùng Fe–Ni rồi giảm dần ở các hạt nhân nặng."
    },

    "bridge-explore": {
        options: [
            { text: "Năng lượng liên kết riêng Eₗₖ/A.", correct: true },
            {
                text: "Năng lượng liên kết Eₗₖ.",
                feedback: "Eₗₖ tăng theo số nucleon, nên hạt nhân lớn hầu như luôn có Eₗₖ lớn hơn, dù mỗi nucleon của nó có thể liên kết yếu hơn."
            },
            {
                text: "Độ hụt khối Δm.",
                feedback: "Eₗₖ = Δm·c², nên Δm cũng tăng theo số nucleon giống như Eₗₖ."
            },
            {
                text: "Số khối A.",
                feedback: "A chỉ cho biết có bao nhiêu nucleon, không cho biết chúng liên kết mạnh hay yếu."
            }
        ],
        explanation: "Eₗₖ/A là năng lượng trung bình cần để tách một nucleon. Đại lượng này không phụ thuộc trực tiếp vào kích thước hạt nhân, nên dùng được để so sánh hạt nhân nhẹ với hạt nhân nặng."
    },

    "bridge-experiment": {
        options: [
            { text: "Hạt nhân có A nhỏ hơn.", correct: true },
            {
                text: "Hạt nhân có A lớn hơn.",
                feedback: "Cùng tử số Eₗₖ, chia cho mẫu số A lớn hơn thì được thương nhỏ hơn."
            },
            {
                text: "Hai hạt nhân có Eₗₖ/A bằng nhau.",
                feedback: "Eₗₖ bằng nhau nhưng A khác nhau, nên Eₗₖ/A không thể bằng nhau."
            }
        ],
        explanation: "Với cùng Eₗₖ, hạt nhân có ít nucleon hơn thì mỗi nucleon nhận phần năng lượng liên kết lớn hơn."
    }
});

QuickCheck.mountAll();
