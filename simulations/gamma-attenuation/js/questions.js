// questions.js – Bài 6: đáp án và phản hồi cho các câu hỏi có kiểm tra.
// Câu có predict: true là câu dự đoán: học sinh ghi dự đoán trước, chạy
// nhiệm vụ xong mới so sánh với đáp án.

QuickCheck.define({
    "ga-kp-1": {
        options: [
            { text: "Giảm dần.", correct: true },
            {
                text: "Tăng dần.",
                feedback: "Lớp vật liệu dày hơn thì photon có nhiều cơ hội bị hấp thụ hoặc tán xạ hơn."
            },
            {
                text: "Không đổi.",
                feedback: "Em hãy thử độ dày nhỏ nhất và lớn nhất rồi so sánh số photon tới đầu dò."
            }
        ],
        explanation: "Cùng vật liệu thì μ không đổi; I/I₀ = e^(−μx) giảm khi x tăng."
    },

    "ga-kp-2": {
        options: [
            { text: "Không. Đó là một đường cong giảm theo hàm mũ.", correct: true },
            {
                text: "Có. Đó là một đường thẳng đi xuống.",
                feedback: "Em hãy so sánh lượng giảm của I/I₀ trên hai đoạn độ dày bằng nhau, một ở đầu và một ở cuối đồ thị."
            }
        ],
        explanation: "I/I₀ = e^(−μx). Mỗi đoạn độ dày bằng nhau làm I/I₀ giảm cùng một tỉ lệ, nên lượng giảm nhỏ dần và đồ thị cong."
    },

    "ga-du-doan-1": {
        predict: true,
        options: [
            { text: "Theo một đường cong.", correct: true },
            {
                text: "Theo một đường thẳng.",
                feedback: "Nếu giảm theo đường thẳng thì đến một độ dày nào đó I/I₀ sẽ bằng 0; số liệu cho thấy luôn còn một phần photon truyền qua."
            }
        ],
        explanation: "I/I₀ = e^(−μx) là hàm mũ giảm: đồ thị là đường cong tiến dần về 0."
    },

    "ga-suy-nghi-1": {
        options: [
            {
                text: "Không. Mỗi milimét làm I/I₀ giảm cùng một tỉ lệ nên lượng giảm nhỏ dần; đó là dấu hiệu của quy luật hàm mũ.",
                correct: true
            },
            {
                text: "Có. Lượng giảm bằng nhau nên quy luật là tuyến tính.",
                feedback: "Em hãy lấy hiệu I/I₀ giữa hai độ dày liên tiếp ở đầu bảng và ở cuối bảng rồi so sánh."
            },
            {
                text: "Không. Càng dày thì I/I₀ giảm càng nhanh.",
                feedback: "Em hãy xem lại bảng: hiệu I/I₀ giữa hai độ dày liên tiếp lớn hơn ở đầu bảng hay ở cuối bảng?"
            }
        ],
        explanation: "Mỗi milimét chì nhân I/I₀ với cùng một hệ số e^(−μ·1 mm) < 1. Lượng giảm tuyệt đối vì vậy tỉ lệ với I/I₀ hiện có và nhỏ dần khi x tăng."
    },

    "ga-du-doan-2": {
        predict: true,
        options: [
            { text: "Một đường thẳng đi qua gốc tọa độ, dốc xuống.", correct: true },
            {
                text: "Một đường thẳng dốc lên.",
                feedback: "I/I₀ ≤ 1 nên ln(I/I₀) ≤ 0 và càng âm khi x tăng."
            },
            {
                text: "Một đường cong giống đồ thị I/I₀.",
                feedback: "Lấy logarit tự nhiên hai vế của I/I₀ = e^(−μx), em được biểu thức gì theo x?"
            },
            {
                text: "Một đường nằm ngang.",
                feedback: "ln(I/I₀) thay đổi theo x vì I/I₀ thay đổi theo x."
            }
        ],
        explanation: "ln(I/I₀) = −μx: đây là hàm bậc nhất của x, đồ thị là đường thẳng qua gốc tọa độ với hệ số góc −μ."
    },

    "ga-suy-nghi-2": {
        options: [
            {
                text: "Vì ln(I/I₀) = −μx là hàm bậc nhất của x; hệ số góc bằng −μ.",
                correct: true
            },
            {
                text: "Vì ln(I/I₀) = −μx là hàm bậc nhất của x; hệ số góc bằng μ.",
                feedback: "Em hãy kiểm tra dấu: khi x tăng, ln(I/I₀) tăng hay giảm?"
            },
            {
                text: "Vì ln(I/I₀) = −μx; hệ số góc bằng bề dày bán giảm x₁/₂.",
                feedback: "x₁/₂ = ln2/μ có đơn vị độ dài, còn hệ số góc của ln(I/I₀) theo x có đơn vị 1/độ dài."
            },
            {
                text: "Vì chương trình làm tròn số liệu.",
                feedback: "Việc làm tròn không biến một đường cong thành đường thẳng. Hãy lấy logarit hai vế của I/I₀ = e^(−μx)."
            }
        ],
        explanation: "Lấy logarit tự nhiên hai vế của I/I₀ = e^(−μx) được ln(I/I₀) = −μx. Độ dốc của đường thẳng cho biết μ: dốc càng nhiều thì vật liệu chắn càng mạnh."
    },

    "ga-du-doan-3": {
        predict: true,
        options: [
            { text: "Không. I/I₀ chỉ dao động quanh 0,500.", correct: true },
            {
                text: "Có. I/I₀ luôn đúng bằng 0,500.",
                feedback: "Mỗi photon truyền qua hay không là ngẫu nhiên, nên số photon tới đầu dò mỗi lần một khác."
            }
        ],
        explanation: "Tại x = x₁/₂, mỗi photon có xác suất 1/2 truyền qua. Với số photon hữu hạn, tỉ lệ đo được dao động quanh 0,500."
    },

    "ga-suy-nghi-3": {
        options: [
            {
                text: "Vì mỗi photon truyền qua với xác suất 1/2; với số photon hữu hạn, số photon tới đầu dò là ngẫu nhiên.",
                correct: true
            },
            {
                text: "Vì μ thay đổi giữa các lần chạy.",
                feedback: "μ được giữ cố định; chỉ kết quả của từng photon là ngẫu nhiên."
            },
            {
                text: "Vì công thức x₁/₂ = ln2/μ chỉ đúng gần đúng.",
                feedback: "Với quy luật hàm mũ, công thức này là chính xác. Trung bình của nhiều lần chạy tiến tới 0,500."
            }
        ],
        explanation: "Mỗi lần chạy có 2000 photon, mỗi photon truyền qua với xác suất p = 0,5. Độ lệch chuẩn của I/I₀ là √(p(1 − p)/2000) ≈ 0,011, nên các lần chạy thường lệch khỏi 0,500 vài phần nghìn đến khoảng 0,02. Ngoài ra, μ dùng để tính x₁/₂ được xác định từ mô phỏng ở Nhiệm vụ 2 nên cũng có sai số nhỏ."
    },

    "bridge-explore": {
        options: [
            { text: "x₁/₂ giảm còn một nửa.", correct: true },
            {
                text: "x₁/₂ tăng gấp đôi.",
                feedback: "x₁/₂ = ln2/μ tỉ lệ nghịch với μ."
            },
            {
                text: "x₁/₂ không đổi.",
                feedback: "x₁/₂ = ln2/μ phụ thuộc vào μ."
            }
        ],
        explanation: "x₁/₂ = ln2/μ. Vật liệu chắn mạnh gấp đôi thì chỉ cần lớp dày bằng một nửa để giảm cường độ còn một nửa."
    },

    "bridge-experiment": {
        options: [
            { text: "−μ", correct: true },
            {
                text: "μ",
                feedback: "Khi x tăng, ln(I/I₀) giảm, nên hệ số góc âm."
            },
            {
                text: "x₁/₂",
                feedback: "x₁/₂ = ln2/μ có đơn vị độ dài; hệ số góc có đơn vị 1/độ dài."
            },
            {
                text: "I₀",
                feedback: "I₀ đã bị chia đi trong tỉ số I/I₀."
            }
        ],
        explanation: "ln(I/I₀) = −μx nên hệ số góc bằng −μ."
    }
});

QuickCheck.mountAll();
